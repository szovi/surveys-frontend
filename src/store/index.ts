import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'

// If there is remaining reducers(e.g.: UI state), we can register them here too
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
})

// type aliases
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
