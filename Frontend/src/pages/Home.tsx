import { Link } from 'react-router-dom'
import Carousel from '../components/Carousel'

function Home() {
  return (

    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center items-center m-[5%]">
        <div className='m-[50px]'>
          <h1 className="m-auto text-7xl lg:text-8xl cursive text-center ">Tailored Tails</h1>
           <p className="text-lg text-center  py-[5%]">
            Where style meets pet comfort! We're your go-to destination for all things pet fashion, from charming shirts and playful costumes to adorable accessories. Our mission is to pamper your furry friends with high-quality, comfortable, and trendy products
          </p>
          <div className=' text-center'>
          <Link to="/items" className="mt-6 inline-block ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
              Check Out Our Products
            </button>
          </Link>
          </div>        
        </div>
        <img className="rounded-full lg:p-8" src="/images/bg-home.jpg" alt="" />
      </div>
      <div className="mt-12">
        <Carousel />
      </div>
    </div>
  )
}

export default Home
