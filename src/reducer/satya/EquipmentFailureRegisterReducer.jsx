import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EquipmentFailureRegisterData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "equipment_failure_register",
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
      formType: "equipment_failure_register",
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
      formType: "equipment_failure_register",
      date: values.date,
      time: values.time,
      location: values.location,
      equipment_type: values.type,
      equipment_no: values.number,
      nature_details: values.detail,
      reported_to: values.reportedto,
      reported_time: values.reportedtime,
      action_date: values.date1,
      concern_remarks: values.remarkstaff,
      remarks: values.remarks,
      Employ_id: user.profileid,
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
      formType: "equipment_failure_register",
      update_id: values.id,
      date: values.date,
      time: values.time,
      location: values.location,
      equipment_type: values.type,
      equipment_no: values.number,
      nature_details: values.detail,
      reported_to: values.reportedto,
      reported_time: values.reportedtime,
      action_date: values.date1,
      concern_remarks: values.remarkstaff,
      remarks: values.remarks,

      concernEmploy_id: values.concernEmploy_id,
      Employ_id: user.profileid,
      Station_name: user.station,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const EquipmentFailureRegisterSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "equipment_failure_register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addEquipmentfailure: (state, action) => {
      console.log(action);
      state.data = action.payload;
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
    }); // edit data
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

export const { addEquipmentfailure } = EquipmentFailureRegisterSlice.actions;
export default EquipmentFailureRegisterSlice.reducer;
