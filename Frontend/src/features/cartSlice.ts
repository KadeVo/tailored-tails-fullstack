import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
interface CartItems {
  name: string
  id: number
  price: number
  cartQuantity: number
}

interface Cart {
  cartItems: CartItems[]
  cartTotalQuantity: number
  cartTotalAmount: number
}

const initialState: Cart = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === action.payload.name
      )
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1
        toast.info(`increased ${state.cartItems[itemIndex].name} quantity`, {
          position: 'bottom-left',
        })
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 }
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name} added to cart`, {
          position: 'bottom-left',
        })
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.name !== action.payload.name
      )
      state.cartItems = nextCartItems
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))

      toast.error(`${action.payload.name} removed from cart`, {
        position: 'bottom-left',
      })
    },
    decreaseCartQuantity(state, action) {
      const { name } = action.payload
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.name === name
      )

      if (itemIndex !== -1) {
        const currentQuantity = state.cartItems[itemIndex].cartQuantity

        if (currentQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1
          toast.info(`Decreased ${name} cart quantity`, {
            position: 'bottom-left',
          })
        } else {
          state.cartItems.splice(itemIndex, 1)
          toast.error(`${name} removed from cart`, {
            position: 'bottom-left',
          })
        }

        localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
      }
    },
    clearCart(state) {
      state.cartItems = []
      toast.error(`Cart Cleared`, {
        position: 'bottom-left',
      })
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
    },
    getTotals(state) {
      const { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem
          const itemTotal = price * cartQuantity
          cartTotal.total += itemTotal
          cartTotal.quantity += cartQuantity

          return cartTotal
        },
        {
          total: 0,
          quantity: 0,
        }
      )
      state.cartTotalQuantity = quantity
      state.cartTotalAmount = total
    },
  },
})

export const {
  addToCart,
  removeFromCart,
  decreaseCartQuantity,
  clearCart,
  getTotals,
} = cartSlice.actions
export default cartSlice.reducer
