import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
        body: JSON.stringify({budgetHead: values.budgetHead, financialYear:values.financialYear,department:values.department}),
      }
    ).then((res) => res.json());
  }
);



export const saveData = createAsyncThunk("data/saveData", async (data) => {
  console.log(data);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/estimateissued/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "1",
        Estimate_id: data.id,
        amountLoaIssued: data.xloa,
      }),
    }
  ).then((res) => res.json());
});
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/estimateissued/list",
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
    "https://tprosysit.com/upmrc/public/api/finance/estimateissued",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetHead_id: values.budgetHead_id,
        date: values.date,
        budgetHead: values.budgetHead,
        budgetSubhead: values.budgetSubhead,
        WorkType: values.WorkType,
        department: values.department,
        amountVetted: values.amountVetted,
        amountLoaIssued: values.amountLoaIssued,
        partyName: values.partyName,
        employee_id: user.profileid,
      }),
    }
  ).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch(
    "https://tprosysit.com/upmrc/public/api/finance/estimateissued/edit",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        update_id: values.id,
        budgetType: "estimate-and-loa-budget-register",
        date: values.date,
        budgetHead: values.budgetHead,
        budgetSubhead: values.budgetSubhead,
        WorkType: values.WorkType,
        amountVetted: values.amountVetted,
        amountLoaIssued: values.amountLoaIssued,
        partyName: values.partyName,
        employee_id: user.profileid,
      }),
    }
  ).then((res) => res.json());
});
const EstimateLOASlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    budgethead:[],
    
    subHead: [],
    data: [],
    slug: "estimate-and-loa-budget-register",
    lslug: "budget-payments-register",
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
  },
});

export const { addEstimateLOA } = EstimateLOASlice.actions;
export default EstimateLOASlice.reducer;
