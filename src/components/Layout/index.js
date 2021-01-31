import layoutStyle from './layout.module.css';

const Layout = ({ id, title, urlBg, colorBg, children}) => {
    const backgroundStyle = {
        background: urlBg && `url(${urlBg})`,
        backgroundColor: colorBg
    };
    return (
        <section className={layoutStyle.root} id={id}
            style={backgroundStyle}>
            <div className={layoutStyle.wrapper}>
                <article>
                    <div className={layoutStyle.title}>
                        <h3>{title}</h3>
                        <span className={layoutStyle.separator}></span>
                    </div>
                    <div className={`${layoutStyle.desc} ${layoutStyle.full}`}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    );
}
export default Layout;