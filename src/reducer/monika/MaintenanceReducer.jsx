import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MaintenanceData } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "pm-station-half-yearly",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/telecom/viewData",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "pm-station-half-yearly",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      station: values.station,
      systems: values.systems,
      date: values.date,
      remarks: values.remarks,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      Msignature: values.Msignature,
      MdateTime: values.MdateTime,
      formType: "pm-station-half-yearly",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      station: values.station,
      systems: values.systems,
      date: values.date,
      remarks: values.remarks,
      notes: values.notes,
      SName: values.SName,
      SempId: values.SempId,
      Ssignature: values.Ssignature,
      SdateTime: values.SdateTime,
      MName: values.MName,
      MempId: values.MempId,
      Msignature: values.Msignature,
      MdateTime: values.MdateTime,
      formType: "pm-station-half-yearly",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
const MaintenanceSlice = createSlice({
  name: "MaintenanceData",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-station-half-yearly",
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      console.log(state);
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
      console.log(action);
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error);
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

export const { addMaintenance } = MaintenanceSlice.actions;
export default MaintenanceSlice.reducer;
