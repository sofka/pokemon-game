import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import cn from 'classnames';
import style from './style.module.css';
import { useSelector } from 'react-redux';
import { finishBoard } from '../../../../store/pokemons';
import { selectLocalId } from '../../../../store/user';


const FinishPage = () => {
    const history = useHistory();
    const finishBoardRedux = useSelector(finishBoard);

    if (!finishBoardRedux || !finishBoardRedux.length) {

        history.replace('/game');
    }
    const player1Cards = finishBoardRedux.filter(item => item.card.possession === 'blue');
    const player2Cards = finishBoardRedux.filter(item => item.card.possession === 'red');
    const [selectedCard, setSelectedCard] = useState(null);
    const localId = useSelector(selectLocalId);
    const idToken = localStorage.getItem('idToken');
    const handleEndGame = async () => {
        if (selectedCard) {
            const requestOptions = {
                method: 'POST',
                body: JSON.stringify(selectedCard.card),
            }
            await fetch(`https://pokemon-game-4f07c-default-rtdb.firebaseio.com/${localId}/pokemons.json?auth=${idToken}`, requestOptions).then(() => {
                history.replace('/game');
            });
        }
        else{
            history.replace('/game');
        }
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