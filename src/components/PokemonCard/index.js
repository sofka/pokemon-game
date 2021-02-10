import cn from 'classnames';

import style from './style.module.css';

const PokemonCard = ({ name, img, id, type, values, isActive = true, isSelected = false, minimize, className, selectPokemon }) => {
    const handleOnClick = () => {
        selectPokemon && selectPokemon(id);
    }
    return (
        <div className={cn(className, style.pokemonCard, { [style.active]: isActive }, { [style.selected]: isSelected })} onClick={handleOnClick}>
            <div className={style.cardFront}>
                <div className={cn(style.wrap, style.front)}>
                    <div className={cn(style.pokemon, style[type])}>
                        <div className={style.values}>
                            <div className={cn(style.count, style.top)}>{values.top}</div>
                            <div className={cn(style.count, style.right)}>{values.right}</div>
                            <div className={cn(style.count, style.bottom)}>{values.bottom}</div>
                            <div className={cn(style.count, style.left)}>{values.left}</div>
                        </div>
                        <div className={style.imgContainer}>
                            <img src={img} alt={name} />
                        </div>
                        {!minimize && (<div className={style.info}>
                            <span className={style.number}>#{id}</span>
                            <h3 className={style.name}>
                                {name}
                            </h3>
                            <small className={style.type}>
                                Type: <span>{type}</span>
                            </small>
                        </div>)}
                    </div>
                </div>
            </div>

            <div className={style.cardBack}>
                <div className={cn(style.wrap, style.back)} />
            </div>

        </div>
    );
}
export default PokemonCard;