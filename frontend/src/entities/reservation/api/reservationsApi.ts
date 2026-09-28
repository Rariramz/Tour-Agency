import { baseApi } from '../../../shared/api/baseApi';
import { Reservation } from '../model/types';

export const reservationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReservations: builder.query<Reservation[], void>({
      query: () => 'reservations',
      providesTags: ['Reservations']
    }),
    createReservation: builder.mutation<
      Reservation,
      { tourId: number; departureDate: string; guests: number }
    >({
      query: ({ tourId, ...body }) => ({
        url: `reservations/${tourId}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['Reservations']
    }),
    cancelReservation: builder.mutation<Reservation, number>({
      query: (id) => ({ url: `reservations/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Reservations']
    })
  })
});

export const {
  useGetReservationsQuery,
  useCreateReservationMutation,
  useCancelReservationMutation
} = reservationsApi;
