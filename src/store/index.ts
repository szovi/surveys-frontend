import { configureStore } from "@reduxjs/toolkit"
import { api } from "../services/api"

// ha maradna más reducer (pl. UI state), azt is itt regisztrálhatjuk
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
})

// típusaliasok
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
