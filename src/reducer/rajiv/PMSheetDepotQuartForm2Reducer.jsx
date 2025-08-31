import { createSlice } from "@reduxjs/toolkit";
import { PMSheetDepotQuartForm2Data } from "../../data/Data";

const PMSheetDepotQuartForm2Slice = createSlice({
  name: "PMSheetDepotQuartForm2",
  initialState: PMSheetDepotQuartForm2Data,
  reducers: {
    addPMSheetDepotQuartForm2: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addPMSheetDepotQuartForm2 } =
  PMSheetDepotQuartForm2Slice.actions;
export default PMSheetDepotQuartForm2Slice.reducer;
