import { Table } from "../@types"
import { apiSlice } from "./apiSlice"

export const tableApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getAllTable: builder.query<Table[], null>({
      query: () => "/table?detail=true",
      // this tag is used to invalidate the query when a mutation is performed
      // this should be first added in apiSlice tagTypes
      providesTags: ["Table"],
    }),

    bookTable: builder.mutation<{message: string}, {password: string, tableNumber: number}>({
      query: ({password, tableNumber}) => ({
          url: `/table/${tableNumber}`,
          method: "PATCH",
          body: {password}
      }),
      invalidatesTags: ['Table']
    }),
    logout: builder.mutation<{message: string}, { tableNumber: number}>({
      query: ({tableNumber}) => ({
          url: `/table/${tableNumber}/logout`,
          method: "POST",
      }),
      invalidatesTags: ['Table']
    }),

    shareTable: builder.mutation<{message: string}, {password: string, tableNumber: number}>({
      query: ({password, tableNumber}) => ({
          url: `/table/${tableNumber}/share`,
          method: "POST",
          body: {password}
      }),
      invalidatesTags: ['Table']    
    }),
  })
})

export const { useGetAllTableQuery, useLogoutMutation, useBookTableMutation, useShareTableMutation }= tableApiSlice
