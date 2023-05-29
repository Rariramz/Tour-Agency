import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Tour } from '../types/types';

type ToursSliceState = {
  currentTour: Tour | null;
}

const initialState: ToursSliceState = {
  currentTour: null
}

export const toursSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setCurrentTour: (state, action: PayloadAction<Tour>) => {
      state.currentTour = action.payload
    },
  },
})

export const { setCurrentTour } = toursSlice.actions
