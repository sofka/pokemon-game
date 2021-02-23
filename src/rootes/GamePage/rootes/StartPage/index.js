import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { getPokemonsAsync, selectPokemonsData, setSelectedData } from '../../../../store/pokemons';
import style from './style.module.css';

const StartPage = () => {
    const pokemonsRedux = useSelector(selectPokemonsData);
    const dispatch = useDispatch();
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        dispatch(getPokemonsAsync());
    }, []);

    useEffect(() => {
        setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);


    const history = useHistory();
    const handleStartGame = () => {
        history.push('/game/board');
    }
    const selectPokemon = (key) => {
        setPokemons(prevState => {
            const updatedPokemons = {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected
                }
            };


            const selectedPokemons = Object.values(updatedPokemons).filter(item => item.selected === true);
            dispatch(setSelectedData(selectedPokemons));
            return updatedPokemons;

        });
    };

    return (
        <>
            <button type="button" className={style.button}
                onClick={handleStartGame}
                disabled={Object.values(pokemons).filter(item => item.selected === true).length < 5}>
                Начать игру
            </button>
            <div className={style.flex}>

                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values, selected }]) =>

                        <PokemonCard
                            key={key}
                            id={id}
                            name={name}
                            img={img}
                            type={type}
                            values={values}
                            isActive={true}
                            isSelected={selected}
                            selectPokemon={() => {
                                if (Object.values(pokemons).filter(item => item.selected === true).length < 5 || selected) { selectPokemon(key) }
                            }}
                            className={style.card}
                        />)
                }
            </div>
        </>
    );

}
export default StartPage;