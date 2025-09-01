import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("userdata")) || {};
const token = localStorage.getItem("accessToken");

// Async thunk for saving data
export const saveData = createAsyncThunk(
  "pmLogbookHalfYearlyOtherMainline/saveData",
  async (formData) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/signalling/create",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "pm-logbook-half-yearly-other-mainline",
          ...formData,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

// Async thunk for fetching data
export const fetchData = createAsyncThunk(
  "pmLogbookHalfYearlyOtherMainline/fetchData",
  async () => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/signalling/viewData",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "pm-logbook-half-yearly-other-mainline",
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

// Async thunk for editing data
export const editData = createAsyncThunk(
  "pmLogbookHalfYearlyOtherMainline/editData",
  async (formData) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/signalling/update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "pm-logbook-half-yearly-other-mainline",
          ...formData,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

// Async thunk for updating data (alias for editData)
export const updateData = createAsyncThunk(
  "pmLogbookHalfYearlyOtherMainline/updateData",
  async (formData) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/signalling/update",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "pm-logbook-half-yearly-other-mainline",
          ...formData,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

// Async thunk for removing data
export const removeData = createAsyncThunk(
  "pmLogbookHalfYearlyOtherMainline/removeData",
  async (id) => {
    const response = await fetch(
      "https://tprosysit.com/upmrc/public/api/register/signalling/delete",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          formType: "pm-logbook-half-yearly-other-mainline",
          id: id,
          employee_id: user.profileid,
          unit: user.department,
          department: user.department,
        }),
      }
    );
    return response.json();
  }
);

const pmLogbookHalfYearlyOtherMainlineSlice = createSlice({
  name: "pmLogbookHalfYearlyOtherMainline",
  initialState: {
    data: [],
    loading: false,
    error: null,
    isSuccess: null,
  },
  reducers: {
    clearState: (state) => {
      state.data = [];
      state.loading = false;
      state.error = null;
      state.isSuccess = null;
    },
  },
  extraReducers: (builder) => {
    // Save data cases
    builder.addCase(saveData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch data cases
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data || [];
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Edit data cases
    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update data cases
    builder.addCase(updateData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(updateData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Remove data cases
    builder.addCase(removeData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });
    builder.addCase(removeData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { clearState } = pmLogbookHalfYearlyOtherMainlineSlice.actions;
export const addData = saveData; // Alias for compatibility
export default pmLogbookHalfYearlyOtherMainlineSlice.reducer;