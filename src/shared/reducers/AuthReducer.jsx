import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  currentUser: undefined,
  loading: false,
};
var options = {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    client_id: "(API KEY)",

    grant_type: "client_credentials",
  }),
};
// console.log(token);
export const deptformlist = createAsyncThunk(
  "auth/deptformlist",
  async (department) => {
    console.log(department);
    const token = localStorage.getItem("accessToken");
    return fetch("https://tprosysit.com/upmrc/public/api/master/form/list", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: department,
      }),
    }).then((res) => res.json());
  }
);
export const formlist = createAsyncThunk("auth/formlist", async () => {
  const token = localStorage.getItem("accessToken");
  return fetch("https://tprosysit.com/upmrc/public/api/master/form/list", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
});
export const deptlist = createAsyncThunk("auth/deptlist", async () => {
  const token = localStorage.getItem("accessToken");

  return fetch("https://tprosysit.com/upmrc/public/api/admin/department/list", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
});
export const emplist = createAsyncThunk("auth/emplist", async (department) => {
  const token = localStorage.getItem("accessToken");

  console.log(department);
  return fetch("https://tprosysit.com/upmrc/public/api/admin/getEmployee", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      department: department,
    }),
  }).then((res) => res.json());
});
export const adminlist = createAsyncThunk("auth/adminlist", async () => {
  const token = localStorage.getItem("accessToken");

  return fetch("https://tprosysit.com/upmrc/public/api/admin/getAllAdmin", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
});

export const liststation = createAsyncThunk("auth/liststation", async () => {
  const token = localStorage.getItem("accessToken");

  return fetch("https://tprosysit.com/upmrc/public/api/master/station/list", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
});
export const Addstation = createAsyncThunk(
  "auth/Addstation",
  async (stationData) => {
    console.log(stationData);
    const token = localStorage.getItem("accessToken");

    return fetch("https://tprosysit.com/upmrc/public/api/master/station/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        station_name: stationData?.station_name,
      }),
    }).then((res) => res.json());
  }
);
export const editStation = createAsyncThunk(
  "auth/editStation",
  async (stationData) => {
    console.log(stationData);
    const token = localStorage.getItem("accessToken");

    return fetch("https://tprosysit.com/upmrc/public/api/master/station/edit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        station_name: stationData?.station_name,
        update_id: "1",
        status: 0,
      }),
    }).then((res) => res.json());
  }
);
export const adduser = createAsyncThunk(
  "auth/adduser",
  async (userData, thunkAPI) => {
    const token = localStorage.getItem("accessToken");

    return fetch("https://tprosysit.com/upmrc/public/api/admin/user/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        empoyee_id: userData.empoyee_id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        designation: userData.designation,
        department: userData.department,
        station: userData.station,
        assigned_forms: userData.assigned_forms,
      }),
    }).then((res) => res.json());
  }
);
export const editUser = createAsyncThunk(
  "auth/edituser",
  async (userData, thunkAPI) => {
    const token = localStorage.getItem("accessToken");

    console.log(userData);
    return fetch("https://tprosysit.com/upmrc/public/api/admin/user/edit", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userData?.id,
        empoyee_id: userData.empoyee_id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        designation: userData.designation,
        department: userData.department,
        station: userData.station,
        assigned_forms: userData.assigned_forms,
      }),
    }).then((res) => res.json());
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    return fetch("https://tprosysit.com/upmrc/public/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginid: userData.loginid,
        password: userData.password,
      }),
    }).then((res) => res.json());
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",

  async (userData, thunkAPI) => {
    return fetch("https://tprosysit.com/upmrc/public/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loginid: userData.loginid,
        password: userData.password,
      }),
    }).then((res) => res.json());
  }
);
export const fetchProfile = createAsyncThunk(
  "auth/profile",

  async (userData, thunkAPI) => {
    const token = localStorage.getItem("accessToken");

    return fetch("https://tprosysit.com/upmrc/public/api/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }
);
export const ChangePassword = createAsyncThunk(
  "auth/profile/password/change",

  async (userData, thunkAPI) => {
    const token = localStorage.getItem("accessToken");

    return fetch(
      "https://tprosysit.com/upmrc/public/api/profile/password/change",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: userData.currentPassword,
          new_password: userData.newPassword,
          new_password_confirmation: userData.retypeNewPassword,
        }),
      }
    ).then((res) => res.json());
  }
);

export const logout = createAsyncThunk("auth/logout", async (state) => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("userdata");
  state.user = null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: [],
    data: [],
    dform: [],
    formlist: [],
    emplist: [],
    adminlist: [],
    liststation: [],

    deptlist: [],
    error: "",
    isSuccess: "",
  },
  extraReducers: (builder) => {
    // get form list
    builder.addCase(formlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(formlist.fulfilled, (state, action) => {
      state.loading = false;
      state.formlist = action.payload;
    });
    builder.addCase(formlist.rejected, (state, action) => {
      state.loading = false;
      state.formlist = [];
      state.error = action.error.message;
      toast.error(action.error.message); // Toast for success
    });
    // get dept list
    builder.addCase(deptlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deptlist.fulfilled, (state, action) => {
      state.loading = false;
      state.deptlist = action.payload;
    });
    builder.addCase(deptlist.rejected, (state, action) => {
      state.loading = false;
      state.deptlist = [];
      state.error = action.error.message;
      toast.error(action.error.message); // Toast for success
    });
    // add user
    builder.addCase(adduser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adduser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      toast.error(action.payload);
    });
    builder.addCase(adduser.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message); // Toast for success
    });
    // edit user
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      toast(action.payload.message); // Toast for success
    });
    builder.addCase(editUser.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message); // Toast for success
    });
    // emp list
    builder.addCase(emplist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(emplist.fulfilled, (state, action) => {
      state.loading = false;
      state.emplist = action.payload;
      console.log(action.payload);
    });
    builder.addCase(emplist.rejected, (state, action) => {
      state.loading = false;
      console.log(state);
      toast.error(action.error.message); // Toast for success
    });
    //  adminlist  /

    builder.addCase(adminlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(adminlist.fulfilled, (state, action) => {
      state.loading = false;
      state.adminlist = action.payload;
      console.log(action.payload);
    });
    builder.addCase(adminlist.rejected, (state, action) => {
      state.loading = false;
      console.log(state);
      toast.error(action.error.message); // Toast for success
    });

    // station list

    builder.addCase(liststation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(liststation.fulfilled, (state, action) => {
      state.loading = false;
      state.liststation = action.payload;
      console.log(action.payload);
    });
    builder.addCase(liststation.rejected, (state, action) => {
      state.loading = false;
      console.log(state);
      toast.error(action.error.message); // Toast for success
    });

    // Station Add

    builder.addCase(Addstation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(Addstation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(action.payload);
      toast(action.payload.message); // Toast for success
    });
    builder.addCase(Addstation.rejected, (state, action) => {
      state.loading = false;
      console.log(state);
      toast.error(action.error.message); // Toast for success
    });
    // station edit

    builder.addCase(editStation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editStation.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      console.log(action.payload);
      toast(action.payload.message); // Toast for success
    });
    builder.addCase(editStation.rejected, (state, action) => {
      state.loading = false;
      console.log(state);
      toast.error(action.error.message); // Toast for success
    });

    // login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      console.log(action.payload);
      toast(action.payload.message); // Toast for success
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.error.message); // Toast for success
    });

    // get current user
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.data = null;
      toast.error(action.error.message); // Toast for success
    });
    // get profile
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      toast.error(action.error.message); // Toast for success
    });
    // get profile
    builder.addCase(deptformlist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deptformlist.fulfilled, (state, action) => {
      state.loading = false;
      state.dform = action.payload.data;
      console.log(action.payload);
    });
    builder.addCase(deptformlist.rejected, (state, action) => {
      state.loading = false;
      state.dform = null;
      console.log(action.error);
      toast.error(action.error.message); // Toast for success
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.data = null;
    });
  },
});

export default authSlice.reducer;
