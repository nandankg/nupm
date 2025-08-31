import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-half-yearly-tvm-mainline",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

//Fetch initial data from API
export const fetchData = createAsyncThunk("data/fecthData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-half-yearly-tvm-mainline",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/save",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stn_name: values.stn_name,
        date: values.date,
        month: values.month,
        activities: values.activities,
        staff1_name: user.employee_id,
        staff1_desg: user.employee_id,
        formType: "pm-logbook-half-yearly-tvm-mainline",
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC-Mainline",
      }),
    }
  ).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        stn_name: values.stn_name,
        date: values.date,
        month: values.month,
        activities: values.activities,
        staff1_name: user.employee_id,
        staff1_desg: user.employee_id,
        formType: "pm-logbook-half-yearly-tvm-mainline",
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC-Mainline",
      }),
    }
  ).then((res) => res.json());
});

const pmlbm9Slice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-half-yearly-tvm-mainline",
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

export const { addAfcpreventive } = pmlbm9Slice.actions;
export default pmlbm9Slice.reducer;
