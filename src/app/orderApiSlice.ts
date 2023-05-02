import { OrderData, Table } from "../@types"
import { orderDto } from "../components/CartDrawer"
import { apiSlice } from "./apiSlice"

export const tableApiSlice = apiSlice.injectEndpoints({
  endpoints:(builder) => ({
    getMyOrders: builder.query<OrderData[], null>({
      query: () => "/order",
      // this tag is used to invalidate the query when a mutation is performed
      // this should be first added in apiSlice tagTypes
      providesTags: ["Order"],
    }),

    requestOrder: builder.mutation<{message: string}, orderDto[]>({
      query: (data) => ({
          url: `/order`,
          method: "POST",
          body: {data}
      }),
      invalidatesTags: ['Order']
    }),
  })
})

export const { useGetMyOrdersQuery, useRequestOrderMutation }= tableApiSlice
