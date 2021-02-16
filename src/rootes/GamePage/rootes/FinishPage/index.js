import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext/pokemonContext';
import PokemonCard from '../../../../components/PokemonCard';
import cn from 'classnames';
import style from './style.module.css';
import { FireBaseContext } from '../../../../context/firebaseContext';

const FinishPage = () => {
    const history = useHistory();
    const pokemonContext = useContext(PokemonContext);
    const { finishBoard } = pokemonContext;

    if (!finishBoard || !finishBoard.length) {

        history.replace('/game');
    }
    const player1Cards = finishBoard.filter(item => item.card.possession === 'blue');
    const player2Cards = finishBoard.filter(item => item.card.possession === 'red');
    const [selectedCard, setSelectedCard] = useState(null);
    const firebase = useContext(FireBaseContext);
    const handleEndGame = () => {
        if(selectedCard){
            firebase.addPokemon(selectedCard.card, true)
        }
        pokemonContext.clearPokemonContext();
        history.replace('/game');
    }

    return (
        <div>
            <h1>Это страница завершения</h1>
            <div className={style.row}>
                {
                    player1Cards.map((item) => (
                        item.card && <PokemonCard {...item.card} isActive className={style.card} />
                    ))
                }
            </div>
            <button type="button" className={style.button} onClick={handleEndGame}>
                End Game
            </button>
            <div className={style.row}>
                {
                    player2Cards.map((item) => (
                        item.card && <PokemonCard {...item.card} isActive className={cn(style.card, { [style.selected]: selectedCard && selectedCard.card.id === item.card.id })}
                            selectPokemon={() => {
                                if (player1Cards.length > player2Cards.length) {
                                    setSelectedCard(item);
                                }
                            }} />
                    ))
                }
            </div>
        </div>
    );
}
export default FinishPage;