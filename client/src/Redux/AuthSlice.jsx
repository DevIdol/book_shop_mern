import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { url } from "./Api";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  profile: "",
  isAdmin: undefined,
  _id: "",
  registerStatus: "",
  registerMessage: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data: res } = await axios.post(`${url}/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return res.message;
    } catch (error) {
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data: token } = await axios.post(`${url}/auth/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const updateName = createAsyncThunk(
  "auth/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = axios.put(`${url}/users/${user._id}`, {
        _id: user._id,
        name: user.name,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          profile: user.profile,
          isAdmin: user.isAdmin,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        profile: "",
        isAdmin: undefined,
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return {
        ...state,
        registerStatus: "pending",
      };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      return {
        ...state,
        registerStatus: "success",
        registerMessage: action.payload,
      };
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });

    builder.addCase(loginUser.pending, (state, action) => {
      return {
        ...state,
        loginStatus: "pending",
      };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          profile: user.profile,
          isAdmin: user.isAdmin,
          _id: user._id,
          loginStatus: "success",
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
  },
});

export const { loadUser, logoutUser } = authSlice.actions;

export default authSlice.reducer;
