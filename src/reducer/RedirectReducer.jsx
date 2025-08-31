import { createSlice } from "@reduxjs/toolkit";

const redirectSlice = createSlice({
  name: "redirect",
  initialState: {
    selectedId: null,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelectedId } = redirectSlice.actions;
export default redirectSlice.reducer;
