import { createSlice } from "@reduxjs/toolkit";
import { RequisitionData } from "../../data/Data";

const RequisitionSliPReducerSlice = createSlice({
  name: "addRequisition",
  initialState: RequisitionData,
  reducers: {
    addRequisition: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addRequisition } = RequisitionSliPReducerSlice.actions;
export default RequisitionSliPReducerSlice.reducer;
