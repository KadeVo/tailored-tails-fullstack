import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";

const Success = () => {
  const dispatch = useDispatch();

  return (
  <div  className="w-[50%] my-[7%] mx-auto gap-[10%]">
    <div className="text-center">
      <h2 className="text-4xl pb-[3%]">Order Successful!</h2>
      <p className="text-lg ">Thank you for your purchase. Your order has been successfully placed.</p>
    </div>
    <div className="text-center mt-[7%] w-[70%] mx-auto">
      <h3 className="text-4xl pb-[3%]">Contact Information</h3>
      <p className="text-lg ">If you have any questions or concerns, please contact our customer support at FakeSupport@example.com.</p>
    </div>
    <div className="flex flex-col items-center justify-center gap-4 mt-[5%]">
      <Link to="/items"><button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
         Continue Shopping
      </button></Link>
      <button className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
      <Link to="/" onClick={() => {
          dispatch(logoutUser(null));
          toast.warning("You have logged out", { position: "bottom-left" });
          }}>Logout
      </Link>
      </button>
    </div>
  </div>
  )
}

export default Success
