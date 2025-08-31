import { createSlice } from "@reduxjs/toolkit";
import { CardRefundData } from "../../data/Data";

const cardrefundSlice = createSlice({
  name: "cardrefund",
  initialState: CardRefundData,
  reducers: {
    addCard: (state, action) => {
      console.log(action);
      state.push(action.payload);
    },
  },
});
export const { addCard } = cardrefundSlice.actions;
export default cardrefundSlice.reducer;
