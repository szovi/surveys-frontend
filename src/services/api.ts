// src/services/api.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// a backend URL-t .env-ből olvassuk be
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

export const api = createApi({
  reducerPath: "api",   // így lesz a state-ben: state.api
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Survey", "Member", "Status", "Participant"], // cache invalidation-hez
  endpoints: () => ({}), // üres, majd injectEndpoints fogja bővíteni
})
