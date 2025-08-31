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
        formType: "grievance-register",
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
        formType: "grievance-register",
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
        formType: "grievance-register",
        date: formatDate(new Date().toString()),
        Test_date: values.Test_date,
        employee_no: values.employee_no,
        employee_name: user.employee_name,
        department: user.department,
        gd: values.gd,
        noe:values.noe,
        des:values.des,
        sign:values.sign,
        remark: values.remark,
        io: values.io,
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
        formType: "grievance-register",
        date: formatDate(new Date().toString()),
        Test_date: values.Test_date,
        employee_no: values.employee_no,
        employee_name: user.employee_name,
        department: user.department,
        gd: values.gd,
        noe:values.noe,
        des:values.des,
        remark: values.remark,
        io: values.io,
        sign:values.sign,
        employee_id: user.employeeid,
        department: user.employeeid,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});
const GrievanceReducerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "grievance-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addgrievance: (state, action) => {
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

export const { addgrievance } = GrievanceReducerSlice.actions;
export default GrievanceReducerSlice.reducer;
