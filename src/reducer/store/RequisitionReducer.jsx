import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DtrIssueStoreData } from "../../data/Data";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
let deprt = user?.department.toLowerCase();
console.log(deprt);
var dprt;
if (deprt === "afc-sdc") {
  dprt = "sdc";
  deprt = "sdc";
}
if (deprt === "afc-store") {
  dprt = "store";
  deprt = "afc_store";
}
if (deprt === "afc-mainline") {
  dprt = "mainline";
  deprt = "afc_mainline";
}
if (deprt === "signalling") {
  dprt = "signalling";
}
if (deprt === "operation") {
  dprt = "operation";
}
if (deprt === "telecom") {
  dprt = "telecom";
}
const fType = {
  telecom: "requisition-register",
  signalling: "requisition",
  sdc: "requisition-sdc",
  mainline: "requisition-mainline",
};
console.log(fType[deprt]);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: fType[dprt],
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/viewData`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: fType[dprt],
        //date:"2024-06-07"
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/save`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_no: values.book_no,
       
        date: values.date,
        from: values.from,
        issued_type: values.purpose,
        issued_name: values.issued_name,
        issued_designation: values.issued_designation,
        receiver_designation: values.receiver_designation,
        issued_empID: values.issued_empID,
        maintenace_installation: values.maintenace_installation,
        station: values.station,
        items: values.items,
        formType: fType[dprt],
        receiver_name:values.receiver_name,
        // store_type:values.store_type,
        employee_id: user.profileid,
        employee_name:user.profileid,
       
        receiver_empID:values.receiver_empID,
        department: values.department,
        approved_by:values.approved_by,
        approverDesignation:values.approverDesignation,
        approverEmpId:values.approverEmpId,
        section_incharge:values.section_incharge,
        section_incharge_Id:values.section_incharge_Id,
        section_incharge_designation:values.section_incharge_designation,

        unit: "AFC",
      }),
      
    }
  ).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        book_no: values.book_no,
        original_copyPageNo: values.pageNo,
        date: values.date,
        from: values.from,
        issued_type: values.purpose,
        issued_name: user.name,
        issued_designation: user.designation,
        receiver_designation: values.designation,
        issued_empID: user.profileid,
        maintenace_installation: values.maintenace_installation,
        station: values.station,
        items: values.items,
        formType: fType[dprt],
        receiver_name:values.name,
        store_type:values.store_type,
        employee_id: values.approverEmpId,
        approved_by: values.approved_by,
        receiver_empID:values.empId,
        department: values.dept,
        approved_by:values.approved_by,
        approverDesignation:values.approverDesignation,
        approverEmpId:values.approverEmpId,
        section_incharge:values.section_incharge,
        section_incharge_Id:values.section_incharge_Id,
        section_incharge_designation:values.section_incharge_designat,
        unit: "AFC",
      }),
    }
  ).then((res) => res.json());
});

const RequisitionSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addDtrsig: (state, action) => {
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

      console.log(action.payload);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error.message);
    });
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
      console.log(action.error.message);
    });

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
      console.log(action.error.message);
    });
  },
});

export const { addDtrsig } = RequisitionSlice.actions;
export default RequisitionSlice.reducer;
