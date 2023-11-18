import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const itemsApi = createApi({
  reducerPath: 'itemsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://tailored-tails-api-05jq.onrender.com',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => 'items',
    }),
  }),
})

export const { useGetAllProductsQuery } = itemsApi
