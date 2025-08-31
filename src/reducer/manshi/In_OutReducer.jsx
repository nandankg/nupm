import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { In_OutData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "urc-and-os-entry-register-sdc",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/viewData", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "urc-and-os-entry-register-sdc",
    }),
  }).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      IncomingDate: values.IncomingDate,
      OsurcNumber: values.OsurcNumber,
      Recievedby: values.ReceivedBy,
      sign_date: values.sign_date,
      RecievedFrom: values.ReceivedFrom,
      formType: "urc-and-os-entry-register-sdc",
      employee_id: user.profileid,
      department: user.department,
      unit: "AFC-SDC",
      OutgoingDate: values.OutgoingDate,
      HandedOverTo: values.HandedOverTo,
      HandedOverBy: values.HandedOverBy,
      mailedby: values.mailedby,
      maileddate:values.maileddate,
  no_ofcases: values.no_ofcases,
  no_ofclearedcases: values.no_ofclearedcases
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      IncomingDate: values.IncomingDate,
      OsurcNumber: values.OsurcNumber,
      Recievedby: values.ReceivedBy,
      sign_date: values.sign_date,
      RecievedFrom: values.ReceivedFrom,
      formType: "urc-and-os-entry-register-sdc",
      employee_id: user.profileid,
      department: user.department,
      unit: "AFC-SDC",
      OutgoingDate: values.OutgoingDate,
      HandedOverTo: values.HandedOverTo,
      HandedOverBy: values.HandedOverBy,
      mailedby: values.mailedby,
      maileddate:values.maileddate,
  no_ofcases: values.no_ofcases,
  no_ofclearedcases: values.no_ofclearedcases
    }),
  }).then((res) => res.json());
});
const In_OutSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "urc-and-os-entry-register-sdc",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addIn_Out: (state, action) => {
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
export const { addIn_Out } = In_OutSlice.actions;
export default In_OutSlice.reducer;
