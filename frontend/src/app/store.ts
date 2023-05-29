import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { baseApi } from '../shared/api/baseApi'
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore'
import { countriesApi } from '../entities/countries/api/countriesApi'

export const store: ToolkitStore = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, countriesApi.middleware),
})

setupListeners(store.dispatch)