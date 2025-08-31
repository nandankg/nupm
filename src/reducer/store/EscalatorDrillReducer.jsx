import { createSlice } from "@reduxjs/toolkit";
import { EscaalatorDrillData } from "../../data/Data";

const escalatordrillSlice = createSlice({
  name: "escalatordrill",
  initialState: EscaalatorDrillData,
  reducers: {
    addDrill: (state, action) => {
      console.log(action);
      state.push(action.payload);
    },
  },
});
export const { addDrill } = escalatordrillSlice.actions;
export default escalatordrillSlice.reducer;
