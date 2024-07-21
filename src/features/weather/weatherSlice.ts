import { createSlice } from '@reduxjs/toolkit';
import { thunkWeather } from './weatherAction';
import { IWeatherData } from '../../components/weatherApi/types/weaterData';

interface IWeatherSlice {
  dataWeather: IWeatherData;
  isLoading: boolean;
  error: string;
  iconUrl: string;
  savedCities: IWeatherData[];
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
  iconUrl: '',
  savedCities: []
};

export const weatherSlice = createSlice({
  name: 'sliceWeather',
  initialState,
  reducers: {
    resetWeather: (state) => {
      state.dataWeather = { ...initialWeather };
    },
    saveCityWeather: (state) => {
      state.savedCities.push(state.dataWeather)
    },
    deleteCityWeather: (state, action) => {
      state.savedCities = state.savedCities.filter(city => city.weather[0].id !== action.payload);
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
  },
});

export default weatherSlice;
export const { resetWeather, saveCityWeather, deleteCityWeather } = weatherSlice.actions;
