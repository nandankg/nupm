import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { handOverData } from "../../data/Data";
import { peetyrepairregisterData } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "petty-repair-register",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "petty-repair-register",
    }),
  }).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify({
      formType: "petty-repair-register",
      date: values.date,
      location: values.location,
      natureDetailsOfComplaint1: values.natureDetailsOfComplaint1,
      natureDetailsOfComplaint2: values.natureDetailsOfComplaint2,
      natureDetailsOfComplaint3: values.natureDetailsOfComplaint3,
      pertainsTo: values.pertainsTo,
      reportedTo: values.reportedTo,
      signOfSM: user.name,
      actiondate: values.actiondate,
      attendedBy: values.attendedBy,
      detailsOfWorkDone: values.detailsOfWorkDone,
      remarkOfSE: values.remarkOfSE,
      signOfSE: user.name,
      signOfAM: user.name,
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
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      formType: "petty-repair-register",
      date: values.date,
      location: values.location,
      natureDetailsOfComplaint1: values.natureDetailsOfComplaint1,
      natureDetailsOfComplaint2: values.natureDetailsOfComplaint2,
      natureDetailsOfComplaint3: values.natureDetailsOfComplaint3,
      pertainsTo: values.pertainsTo,
      reportedTo: values.reportedTo,
      signOfSM: user.name,
      actiondate: values.actiondate,
      attendedBy: values.attendedBy,
      detailsOfWorkDone: values.detailsOfWorkDone,
      remarkOfSE: values.remarkOfSE,
      signOfSE: user.name,
      signOfAM: user.name,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const peetyrepairregisterSlice = createSlice({
  name: "Data",
  initialState: {
    loading: false,
    data: [],
    slug: "petty-repair-register",
    error: "",
    isSuccess: "",
  },

  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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

export const { addpeetyrepairregister } = peetyrepairregisterSlice.actions;
export default peetyrepairregisterSlice.reducer;
