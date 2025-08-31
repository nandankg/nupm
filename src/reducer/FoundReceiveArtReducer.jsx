import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showToastOnce } from "../component/toastUtils";

const user = JSON.parse(localStorage.getItem("userdata"));
console.log(user);
const token = localStorage.getItem("accessToken");
console.log(token);

export const saveData = createAsyncThunk("data/saveData", async (id) => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "details-related-to-foundreceived-articles",
      status: "1",
      update_id: id,
    }),
  }).then((res) => res.json());
});

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  return fetch("https://tprosysit.com/upmrc/public/api/operation/viewData", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // change form type from api
      formType: "details-related-to-foundreceived-articles",
    }),
  }).then((res) => res.json());
});

export const addData = createAsyncThunk("data/addData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/save", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      //change fields
      formType: "details-related-to-foundreceived-articles",
      date: values.date,
      time: values.time,
      nophoa: values.Name,
      desciption_article: values.description,
      article_place: values.place,
      remarks: values.remark,
      receiver_supervisor_name: values.Rname,
      receiver_supervisor_sign: values.Rsign,
      sent_date: values.sdate,
      sent_time: values.stime,
      supervisor_sign: user.employeeid,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

export const editData = createAsyncThunk("data/editData", async (values) => {
  console.log(values);
  return fetch("https://tprosysit.com/upmrc/public/api/operation/edit", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      formType: "details-related-to-foundreceived-articles",
      update_id: values.id,
      date: values.date,
      time: values.time,
      nophoa: values.Name,
      desciption_article: values.description,
      article_place: values.place,
      remarks: values.remark,
      receiver_supervisor_name: values.Rname,
      receiver_supervisor_sign: values.Rsign,
      sent_date: values.sdate,
      sent_time: values.stime,
      supervisor_sign: user.employeeid,
      Employ_id: user.profileid,
      department: user.department,
    }),
  }).then((res) => res.json());
});

const FoundReceiveArticleSlice = createSlice({
  name: "data",
  initialState: {
    loading: false,
    data: [],
    //add slug here
    slug: "details-related-to-foundreceived-articles",
    error: "",
    isSuccess: "",
  },
  reducers: {
    addfundrcvartred: (state, action) => {
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
    });

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
      showToastOnce(action.error.message);
    });
  },
});

export const { addfundrcvartred } = FoundReceiveArticleSlice.actions;
export default FoundReceiveArticleSlice.reducer;
