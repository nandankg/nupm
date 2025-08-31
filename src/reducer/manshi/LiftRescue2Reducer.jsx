import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Lift2Data } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "night_lift_rescue_drill2_register",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "night_lift_rescue_drill2_register",
    }),
  }).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "night_lift_rescue_drill2_register",
      date: values.date,
      station: user.station,
      lift_no: "1klklpkm jnjl23",
      mess_display_recorded: values.DisRecorded,
      mess_display_created: values.DisCreated,
      mess_anounce_recorded: values.AnnRecorded,
      mess_anounce_manual: values.AnnManual,
      pids_location: values.PIDSloc,
      pids_status: values.PIDSstatus,
      pas_location: values.PASloc,
      pas_status: values.PASstatus,
      remarks: values.remark,
      employee_id: user.profileid,
      name_of_sc: user.name,
      Station_name: user.station,
      department: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      formType: "night_lift_rescue_drill2_register",
      date: values.date,
      station: user.station,
      lift_no: "1klklpkm jnjl23",
      mess_display_recorded: values.DisRecorded,
      mess_display_created: values.DisCreated,
      mess_anounce_recorded: values.AnnRecorded,
      mess_anounce_manual: values.AnnManual,
      pids_location: values.PIDSloc,
      pids_status: values.PIDSstatus,
      pas_location: values.PASloc,
      pas_status: values.PASstatus,
      remarks: values.remark,
      Employ_id: user.employeeid,
      name_of_sc: user.name,
      Station_name: user.employeeid,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const Lift2Slice = createSlice({
  name: "Lift2Rescue",
  initialState: {
    loading: false,
    data: [],
    slug: "night_lift_rescue_drill2_register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addLift2: (state, action) => {
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
      console.log(action.error.message);
    });

    // add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error.message);
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
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
    // edit data
    builder.addCase(saveData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(saveData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});
export const { addLift2 } = Lift2Slice.actions;
export default Lift2Slice.reducer;
