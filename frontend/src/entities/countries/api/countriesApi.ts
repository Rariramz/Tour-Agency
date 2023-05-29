import { baseApi } from '../../../shared/api/baseApi'
import { City, Country } from './types';

export const countriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCountries: builder.query<Country[], void>({
        query: () => `countries`,
    }),
    getCountryById: builder.query<Country, string>({
        query: (id) => `countries/${id}`,
    }),
    getCitiesByCountryId: builder.query<City[], string>({
        query: (id) => `countries/${id}/cities`,
    }),
  }),
})

export const { useGetAllCountriesQuery, useGetCountryByIdQuery, useGetCitiesByCountryIdQuery } = countriesApi;