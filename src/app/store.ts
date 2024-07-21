import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import weatherSlice from "../features/weather/weatherSlice"
import authSlice from "../features/auth/authSlice"


export const store = configureStore({
  reducer: {
    sliceWeather: weatherSlice.reducer,
    authSlice: authSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
