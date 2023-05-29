
import { baseApi } from '../../../shared/api/baseApi'
import { type Tour } from '../model/types/types';
import { type TourDto } from './types';

export const toursApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTourById: builder.query<TourDto, string>({
            query: (id) => `tours/${id}`,
        }),
        getTours: builder.query<TourDto[], void>({
            query: () => `tours`,
        }),
        createTour: builder.mutation<TourDto, Tour>({
            query: (newTour) => ({
                url: 'tours',
                method: 'POST',
                body: newTour,
            }),
        }),
        updateTour: builder.mutation<TourDto, {id: string, patch: Partial<Tour>}>({
            query: ({id, ...patch}) => ({
                url: `tours/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
    }),
})

export const { useGetToursQuery, useGetTourByIdQuery, useCreateTourMutation } = toursApi