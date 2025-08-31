import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DailycheckRegisterData } from "../../data/Data";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "daily-checklist-register-sdc",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "daily-checklist-register-sdc",
    }),
  }).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      job1_morningstatus: values.job1_morningstatus,
      job1_eveningstatus: values.job1_eveningstatus,
      job2_morningstatus: values.job2_morningstatus,
      job2_eveningstatus: values.job2_eveningstatus,
      job3_morningstatus: values.job3_morningstatus,
      job3_eveningstatus: values.job3_eveningstatus,
      job4_morningstatus: values.job4_morningstatus,
      job4_eveningstatus: values.job4_eveningstatus,
      job5_morningstatus: values.job5_morningstatus,
      job5_eveningstatus: values.job5_eveningstatus,
      job6_morningstatus: values.job6_morningstatus,
      job6_eveningstatus: values.job6_eveningstatus,
      job7_morningstatus: values.job2_morningstatus,
      job7_eveningstatus: values.job7_eveningstatus,
      job8_morningstatus: values.job8_morningstatus,
      job8_eveningstatus: values.job8_eveningstatus,
      job9_morningstatus: values.job9_morningstatus,
      job9_eveningstatus: values.job9_eveningstatus,
      job10_morningstatus: values.job10_morningstatus,
      job10_eveningstatus: values.job10_eveningstatus,
      job11_morningstatus: values.job11_morningstatus,
      job11_eveningstatus: values.job11_eveningstatus,
      job12_morningstatus: values.job12_morningstatus,
      job12_eveningstatus: values.job12_eveningstatus,
      job13_eveningstatus: values.job13_eveningstatus,
      job13_morningstatus: values.job13_morningstatus,
      job14_eveningstatus: values.job14_eveningstatus,
      job14_morningstatus: values.job14_morningstatus,
      job15_eveningstatus: values.job15_eveningstatus,
      job15_morningstatus: values.job15_morningstatus,
      job16_eveningstatus: values.job16_eveningstatus,
      job16_morningstatus: values.job16_morningstatus,
      job17_eveningstatus: values.job17_eveningstatus,
      job17_morningstatus: values.job17_morningstatus,
      job18_eveningstatus: values.job18_eveningstatus,
      job18_morningstatus: values.job18_morningstatus,
      job19_eveningstatus: values.job19_eveningstatus,
      job19_morningstatus: values.job19_morningstatus,
      job20_eveningstatus: values.job20_eveningstatus,
      job20_morningstatus: values.job20_morningstatus,
      job21_eveningstatus: values.job21_eveningstatus,
      job21_morningstatus: values.job21_morningstatus,
      job22_morningstatus: values.job22_morningstatus,
      job22_eveningstatus: values.job22_eveningstatus,
      job23_morningstatus: values.job23_morningstatus,
      job23_eveningstatus: values.job23_eveningstatus,
      job24_morningstatus: values.job24_morningstatus,
      job24_eveningstatus: values.job24_eveningstatus,
      job25_morningstatus: values.job25_morningstatus,
      job25_eveningstatus: values.job25_eveningstatus,
      job26_morningstatus: values.job26_morningstatus,
      job26_eveningstatus: values.job26_eveningstatus,
      job27_morningstatus: values.job27_morningstatus,
      job27_eveningstatus: values.job27_eveningstatus,
      job28_morningstatus: values.job28_morningstatus,
      job28_eveningstatus: values.job28_eveningstatus,
      job29_morningstatus: values.job29_morningstatus,
      job29_eveningstatus: values.job29_eveningstatus,
      job30_morningstatus: values.job30_morningstatus,
      job30_eveningstatus: values.job30_eveningstatus,
      job31_morningstatus: values.job31_morningstatus,
      job31_eveningstatus: values.job31_eveningstatus,
      job32_morningstatus: values.job32_morningstatus,
      job32_eveningstatus: values.job32_eveningstatus,
      server_Temp_morning: values.server_Temp_morning,
      server_Temp_evening: values.server_Temp_evening,
      work_Temp_morning: values.work_Temp_morning,
      work_Temp_evening: values.work_Temp_evening,
      Sdc_Temp_morning: values.Sdc_Temp_morning,
      Sdc_Temp_evening: values.Sdc_Temp_evening,
      name_morning: values.name_morning,
      name_evening: values.name_evening,
      emp_no_morning: values.emp_no_morning,
      emp_no_evening: values.emp_no_evening,
      sign_morning: values.sign_morning,
      sign_evening: values.sign_evening,
      date: values.date,
      remarks:values.remark,
      morningtime: values.morningtime,
      eveningtime: values.eveningtime,
      formType: "daily-checklist-register-sdc",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/register/sdc/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      job1_morningstatus: values.job1_morningstatus,
      job1_eveningstatus: values.job1_eveningstatus,
      job2_morningstatus: values.job2_morningstatus,
      job2_eveningstatus: values.job2_eveningstatus,
      job3_morningstatus: values.job3_morningstatus,
      job3_eveningstatus: values.job3_eveningstatus,
      job4_morningstatus: values.job4_morningstatus,
      job4_eveningstatus: values.job4_eveningstatus,
      job5_morningstatus: values.job5_morningstatus,
      job5_eveningstatus: values.job5_eveningstatus,
      job6_morningstatus: values.job6_morningstatus,
      job6_eveningstatus: values.job6_eveningstatus,
      job7_morningstatus: values.job2_morningstatus,
      job7_eveningstatus: values.job7_eveningstatus,
      job8_morningstatus: values.job8_morningstatus,
      job8_eveningstatus: values.job8_eveningstatus,
      job9_morningstatus: values.job9_morningstatus,
      job9_eveningstatus: values.job9_eveningstatus,
      job10_morningstatus: values.job10_morningstatus,
      job10_eveningstatus: values.job10_eveningstatus,
      job11_morningstatus: values.job11_morningstatus,
      job11_eveningstatus: values.job11_eveningstatus,
      job12_morningstatus: values.job12_morningstatus,
      job12_eveningstatus: values.job12_eveningstatus,
      job13_eveningstatus: values.job13_eveningstatus,
      job13_morningstatus: values.job13_morningstatus,
      job14_eveningstatus: values.job14_eveningstatus,
      job14_morningstatus: values.job14_morningstatus,
      job15_eveningstatus: values.job15_eveningstatus,
      job15_morningstatus: values.job15_morningstatus,
      job16_eveningstatus: values.job16_eveningstatus,
      job16_morningstatus: values.job16_morningstatus,
      job17_eveningstatus: values.job17_eveningstatus,
      job17_morningstatus: values.job17_morningstatus,
      job18_eveningstatus: values.job18_eveningstatus,
      job18_morningstatus: values.job18_morningstatus,
      job19_eveningstatus: values.job19_eveningstatus,
      job19_morningstatus: values.job19_morningstatus,
      job20_eveningstatus: values.job20_eveningstatus,
      job20_morningstatus: values.job20_morningstatus,
      job21_eveningstatus: values.job21_eveningstatus,
      job21_morningstatus: values.job21_morningstatus,
      job22_morningstatus: values.job22_morningstatus,
      job22_eveningstatus: values.job22_eveningstatus,
      job23_morningstatus: values.job23_morningstatus,
      job23_eveningstatus: values.job23_eveningstatus,
      job24_morningstatus: values.job24_morningstatus,
      job24_eveningstatus: values.job24_eveningstatus,
      job25_morningstatus: values.job25_morningstatus,
      job25_eveningstatus: values.job25_eveningstatus,
      job26_morningstatus: values.job26_morningstatus,
      job26_eveningstatus: values.job26_eveningstatus,
      job27_morningstatus: values.job27_morningstatus,
      job27_eveningstatus: values.job27_eveningstatus,
      job28_morningstatus: values.job28_morningstatus,
      job28_eveningstatus: values.job28_eveningstatus,
      job29_morningstatus: values.job29_morningstatus,
      job29_eveningstatus: values.job29_eveningstatus,
      job30_morningstatus: values.job30_morningstatus,
      job30_eveningstatus: values.job30_eveningstatus,
      job31_morningstatus: values.job31_morningstatus,
      job31_eveningstatus: values.job31_eveningstatus,
      job32_morningstatus: values.job32_morningstatus,
      job32_eveningstatus: values.job32_eveningstatus,
      server_Temp_morning: values.server_Temp_morning,
      server_Temp_evening: values.server_Temp_evening,
      work_Temp_morning: values.work_Temp_morning,
      work_Temp_evening: values.work_Temp_evening,
      Sdc_Temp_morning: values.Sdc_Temp_morning,
      Sdc_Temp_evening: values.Sdc_Temp_evening,
      remarks:values.remark,
      name_morning: values.name_morning,
      name_evening: values.name_evening,
      emp_no_morning: values.emp_no_morning,
      emp_no_evening: values.emp_no_evening,
      sign_morning: values.sign_morning,
      sign_evening: values.sign_evening,
      date: values.date,
      
      morningtime: values.morningtime,
      eveningtime: values.eveningtime,
      formType: "daily-checklist-register-sdc",
      employee_id: user.profileid,
      department: user.department,
      unit: user.department,
    }),
  }).then((res) => res.json());
});

const DailycheckSlice = createSlice({
  name: "DailycheckRegisterData",
  initialState: {
    loading: false,
    data: [],
    slug: "daily-checklist-register-sdc",
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      console.log(state);
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
      console.log(action);
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
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
      showToastOnce(action.payload.message); // toaste for suceess
      console.log(action.payload);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
      showToastOnce(action.payload.message); // toaste for suceess
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

export const { addDailycheck } = DailycheckSlice.actions;
export default DailycheckSlice.reducer;
