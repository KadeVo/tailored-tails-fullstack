import axios from 'axios'

export const setItems = (items) => ({
  type: 'SET_ITEMS',
  payload: items,
})

export const fetchItems = () => {
  return (dispatch) => {
    axios
      .get('https://tailored-tails-api-05jq.onrender.com/items')
      .then((response) => {
        dispatch(setItems(response.data))
      })
      .catch((error) => {
        console.error('Error fetching items:', error)
      })
  }
}
