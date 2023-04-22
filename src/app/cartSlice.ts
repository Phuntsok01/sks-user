import { createSlice } from "@reduxjs/toolkit";
import { CartState, Product } from "../@types";

import { RootState } from "./store";

const initialState: CartState = {
  products: [],
  itemCount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action: {type: string, payload: {product: Product, quantity: number}}) => {
      // check if product already exists in cart
      const productIndex = state.products.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (productIndex !== -1) {
        // increment the quantity of the product
        state.products[productIndex].quantity += action.payload.quantity || 1;
        state.products[productIndex].cost = state.products[productIndex].quantity * action.payload.product.price;
      } else {
        // add the product to the cart
        state.products.push({ product: action.payload.product, quantity: action.payload.quantity || 1, cost: action.payload.product.price * (action.payload.quantity || 1) });
      }
      state.itemCount += action.payload.quantity;
    },
    removeProduct: (state, action: {type: string, payload: {product: Product, quantity: number}}) => {
      // decrement the quantity of the product or remove if quantity is 1
      const productIndex = state.products.findIndex(
        (item) => item.product.id === action.payload.product.id
      );
      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          const value = state.products[productIndex].quantity - action.payload.quantity
          const newValue = value < 0 ? 0 : value 
          state.products[productIndex].quantity = newValue;
          state.products[productIndex].cost = state.products[productIndex].quantity * action.payload.product.price;
        } else 
          state.products.splice(productIndex, 1);
        }
        const count = state.itemCount - action.payload.quantity;
        const newCount = count < 0 ? 0 : count;
        state.itemCount = newCount;
    }
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice;
export const selectCartState = (state: RootState) => state.cart;
export const selectCartItems = (state: RootState) => state.cart.products;
export const selectCartItemsCount = (state: RootState) => state.cart.itemCount;
