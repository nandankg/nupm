import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MonthlyCabinetRecordData } from "../../data/Data";
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
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "ats-cabinet-maintenance-monthly",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fecthData", async () => {
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
        formType: "ats-cabinet-maintenance-monthly",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/signalling/save",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
         update_id: values.id,
        cabinet: values.cabinet,
        date: values.date,
        station: values.station,
        year: values.year,
        month: values.month,
        done1: values.done1,
        done2: values.done2,
        done3: values.done3,
        done4: values.done4,
        done5: values.done5,
        done6: values.done6,
        done7: values.done7,
        remarks: values.remarks,
        name: user.name,
        designation: user.designation,
        countersign: user.employeeid,
        formType: "ats-cabinet-maintenance-monthly",
        employee_id: user.profileid,

        
        department: user.department,
        unit: user.department,
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
        cabinet: values.cabinet,
        date: values.date,
        station: values.station,
        year: values.year,
        month: values.month,
        done1: values.done1,
        done2: values.done2,
        done3: values.done3,
        done4: values.done4,
        done5: values.done5,
        done6: values.done6,
        done7: values.done7,
        remarks: values.remarks,
        name: user.name,
        designation: user.designation,
        countersign: user.employeeid,
        formType: "ats-cabinet-maintenance-monthly",
        employee_id: user.employeeid,
        department: user.department,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});

const cabinetrecordSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "ats-cabinet-maintenance-monthly",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addCabinet: (state, action) => {
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
      console.log(action.payload);
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
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { addCabinet } = cabinetrecordSlice.actions;
export default cabinetrecordSlice.reducer;
