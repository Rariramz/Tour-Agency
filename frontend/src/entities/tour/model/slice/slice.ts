import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type Tour } from '../types/types';

type ToursSliceState = {
  currentTour: Tour | null;
  tours: Tour[] | null,
  upcomingTours: Tour[] | null,
  likedTours: Tour[] | null,
  pastTours: Tour[] | null,
}

const initialState: ToursSliceState = {
  currentTour: null,
  tours: [],
  upcomingTours: [],
  likedTours: [],
  pastTours: [],
}

export const toursSlice = createSlice({
  name: 'toursState',
  initialState,
  reducers: {
    setCurrentTour: (state, action: PayloadAction<Tour>) => {
      state.currentTour = action.payload
    },
    setTours: (state, action: PayloadAction<Tour[]>) => {
      state.tours = action.payload
    },
    setUpcomingTours: (state, action: PayloadAction<Tour[]>) => {
      state.upcomingTours = action.payload
    },
    setLikedTours: (state, action: PayloadAction<Tour[]>) => {
      state.likedTours = action.payload
    },
    setPastTours: (state, action: PayloadAction<Tour[]>) => {
      state.pastTours = action.payload
    },
  },
});

export const { setCurrentTour, setTours, setUpcomingTours, setLikedTours, setPastTours } = toursSlice.actions
