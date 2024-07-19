import { createSlice } from '@reduxjs/toolkit';
import { thunkWeather } from './weatherAction';
import { IWeatherData } from '../../components/weatherApi/types/weaterData';

interface IWeatherSlice {
  dataWeather: IWeatherData
  isLoading: boolean
  error: string
}

const initialWeather: IWeatherData = {
    weather: [
      {
        id: 0,
        main: "",
        icon: "",
      },
    ],
    main: {
      temp: 0,
    },
    name: "",}


const initialState: IWeatherSlice = {
  dataWeather: initialWeather,
    isLoading: false,
    error: "",
  };

export const weatherSlice = createSlice({
  name: 'sliceWeather',
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.dataWeather = initialWeather
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkWeather.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkWeather.fulfilled, (state, action) => {
        state.isLoading = false
        state.dataWeather = action.payload;
      })
      .addCase(thunkWeather.rejected, (state, action) => {
        state.isLoading = false
        state.dataWeather = {
          weather: [
            {
              id: 0,
              main: "",
              icon: "",
            },
          ],
          main: {
            temp: 0,
          },
          name: "",
        }
        state.error = action.payload as string
      })  },
});

export default weatherSlice;
export const { resetWeather } = weatherSlice.actions