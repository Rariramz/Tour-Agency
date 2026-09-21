import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '../shared/api/baseApi';
import { ToolkitStore } from '@reduxjs/toolkit/dist/configureStore';
import { hotelsApi } from '../entities/hotels/api/hotelsApi';

export const store: ToolkitStore = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [hotelsApi.reducerPath]: hotelsApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, hotelsApi.middleware)
});

setupListeners(store.dispatch);
