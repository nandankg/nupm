
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { pASDrillData } from "../../data/Data";
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
      formType: "pidspas-drill",
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
      formType: "pidspas-drill",
      // date: "2024-04-15",
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
      formType: "pidspas-drill",
      date: values.date,
      station: values.station,
      name_of_sc: values.name_of_sc,
      empid: values.empid,
      msg_disp_recoreded: values.disrecorded,
      msg_disp_created: values.discreated,
      msg_annc_recoreded: values.annorecorded,
      msg_annc_manual: values.annomanual,
      pids_location: values.pilocation,
      pids_status: values.pistatus,
      pas_location: values.palocation,
      pas_status: values.pastatus,
      nameoftc: values.nameoftc,
      empidoftc: values.empidoftc,
      remark: values.remark,
      // employee_id: user.profileid,
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
      formType: "pidspas-drill",
      date: values.date,
      station: values.station,
      name_of_sc: values.name_of_sc,
      empid: values.empid,
      msg_disp_recoreded: values.disrecorded,
      msg_disp_created: values.discreated,
      msg_annc_recoreded: values.annorecorded,
      msg_annc_manual: values.annomanual,
      pids_location: values.pilocation,
      pids_status: values.pistatus,
      pas_location: values.palocation,
      pas_status: values.pastatus,
      nameoftc: values.nameoftc,
      empidoftc: values.empidoftc,
      remark: values.remark,
      employee_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const PASDrillReducerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pidspas-drill",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addPASDrill: (state, action) => {
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
      showToastOnce(action.payload.message, "error");
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

export const { addPASDrill } = PASDrillReducerSlice.actions;
export default PASDrillReducerSlice.reducer;
