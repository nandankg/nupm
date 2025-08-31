import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AtcExaminationData } from "../../data/Data";
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
        formType: "atc-examination",
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "atc-examination",
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        formType: "atc-examination",
        from1: values.from1,
        upto1: values.upto1,
        fitness1: values.fitness1,
        from2: values.from2,
        upto2: values.upto2,
        fitness2: values.fitness2,
        from3: values.from3,
        upto3: values.upto3,
        fitness3: values.fitness3,
        from4: values.from4,
        upto4: values.upto4,
        fitness4: values.fitness4,
        from5: values.from5,
        upto5: values.upto5,
        fitness5: values.fitness5,
        from6: values.from6,
        upto6: values.upto6,
        fitness6: values.fitness6,
        from7: values.from7,
        upto7: values.upto7,
        fitness7: values.fitness7,
        from8: values.from8,
        upto8: values.upto8,
        fitness8: values.fitness8,
        from9: values.from9,
        upto9: values.upto9,
        fitness9: values.fitness9,
        from10: values.from10,
        upto10: values.upto10,
        fitness10: values.fitness10,
        from11: values.from11,
        upto11: values.upto11,
        fitness11: values.fitness11,
        from12: values.from12,
        upto12: values.upto12,
        fitness12: values.fitness12,

        from13: values.from13,
        upto13: values.upto13,
        fitness13: values.fitness13,
        from14: values.from14,
        upto14: values.upto14,
        fitness14: values.fitness14,
        from15: values.from15,
        upto15: values.upto15,
        fitness15: values.fitness15,
        from16: values.from16,
        upto16: values.upto16,
        fitness16: values.fitness16,
        from17: values.from17,
        upto17: values.upto17,
        fitness17: values.fitness17,
        from18: values.upto18,
        upto18: values.upto18,
        fitness18: values.fitness18,
        from19: values.from19,
        upto19: values.upto19,
        fitness19: values.fitness19,
        from20: values.from20,
        upto20: values.upto20,
        fitness20: values.fitness20,
        remark1: values.remark1 || "",
        remark2: values.remark2 || "",
        remark3: values.remark3 || "",
        remark4: values.remark4 || "",
        remark5: values.remark5 || "",
        remark6: values.remark6 || "",
        remark7: values.remark7 || "",
        remark8: values.remark8 || "",
        remark9: values.remark9 || "",
        remark10: values.remark10 || "",
        remark11: values.remark11 || "",
        remark12: values.remark12 || "",
        remark13: values.remark13 || "",
        remark14: values.remark14 || "",
        remark15: values.remark15 || "",
        remark16: values.remark16 || "",
        remark17: values.remark17 || "",
        remark18: values.remark18 || "",
        remark19: values.remark19 || "",
        remark20: values.remark20 || "",
        // date: values.date,
        tpd: values.tpd,
        se: values.se,

        employee_id: user.profileid,
        department: user.department,
        unit: "AFC",
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
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        update_id: values.id,
        formType: "atc-examination",
        from1: values.from1,
        upto1: values.upto1,
        fitness1: values.fitness1,
        from2: values.from2,
        upto2: values.upto2,
        fitness2: values.fitness2,
        from3: values.from3,
        upto3: values.upto3,
        fitness3: values.fitness3,
        from4: values.from4,
        upto4: values.upto4,
        fitness4: values.fitness4,
        from5: values.from5,
        upto5: values.upto5,
        fitness5: values.fitness5,
        from6: values.from6,
        upto6: values.upto6,
        fitness6: values.fitness6,
        from7: values.from7,
        upto7: values.upto7,
        fitness7: values.fitness7,
        from8: values.from8,
        upto8: values.upto8,
        fitness8: values.fitness8,
        from9: values.from9,
        upto9: values.upto9,
        fitness9: values.fitness9,
        from10: values.from10,
        upto10: values.upto10,
        fitness10: values.fitness10,
        from11: values.from11,
        upto11: values.upto11,
        fitness11: values.fitness11,
        from12: values.from12,
        upto12: values.upto12,
        fitness12: values.fitness12,

        from13: values.from13,
        upto13: values.upto13,
        fitness13: values.fitness13,
        from14: values.from14,
        upto14: values.upto14,
        fitness14: values.fitness14,
        from15: values.from15,
        upto15: values.upto15,
        fitness15: values.fitness15,
        from16: values.from16,
        upto16: values.upto16,
        fitness16: values.fitness16,
        from17: values.from17,
        upto17: values.upto17,
        fitness17: values.fitness17,
        from18: values.upto18,
        upto18: values.upto18,
        fitness18: values.fitness18,
        from19: values.from19,
        upto19: values.upto19,
        fitness19: values.fitness19,
        from20: values.from20,
        upto20: values.upto20,
        fitness20: values.fitness20,
        remark1: values.remark1 || "",
        remark2: values.remark2 || "",
        remark3: values.remark3 || "",
        remark4: values.remark4 || "",
        remark5: values.remark5 || "",
        remark6: values.remark6 || "",
        remark7: values.remark7 || "",
        remark8: values.remark8 || "",
        remark9: values.remark9 || "",
        remark10: values.remark10 || "",
        remark11: values.remark11 || "",
        remark12: values.remark12 || "",
        remark13: values.remark13 || "",
        remark14: values.remark14 || "",
        remark15: values.remark15 || "",
        remark16: values.remark16 || "",
        remark17: values.remark17 || "",
        remark18: values.remark18 || "",
        remark19: values.remark19 || "",
        remark20: values.remark20 || "",
        // date: values.date,
        tpd: values.tpd,
        se: values.se,

        employee_id: user.profileid,
        department: user.department,
        unit: user.unit,
      }),
    }
  ).then((res) => res.json());
});
const atcexaminationSlice = createSlice({
  name: "atcexamination",
  initialState: {
    loading: false,
    data: [],
    slug: "atc-examination",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addAtc: (state, action) => {
      console.log(action);
      state.push(action.payload);
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
      console.log(action.error);
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
    // edit data
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

export const { addAtc } = atcexaminationSlice.actions;
export default atcexaminationSlice.reducer;
