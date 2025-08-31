import { createSlice } from "@reduxjs/toolkit";
import { TrainIdRecordRegData } from "../../data/Data";

const TrainIdRecordRegReducerSlice = createSlice({
  name: "addTrainId",
  initialState: TrainIdRecordRegData,
  reducers: {
    addTrainId: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addTrainId } = TrainIdRecordRegReducerSlice.actions;
export default TrainIdRecordRegReducerSlice.reducer;
