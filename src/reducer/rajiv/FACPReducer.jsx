import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { showToastOnce } from "../../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
const token = localStorage.getItem("accessToken");
// Add new data to API
export const addData = createAsyncThunk("data/addData", async (values) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "night_facp_drill_regsiter",
      date: values.date,
      station: user.station,
      mcp_no: values.mcp_no,
      operated_location: values.operated_location,
      operated_alarm: values.operated_alarm,
      from_time: values.from_time,
      to_time: values.to_time,
      remarks: values.remarks,
      Employ_id: user.profileid,
      name_of_sc: values.name_of_sc,
      Station_name: user.station,
      department: user.department,
      empoyee_id_tc: values.empoyee_id_tc,
      name_of_tc: values.name_of_tc,
    }),
  }).then((res) => res.json());
});

// Fetch initial data from API
export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "night_facp_drill_regsiter",
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      update_id: values.id,
      formType: "night_facp_drill_regsiter",
      date: values.date,
      station: user.station,
      mcp_no: values.mcp_no,
      operated_location: values.operated_location,
      operated_alarm: values.operated_alarm,
      from_time: values.from_time,
      to_time: values.to_time,
      remarks: values.remarks,
      name_of_sc: values.name_of_sc,
      empoyee_id_tc: values.empoyee_id_tc,
      name_of_tc: values.name_of_tc,
      Station_name: user.station,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      formType: "night_facp_drill_regsiter",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});
const FACPRegisterSlice = createSlice({
  name: "FacpData",
  initialState: {
    loading: false,
    data: [],
    slug: "night_facp_drill_regsiter",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addFACPRegister: (state, action) => {
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
      showToastOnce(action.error.message, "error");
    });

    // Add data
    builder.addCase(addData.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(addData.fulfilled, (state, action) => {
      state.loading = false;
      state.isSuccess = action.payload;
      console.log(action.payload);
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

export const { addFACPRegister } = FACPRegisterSlice.actions;
export default FACPRegisterSlice.reducer;
