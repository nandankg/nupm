import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      formType: "train-induction-detail-register",
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
      formType: "train-induction-detail-register",
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
      formType: "train-induction-detail-register",
      date: "2024-04-15",
      trainid: values.serviceid,
      trainset: values.trainset,
      mode: values.mode,
      time_mainline: values.maininlineinduction,
      time_schedule: values.scheduledeparture,
      finalkm:values.finalkm,
      initialkm:value.initialkm,
      time_actual: values.actualdeparture,
      time_depot: values.depotarrival,
      running: values.runningkms,
      nameoftc:values.nameoftc,
      empidoftc:values.empidoftc,
      finalstablinglocation:values.finalstablinglocation,
      remarks: values.remark,
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
      formType: "train-induction-detail-register",
      date: "2024-04-15",
      trainid: values.serviceid,
      finalkm:values.finalkm,
      initialkm:value.initialkm,
      trainset: values.trainset,
      mode: values.mode,
      time_mainline: values.maininlineinduction,
      time_schedule: values.scheduledeparture,
      time_actual: values.actualdeparture,
      time_depot: values.depotarrival,
      running: values.runningkms,
      remarks: values.remark,
      nameoftc:values.nameoftc,
      empidoftc:values.empidoftc,
      finalstablinglocation:values.finalstablinglocation,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const afcgategrillSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "train-induction-detail-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAfcgate: (state, action) => {
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
      console.log(action.payload);
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
      state.isSuccess = action.payload;
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

export const { addAfcgate } = afcgategrillSlice.actions;
export default afcgategrillSlice.reducer;
