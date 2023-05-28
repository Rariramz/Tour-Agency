import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TourType } from '../types/types';

type ToursSliceState = {
  currentTour: TourType | null;
}

const initialState: ToursSliceState = {
  currentTour: null
}

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setCurrentTour: (state, action: PayloadAction<TourType>) => {
      state.currentTour = action.payload
    },
  },
})

export const { setCurrentTour } = toursSlice.actions
