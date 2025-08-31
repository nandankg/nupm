import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HandingTakingNotePLLData } from "../../data/Data";
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
        formType: "permanent-loan-register",
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
        formType: "permanent-loan-register",
        // date: "2024-06-13",
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
        formType: "permanent-loan-register",
        date: values.date,
        selected_department: "abc",
        itemDescription: values.item_des,
        partNo: values.part_no,
        serialNo: values.serial_no,
        locationFrom: values.location_from,
        locationTo: values.location_to,
        qty: values.qty,
        condition: values.def_ser_rep,
        authRefNo: values.auth_no_n_date,
        remarks: values.remark,
        sign_handed: values.sign_handed,
        name_handed: values.name_handed,
        designation_handed: values.designation_handed,
        emp_id_handed: values.emp_id_handed,
        date_handed: values.date_handed,
        sign_taken: values.sign_taken,
        name_taken: values.name_taken,
        designation_taken: values.designation_taken,
        empid_taken: values.empid_taken,
        date_taken: values.date_taken,
        employee_id: user.profileid,

        forwarded_by: values.forwarded_by, // Added 'Forwarded by' option
        counter_sign: values.counter_sign, // Added 'Counter sign' option
        unit: "Signalling",
        department: user.department,
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
        formType: "permanent-loan-register",
        date: values.date,
        selected_department: "abc",
        itemDescription: values.item_des,
        partNo: values.part_no,
        serialNo: values.serial_no,
        locationFrom: values.location_from,
        locationTo: values.location_to,
        qty: values.qty,
        condition: values.def_ser_rep,
        authRefNo: values.auth_no_n_date,
        remarks: values.remark,
        sign_handed: values.sign_handed,
        name_handed: values.name_handed,
        designation_handed: values.designation_handed,
        emp_id_handed: values.emp_id_handed,
        date_handed: values.date_handed,
        sign_taken: values.sign_taken,
        name_taken: values.name_taken,
        designation_taken: values.designation_taken,
        empid_taken: values.empid_taken,
        date_taken: values.date_taken,
        employee_id: user.profileid,
        forwarded_by: values.forwarded_by, // Added 'Forwarded by' option
        counter_sign: values.counter_sign, // Added 'Counter sign' option
        unit: "Signalling",
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});

const handingtakingnoteSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "permanent-loan-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addHanding: (state, action) => {
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

export const { addHanding } = handingtakingnoteSlice.actions;
export default handingtakingnoteSlice.reducer;
