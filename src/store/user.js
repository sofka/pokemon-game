import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
    name: 'user',
    initialState: {
        email: '',
        password: '',
        isRegister: false,
        isLoading: true,
        data: {}
    },
    reducers: {
        clearEmailAndPassword: (state, action) => ({
            ...state,
            password: '',
            email: '',
            isRegister: false
        }),
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

        fetchUser: () => ({
            isLoading: true
        }),
        updateUser: (state, action) => ({
            isLoading: false,
            data: action.payload
        }),
        removeUser: () => ({
            isLoading: false,
            data: {}
        })
    }
});
export const { setEmailData, setPasswordData, clearEmailAndPassword, setIsRegisterdData, fetchUser, updateUser, removeUser } = slice.actions;
export const emailData = state => state.user.email;
export const passwordData = state => state.user.password;
export const isRegisterData = state => state.user.isRegister;
export const selectUserLoading = state => state.user.isLoading;
export const selectUser = state => state.user.data;
export const selectLocalId = state => state.user.data?.localId;

export const getUserUpdateAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken');
    if (idToken) {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                idToken
            })
        };
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAYC1tuB8cKJ-yTF_4cw8hSZcU7LFBin5w', requestOptions).then(
            res => res.json());
        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken');
            dispatch(removeUser());
        } else {
            dispatch(updateUser(response.users[0]));
        }
    } else {
        dispatch(removeUser());
    }
}

export const getUserAsync = () => (dispatch) => {
    dispatch(fetchUser());
    dispatch(getUserUpdateAsync());
}
export default slice.reducer;
