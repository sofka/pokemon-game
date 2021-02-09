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
    }, []);
    const history = useHistory();
    const handleStartGame = () => {
        history.push('/game/board');
    }
    const selectPokemon = (id) => {

        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.selected = !pokemon.selected;
                    pokemonContext.handleSelectPokemon({ objId: [item[0]], object: pokemon });
                }
                acc[item[0]] = pokemon;
                return acc;
            }, {});
        });
    };


    const handleAddPokemon = () => {
        const arr = Object.entries(pokemons).map(item => item[1].id);
        const maxId = Math.max(...arr);
        const newId = maxId + 1;
        const newPokemon = createNewPokemon(newId);
        firebase.addPokemon(newPokemon);
    }
    const createNewPokemon = (id) => {
        const pokemon = {
            "abilities": ["keen-eye", "tangled-feet", "big-pecks"],
            "base_experience": 122,
            "height": 11,
            "id": id,
            "img": "https://cdn.ananasposter.ru/image/cache/catalog/poster/mult/95/2346-1000x830.jpg",
            "name": "pidgeotto",
            "stats": {
                "attack": 60,
                "defense": 55,
                "hp": 63,
                "special-attack": 50,
                "special-defense": 50,
                "speed": 71
            },
            "type": "flying",
            "values": {
                "bottom": id + 1,
                "left": id + 3,
                "right": id + 6,
                "top": "A"
            }
        };
        return pokemon;
    }
    // const revertPokemon = (id) => {

    //     setPokemons(prevState => {
    //         return Object.entries(prevState).reduce((acc, item) => {
    //             const pokemon = { ...item[1] };
    //             if (pokemon.id === id) {
    //                 pokemon.active = !pokemon.active;
    //             }
    //             acc[item[0]] = pokemon;

    //             firebase.postPokemon(item[0], pokemon);
    //             return acc;
    //         }, {});
    //     });

    // }

    return (
        <>
            <button type="button" className={style.button} onClick={handleAddPokemon}>
                Добавить покемона
            </button>
            <button type="button" className={style.button} onClick={handleStartGame}>
                Начать игру
            </button>
            <div className={style.flex}>

                {
                    Object.entries(pokemons).map(([key, { name, img, id, type, values, active, selected }]) =>

                        <PokemonCard
                            key={key}
                            objID={key}
                            id={id}
                            name={name}
                            img={img}
                            type={type}
                            values={values}
                            isActive={true}
                            isSelected={selected}
                            selectPokemon={selectPokemon}
                        // revertPokemon={revertPokemon}
                        />)
                }
            </div>
        </>
    );

}
export default StartPage;