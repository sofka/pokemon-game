import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard';
import PlayerBoard from './components/PlayerBoard';
import Result from './components/Result';

import s from './style.module.css';
import ArrowChoice from './components/ArrowChoice';
import { useDispatch, useSelector } from 'react-redux';
import { selectedPokemonsData, setFinishBoard } from '../../../../store/pokemons';

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;
  board.forEach((element) => {
    if (element.card.possession === 'red') {
      player2Count++;
    }
    if (element.card.possession === 'blue') {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
};
const randomInteger = (min, max) => {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
const randomSide = randomInteger(1, 2);


const BoardPage = () => {
  const pokemons = useSelector(selectedPokemonsData);
  const dispatch = useDispatch();

  const [board, setBoard] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return pokemons.map((item) => ({
      ...item,
      possession: 'blue',
    }));
  });
  const [player2, setPlayer2] = useState([]);
  const [choiceCard, setChoiceCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [side, setSide] = useState(0);
  const [stop, setStop] = useState(false);

  const [resultType, setResultType] = useState(null);
  const history = useHistory();

  if (Object.keys(pokemons).length === 0) {
    history.replace('/game');
  }
  useEffect(async () => {
    const boardResponse = await fetch(
      'https://reactmarathon-api.netlify.app/api/board'
    );
    const boardRequest = await boardResponse.json();
    setBoard(boardRequest.data);

    const player2Response = await fetch(
      'https://reactmarathon-api.netlify.app/api/create-player'
    );
    const player2Request = await player2Response.json();
    setPlayer2(() => {
      return player2Request.data.map((item) => ({
        ...item,
        possession: 'red',
      }));
    });
    setTimeout(() => {
      setSide(randomSide);
    }, 3000);

  }, []);

  const handleClickBoardPlate = async (position) => {
    if (choiceCard) {
      setStop(true);
      const params = {
        position,
        card: choiceCard,
        board,
      };
      const response = await fetch(
        'https://reactmarathon-api.netlify.app/api/players-turn',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        }
      );
      const request = await response.json();

      if (choiceCard.player === 1) {
        setPlayer1((prevState) =>
          prevState.filter((item) => item.id !== choiceCard.id)
        );
      }
      if (choiceCard.player === 2) {
        setPlayer2((prevState) =>
          prevState.filter((item) => item.id !== choiceCard.id)
        );
      }

      setBoard(request.data);
      setSteps((prevState) => {
        const count = prevState + 1;
        return count;
      });
      setSide(prevState => {
        if (prevState === 1) {
          return 2;
        }
        if (prevState === 2) {
          return 1;
        }
      });
    }
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);
      if (count1 > count2) {
        setResultType('win');
      } else if (count1 < count2) {
        setResultType('lose');
      } else {
        setResultType('draw');
      }
      // не знала как лучше придумать, чтобы результат увидеть
      setTimeout(() => {
        dispatch(setFinishBoard(board));
        history.replace('/game/finish');
      }, 5000);

    }
  }, [steps]);

  return (
    <div className={s.root}>
      <Result type={resultType} />
      <ArrowChoice side={side} stop={stop} />
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => {
            if (side === 1) {
              setChoiceCard(card)
            }
          }
          }
          disabled={side !== 1}
        />
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div
            key={item.position}
            className={s.boardPlate}
            onClick={() => !item.card && handleClickBoardPlate(item.position)}
          >
            {item.card && <PokemonCard {...item.card} isActive minimize />}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => {
            if (side === 2) {
              console.log(side);
              setChoiceCard(card)
            }
          }}
          disabled={side !== 2}
        />
      </div>
    </div>
  );
};

export default BoardPage;
