import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {} from "../../data/Data";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata") || "{}");
console.log(user);
const token = localStorage.getItem("accessToken") || "";
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        // formType: "expenditure-budget-register",
        slug: "expenditure-budget-register",
        status: "1",
        update_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/list",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // formType: "expenditure-budget-register",
        slug: "expenditure-budget-register",
        // date: "2024-06-13",
      }),
    }
  ).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/add",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetHead: values.budgetHead,
        budgetSubhead: values.subHead,
        financialYear: values.financialYear,
        // department: values.department,
        budgetType: values.budgetType,
        amount: values.amount,

        empname: user.empname,
        station: user.station,

        employee_id: user.profileid,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/edit",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        update_id: values.id,
        budgetHead: values.budgetHead,
        budgetSubhead: values.subHead,
        financialYear: values.financialYear,
        // department: values.department,
        budgetType: values.budgetType,
        amount: values.amount,

        empname: user.empname,
        station: user.station,

        employee_id: user.profileid,
        department: user.department,
      }),
    }
  ).then((res) => res.json());
});

const BudgetAllotmentSlice = createSlice({
  name: "budgetallotment",
  initialState: {
    loading: false,
    success: true,
    data: [
      {
        id: 60,
        name: "Finance Forms : Expenditure (Budget Register)",
        slug: "expenditure-budget-register",
        category: "Finance",
      },

      // slug: "expenditure-budget-register",
      // error: "",
      // isSuccess: "",
    ],
    statusCode: 200,
  },
  reducers: {
    addBudget: (state, action) => {
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
      state.data.push(action.payload); // Or however you want to handle the data
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

export const { addBudget } = BudgetAllotmentSlice.actions;
export default BudgetAllotmentSlice.reducer;
