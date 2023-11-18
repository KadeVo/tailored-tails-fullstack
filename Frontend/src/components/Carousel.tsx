import { useState, useEffect } from 'react'
import axios from 'axios'
import { ItemInterface } from '../interfaces/iteminterface'

const Carousel: React.FC = () => {
  const [images, setImages] = useState<ItemInterface[]>([])
  const [visibleImages, setVisibleImages] = useState<ItemInterface[]>([])
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    axios
      .get<ItemInterface[]>(
        'https://tailored-tails-api-05jq.onrender.com/items'
      )
      .then((response) => {
        setImages(response.data)
        setVisibleImages(response.data.slice(0, 4))
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3))
    }, 2500)

    return () => {
      clearInterval(timer)
    }
  }, [currentIndex, images])

  useEffect(() => {
    setVisibleImages(images.slice(currentIndex, currentIndex + 4))
  }, [currentIndex, images])

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % (images.length - 3)
    )
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (images.length - 3))
  }

  return (
    <div className="w-full h-1/3 md:h-80 overflow-hidden relative">
      <div className="flex transition-transform duration-500 ease-in-out">
        {visibleImages.map((image) => (
          <img
            key={image._id}
            src={image.imageUrl}
            alt={image.name}
            className="w-full h-full object-cover object-center md:w-1/4 md:h-80 lg:w-1/5 lg:h-80 xl:w-1/6 xl:h-80 ml-2 mr-2 transition-transform duration-500 ease-in-out"
          />
        ))}
      </div>
      <div className="absolute top-1/2 transform -translate-y-1/2 flex justify-between w-full">
        <button
          onClick={handlePrevClick}
          className="bg-gray-400  hover:bg-gray-700 text-white font-bold py-2 px-2 md:px-4 rounded"
        >
          ◀
        </button>
        <button
          onClick={handleNextClick}
          className="bg-gray-400  hover:bg-gray-700 text-white font-bold py-2 px-2 md:px-4 rounded"
        >
          ▶
        </button>
      </div>
    </div>
  )
}

export default Carousel
