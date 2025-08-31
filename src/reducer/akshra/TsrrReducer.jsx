import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TsrregData } from "../../data/Data";
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
      formType: "tsr-register",
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
      formType: "tsr-register",
      // date: "12/06/2024",
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
      formType: "tsr-register",
      date: values.date,
      time: values.time,
      detailstsr: values.detailstsr,
      authority: values.authority,
      reasonimposing: values.reasonimposing,
      cancellation_date: values.cancellationdate,
      cancellation_time: values.cancellationtime,
      autcancellation: values.autcancellation,
      detailafter: values.detailafter,
      nameoftc: values.nameoftc,
      empid: values.empid,
      nameofscc: values.nameofscc,
      empidofacc: values.empidofacc,
      Employ_id: user.employeeid,
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
      formType: "tsr-register",
      date: values.date,
      time: values.time,
      detailstsr: values.detailstsr,
      authority: values.authority,
      reasonimposing: values.reasonimposing,
      cancellation_date: values.cancellationdate,
      cancellation_time: values.cancellationtime,
      autcancellation: values.autcancellation,
      detailafter: values.detailafter,
      nameoftc: values.nameoftc,
      empid: values.empid,
      nameofscc: values.nameofscc,
      empidofacc: values.empidofacc,
      Employ_id: user.employeeid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const tsrrSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "tsr-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addTsrreg: (state, action) => {
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
      //console.log(action.payload)
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
      console.log(action.payload);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error.message);
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
      showToastOnce(action.payload.message);
    });
  },
});

export const { addTsrreg } = tsrrSlice.actions;
export default tsrrSlice.reducer;
