import { useRouteMatch, Route, Switch } from 'react-router-dom';
import StartPage from './rootes/StartPage';
import BoardPage from './rootes/BoardPage';
import FinishPage from './rootes/FinishPage';

import { PokemonContext } from '../../context/pokemonContext/pokemonContext';
import { useState } from 'react';

const GamePage = () => {
    const match = useRouteMatch();
    const [selectedPokemons, setSelectedPokemons] = useState({});
    const handleSelectPokemon = (key, pokemon) => {
        setSelectedPokemons((prevState) => {
            if (prevState[key]) {
                const copyState = { ...prevState };
                delete copyState[key];
                return copyState;
            }
            const newState = { ...prevState, [key]: pokemon };
            return newState;
        })
    }
    return (
        <PokemonContext.Provider value={
            {
                pokemons: selectedPokemons,
                handleSelectPokemon
            }
        }>
            <Switch>
                <Route path={`${match.path}/`} exact component={StartPage} />
                <Route path={`${match.path}/board`} component={BoardPage} />
                <Route path={`${match.path}/finish`} component={FinishPage} />
            </Switch>
        </PokemonContext.Provider>
    );
};
export default GamePage;