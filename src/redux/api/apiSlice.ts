import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-catalog-application-server-seven.vercel.app/api/v1",
    // baseUrl: "http://localhost:5000/api/v1",
  }),

  tagTypes: ["review"],

  endpoints: () => ({}),
});
