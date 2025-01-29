import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state of the user slice
const initialState = {
  loading: false,
  token: null,
  userData: null,
  error: null,
};

// Async Thunks
export const handleGoogleCallback = createAsyncThunk(
  "user/handleGoogleCallback",
  async (queryParams, { rejectWithValue }) => {
    const { user, token } = queryParams;
    if (user && token) {
      return { user, token };
    } else {
      return rejectWithValue("Authentication failed");
    }
  }
);

export const userSignup = createAsyncThunk(
  "user/userSignup",
  async (userObj, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        userObj
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to register user"
      );
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async ({ username_email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        { username_email, password }
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Failed to login user"
      );
    }
  }
);

// Create a user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set userData
    setUserData(state, action) {
      state.loading = false;
      state.token = action.payload?.token || null;
      state.userData = action.payload?.userData || null;
      state.error = null;
    },
    updateUserData: (state, action) => {
      if (action.payload.userData) {
          Object.assign(state.userData, action.payload.userData);
      }
     },
     updateUserMedia: (state, action) => {
       if (state.userData) {
         state.userData.media = action.payload.media;
       }
     },
    //  Delete media
     deleteMedia: (state, action) => {
      if (state.userData?.media) {
        state.userData.media = state.userData.media.filter(
          (item) => item._id !== action.payload._id 
        );
      }
    },
    logout(state) {
      state.token = null;
      state.userData = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle Google Callback
      .addCase(handleGoogleCallback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGoogleCallback.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(handleGoogleCallback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Authentication failed";
      })
      // Handle User Signup
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to register user";
      })
      // Handle User Login
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.userData = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login user";
      });
  },
});

// Export actions and reducer
export const { setUserData, logout, updateUserData, updateUserMedia, deleteMedia } = userSlice.actions;
export default userSlice.reducer;
