import {
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  
  const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    credentials: 'include',
    prepareHeaders: (headers) => {
      return headers;
    },
  });
 
  export const apiSlice = createApi({
    baseQuery: baseQuery,
    reducerPath: "api",
    endpoints: () => ({}),
    tagTypes: ["Product", "Table","Category", "Order"],
  });
  
