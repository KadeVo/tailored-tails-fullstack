import axios from 'axios'
import { useState, useEffect } from 'react'
import { ItemInterface } from '../interfaces/iteminterface'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../features/cartSlice'
import { useDispatch } from 'react-redux'

function SingleItem({
  width,
  height,
  magnifierHeight = 150,
  magnifieWidth = 150,
  zoomLevel = 1.5,
}: {
  width?: string
  height?: string
  magnifierHeight?: number
  magnifieWidth?: number
  zoomLevel?: number
}) {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleAddToCart = (item: unknown) => {
    dispatch(addToCart(item))
  }

  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)

  const { itemId } = useParams()
  const [item, setItem] = useState<ItemInterface | null>(null)

  useEffect(() => {
    axios
      .get<ItemInterface>(
        `https://tailored-tails-api-05jq.onrender.com/items/${itemId}`
      )
      .then((response) => {
        setItem(response.data)
      })
      .catch((error) => {
        console.error('Error fetching item:', error)
      })
  }, [itemId])

  if (item === null) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="py-2 px-4 bg-orange-600 rounded-lg text-white hover:bg-orange-500 m-[4%]"
      >
        Previous Page
      </button>
      <div className="md:grid md:grid-cols-2 mx-[5%] gap-[2%]">
        <div className="flex items-center justify-center ">
          <div
            style={{
              position: 'relative',
              height: height,
              width: width,
            }}
          >
            <p className="text-bold text-lg">Hover image to magnify</p>
            <img
              className="w-[500px] rounded-md"
              src={item.imageUrl}
              style={{ height: height, width: width }}
              onMouseEnter={(e) => {
                const elem = e.currentTarget
                const { width, height } = elem.getBoundingClientRect()
                setSize([width, height])
                setShowMagnifier(true)
              }}
              onMouseMove={(e) => {
                const elem = e.currentTarget
                const { top, left } = elem.getBoundingClientRect()
                const x = e.pageX - left - window.pageXOffset
                const y = e.pageY - top - window.pageYOffset
                setXY([x, y])
              }}
              onMouseLeave={() => {
                setShowMagnifier(false)
              }}
              alt={'img'}
            />
            <div
              style={{
                display: showMagnifier ? '' : 'none',
                position: 'absolute',
                pointerEvents: 'none',
                height: `${magnifierHeight}px`,
                width: `${magnifieWidth}px`,
                top: `${y - magnifierHeight / 2}px`,
                left: `${x - magnifieWidth / 2}px`,
                opacity: '1',
                border: '1px solid lightgray',
                backgroundColor: 'white',
                backgroundImage: `url('${item.imageUrl}')`,
                backgroundRepeat: 'no-repeat',
                borderRadius: '50%',
                backgroundSize: `${imgWidth * zoomLevel}px ${
                  imgHeight * zoomLevel
                }px`,
                backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
                backgroundPositionY: `${
                  -y * zoomLevel + magnifierHeight / 2
                }px`,
              }}
            ></div>
          </div>
        </div>
        <div className="">
          <h2 className="font-bold text-2xl">{item.name}</h2>
          <p className="font-medium text-lg">Rating:</p>
          {(() => {
            switch (item.rating) {
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
          <p className="font-medium text-lg">Description:</p>
          <p>{item.description}</p>
          <p>
            <span className="font-medium text-lg">Catgory:</span>{' '}
            {item.category}
          </p>
          <p>
            <span className="font-medium text-lg">Price:</span> ${item.price}
          </p>
          <p>
            <span className="font-medium text-lg">Stock:</span> {item.stock}
          </p>
          <br />
          <hr className="border-t border-black my-4" />
          <br />
          <p className="font-semibold text-xl">Product Information:</p>
          <p>
            <span className="font-medium text-lg">Weight:</span> 120g
          </p>
          <p>
            <span className="font-medium text-lg">Dimension:</span> 50-60 cm
          </p>
          <p>
            <span className="font-medium text-lg">Superior Material:</span> Made
            of breathable,soft and skin-friendly cotton and polyester fiber.
          </p>
          <p>
            <span className="font-medium text-lg">Used Widley:</span> Suitable
            for all house pets
          </p>
          {item.stock > 0 ? (
            <div className="flex gap-2">
              <button
                className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4"
                onClick={() => handleAddToCart(item)}
              >
                Add To Cart
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <div className="p-2 bg-red-600 rounded-lg text-white mt-4">
                Out of Stock
              </div>
            </div>
          )}
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default SingleItem
