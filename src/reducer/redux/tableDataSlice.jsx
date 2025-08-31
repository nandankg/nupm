import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastOnce } from "../../component/toastUtils";

// Utility function to safely retrieve data from localStorage
const getLocalStorageData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
};

const user = getLocalStorageData("userdata");
const token = localStorage.getItem("accessToken");

const departmentConfig = {
  "afc-sdc":{ apiKey: "register/sdc" },
  "afc-store": { apiKey: "register/afc_store" },
  "afc-mainline": { apiKey: "register/afc_mainline" },
  signalling: { apiKey: "register/signalling" },
  operation: { apiKey: "operation" },
  telecom: { apiKey: "register/telecom" },
};

// Get Current Department
const department = user?.department?.toLowerCase() || "";
const currentConfig = departmentConfig[department] || { apiKey: "" };

// Utility for API Requests
const apiRequest = async (url, method, body = {}) => {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return response.json();
};

// Async Thunks with Dynamic `formType`
export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ formType, additionalParams = {} }) => {
    console.log(formType);
    const url = `https://tprosysit.com/upmrc/public/api/${currentConfig.apiKey}/viewData`;
    return apiRequest(url, "POST", {
      formType,
      ...additionalParams,
    });
  }
);

export const addData = createAsyncThunk(
  "data/addData",
  async ({ formType, values }) => {
    console.log(formType);
    console.log(values);
    const url = `https://tprosysit.com/upmrc/public/api/${currentConfig.apiKey}/save`;
    return apiRequest(url, "POST", {
      ...values,
      formType,
      employee_name: user?.name,
      // employee_id:user?.employeeid,
      // employee_id: user?.profileid,
      // department: user?.department,
      // unit: user?.unit,
    });
  }
);

export const editData = createAsyncThunk(
  "data/editData",
  async ({ formType, values }) => {
    console.log(values)
    const url = `https://tprosysit.com/upmrc/public/api/${currentConfig.apiKey}/edit`;
    return apiRequest(url, "POST", {
      update_id: values.id,
      formType,
      ...values,
      // employee_id: user?.profileid,
      // department: user?.department,
      // unit: user?.unit,
    });
  }
);

export const saveData = createAsyncThunk(
  "data/saveData",
  async ({ formType, id }) => {
    const url = `https://tprosysit.com/upmrc/public/api/${currentConfig.apiKey}/edit`;
    return apiRequest(url, "POST", {
      formType,
      status: "1",
      update_id: id,
    });
  }
);

// Redux Slice
const tableDataSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],

    error: "",
    isSuccess: "",
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.data = [];
      state.error = "";
      state.isSuccess = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        showToastOnce(action.payload.message || "Data fetched successfully");
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.payload || "Failed to fetch data";
        showToastOnce(action.payload || "Failed to fetch data", "error");
      })

      // Add Data
      .addCase(addData.pending, (state) => {
        state.loading = true;
      })
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data added successfully");
      })
      .addCase(addData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add data";
        showToastOnce(action.payload || "Failed to add data", "error");
      })

      // Edit Data
      .addCase(editData.pending, (state) => {
        state.loading = true;
      })
      .addCase(editData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data updated successfully");
      })
      .addCase(editData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update data";
        showToastOnce(action.payload || "Failed to update data", "error");
      })

      // Save Data
      .addCase(saveData.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message || "Data saved successfully");
      })
      .addCase(saveData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to save data";
        showToastOnce(action.payload || "Failed to save data", "error");
      });
  },
});

export const { resetState } = tableDataSlice.actions;
export default tableDataSlice.reducer;
