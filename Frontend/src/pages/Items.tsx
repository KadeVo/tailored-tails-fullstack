import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchItems } from '../../redux/actions/itemsActions'
import { Link } from 'react-router-dom'
import { useGetAllProductsQuery } from '../features/productsApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../features/cartSlice'

const Items = ({ fetchItems }) => {

  const { data: items, error, isLoading } = useGetAllProductsQuery({})
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const handleAddToCart = (item: unknown) => {
    dispatch(addToCart(item))
  }

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage
  const indexOfLastItem = currentPage * itemsPerPage
  const currentItems =
    (items ? items.slice(indexOfFirstItem, indexOfLastItem) : []) || []

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  if (isLoading) {
    return <div>Loading...Please wait</div>
  }
  if (error) {
    console.log('ERROR:', error)
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-2 pt-[15%] md:pt-[5%] mx-10 mb-10">
        <div className="col-span-1 flex items-center justify-center bg-cyan-100">
          <img
            className="w-[70%] md:w-[80%] lg:w-[60%] rotate-[-15deg] rounded-lg"
            src="/images/items-page.jpg"
            alt="dog with scarf"
          />
        </div>
        <div className="  p-10">
          <h2 className="text-3xl text-center md:text-left md:text-3xl px-[3%]">
            Costumes, Hats, Accessories & More!
          </h2>
          <br />
          <p className="text-center md:text-left text-xl p-[3%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            eligendi aliquid, fugiat assumenda dicta amet quas animi iure
            repudiandae? Impedit, illo cum id eligendi sapiente ducimus veniam
            aperiam maiores ratione.
          </p>
          <p className="text-center md:text-left text-xl p-[3%]">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum
            eligendi aliquid, fugiat assumenda dicta amet quas animi iure
            repudiandae? Impedit, illo cum id eligendi sapiente ducimus veniam
            aperiam maiores ratione.
          </p>
        </div>
      </div>
      <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-16">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="border rounded-lg p-8 flex flex-col shadow-xl"
          >
            <h2 className="text-sm font-bold">{item.name}</h2>

            <div className="flex justify-center w-full items-center">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="object-cover h-60 w-60 m-4 rounded-md"
              />
            </div>
            <div className="mt-2">
              <p>
                <span className="font-medium text-lg">Category: </span>{' '}
                {item.category}
              </p>
              <p>
                <span className="font-medium text-lg">Price:</span> $
                {item.price}
              </p>
              <p>
                <span className="font-medium text-lg">Rating:</span>{' '}
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
              </p>
              <p>
                <span
                  className={
                    item.stock === 0 ? 'text-red-500' : 'text-green-700'
                  }
                >
                  {item.stock === 0 ? 'Out of Stock' : 'In Stock'}
                </span>
              </p>
              {item.stock > 0 ? (
                <div className="flex gap-2 flex-end">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4"
                  >
                    Add To Cart
                  </button>

                  <Link to={`/items/${item._id}`}>
                    <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
                      View Item
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="flex  gap-2">
                  <div className="p-2 bg-red-600 rounded-lg text-white mt-4">
                    Out of Stock
                  </div>
                  <Link to={`/items/${item._id}`}>
                    <button className="p-2 bg-orange-600 rounded-lg text-white hover:bg-orange-500 mt-4">
                      View Item
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg mr-2"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div>
          <p className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg">
            {currentPage}
          </p>
        </div>
        <button
          className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-lg ml-2"
          onClick={() => paginate(currentPage + 1)}
          disabled={!items || indexOfLastItem >= items.length}
        >
          Next
        </button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    items: state.items, 
  }
}

const mapDispatchToProps = {
  fetchItems,
}

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(Items)
