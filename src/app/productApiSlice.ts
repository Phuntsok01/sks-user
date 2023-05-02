import { Product } from "../@types"
import { apiSlice } from "./apiSlice"


export const productApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllProduct: builder.query<Product[], null>({
            query: () => "/product?detail=true",
            // this tag is used to invalidate the query when a mutation is performed
            // this should be first added in apiSlice tagTypes
            providesTags: ["Product"],
          }),
          getProductById: builder.query<Product, {id?: string}>({
            query: ({id}) => `/product/${id}`,
            providesTags: ["Product"]
          }),
          getProductByCategoryId: builder.query<Product[], {categoryId?: string}>({
            query: ({categoryId}) => `/product?category=${categoryId}`,
            providesTags: ["Product"]
          }),    })
})

export const { useGetAllProductQuery, useGetProductByIdQuery, useGetProductByCategoryIdQuery}= productApiSlice