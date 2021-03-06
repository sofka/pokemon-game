import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        isRegister: false
    },
    reducers: {
        setEmailData: (state, action) => ({
            ...state,
            email: action.payload
        }),
        setPasswordData: (state, action) => ({
            ...state,
            password: action.payload
        }),
        setIsRegisterdData: (state, action) => ({
            ...state,
            isRegister: action.payload
        }),
        clearEmailAndPassword: (state, action) => ({
            ...state,
            password: '',
            email: '',
            isRegister: false
        })
    }
});
export const { setEmailData, setPasswordData, clearEmailAndPassword, setIsRegisterdData } = slice.actions;
export const emailData = state => state.user.email;
export const passwordData = state => state.user.password;
export const isRegisterData = state => state.user.isRegister;

export default slice.reducer;
