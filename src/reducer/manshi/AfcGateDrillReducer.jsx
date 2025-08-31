import { createSlice } from "@reduxjs/toolkit";
import { AfcGateDrillData } from "../../data/Data";

const afcgategrillSlice = createSlice({
  name: "afcgatedrill",
  initialState: AfcGateDrillData,
  reducers: {
    addAfcgate: (state, action) => {
      console.log(action);
      state.push(action.payload);
    },
  },
});

export const { addAfcgate } = afcgategrillSlice.actions;
export default afcgategrillSlice.reducer;
