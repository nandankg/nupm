import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        formType: "loan-register",
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
        formType: "loan-register",
        //date:"2024-06-07"
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
        date: values.date,
        quantity: values.quantity,
        empname_send: values.empname_send,
        empid_send: values.empid_send,
        receivefrom: values.receivefrom,
        empname_recieve: values.empname_recieve,
        empid_recieve: values.empid_recieve,
        itemdes: values.itemdes,
        make: values.make,
        model:values.model,
   serialNo:values.serialNo,
        returnable: values.returnable,
        sendto: values.sendto,
        sendby: values.sendby,
        signon: values.signon,
        receivedate: values.receivedate,
        receiveby: values.receiveby,
        remarks: values.remarks,
        formType: "loan-register",
        employee_id: user.profileid,
        department: user.department,
        unit: "signalling",
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
        date: values.date,
        quantity: values.quantity,
        empname_send: values.empname_send,
        empid_send: values.empid_send,
        receivefrom: values.receivefrom,
        empname_recieve: values.empname_recieve,
        empid_recieve: values.empid_recieve,
        itemdes: values.itemdes,
        make: values.make,
        model:values.model,
        serialNo:values.serialNo,
        returnable: values.returnable,
        sendto: values.sendto,
        sendby: values.sendby,
      signon: values.signon,
        receivedate: values.receivedate,
        receiveby: values.receiveby,
        remarks: values.remarks,
        formType: "loan-register",
        employee_id: user.profileid,
        department: user.department,
        unit: "signalling",
      }),
    }
  ).then((res) => res.json());
});

const loanSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "loan-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addloan: (state, action) => {
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

    builder.addCase(addData.pending, (state) => {
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

export const { addloan } = loanSlice.actions;
export default loanSlice.reducer;
