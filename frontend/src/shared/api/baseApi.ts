import { Api, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      // headers.set('Access-Control-Allow-Methods', 'GET') //
      // headers.set('Access-Control-Allow-Headers', '*') //
      return headers
    },
  }),
  endpoints: () => ({}),
})
