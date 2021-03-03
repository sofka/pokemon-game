import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: ''
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
        clearEmailAndPassword: (state, action) => ({
            ...state,
            password: '',
            email: ''
        })
    }
});
export const { setEmailData, setPasswordData, clearEmailAndPassword } = slice.actions;
export const emailData = state => state.user.email;
export const passwordData = state => state.user.password;

export default slice.reducer;
