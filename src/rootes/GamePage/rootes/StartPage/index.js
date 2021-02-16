import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import PokemonCard from '../../../../components/PokemonCard';
import { FireBaseContext } from '../../../../context/firebaseContext';
import { PokemonContext } from '../../../../context/pokemonContext/pokemonContext';
import style from './style.module.css';

const StartPage = () => {
    const firebase = useContext(FireBaseContext);
    const pokemonContext = useContext(PokemonContext);
    const [pokemons, setPokemons] = useState({});

    useEffect(() => {
        firebase.getPokemonSoket((pokemons) => {
            setPokemons(pokemons);
        })
        return () => firebase.offPokemonSoket();
    }, []);
    const history = useHistory();
    const handleStartGame = () => {
        history.push('/game/board');
    }
    const selectPokemon = (key) => {
        const pokemon = { ...pokemons[key] };
        pokemonContext.handleSelectPokemon(key, pokemon);
        setPokemons(prevState => {
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    selected: !prevState[key].selected
                }
            }
        });
    };

    return (
        <>
            <button type="button" className={style.button}
                onClick={handleStartGame}
                disabled={Object.keys(pokemonContext.pokemons).length < 5}>
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
                                if (Object.keys(pokemonContext.pokemons).length < 5 || selected) { selectPokemon(key) }
                            }}
                            className={style.card}
                        />)
                }
            </div>
        </>
    );

}
export default StartPage;