import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IFormValues } from '../../components/auth/Auth';

export const loginUser = createAsyncThunk(
    'authAction',
    async (data: IFormValues, thunkAPI) => {
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', data);
            localStorage.setItem("storage-token", response.data.token)
            return response.data;
        } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const getUserWithToken = createAsyncThunk(
    'loginToken',
    async (token: string, thunkAPI) => {
        try {
            const response = await axios.get('https://dummyjson.com/auth/me', {
                headers: {
                'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);

/* providing token in bearer */
fetch('https://dummyjson.com/auth/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer /* YOUR_TOKEN_HERE */', 
    }, 
  })
  .then(res => res.json())
  .then(console.log);