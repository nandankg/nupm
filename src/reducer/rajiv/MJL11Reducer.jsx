import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const API_BASE_URL = "https://tprosysit.com/upmrc/public/api/register/signalling";
const FORM_TYPE = "pm-point-maintenance-record";

const user = JSON.parse(localStorage.getItem("userdata")) || {};
const token = localStorage.getItem("accessToken");

// Reusable API request helper
const apiRequest = async (endpoint, payload) => {
  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  return response.json();
};

// Thunks
export const fetchData = createAsyncThunk("MJL11/fetchData", async () => {
  return await apiRequest("viewData", { formType: FORM_TYPE });
});

export const addData = createAsyncThunk("MJL11/addData", async (values) => {
  return await apiRequest("save", {
    ...values,
    signature: user.name,
    name: user.name,
    designation: user.designation,
    employee_id: user.profileid,
    empno: user.employeeid,
    unit: user.department,
    department: user.department,
    formType: FORM_TYPE,
  });
});

export const editData = createAsyncThunk("MJL11/editData", async (values) => {
  return await apiRequest("edit", {
    ...values,
    update_id: values.id,
    signature: user.name,
    name: user.name,
    designation: user.designation,
    empno: user.employeeid,
    employee_id: user.profileid,
    unit: user.department,
    department: user.department,
    formType: FORM_TYPE,
  });
});

export const saveData = createAsyncThunk("MJL11/saveData", async (id) => {
  return await apiRequest("edit", {
    update_id: id,
    formType: FORM_TYPE,
    status: "1",
  });
});

const initialState = {
  loading: false,
  data: [],
  slug: FORM_TYPE,
  error: "",
  isSuccess: "",
};

const MJL11Slice = createSlice({
  name: "MJL11",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setLoading = (state) => {
      state.loading = true;
      state.error = "";
    };
    const setError = (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    };

    // Fetch Data
    builder
      .addCase(fetchData.pending, setLoading)
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
      })
      .addCase(fetchData.rejected, setError);

    // Add Data
    builder
      .addCase(addData.pending, setLoading)
      .addCase(addData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        showToastOnce(action.payload.message);
      })
      .addCase(addData.rejected, setError);

    // Edit Data
    builder
      .addCase(editData.pending, setLoading)
      .addCase(editData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        state.data = [];
        showToastOnce(action.payload.message);
      })
      .addCase(editData.rejected, setError);

    // Save Data
    builder
      .addCase(saveData.pending, setLoading)
      .addCase(saveData.fulfilled, (state, action) => {
        state.loading = false;
        state.isSuccess = action.payload;
        state.data = [];
        showToastOnce(action.payload.message);
      })
      .addCase(saveData.rejected, setError);
  },
});

export default MJL11Slice.reducer;
