import { useContext } from 'react';
import { PokemonContext } from '../../../../context/pokemonContext/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';

import s from './style.module.css';

const BoardPage = () => {
    const pokemonContext = useContext(PokemonContext);
    const selectedPokemons = pokemonContext.pokemons || {};
    return (
        <div className={s.root}>
            <div className={s.playerOne}>
                {
                    selectedPokemons && Object.entries(selectedPokemons).map(([key, { name, img, id, type, values }]) =>

                        <PokemonCard
                            key={key}
                            objID={key}
                            id={id}
                            name={name}
                            img={img}
                            type={type}
                            values={values}
                            className={s.card}
                            minimize={true}
                        />)
                }
            </div>
            <div className={s.board}>
                <div className={s.boardPlate}>1</div>
                <div className={s.boardPlate}>2</div>
                <div className={s.boardPlate}>3</div>
                <div className={s.boardPlate}>4</div>
                <div className={s.boardPlate}>5</div>
                <div className={s.boardPlate}>6</div>
                <div className={s.boardPlate}>7</div>
                <div className={s.boardPlate}>8</div>
                <div className={s.boardPlate}>9</div>
            </div>
        </div>
    );
};

export default BoardPage;