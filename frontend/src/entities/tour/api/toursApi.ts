
import { TourType, baseApi } from '../../../shared/api/baseApi'

export const toursApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTourById: builder.query<TourType, string>({
            query: (id) => `tours/${id}`,
        }),
        getTours: builder.query<TourType[], void>({
            query: () => `tours`,
        }),
        createTour: builder.mutation<TourType, Partial<TourType>>({
            query: (newTour) => ({
                url: 'tours',
                method: 'POST',
                body: newTour,
            }),
        }),
        updateTour: builder.mutation<TourType, Partial<TourType>>({
            query: ({id, ...patch}) => ({
                url: `tours/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
    }),
})

export const { useGetToursQuery, useGetTourByIdQuery, useCreateTourMutation } = toursApi