import { createSlice } from "@reduxjs/toolkit";
import { ParameterData } from "../../data/Data";

const ParameterReducerSlice = createSlice({
  name: "addParameter",
  initialState: ParameterData,
  reducers: {
    addParameter: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addParameter } = ParameterReducerSlice.actions;
export default ParameterReducerSlice.reducer;
