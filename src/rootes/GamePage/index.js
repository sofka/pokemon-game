import { useState, useEffect } from 'react';
import PokemonCard from '../../components/PokemonCard';
import database from '../../service/firebase';
import style from './style.module.css';

const GamePage = () => {
    const [currentPokemons, setPokemons] = useState({});
    useEffect(() => {
        database.ref('pokemons').once('value', (snapshot) => {
            setPokemons(snapshot.val());
        });
    }, []);

    const revertPokemon = (id, objID) => {
        var pokemon = getPokemonByObjId(objID);
        pokemon.active = !pokemon.active;
        const updatedPokemon = { ...pokemon };
        // сохраняю в бд
        // после меняю setPokemons
        database.ref('pokemons/' + objID).set(updatedPokemon).then(() => {
            setPokemons(prevState => {
                return Object.entries(prevState).reduce((acc, item) => {
                    const pokemon = { ...item[1] };
                    if (pokemon.id === id) {
                        pokemon.active = !pokemon.active;
                    }
                    acc[item[0]] = pokemon;
                    return acc;
                }, {});
            });
        });

    }

    // Получить покемона из списка, как новый объект, по objId - ключ
    const getPokemonByObjId = (objId) => {
        return { ...currentPokemons[objId] };
    }

    const handleAddPokemon = () => {
        const arr = Object.entries(currentPokemons).map(item => item[1].id);
        const maxId = Math.max(...arr);
        const newId = maxId + 1;
        const newKey = database.ref().child('pokemons').push().key;
        const pokemon = createNewPokemon(newId);
        currentPokemons[newKey] = pokemon;

        database.ref('pokemons/' + newKey).set(pokemon).then(() => {
            setPokemons(prevState => {
                const newState = { ...prevState };
                newState[newKey] = pokemon;
                return newState;
            });
        });
    };

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

    return (
        <>
            <button type="button" className={style.button} onClick={handleAddPokemon}>
                Добавить покемона
            </button>
            <div className={style.flex}>

                {
                    Object.entries(currentPokemons).map(([key, { name, img, id, type, values, active }]) =>

                        <PokemonCard
                            key={key}
                            objID={key}
                            id={id}
                            name={name}
                            img={img}
                            type={type}
                            values={values}
                            isActive={active}
                            revertPokemon={revertPokemon}
                        />)
                }
            </div>
        </>
    );
}

export default GamePage;