import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {
  decreaseCartQuantity,
  removeFromCart,
  addToCart,
  clearCart,
  getTotals,
} from '../features/cartSlice'
import { useEffect } from 'react'
import CheckoutButton from '../components/CheckoutButton'
interface CartState {
  cartItems: any
  cartTotalAmount: number
  cartTotalQuantity: number
}

interface AuthState {
  name: string
}

interface RootState {
  cart: CartState
  auth: AuthState
}

const Cart = () => {
  const auth = useSelector((state: RootState) => state.auth)
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem))
  }

  const handleDecreaseCartQuantity = (cartItem) => {
    dispatch(decreaseCartQuantity(cartItem))
  }

  const handleIncreaseCartQuantity = (cartItem) => {
    dispatch(addToCart(cartItem))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  useEffect(() => {
    dispatch(getTotals())
  }, [cart, dispatch])

  return (
    <div className="py-[2rem] px-[4rem] my-[rem]">
      <h2 className="text-4xl text-center">Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty flex flex-col items-center">
          <p className="text-center flex text-6xl items-center justify-center my-[5%]">
            <img
              className="w-[15%]"
              src={'/images/trolley.png'}
              alt="trolley-logo"
            />
            Fill me up!
          </p>
          <p className="text-center text-xl mb-[3%]">
            Your cart is currently empty. Fill up your cart by clicking{' '}
            <span>Add to Cart</span> button on items you're interested in
            buying.
          </p>
          <div className="start-shopping">
            <Link to="/items">
              <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg ">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles grid items-center grid-cols-6 gap-[1%] p-[2%] border-b-2 border-gray-300">
            <h3 className="text-gray-400 uppercase col-span-3 pl-[2%] ">
              Products
            </h3>
            <h3 className="text-gray-400 uppercase">Price</h3>
            <h3 className="text-gray-400 uppercase">Quantity</h3>
            <h3 className="text-gray-400 uppercase pr-[2%] justify-self-end">
              Total
            </h3>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map((cartItem) => (
              <div
                className="cart-item grid items-center grid-cols-6 gap-[1%]  p-[2%]"
                key={cartItem.id}
              >
                <div className="cart-product col-span-3 flex">
                  <img
                    className="mr-[2%] w-[200px] h-[200px] rounded-lg"
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                  />
                  <div>
                    <h3 className="text-xl font-bold">{cartItem.name}</h3>
                    <h3 className="mt-[3%]">{cartItem.description}</h3>
                    <h3 className="my-[3%]">
                      {(() => {
                        switch (cartItem.rating) {
                          case 1:
                            return '★☆☆☆☆'
                          case 2:
                            return '★★☆☆☆'
                          case 3:
                            return '★★★☆☆'
                          case 4:
                            return '★★★★☆'
                          case 5:
                            return '★★★★★'
                          default:
                            return 'Not rated'
                        }
                      })()}
                    </h3>
                    <button
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-4 rounded-lg"
                      onClick={() => handleRemoveFromCart(cartItem)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div>${cartItem.price}</div>
                <div className="flex w-[130px] max-w-[100%] items-start justify-center border-[1px] rounded-md">
                  <button
                    className="border-0 outline-none bg-inherit py-[0.7rem] px-[1.5rem] "
                    onClick={() => handleDecreaseCartQuantity(cartItem)}
                  >
                    -
                  </button>
                  <div className="count py-[0.7rem]">
                    {cartItem.cartQuantity}
                  </div>
                  <button
                    className="border-0 outline-none bg-inherit py-[0.7rem] px-[1.5rem] "
                    onClick={() => handleIncreaseCartQuantity(cartItem)}
                  >
                    +
                  </button>
                </div>
                <div className="justify-self-end pr-[0.5rem] font-bold">
                  ${cartItem.price * cartItem.cartQuantity}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-start border-t-[1px] border-slate-300 pt-[3%] ">
            <button
              className="bg-red-600 hover:bg-red-500 text-white font-bold py-1 px-4 rounded-lg ml-[2%]"
              onClick={() => handleClearCart()}
            >
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="flex justify-between ">
                <span>Subtotal</span>
                <span className="amount font-bold">
                  ${cart.cartTotalAmount}
                </span>
              </div>
              <p className="font-extralight text-sm my-[2%]">
                Taxes and shipping calculated at checkout
              </p>
              <div className="flex flex-col">
                {auth.name ? (
                  <CheckoutButton cartItems={cart.cartItems} />
                ) : (
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Log in
                  </button>
                )}

                <div className="continue-shopping">
                  <Link to="/items">
                    <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mt-[5%] w-[100%]">
                      Back to Shopping
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
