import { createSlice } from "@reduxjs/toolkit";
import { Lift3Data } from "../../data/Data";
const Lift3Slice = createSlice({
  name: "Lift3Rescue",
  initialState: Lift3Data,
  reducers: {
    addLift3: (state, action) => {
      console.log(action);
      state.push(action.payload);
    },
  },
});
export const { addLift3 } = Lift3Slice.actions;
export default Lift3Slice.reducer;
