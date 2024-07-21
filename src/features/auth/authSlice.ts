import { createSlice } from '@reduxjs/toolkit';
import { IUserData } from '../../components/auth/Auth';
import { getUserWithToken, loginUser } from './authAction';


const initialUser: IUserData = {
    id: 0,
    username: '',
    refreshToken: '',
    token: '',
}

interface IUserState {
    user: IUserData,
    isLoading: boolean,
    error: string,
}

const initialState: IUserState = {
    user: initialUser,
    isLoading: false,
    error: '',
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: { 
        logoutUser: (state) => {
            state.user = initialUser
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.user = initialUser
            state.error = action.payload as string
        })
        .addCase(getUserWithToken.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserWithToken.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload;
        })

    },
});

export default authSlice;
export const { logoutUser } = authSlice.actions