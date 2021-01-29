import style from './style.module.css';
const HeaderBlock = ({ title, hideBackground = false, descr }) => {
    const styleRoot = hideBackground ? { backgroundImage: 'none' } : { backgroundColor: 'blue' }
    return (
        <div>
            <div>
                {
                title && <h1 className={style.header} style={styleRoot}>
                    {title}
                </h1>
                }
                {descr && <p>{descr}</p>}
            </div>
        </div>
    );
}
export default HeaderBlock;