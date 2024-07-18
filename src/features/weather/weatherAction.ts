import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const thunkName = createAsyncThunk(
  'weatherAction',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('url}');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
