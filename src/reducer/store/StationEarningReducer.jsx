import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/finance/stationearning/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/finance/stationearning/list", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "card-initialization-tender-sdc",
    }),
  }).then((res) => res.json());
});

// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  return fetch("https://tprosysit.com/upmrc/public/api/finance/stationearning/add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
        stationName: values.stationName,
        cashFareBox: values.cashFareBox,
        souvenirSale: values.souvenirSale,
        birthdayBooking:values.birthdayBooking,
        penalty: values.penalty,
        lostAndFound: values.lostAndFound,
        Shift: values.Shift,
        Project: values.Project,
        upiQrTicket: values.upiQrTicket,
        posBankCard: values.posBankCard,
        equipment: values.equipment,
        status: "0",
      employee_id: user.profileid,
      
    
    }),
  }).then((res) => res.json());
});
export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/finance/stationearning/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.update_id,
      stationName: values.stationName,
        cashFareBox: values.cashFareBox,
        souvenirSale: values.souvenirSale,
        birthdayBooking:values.birthdayBooking,
        penalty: values.penalty,
        lostAndFound: values.lostAndFound,
        Shift: values.Shift,
        Project: values.Project,
        upiQrTicket: values.upiQrTicket,
        posBankCard: values.posBankCard,
        equipment: values.equipment,
        status: "0",
      employee_id: user.profileid,
    }),
  }).then((res) => res.json());
});
const StationEarningSlice = createSlice({
  name: "StationEarning",
  initialState: {
    loading: false,
    data: [],
    slug: "station-earning-register",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addCardInitialization: (state, action) => {
      // Ensure action.payload is not an array
      if (!Array.isArray(action.payload)) {
        state.data.push(action.payload);
      }
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
      showToastOnce(action.payload.message);
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
      console.log(action.payload);
      showToastOnce(action.payload.message);
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
      showToastOnce(action.payload.message);
    });

    builder.addCase(saveData.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.error.message;
      showToastOnce(action.error.message, "error");
    });
  },
});

export const { addCardInitialization } = StationEarningSlice.actions;
export default StationEarningSlice.reducer;
