import { useState } from "react";
import PokemonCard from "../../../../../../components/PokemonCard";
import cn from "classnames";
import style from "./style.module.css";
import Arrow from './assets/arrow.png';

const PlayerBoard = ({ player, cards, onClickCard, disabled = false }) => {
  const [isSelected, setSelected] = useState(null);
  return (
    <div>
      <div className={cn(style.container, { [style.visible]: disabled })}>
        <img className={style.img} src={Arrow} alt="arrow" />
      </div>
      {cards.map((item) => (
        <div
          className={cn(style.cardBoard, {
            [style.selected]: isSelected === item.id,
          })}
          onClick={() => {
            if (!disabled) {
              setSelected(item.id);
              onClickCard &&
                onClickCard({
                  ...item,
                  player
                });
            }
          }
          }

        >
          <PokemonCard
            key={item.id}
            id={item.id}
            name={item.name}
            img={item.img}
            type={item.type}
            values={item.values}
            minimize
            isActive
          />
        </div>
      ))
      }
    </div>
  )

};

export default PlayerBoard;
