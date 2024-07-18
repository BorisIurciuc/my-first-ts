import { createSlice } from '@reduxjs/toolkit';

const initialState: TypeForState = {
  values: [],
  isLoading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: 'sliceName',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkName.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload;
      })
      .addCase(thunkName.rejected, (state, action) => {
        state.isLoading = false
        state.values = []
        state.error = action.payload as string
      })
  },
});

export default weatherSlice;
export const { } = weatherSlice.actions