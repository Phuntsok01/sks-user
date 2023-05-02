import { Category } from "../@types"
import { apiSlice } from "./apiSlice"

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder) => ({
        getAllCategory:builder.query<Category[],null>({
            query:()=>"/category",
            providesTags:["Category"]
        }),
        getCategoryById:builder.query<Category,{id?:string}>({
            query:({id})=>`/category/${id}`,
            providesTags:["Category"]

        }),

    })
})

export const {useGetAllCategoryQuery,useGetCategoryByIdQuery}= categoryApiSlice