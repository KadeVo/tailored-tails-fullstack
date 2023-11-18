import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../features/authSlice'

const CheckoutButton = ({ cartItems }) => {
  const user = useSelector((state: RootState) => state.auth)
  const handleCheckout = () => {
    axios
      .post(
        'https://tailored-tails-api-05jq.onrender.com/stripe/create-checkout-session',
        {
          cartItems,
          userId: user._id,
        }
      )
      .then((res) => {
        console.log('response', res)
        if (res.data.url) {
          window.location.href = res.data.url
        }
      })
      .catch((error) => console.log(error))
  }
  return (
    <>
      <button
        className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg"
        onClick={() => handleCheckout()}
      >
        Checkout
      </button>
    </>
  )
}

export default CheckoutButton
