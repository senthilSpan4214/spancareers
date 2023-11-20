
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// let admin = typeof window !=='undefined'? JSON.parse(localStorage.getItem('admin')):null

const initialState = {
  admin:  [],
  isError: false,
  isSuccuss: false,
  isLoading: false,
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (admin, thunkAPI) => {
    console.log(admin);
    try {
      return await authService.register(admin);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (admin, thunkAPI) => {
  try {
    return await authService.login(admin);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
 try {
  await authService.logout()
 } catch (error) {
  const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
 }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {     
      state.isLoading = false;
      state.isError = false;
      state.isSuccuss = false;
      state.message = "";
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccuss = true;
        state.admin = action.payload ;
       
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccuss = true;
       state.admin = action.payload ;
 
        
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.admin = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.admin = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message;
        state.admin = null;
      });
      
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
