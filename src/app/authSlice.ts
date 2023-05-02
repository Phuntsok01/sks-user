import { createSlice } from "@reduxjs/toolkit";
import { Table } from "../@types";

import { RootState } from "./store";

const isTableValid = (table: any): table is Table => {
  return typeof table.tableNumber === "number" && typeof table.status === "boolean" && typeof table.password === "string";
}

const myTable = localStorage.getItem("myTable");


export interface AuthState {
  isAuthenticated: boolean;
  tableDetails?: Table;
}

let initialState: AuthState = {
  isAuthenticated: false,
}
if (typeof myTable === 'string'){
  const parsedTable = JSON.parse(myTable);
  if (isTableValid(parsedTable)){
    initialState = {
      isAuthenticated: true,
      tableDetails: parsedTable
    }
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsAuthenticated(state, action: { type: string; payload: boolean }) {
      state.isAuthenticated = action.payload;
    },
    setTableDetails(state, action: { type: string; payload: Table }) {
      state.tableDetails = action.payload;
      localStorage.setItem("myTable", JSON.stringify(action.payload));
    },
    logoutSelf(state) {
      state.isAuthenticated = false;
      state.tableDetails = undefined;
      localStorage.removeItem("myTable");
    },
  },
});

export const { setIsAuthenticated,setTableDetails, logoutSelf } = authSlice.actions;
export default authSlice;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectTableDetail = (state: RootState) => state.auth.tableDetails;
export const selectAuthState = (state: RootState) => state.auth;
