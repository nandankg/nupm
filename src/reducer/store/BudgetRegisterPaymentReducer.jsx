import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const budgetList = createAsyncThunk("data/budgetList", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/list",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }
  ).then((res) => res.json());
});
export const revisedBudget = createAsyncThunk("data/revisedBudget", async (data) => {
  console.log(data);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/operation/finance/budget/revised/add",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "budgetHead_id": data.id,
        "budgetType": "Revised Budget Allotment",
        "amount": data.amt
    
      }),
    }
  ).then((res) => res.json());
});
export const saveData = createAsyncThunk("data/saveData", async (data) => {
  console.log(data);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/registerBudget/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "1",
        update_id: data.id,
        amountLoaIssued: data.xloa,
      }),
    }
  ).then((res) => res.json());
});
export const getData = createAsyncThunk("data/getData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/registerBudget/list",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetType: "estimate-and-loa-budget-register",
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/registerBudget/list",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetType: "estimate-and-loa-budget-register",
      }),
    }
  ).then((res) => res.json());
});
export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/registerBudget",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetHead_id: values.budgetHead_id,
        budgetHead: values.budgetHead_id,
        budgetSubhead: values.budgetSubhead,
        department: values.department,
        WorkType: values.WorkType,
        amountVetted: values.amountVetted,
        amountLoaIssued: values.amountLoaIssued,
        partyName: values.partyName,
        loa_no: values.loa_no,
        vouncher_no: values.voucher_no,
        payment_loa_no:values.payment_loa_no,
        payment_amt: values.payment_amt,
        payment_date: values.payment_date,

        employee_id: user.profileid,
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/registerBudget/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetHead_id: values.budgetHead_id,
        budgetHead: values.budgetHead_id,
        budgetSubhead: values.budgetSubhead,
        department: values.department,
        WorkType: values.WorkType,
        amountVetted: values.amountVetted,
        amountLoaIssued: values.amountLoaIssued,
        partyName: values.partyName,
        loa_no: values.loa_no,
          payment_loa_no:values.payment_loa_no,
        vouncher_no: values.voucher_no,
        payment_amt: values.payment_amt,
        payment_date: values.payment_date,
        status: "0",
        employee_id: user.employeeid,
      }),
    }
  ).then((res) => res.json());
});
const BudgetRegisterPaymentSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    budgetlist: [],
    bdata:[],
    data: [],
    slug: "budget-payments-register",
    error: "",
    isSuccess: "",
  },

  extraReducers: (builder) => {
    builder.addCase(budgetList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(budgetList.fulfilled, (state, action) => {
      state.loading = false;
      state.budgetlist = action.payload;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(budgetList.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error.message);
    });
    //get data
builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.bdata = action.payload;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(getData.rejected, (state, action) => {
      state.loading = false;
      state.bdata = [];
      state.error = action.error.message;
    });
    // fetch data
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
      state.data = action.payload;
      state.isSuccess = true;
      console.log(action.payload);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      console.log(action.error.message);
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


    // revisedBudget 
    builder.addCase(revisedBudget.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(revisedBudget.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
    });

    builder.addCase(revisedBudget.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
    });
  },
});

export const { addEstimateLOA } = BudgetRegisterPaymentSlice.actions;
export default BudgetRegisterPaymentSlice.reducer;
