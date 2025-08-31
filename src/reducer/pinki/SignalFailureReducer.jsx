import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SignalFailureData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "signal-failure",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "signal-failure",
      }),
    }
  ).then((res) => res.json());
});
// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/save",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "signal-failure",
        date: values.date,
        ftime: values.ftime,
        gearid: values.gearid,
        fdescrip: values.fdescrip,
        attended: values.attended,
        rectified: values.rectified,
        duration: values.duration,
        observ: values.observ,
        detention: values.detention,
        sign: values.sign,
        remark: values.remark,
        action: values.action,
        system: values.system, //Added
        station: values.station, //Added
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        formType: "signal-failure",
        date: values.date,
        ftime: values.ftime,
        gearid: values.gearid,
        fdescrip: values.fdescrip,
        attended: values.attended,
        rectified: values.rectified,
        duration: values.duration,
        observ: values.observ,
        detention: values.detention,
        sign: values.sign,
        remark: values.remark,
        action: values.action,
        system: values.system, //Added
        station: values.station, //Added
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});
const signalfailureSlice = createSlice({
  name: "signalfailure",
  initialState: {
    loading: false,
    data: [],
    slug: "signal-failure",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addSignal: (state, action) => {
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

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
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
      showToastOnce(action.payload.message, "error");
    });
  },
});

export const { addSignal } = signalfailureSlice.actions;
export default signalfailureSlice.reducer;
