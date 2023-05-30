import { Api, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HotelDto } from './types';

export const hotelsApi = createApi({
  reducerPath: 'hotelsApi',
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
  endpoints: (builder) => ({
    getAllHotels: builder.query<HotelDto[], void>({
        query: () => `hotels`,
    }),
    getHotelById: builder.query<HotelDto, string>({
      query: (id) => `hotels/${id}`,
    }),
    getHotelsByCity: builder.query<HotelDto, string>({
        query: (cityId) => `hotels/cities/${cityId}`,
    }),
    getHotelsByCountry: builder.query<HotelDto, string>({
      query: (countryId) => `hotels/countries/${countryId}`,
    }),
  }),
})

export const { useGetAllHotelsQuery, useGetHotelByIdQuery, useGetHotelsByCityQuery, useGetHotelsByCountryQuery } = hotelsApi;
