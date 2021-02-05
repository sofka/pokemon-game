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
    }, [currentPokemons]);

    const revertPokemon = (id, objID) => {
        // Длинный способ
        // const indexActivatePokemon = currentPokemons.map(el => el.id).indexOf(id);
        // const before = currentPokemons.slice(0, indexActivatePokemon);
        // const after = currentPokemons.slice(indexActivatePokemon + 1);
        // const oldPokemon = currentPokemons[indexActivatePokemon];
        // const newPokemon = { ...oldPokemon, active: !oldPokemon.active }
        // const changedPokemons = [...before, newPokemon, ...after];

        //как советует ментор
        // const changedPokemons = currentPokemons.map(item => item.id === id ? ({ ...item, active: !item.active }) : item);
        // setPokemons(changedPokemons);

        //Переделка для объекта
        setPokemons(prevState => {
            return Object.entries(prevState).reduce((acc, item) => {
                const pokemon = { ...item[1] };
                if (pokemon.id === id) {
                    pokemon.active = !pokemon.active;
                    database.ref('pokemons/' + objID).set(pokemon);
                };

                acc[item[0]] = pokemon;

                return acc;
            }, {});
        });
    }

    const handleAddPokemon = () => {
        const arr = Object.entries(currentPokemons).map(item => item[1].id);
        const maxId = Math.max(...arr);
        const newId = maxId + 1;
        const newKey = database.ref().child('pokemons').push().key;
        const pokemon = createNewPokemon(newId);
        currentPokemons[newKey] = pokemon;

        database.ref('pokemons/' + newKey).set(pokemon);
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