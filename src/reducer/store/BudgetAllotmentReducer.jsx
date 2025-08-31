import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastOnce } from "../../component/toastUtils";
const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const budgetheadList = createAsyncThunk(
  "data/budgetheadList",
  async () => {
    return fetch(
      "https://tprosysit.com/upmrc/public/api/finance/budgethead/dropdown",
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
  }
);

export const newsubheadList = createAsyncThunk(
  "data/newsubheadList",
  async (values) => {
    return fetch(
      "https://tprosysit.com/upmrc/public/api/finance/getsubhead/dropdown/new",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({budgetHead: values.budgetHead
         
        }),
      }
    ).then((res) => res.json());
  }
);

export const subheadList = createAsyncThunk(
  "data/subheadList",
  async (values) => {
    return fetch(
      "https://tprosysit.com/upmrc/public/api/finance/getsubhead/dropdown",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({budgetHead: values.budgetHead,
          financialYear:values.financialYear,department:values.department
        }),
      }
    ).then((res) => res.json());
  }
);


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
        "budgetSubhead":data.budgetSubhead,
        "financialYear": data.financialYear,
        "department": data.department,
        "budgetHead_id": data.id,
        "budgetType": "Revised Budget Allotment",
        "amount": data.amount
    
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
        formType: "ats-maintenance-halfyearly",
        // date: "2024-06-13",
      }),
    }
  ).then((res) => res.json());
});
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/operation/finance/budget/edit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "1",
        budgetHead_id: id,
      }),
    }
  ).then((res) => res.json());
});
export const submitData = createAsyncThunk("data/submitData", async (id) => {
  return fetch(
    `https://tprosysit.com/upmrc/public/api/finance/budget/submit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "1",
        update_id: id,
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
        department: values.department,

        amount: values.amount,
        employee_id: user.profileid,
        
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
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetHead_id: values.budgetHead_id,
        budgetHead: values.budgetHead,
        budgetSubhead: values.budgetSubhead,
        financialYear: values.financialYear,
        department: values.department,
        budgetType: "Original Budget Allotment",
        amount: values.amount


           
      }),
    }
  ).then((res) => res.json());
});
const BudgetAllotmentSlice = createSlice({
  name: "budgetallotment",
  initialState: {
    loading: false,
    budgethead:[],
    
    subHead: [],
    data: [],
    slug: "expenditure-budget-register",
    error: "",
    isSuccess: "",
  },

  extraReducers: (builder) => {
    builder.addCase(budgetheadList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(budgetheadList.fulfilled, (state, action) => {
      state.loading = false;
      state.budgethead = action.payload.data;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(budgetheadList.rejected, (state, action) => {
      state.loading = false;
      state.budgethead = [];
      state.error = action.error.message;
      console.log(action.error.message);
    });
    builder.addCase(subheadList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(subheadList.fulfilled, (state, action) => {
      state.loading = false;
      state.subHead = action.payload.data;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(subheadList.rejected, (state, action) => {
      state.loading = false;
      state.subHead = [];
      state.error = action.error.message;
      console.log(action.error.message);
    });
//newsubheadList
  builder.addCase(newsubheadList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(newsubheadList.fulfilled, (state, action) => {
      state.loading = false;
      state.subHead = action.payload.data;
      state.error = "";
      console.log(action.payload);
    });
    builder.addCase(newsubheadList.rejected, (state, action) => {
      state.loading = false;
      state.subHead = [];
      state.error = action.error.message;
      console.log(action.error.message);
    });
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(addData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
    // edit data

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
      showToastOnce(action.error.message, "error");
    });
      builder.addCase(submitData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(submitData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = [];
      state.isSuccess = action.payload;
      console.log(action.payload);
      showToastOnce(action.payload.message);
    });

    builder.addCase(submitData.rejected, (state, action) => {
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
      
      showToastOnce(action.payload.message);
    });

    builder.addCase(editData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
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

export const { addAts } = BudgetAllotmentSlice.actions;
export default BudgetAllotmentSlice.reducer;
