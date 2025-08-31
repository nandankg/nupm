import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PmsheetData } from "../../data/Data";
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
      formType: "incident-accident",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "incident-accident",
    }),
  }).then((res) => res.json());
});

// Add new data to API
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
      formType: "incident-accident",
      date_incident: values.date_incident,
      incident: values.incident,
      time_incident: values.time_incident,
      place_of_incident: values.place_of_incident,
      tdetails: values.tdetails,
      name_of_scto: values.name_of_scto,
      empid_of_scto: values.empid_of_scto,
      reason: values.reason,
      brief: values.brief,
      repercussion: values.repercussion,
      responsible_depart: values.responsible_depart,
      sign_of_tc_acc: values.sign_of_tc_acc,
      unit:values.unit,
      Employ_id: user.profileid,
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
      formType: "incident-accident",
      date_incident: values.date_incident,
      incident: values.incident,
      time_incident: values.time_incident,
      place_of_incident: values.place_of_incident,
      tdetails: values.tdetails,
      name_of_scto: values.name_of_scto,
      empid_of_scto: values.empid_of_scto,
      reason: values.reason,
      brief: values.brief,
      repercussion: values.repercussion,
      responsible_depart: values.responsible_depart,
      sign_of_tc_acc: values.sign_of_tc_acc,
      Employ_id: user.profileid,
      unit:values.unit,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const PmsheetSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "incident-accident",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addPmsheet: (state, action) => {
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
      console.log(action.payload);
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
export default PmsheetSlice.reducer;
