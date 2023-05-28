import { Api, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface TourType {
  id: number;
  name: string;
  // cityDeparture: string;
  // cityArrival: string;
  // hotel: string;
  // datesDeparture: string[];
  // nightsAmounts: number[];
  // price: number;
  // currency: string;
  // description: string;
  // image: string;
  // guests: number;
  // rating: number;
}

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
