import { createSlice } from "@reduxjs/toolkit";
import { TeaCofeeData } from "../../data/Data";

const TeaCofeeReducerSlice = createSlice({
  name: "addTeaCofee",
  initialState: TeaCofeeData,
  reducers: {
    addTeaCofee: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTeaCofee } = TeaCofeeReducerSlice.actions;
export default TeaCofeeReducerSlice.reducer;
