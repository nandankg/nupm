
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");

let deprt = user?.department?.toLowerCase();
let dprt;
if (deprt === "afc-store") {
  dprt = "store";
  deprt = "afc_store";
}
if (deprt === "afc-mainline") {
  dprt = "mainline";
  deprt = "afc_mainline";
}
if (deprt === "signalling") {
  dprt = "signalling";
}
if (deprt === "operation") {
  dprt = "operation";
}
if (deprt === "telecom") {
  dprt = "telecom";
}
const fType = {
  telecom: "assurance-register-telecom",
  signalling: "assurance-register",
  operation: "daily-transaction-register-Issue",
  mainline: "assurance-register-mainline",
  store: "assurance-register-store",
};

// Fetch all records (instructions and acknowledgments)
export const fetchAssuranceData = createAsyncThunk(
  "assurance/fetchAssuranceData",
  async () => {
    const response = await fetch(
      `https://tprosysit.com/upmrc/public/api/register/${deprt}/viewData`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: fType[dprt],
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }
    return data.data || [];
  }
);

// Add instruction or acknowledgment
export const addAssuranceData = createAsyncThunk(
  "assurance/addAssuranceData",
  async (values) => {
    const response = await fetch(
      `https://tprosysit.com/upmrc/public/api/register/${deprt}/save`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: fType[dprt],
          date: values.date_of_instructions||values.date_of_acknowledgement || null,
          instructions_details: values.instructions_details,
          acknowledged_name: values.acknowledged_name || null,
          acknowledged_designation: values.acknowledged_designation || null,
          acknowledged_emp_no: values.acknowledged_emp_no || null,
          remark: values.acknowledged_remark || null,
          employee_id: values.admin_id || user?.employeeid,
          acknowledged_sign: values.admin_name || user?.signature,
          department: user?.department,
          unit: "AFC",
        }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to add data");
    }
    return data.data || data;
  }
);

const AssuRegSlice = createSlice({
  name: "assurance",
  initialState: {
    loading: false,
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAssuReg: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Data
      .addCase(fetchAssuranceData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAssuranceData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = "";
        showToastOnce("Data fetched successfully");
      })
      .addCase(fetchAssuranceData.rejected, (state, action) => {
        state.loading = false;
        state.data = [];
        state.error = action.error.message || "Failed to fetch data";
        showToastOnce(state.error, "error");
      })
      // Add Data
      .addCase(addAssuranceData.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addAssuranceData.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.isSuccess = action.payload;
        showToastOnce("Data added successfully");
      })
      .addCase(addAssuranceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add data";
        showToastOnce(state.error, "error");
      });
  },
});

export const { addAssuReg } = AssuRegSlice.actions;
export default AssuRegSlice.reducer;
