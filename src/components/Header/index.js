import headerStyle from './header.module.css'

const Header = ({ title, descr, onClickButton }) => {
    const handleClick = () => {
        console.log('####: <Header/>');
        onClickButton && onClickButton('game');
    }
    return (
        <header className={headerStyle.root}>
            <div className={headerStyle.forest}></div>
            <div className={headerStyle.container}>
                <h1>{title}</h1>
                <p>{descr}</p>
                <button onClick={handleClick}>
                    Start Game
                </button>
            </div>
        </header>
    )
}
export default Header;