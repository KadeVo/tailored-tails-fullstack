import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  interface AuthState {
    name: string
    loginStatus: string
    loginError: string
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
  }, [auth.name, navigate])

  const [user, setUser] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(user) as any)
  }
  return (
    <div className="py-[6%]">
      <h1 className="text-center pt-[2%] text-5xl">
        Please Log in to continue
      </h1>
      <form
        onSubmit={handleSubmit}
        className="h-full w-full grid grid-cols-2 justify-center items-center mt-10 gap-[3%]"
      >
        <div className="p-8 rounded-lg  w-[50%] ml-auto">
          <h2 className="text-xl">Login</h2>
          <br />
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
            {auth.loginStatus === 'pending' ? 'Submitting' : 'Login'}
          </button>
          {auth.loginStatus === 'rejected' ? <p>{auth.loginError}</p> : null}
        </div>
        <div className="flex flex-col w-[50%] items-center mr-auto">
          <h2 className="text-xl mb-[5px]">Create an account</h2>
          <p className="text-center">It's easy, free and only takes a moment</p>
          <Link to="/registration">
            <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
              Register
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
