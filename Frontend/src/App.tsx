import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Items from './pages/Items'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import SingleItem from './pages/SingleItem'
import NotFound from './components/NotFound'
import { ToastContainer } from 'react-toastify'
import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register'
import Login from './pages/Login'
import Success from './pages/Success'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/successpage" element={<Success />} />
        <Route path="/success" element={<Success />} />
        <Route path="/items" element={<Items />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/carts" element={<Cart />} />
        <Route path="/items/:itemId" element={<SingleItem />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <main className="container mx-auto p-2">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
