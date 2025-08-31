import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "smps_sys_mntc_register",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fecthData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/telecom/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "smps_sys_mntc_register",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: formatDate(new Date().toString()),
      month: values.month,
      station: values.station,
      smps: values.smps,
      st: values.st,
      et: values.et,
      o1: values.o1,
      o2: values.o2,
      o3: values.o3,
      o4: values.o4,
      o5: values.o5,
      o6: values.o6,
      o7: values.o7,
      o8: values.o8,
      o9: values.o9,
      o10: values.o10,
      o11: values.o11,
      o12: values.o12,
      o13: values.o13,
      o14: values.o14,
      o15: values.o15,
      o16: values.o16,
      o17: values.o17,
      o18: values.o18,
      o19: values.o19,
      o20: values.o20,
      o21: values.o21,
      o22: values.o22,
      o23: values.o23,
      o24: values.o24,
      i1: values.i1,
      i2: values.i2,
      i3: values.i3,
      i4: values.i4,
      i5: values.i5,
      i6: values.i6,
      i7: values.i7,
      i8: values.i8,
      i9: values.i9,
      i10: values.i10,
      i11: values.i11,
      i12: values.i12,
      i13: values.i13,
      i14: values.i14,
      i15: values.i15,
      i16: values.i16,
      i17: values.i17,
      i18: values.i18,
      i19: values.i19,
      i20: values.i20,
      i21: values.i21,
      i22: values.i22,
      i23: values.i23,
      i24: values.i24,
      a1: values.a1,
      a2: values.a2,
      a3: values.a3,
      a4: values.a4,
      a5: values.a5,
      a6: values.a6,
      a7: values.a7,
      a8: values.a8,
      a9: values.a9,
      a10: values.a10,
      a11: values.a11,
      a12: values.a12,
      a13: values.a13,
      a14: values.a14,
      a15: values.a15,
      a16: values.a16,
      a17: values.a17,
      a18: values.a18,
      a19: values.a19,
      a20: values.a20,
      a21: values.a21,
      a22: values.a22,
      a23: values.a23,
      a24: values.a24,
      F1: values.F1,
      F2: values.F2,
      F3: values.F3,
      F4: values.F4,
      F5: values.F5,
      F6: values.F6,
      a111: values.a11,
      a112: values.a112,
      a113: values.a113,
      a114: values.a114,
      a115: values.a115,
      a116: values.a116,
      sc: values.sc,
      acv: values.acv,
      uvc: values.uvc,
      lc: values.lc,
      rs1: values.rs1,
      rs2: values.rs2,
      ss1: values.ss1,
      ss2: values.ss2,
      ss3: values.ss3,
      ss4: values.ss4,
      b: values.b,
      l: values.l,
      c: values.c,
      ea: values.ea,
      remark: values.remark,
      sj: user.sj,
      em1: user.em1,
      em2: user.em2,
      formType: "smps_sys_mntc_register",
      employee_id: user.profileid,
      department: user.department,
      unit: "Telecom",
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/telecom/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      formType: "smps_sys_mntc_register",
      date: formatDate(new Date().toString()),
      month: values.month,
      station: values.station,
      smps: values.smps,
      st: values.st,
      et: values.et,
      o1: values.o1,
      o2: values.o2,
      o3: values.o3,
      o4: values.o4,
      o5: values.o5,
      o6: values.o6,
      o7: values.o7,
      o8: values.o8,
      o9: values.o9,
      o10: values.o10,
      o11: values.o11,
      o12: values.o12,
      o13: values.o13,
      o14: values.o14,
      o15: values.o15,
      o16: values.o16,
      o17: values.o17,
      o18: values.o18,
      o19: values.o19,
      o20: values.o20,
      o21: values.o21,
      o22: values.o22,
      o23: values.o23,
      o24: values.o24,
      i1: values.i1,
      i2: values.i2,
      i3: values.i3,
      i4: values.i4,
      i5: values.i5,
      i6: values.i6,
      i7: values.i7,
      i8: values.i8,
      i9: values.i9,
      i10: values.i10,
      i11: values.i11,
      i12: values.i12,
      i13: values.i13,
      i14: values.i14,
      i15: values.i15,
      i16: values.i16,
      i17: values.i17,
      i18: values.i18,
      i19: values.i19,
      i20: values.i20,
      i21: values.i21,
      i22: values.i22,
      i23: values.i23,
      i24: values.i24,
      a1: values.a1,
      a2: values.a2,
      a3: values.a3,
      a4: values.a4,
      a5: values.a5,
      a6: values.a6,
      a7: values.a7,
      a8: values.a8,
      a9: values.a9,
      a10: values.a10,
      a11: values.a11,
      a12: values.a12,
      a13: values.a13,
      a14: values.a14,
      a15: values.a15,
      a16: values.a16,
      a17: values.a17,
      a18: values.a18,
      a19: values.a19,
      a20: values.a20,
      a21: values.a21,
      a22: values.a22,
      a23: values.a23,
      a24: values.a24,
      F1: values.F1,
      F2: values.F2,
      F3: values.F3,
      F4: values.F4,
      F5: values.F5,
      F6: values.F6,
      a111: values.a11,
      a112: values.a112,
      a113: values.a113,
      a114: values.a114,
      a115: values.a115,
      a116: values.a116,
      sc: values.sc,
      acv: values.acv,
      uvc: values.uvc,
      lc: values.lc,
      rs1: values.rs1,
      rs2: values.rs2,
      ss1: values.ss1,
      ss2: values.ss2,
      ss3: values.ss3,
      ss4: values.ss4,
      b: values.b,
      l: values.l,
      c: values.c,
      ea: values.ea,
      remark: values.remark,
      sj: user.sj,
      em1: user.em1,
      em2: user.em2,

      employee_id: user.profileid,
      department: user.department,
      unit: "Telecom",
    }),
  }).then((res) => res.json());
});

const pmSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "smps_sys_mntc_register",
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
      console.log(action.payload);
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
      console.log(action.payload);
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
      console.log(action.payload);
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
      showToastOnce(action.payload.message); // toast for success
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce.error(action.error.message, "error");
    });
  },
});

export const { addPm } = pmSlice.actions;
export default pmSlice.reducer;
