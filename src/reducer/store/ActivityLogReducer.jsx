import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Helper to safely get user data from localStorage
const getStoredUserData = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem("userdata"));
    const token = localStorage.getItem("accessToken");
    return { user: storedUser || null, token: token || "" };
  } catch (err) {
    console.error("Error parsing localStorage data:", err);
    return { user: null, token: "" };
  }
};

// 🔹 Mapping department to form type slug
const FORM_TYPE_MAP = {
  telecom: "asset_register",
  signalling: "asset-register",
  operation: "daily-transaction-register-Issue",
  mainline: "gate-pass-book-mainline",
};

const { user, token } = getStoredUserData();
const department = user?.department?.toLowerCase() || "";
const slug = FORM_TYPE_MAP[department] || "";

// 🔹 Async thunk with error handling
export const fetchData = createAsyncThunk(
  "activity/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://tprosysit.com/upmrc/public/api/admin/activity/log",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formType: slug,
            // date: "2024-06-07", // Optional
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ActivityLogSlice = createSlice({
  name: "activity",
  initialState: {
    loading: false,
    data: [],
    slug,
    error: "",
    isSuccess: false,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = [];
      state.error = "";
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.isSuccess = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload || "Failed to fetch data";
        state.isSuccess = false;
      });
  },
});

export const { resetState } = ActivityLogSlice.actions;
export default ActivityLogSlice.reducer;
