export const url = 'https://tailored-tails-api-05jq.onrender.com'

export const setHeaders = () => {
  const headers = {
    headers: {
      'x-auth-token': localStorage.getItem('token'),
    },
  }
  return headers
}
