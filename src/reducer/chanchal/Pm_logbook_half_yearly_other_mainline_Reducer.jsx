import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checklistData } from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-half-yearly-other-mainline",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/viewData",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType: "pm-logbook-half-yearly-other-mainline",
        // date: "2024-07-20",
      }),
    }
  ).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/save",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stn_name: values.stn_name,
        date: "2024-07-20",
        month: values.month,
        activities1: [
          {
            SC1: values.SC1,
            SC2: values.SC2,
            SC3: values.SC3,
            SC4: values.SC4,
            SC5: values.SC5,
            SC6: values.SC6,
            remark: values.remark,
            action: values.action,
            deficiency: values.deficiency,
          },
        ],
        activities1: values.activities1,
        activities2: [
          {
            avm1: values.avm1,
            avm2: values.avm2,
            avm3: values.avm3,
            avm4: values.avm4,
            avm5: values.avm5,
            avm6: values.avm6,
            remarkavm: values.remarkavm,
            actionavm: values.actionavm,
            deficiencyavm: values.deficiencyavm,
          },
        ],
        activities2: values.activities2,
        activities3: [
          {
            swt1: values.swt1,
            swt2: values.swt2,
            swt3: values.swt3,
            swt4: values.swt4,
            swt5: values.swt5,
            swt6: values.swt6,
            remarkswt: values.remarkswt,
            actionswt: values.actionswt,
            deficiencyswt: values.deficiencyswt,
          },
        ],
        activities3: values.activities3,
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: values.staff1_sign,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: values.staff2_sign,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: values.staff3_sign,
        formType: "pm-logbook-half-yearly-other-mainline",
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC-Mainline",
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/register/afc_mainline/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        stn_name: values.stn_name,
        date: "2024-07-20",
        month: values.month,
        activities1: [
          {
            SC1: values.SC1,
            SC2: values.SC2,
            SC3: values.SC3,
            SC4: values.SC4,
            SC5: values.SC5,
            SC6: values.SC6,
            remark: values.remark,
            action: values.action,
            deficiency: values.deficiency,
          },
        ],
        activities1: values.activities1,
        activities2: [
          {
            avm1: values.avm1,
            avm2: values.avm2,
            avm3: values.avm3,
            avm4: values.avm4,
            avm5: values.avm5,
            avm6: values.avm6,
            remarkavm: values.remarkavm,
            actionavm: values.actionavm,
            deficiencyavm: values.deficiencyavm,
          },
        ],
        activities2: values.activities2,
        activities3: [
          {
            swt1: values.swt1,
            swt2: values.swt2,
            swt3: values.swt3,
            swt4: values.swt4,
            swt5: values.swt5,
            swt6: values.swt6,
            remarkswt: values.remarkswt,
            actionswt: values.actionswt,
            deficiencyswt: values.deficiencyswt,
          },
        ],
        activities3: values.activities3,
        staff1_name: values.staff1_name,
        staff1_desg: values.staff1_desg,
        staff1_sign: values.staff1_sign,
        staff2_name: values.staff2_name,
        staff2_desg: values.staff2_desg,
        staff2_sign: values.staff2_sign,
        staff3_name: values.staff3_name,
        staff3_desg: values.staff3_desg,
        staff3_sign: values.staff3_sign,
        formType: "pm-logbook-half-yearly-other-mainline",
        employee_id: user.profileid,
        department: user.department,
        unit: "AFC-Mainline",
      }),
    }
  ).then((res) => res.json());
});

const ChecklistReducerSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    slug: "pm-logbook-half-yearly-other-mainline",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addChecklistReducer: (state, action) => {
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
      showToastOnce(action.payload.message);
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { addChecklist } = ChecklistReducerSlice.actions;
export default ChecklistReducerSlice.reducer;
