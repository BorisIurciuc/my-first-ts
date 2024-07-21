import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFormValues } from '../../components/auth/Auth';

export const loginUser = createAsyncThunk(
  'authAction',
  async (data: IFormValues, thunkAPI) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
