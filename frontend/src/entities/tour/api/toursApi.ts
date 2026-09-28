import { baseApi } from '../../../shared/api/baseApi';
import { mapTour } from '../lib/mapTour';
import { Tour } from '../model/types/types';
import { TourDto, CreateTourDto } from './types';

export const toursApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTourById: builder.query<Tour, string>({
      query: (id) => `tours/${id}`,
      transformResponse: (response: TourDto) => mapTour(response),
      providesTags: ['Tours']
    }),
    getTours: builder.query<Tour[], void>({
      query: () => 'tours',
      transformResponse: (response: TourDto[]) => response.map(mapTour),
      providesTags: ['Tours']
    }),
    createTour: builder.mutation<Tour, { tour: CreateTourDto; image: File }>({
      query: ({ tour, image }) => {
        const body = new FormData();
        Object.entries(tour).forEach(([key, value]) => {
          body.append(
            key,
            Array.isArray(value) ? JSON.stringify(value) : String(value)
          );
        });
        body.append('image', image);
        return { url: 'tours', method: 'POST', body };
      },
      transformResponse: (response: TourDto) => mapTour(response),
      invalidatesTags: ['Tours']
    }),
    updateTour: builder.mutation<
      Tour,
      { id: number; patch: Partial<CreateTourDto> }
    >({
      query: ({ id, patch }) => ({
        url: `tours/${id}`,
        method: 'PUT',
        body: patch
      }),
      transformResponse: (response: TourDto) => mapTour(response),
      invalidatesTags: ['Tours']
    })
  })
});
export const { useGetToursQuery, useGetTourByIdQuery, useCreateTourMutation } =
  toursApi;
