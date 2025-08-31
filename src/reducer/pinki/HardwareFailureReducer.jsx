import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HardwareFailureData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "hardware-failure",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "hardware-failure",
      }),
    }
  ).then((res) => res.json());
});
// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/save",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "hardware-failure",
        date_of_replace: values.date_of_replace,
        idescrip: values.idescrip,
        gearid: values.gearid,
        old_sr_no: values.old_sr_no,
        new_sr_no: values.new_sr_no,
        reason_of_replace: values.reason_of_replace,
        date_of_sending: values.date_of_sending,
        date_of_receiving: values.date_of_receiving,
        date_of_restoration: values.date_of_restoration,
        remark: values.remark,
        emp_name: user.name, //updated
        emp_id: user.emp_id, //updated
        system: values.system, //updated
        denomination: values.denomination, //updated
        quantity: values.quantity, //updated
        station: values.station, //updated
        employee_id: user.profileid,
        station_name: user.station,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        formType: "hardware-failure",
        date_of_replace: values.date_of_replace,
        idescrip: values.idescrip,
        gearid: values.gearid,
        old_sr_no: values.old_sr_no,
        new_sr_no: values.new_sr_no,
        reason_of_replace: values.reason_of_replace,
        date_of_sending: values.date_of_sending,
        date_of_receiving: values.date_of_receiving,
        date_of_restoration: values.date_of_restoration,
        remark: values.remark,
        emp_name: user.name, //updated
        emp_id: user.emp_id, //updated
        system: values.system, //updated
        denomination: values.denomination, //updated
        quantity: values.quantity, //updated
        station: values.station, //updated
        employee_id: user.profileid,
        station_name: user.station,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});

const hardwarefailureSlice = createSlice({
  name: "hardwareFailure",
  initialState: {
    loading: false,
    data: [],
    slug: "hardware-failure",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addHardware: (state, action) => {
      console.log(action);
      state.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
      console.log(action.payload);
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      state.error = "";
      
      // Show success message
      if (action.payload.success || action.payload.message) {
        console.log('Hardware Failure Register saved successfully:', action.payload);
      }
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to save Hardware Failure Register';
      
      // Log error for debugging
      console.error('Hardware Failure Register submission failed:', action.error);
      
      // Show user-friendly error message
      const errorMessage = action.error.message || 'Network error. Please check your connection and try again.';
      state.error = errorMessage;
    });
    // edit data
    builder.addCase(editData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(editData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    // save data
    builder.addCase(saveData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.payload.message, "error");
    });
  },
});

export const { addHardware } = hardwarefailureSlice.actions;
export default hardwarefailureSlice.reducer;
