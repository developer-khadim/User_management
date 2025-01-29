import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    loading: false,
    token: null,
    adminData: null,
    error: null
};

export const adminLogin = createAsyncThunk(
    'admin/adminLogin',
    async ({ cnic, password }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/admin/login`, { cnic, password });
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.error || "Failed to login Admin"
            );
        }
    }
);

const adminSlice = createSlice({
    name: 'admin',
    initialState, 
    reducers: {
        setAdminData(state, action) {
            state.loading = false;
            state.token = action.payload?.token || null;
            state.adminData = action.payload?.adminData || null; 
            state.error = null;
        },
        logout(state) {
            state.token = null;
            state.adminData = null;
            state.error = null;
            localStorage.removeItem("token");
          },
        updateAdminData: (state, action) => {
            if (action.payload.adminData) {
                Object.assign(state.adminData, action.payload.adminData);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Admin Login
            .addCase(adminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.adminData = action.payload.admin;  
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to login user";
            });
    }
});

export const { setAdminData, updateAdminData, logout } = adminSlice.actions;
export default adminSlice.reducer;
