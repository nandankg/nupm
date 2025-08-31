import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { StockMovementRegisterData } from "../../data/Data";
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
      formType: "stock-movement-register-cards",
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
      formType: "stock-movement-register-cards",
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
      formType: "stock-movement-register-cards",
      date: values.date,
      idofcscissued: values.idofcscissued,
      type: values.type,
      soldtick: values.soldtick,
      freshtick: values.freshtick,
      defectivetick: values.defectivetick,
      cscid: values.cscid,
      afcamt: values.afcamt,
      actual: values.actual,
      diff: values.diff,
      remark: values.remark,
      employee_id: user.profileid,
      Station_name: values.station,
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
      formType: "stock-movement-register-cards",
      date: values.date,
      idofcscissued: values.idofcscissued,
      type: values.type,
      soldtick: values.soldtick,
      freshtick: values.freshtick,
      defectivetick: values.defectivetick,
      cscid: values.cscid,
      afcamt: values.afcamt,
      actual: values.actual,
      diff: values.diff,
      remark: values.remark,
      employee_id: user.profileid,
      Station_name: values.station,
      department: user.department,
    }),
  }).then((res) => res.json());
});
const stockmovementregisterslice = createSlice({
  name: "stockmovementregister",
  initialState: {
    loading: false,
    data: [],
    slug: "stock-movement-register-cards",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addStockMovement: (state, action) => {
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

export const { addStockMovement } = stockmovementregisterslice.actions;
export default stockmovementregisterslice.reducer;
