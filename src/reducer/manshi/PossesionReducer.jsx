import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PossessionRegisterData } from "../../data/Data";
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
    },
    body: JSON.stringify({
      formType: "possession-register",
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
      formType: "possession-register",
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
      formType: "possession-register",
      date: values.date,
      location: values.location,
      possessionGranted: values.possessionGranted,
      empno: values.empno,
      nameofepic: values.nameofepic,
      designation: values.designation,
      noofpersons: values.noofpersons,
      natureOfWork: values.natureOfWork,
      locationFrom: values.locationFrom,
      locationTo: values.locationTo,
      entryPoint: values.entryPoint,
      exitPoint: values.exitPoint,
      oheDead: values.oheDead,
      granted: values.granted,
      permittedUpto: values.permittedUpto,
      cancellation: values.cancellation,
      oheCharged: values.oheCharged,
      ptwIssued: values.ptwIssued,
      ptwCancellation: values.ptwCancellation,
      privateImposedOcc: values.privateImposedOcc,
      privateImposedStation: values.privateImposedStation,
      privateCancellationOcc: values.privateCancellationOcc,
      privateCancellationStation: values.privateCancellationStation,
      remark: values.remark,
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
      formType: "possession-register",
      date: values.date,
      location: values.location,
      possessionGranted: values.possessionGranted,
      empno: values.empno,
      nameofepic: values.nameofepic,
      designation: values.designation,
      noofpersons: values.noofpersons,
      natureOfWork: values.natureOfWork,
      locationFrom: values.locationFrom,
      locationTo: values.locationTo,
      entryPoint: values.entryPoint,
      exitPoint: values.exitPoint,
      oheDead: values.oheDead,
      granted: values.granted,
      permittedUpto: values.permittedUpto,
      cancellation: values.cancellation,
      oheCharged: values.oheCharged,
      ptwIssued: values.ptwIssued,
      ptwCancellation: values.ptwCancellation,
      privateImposedOcc: values.privateImposedOcc,
      privateImposedStation: values.privateImposedStation,
      privateCancellationOcc: values.privateCancellationOcc,
      privateCancellationStation: values.privateCancellationStation,
      remark: values.remark,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const PossessionRegisterSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "possession-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addpossessionres: (state, action) => {
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
export const { addpossessionres } = PossessionRegisterSlice.actions;
export default PossessionRegisterSlice.reducer;
