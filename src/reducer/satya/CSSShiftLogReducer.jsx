import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CSSShiftLogData } from "../../data/Data";

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
  sdc: "shift-log-book-sdc",

  telecom: "css-shift-logbook",

  signalling: "shift-log-book-signaling",
  operation: "shift-log-book-operation",
  mainline: "shift-log-book-mainline",
};
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`, {
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
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fecthData", async () => {
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
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/save`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // shift: values.shift,
      section: values.section,
      css_staff: values.css_staff,
      date: values.date,
      section_staff: values.section_staff,
      failures: values.failures,
      instruction_remarks: values.instructionremarks,

      shiftactivities: values.shift,
      chargehandedoverby: values.chargehandedoverby,
      sign1: values.sign1,
      chargetakenoverby: values.chargetakenoverby,
      sign2: false,
      formType:fType[dprt],
      employee_id: user.profileid,
      department: user.department,
      unit: "Telecom",
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(`https://tprosysit.com/upmrc/public/api/register/${deprt}/edit`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      update_id: values.id,
      shift: values.shift,
      section_staff: values.section,
      css_staff: values.css_staff,
      date: values.date,
      section: "",
      failures: values.failures,
      instruction_remarks: values.instructionremarks,

      shiftactivities: values.shiftactivities,
      chargehandedoverby: values.chargehandedoverby,
      sign1: values.sign1,
      chargetakenoverby: values.chargetakenoverby,
      sign2: false,
      formType:fType[dprt],
      employee_id: user.profileid,
      department: user.department,
      unit: "Telecom",
    }),
  }).then((res) => res.json());
});

const CSSShiftLogSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "css-shift-logbook",
    error: "",
    isSuccess: "",
  },
  reducer: {
    addCssshift: (state, action) => {
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

export const { addCssshift } = CSSShiftLogSlice.actions;
export default CSSShiftLogSlice.reducer;
