import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { MGNREGA_API_REDUCER_KEY } from '../constant'

export const apiSlice = createApi({
    reducerPath: MGNREGA_API_REDUCER_KEY,
    baseQuery: fetchBaseQuery({ baseUrl: 'https://server.co/api/v1/'}),
    endpoints: () => ({}),  // Keep it empty here
})