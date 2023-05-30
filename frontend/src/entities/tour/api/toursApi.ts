
import { baseApi } from '../../../shared/api/baseApi'
import { mapTour } from '../lib/mapTour';
import { type Tour } from '../model/types/types';
import { type TourDto } from './types';

export const toursApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTourById: builder.query<Tour, string>({
            query: (id) => `tours/${id}`,
            transformResponse: (response: TourDto) => mapTour(response),
        }),
        getTours: builder.query<Tour[], void>({
            query: (id) => `tours`,
            transformResponse: (response: TourDto[]) => response.map(mapTour),
        }),
        createTour: builder.mutation<Tour, Tour>({
            query: (newTour) => ({
                url: 'tours',
                method: 'POST',
                body: newTour,
            }),
            transformResponse: (response: TourDto) => mapTour(response),
        }),
        updateTour: builder.mutation<Tour, {id: string, patch: Partial<Tour>}>({
            query: ({id, ...patch}) => ({
                url: `tours/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            transformResponse: (response: TourDto) => mapTour(response),
        }),
    }),
})

export const { useGetToursQuery, useGetTourByIdQuery, useCreateTourMutation } = toursApi