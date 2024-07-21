import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { thunkIcon, thunkWeather } from './weatherAction';
import { IWeatherData } from '../../components/weatherApi/types/weaterData';

interface IWeatherSlice {
  dataWeather: IWeatherData;
  isLoading: boolean;
  error: string;
  thunkIcon: string;
}

const initialWeather: IWeatherData = {
  weather: [{ id: 0, main: "", icon: "" }],
  main: { temp: 0 },
  name: ""
};

const initialState: IWeatherSlice = {
  dataWeather: initialWeather,
  isLoading: false,
  error: "",
  thunkIcon: ''
};

export const weatherSlice = createSlice({
  name: 'sliceWeather',
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.dataWeather = { ...initialWeather };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dataWeather = action.payload;
      })
      .addCase(thunkWeather.rejected, (state, action) => {
        state.isLoading = false;
        state.dataWeather = { ...initialWeather };
        state.error = action.payload as string;
      })
      .addCase(thunkIcon.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.thunkIcon = action.payload;
      });
  },
});

export default weatherSlice;
export const { resetWeather } = weatherSlice.actions;
