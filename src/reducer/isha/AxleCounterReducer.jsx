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
        formType: "axel-counter-maintenance",
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
        formType: "axel-counter-maintenance",
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
        halfYearly: values.halfYearly,
        counterno: values.counterno,
        station: values.station,
        date: values.date,
        maintenanceschedule: values.maintenanceschedule,
        checklist1: values.checklist1,
        checklist2: values.checklist2,
        checklist3: values.checklist3,
        checklist4: values.checklist4,
        checklist5: values.checklist5,
        checklist6: values.checklist6,
        checklist7: values.checklist7,
        checklist8: values.checklist8,
        checklist9: values.checklist9,
        checklist10: values.checklist10,
        checklist11: values.checklist11,
        checklist12: values.checklist12,
        checklist13: values.checklist13,
        checklist14: values.checklist14,
        checklist15: values.checklist15,
        checklist16: values.checklist16,
        checklist17: values.checklist17,
        blank1: values.blank1,
        blank2: values.blank2,
        blank3: values.blank3,
        blank4: values.blank4,
        blank5: values.blank5,
        blank6: values.blank6,
        blank7: values.blank7,
        blank8: values.blank8,
        blank9: values.blank9,
        blank10: values.blank10,
        blank11: values.blank11,
        blank12: values.blank12,
        blank13: values.blank13,
        blank14: values.blank14,
        blank15: values.blank15,
        blank16: values.blank16,
        blank17: values.blank17,
        remarks: values.remarks,
        employee_name: user.employee_name,
        designation: user.employeeid,
        empno: user.employeeid,
        csign: user.employeeid,
        formType: "axel-counter-maintenance",
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
        halfYearly: values.halfYearly,
        date: values.date,
        maintenanceschedule: values.maintenanceschedule,
        checklist1: values.checklist1,
        checklist2: values.checklist2,
        checklist3: values.checklist3,
        checklist4: values.checklist4,
        checklist5: values.checklist5,
        checklist6: values.checklist6,
        checklist7: values.checklist7,
        checklist8: values.checklist8,
        checklist9: values.checklist9,
        checklist10: values.checklist10,
        checklist11: values.checklist11,
        checklist12: values.checklist12,
        checklist13: values.checklist13,
        checklist14: values.checklist14,
        checklist15: values.checklist15,
        checklist16: values.checklist16,
        checklist17: values.checklist17,
        blank1: values.blank1,
        blank2: values.blank2,
        blank3: values.blank3,
        blank4: values.blank4,
        blank5: values.blank5,
        blank6: values.blank6,
        blank7: values.blank7,
        blank8: values.blank8,
        blank9: values.blank9,
        blank10: values.blank10,
        blank11: values.blank11,
        blank12: values.blank12,
        blank13: values.blank13,
        blank14: values.blank14,
        blank15: values.blank15,
        blank16: values.blank16,
        blank17: values.blank17,
        counterno: values.counterno,
        station: values.station,
        remarks: values.remarks,
        employee_name: user.employee_name,
        designation: user.employeeid,
        empno: user.employeeid,
        csign: user.employeeid,
        formType: "axel-counter-maintenance",
        employee_id: user.profileid,
        department: user.department,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});
const AlxeSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "axel-counter-maintenance",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAlxe: (state, action) => {
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
export const { addAlxe } = AlxeSlice.actions;
export default AlxeSlice.reducer;
