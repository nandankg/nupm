import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formatDate } from "../../data/formatDate";
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
        formType: "fan-rack-cleaning",
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
        formType: "fan-rack-cleaning",
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
        formType: "fan-rack-cleaning",
        station: values.station,
        cabinet: values.cabinet,
        dateofmaintenance: formatDate(new Date().toString()),
        maintenanceschedule: values.maintenanceschedule,
        checklist1: values.checklist1,
        checklist2: values.checklist2,
        checklist3: values.checklist3,
        checklist4: values.checklist4,
        blank1: values.blank1,
        blank2: values.blank2,
        blank3: values.blank3,
        blank4: values.blank4,
        station: values.station,
        remarks: values.remarks,
        name: values.name,
        signature:values.signature,
        designation: user.designation,
        csign:values.csign,
        empno: values.empno,
        employee_id: user.profileid,
        department: user.department,
        unit: "Signalling",
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
        formType: "fan-rack-cleaning",
        station: values.station,
        cabinet: values.cabinet,
        dateofmaintenance: formatDate(new Date().toString()),
        maintenanceschedule: values.maintenanceschedule,
        checklist1: values.checklist1,
        checklist2: values.checklist2,
        checklist3: values.checklist3,
        checklist4: values.checklist4,
        blank1: values.blank1,
        blank2: values.blank2,
        blank3: values.blank3,
        blank4: values.blank4,
        station: values.station,
        remarks: values.remarks,
        name: values.name,
        signature:values.signature,
        designation: user.designation,
        csign:values.csign,
        empno: values.empno,
        employee_id: user.profileid,
        department: user.department,
        unit: "Signalling",
      }),
    }
  ).then((res) => res.json());
});
const FanSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "fan-rack-cleaning",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addfan: (state, action) => {
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

export const { addfan } = FanSlice.actions;
export default FanSlice.reducer;
