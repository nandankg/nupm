import { LabMaterialTransactionData } from "../../data/Data";
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
        formType: "lab-faulty-item-register",
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
        formType: "lab-faulty-item-register",
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
        dtrno: values.dtrno,
        failuredate: values.failuredate,
        description: values.description,
        quantity: values.quantity,
        efr_no: values.efr_no,
        receivedate: values.receivedate,
        name: values.name,
        desig: values.desig,
        sign: user.employeeid,
        gearidLocation: values.gearidLocation,
        signreceiver: values.signreceiver,
        issuedate: values.employeeid,
        issuedate: values.issuedate,
        mdescription: values.mdescription,
        quant: values.quant,
        efrNo: values.efrNo,
        invoiceDate: values.invoiceDate,
        invoiceno: values.invoiceno,
        name1: values.name1,
        desig1: values.desig1,
        sign1: user.employeeid,
        workLocation: values.workLocation,
        signissuer: values.signissuer,
        formType: "lab-faulty-item-register",
        employee_id: user.profileid,
        station: user.station,
        unit: user.department,
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
        dtrno: values.dtrno,
        failuredate: values.failuredate,
        description: values.description,
        quantity: values.quantity,
        efr_no: values.efr_no,
        receivedate: values.receivedate,
        name: values.name,
        desig: values.desig,
        sign: user.employeeid,
        gearidLocation: values.gearidLocation,
        signreceiver: values.signreceiver,
        issuedate: values.issuedate,
        mdescription: values.mdescription,
        quant: values.quant,
        efrnumber: values.efrnumber,
        invoiceDate: values.invoiceDate,
        invoiceno: values.invoiceno,
        name1: values.name1,
        desig1: values.desig1,
        sign1: user.employeeid,
        workLocation: values.workLocation,
        signissuer: values.signissuer,
        formType: "lab-faulty-item-register",
        employee_id: user.profileid,
        station: user.station,
        unit: user.department,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});

const LabMaterialSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "lab-faulty-item-register",
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
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

export default LabMaterialSlice.reducer;
