import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { FMTSData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
var deprt = user?.department.toLowerCase();
console.log(deprt);
var dprt;
if (deprt === "afc-sdc") {
  dprt = "sdc";
  deprt = "sdc";
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
  sdc: "fmts-sdc",

  telecom: "fmts",

  mainline: "fmts-book-mainline",
};
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
        //date:"2024-06-13",
      }),
    }
  ).then((res) => res.json());
});
// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/register/${deprt}/save`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // failure details
        book_foil_no: values.book_foil_no,
        station: values.station,
        eqpt_no: values.eqpt_no,
        failure_date: values.failure_date,
        failure_time: values.failure_time,
        item_name: values.item_name,
        item_sl_no: values.item_sl_no,
        detail_of_failure: values.detail_of_failure,
        remarks_deficiency: values.remarks_deficiency,
        attended_by: values.attended_by,
        received_by: values.received_by,
        name: values.name,
        sign: values.sign,
        company: values.company,

        sign_of_je_sse: values.sign_of_je_sse,
        detail_of_default: values.detail_of_default,

        section: "auto_",

        formType: fType[dprt],
        // Repair details
        receiveing_date: values.rdate,
        employee_id: user.profileid,
        employee_name: user.name,
        ho_by: values.hoby,
        physical_status: values.pstatus,
        operational_status: values.ostatus,
        rectification_details: values.dofrectification,
        replacement_details: values.rdetail,

        // if different

        is_newitem: values.isNewItem,
        is_repaireditem: values.isRepairedItem,
        old_fmts_no: values.oldOsisFmtsNo,
        item_details: values.itemDetails,
        remarks: values.remark,
        rectified_date: values.daterectified,
        rectified_by: values.rectified_by,
        ho: values.ho,
        ho_date: values.hodate,
        department: user.department,
        unit: user.department,
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(`https://tprosysit.com/upmrc/public/api/register/sdc/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      // failure details
      book_foil_no: values.book_foil_no,
      station: values.station,
      eqpt_no: values.eqpt_no,
      failure_date: values.failure_date,
      failure_time: values.failure_time,
      item_name: values.item_name,
      item_sl_no: values.item_sl_no,
      detail_of_failure: values.detail_of_failure,
      remarks_deficiency: values.remarks_deficiency,
      attended_by: values.attended_by,
      received_by: values.received_by,
      name: values.name,
      sign: values.sign,
      company: values.company,
      received_date: values.received_date,
      sign_of_je_sse: values.sign_of_je_sse,
      detail_of_default: values.detail_of_default,

      section: "auto_",

      formType: fType[dprt],
      // Repair details
      receiveing_date: values.rdate,
      employee_id: user.profileid,
      employee_name: user.name,
      ho_by: values.hoby,
      physical_status: values.pstatus,
      operational_status: values.ostatus,
      rectification_details: values.dofrectification,
      replacement_details: values.rdetail,

      // if different

      is_newitem: values.isNewItem,
      is_repaireditem: values.isRepairedItem,
      old_fmts_no: values.oldOsisFmtsNo,
      item_details: values.itemDetails,
      remarks: values.remark,
      rectified_date: values.daterectified,
      rectified_by: values.rectified_by,
      ho: values.ho,
      ho_date: values.hodate,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});

const fmtsbookslice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: fType[dprt],
    error: "",
    isSuccess: "",
  },
  reducers: {
    addFMTS: (state, action) => {
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
      console.log(action.payload);
      state.isSuccess = action.payload;
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      console.log(action.error);
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

export const { addFMTS } = fmtsbookslice.actions;
export default fmtsbookslice.reducer;
