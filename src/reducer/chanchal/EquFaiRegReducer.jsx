import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { equFaiRegData } from "../../data/Data";
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
      // date: "2024-06-13",
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
      equipment_no: values.no,
      nature_details: values.natdetfai,
      reported_to: values.reportedto,
      reported_time: values.reportedtime,
      signSM: values.signSM,
      action_time: values.rectifiedtime,
      action_date: values.redate,
      concern_remarks: values.remarkConstaff,
      signConStaff: values.signConStaff,
      signatureSM: values.signatureSM,
      remarks: values.remark,
      Employ_id: user.profileid,
      Station_name: "up",
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
      formType: "equipment_failure_register",
      date: values.date,
      time: values.time,
      location: values.location,
      equipment_type: values.type,
      equipment_no: values.no,
      nature_details: values.natdetfai,
      reported_to: values.reportedto,
      reported_time: values.reportedtime,
      signSM: values.signSM,
      action_time: values.rectifiedtime,
      action_date: values.redate,
      concern_remarks: values.remarkConstaff,
      signConStaff: values.signConStaff,
      signatureSM: values.signatureSM,
      remarks: values.remark,
      Employ_id: user.profileid,
      Station_name: "up",
      department: user.department,
    }),
  }).then((res) => res.json());
});

const EquFaiRegReducerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "equipment_failure_register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addEquFaiReg: (state, action) => {
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
      showToastOnce(action.payload.message);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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

// const EquFaiRegReducerSlice = createSlice({
//     name: "addEquFaiReg",
//     initialState: equFaiRegData,
//     reducers: {
//         addEquFaiReg: (state, action) => {
//             state.push(action.payload);
//         },
//     },
// });

export const { addEquFaiReg } = EquFaiRegReducerSlice.actions;
export default EquFaiRegReducerSlice.reducer;
