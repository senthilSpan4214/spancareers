import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import careerService from "./careerService";

const initialState = {
  data: [],
  isError: false,
  isSuccuss: false,
  isLoading: false,
  message: "",
};

export const addOpening = createAsyncThunk(
  "authCareers/addOpening",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await careerService.addOpening(data);
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

export const cancelOpening = createAsyncThunk(
  "authCareers/cancelOpening",
  async (data, thunkAPI) => {
    console.log(data);
    try {
      return await careerService.cancelOpening(data);
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

export const getOpening = createAsyncThunk(
  "authCareers/getOpening",
  async (data, thunkAPI) => {
    try {
      return await careerService.getOpening();
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

export const careerSlice = createSlice({
  name: "authCareers",
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
      .addCase(addOpening.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOpening.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccuss = true;
      })
      .addCase(addOpening.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      })
      .addCase(cancelOpening.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelOpening.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccuss = true;
      })
      .addCase(cancelOpening.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOpening.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOpening.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccuss = true;
        state.data = action.payload;
      })
      .addCase(getOpening.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.data = null;
      });
  },
});
export const { reset } = careerSlice.actions;
export default careerSlice.reducer;


