import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const thunkWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city: string, thunkAPI) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=beefc2057d8d39b3414b9a094f53cbcc&units=metric`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


