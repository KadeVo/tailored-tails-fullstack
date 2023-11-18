import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  interface AuthState {
    name: string
    loginStatus: string
    loginError: string
    _id: string
    registerStatus: string
    registerError: string | null
  }

  interface RootState {
    auth: AuthState
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const auth = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    if (auth.name) {
      navigate('/items')
    }
  }, [auth._id, navigate])

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(registerUser(user) as any)
  }
  return (
    <div className="py-[2%]">
      <h1 className="text-center pt-[2%] text-5xl">Registration Page</h1>
      <form
        onSubmit={handleSubmit}
        className="mx-auto p-8 h-full w-full mt-10 grid grid-cols-2 items-center justify-center gap-[3%]"
      >
        <div className="p-8 rounded-lg  w-[50%] ml-auto">
          <h2 className="text-xl">Register</h2>
          <br />
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="w-full border border-gray-400 rounded py-2 px-3"
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="w-full border border-gray-400 rounded py-2 px-3"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="w-full border border-gray-400 rounded py-2 px-3"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
            {auth.registerStatus === 'pending' ? 'Submitting' : 'Register'}
          </button>
          {auth.registerStatus === 'rejected' ? (
            <p>{auth.registerError}</p>
          ) : null}
        </div>
        <div className="flex flex-col w-[50%] items-center mr-auto">
          <h2 className="text-center text-xl mb-[5px]">
            Already have an account?
          </h2>
          <p className="text-center w-[80%]">
            Log in and start shopping for your favorite costumes for your furry
            friends
          </p>
          <Link to="/login">
            <button className="p-2 px-4 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
              Log in
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Register
