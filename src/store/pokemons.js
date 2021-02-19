import { createSlice } from '@reduxjs/toolkit';
import FirebaseClass from '../service/firebase';

export const slice = createSlice({
    name: 'pokemons',
    initialState: {
        isLoading: false,
        data: {},
        selectedData: [],
        finishBoard: [],
        error: null
    },
    reducers: {
        fetchPokemons: state => ({
            ...state,
            isLoading: true,
        }),
        fetchPokemonsResolve: (state, action) => ({
            ...state,
            isLoading: false,
            data: action.payload
        }),
        fetchPokemonsReject: (state, action) => ({
            ...state,
            isLoading: false,
            data: {},
            error: action.payload
        }),
        setSelectedData: (state, action) => ({
            ...state,
            selectedData: action.payload
        }),
        setFinishBoard: (state, action) => ({
            ...state,
            finishBoard: action.payload
        }),
    }
});

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject, setSelectedData, setFinishBoard } = slice.actions;
export const selectPokemonsLoading = state => state.pokemons.isLoading;
export const selectPokemonsData = state => state.pokemons.data;
export const selectedPokemonsData = state => state.pokemons.selectedData;
export const finishBoard = state => state.pokemons.finishBoard;

export const getPokemonsAsync = () => async (dispatch) => {
    dispatch(fetchPokemons())
    const data = await FirebaseClass.getPokemonsOnce();
    dispatch(fetchPokemonsResolve(data));
}

export default slice.reducer;