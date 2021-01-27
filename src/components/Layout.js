import layoutStyle from './layout.module.css';

const Layout = ({ id, title, descr, urlBg, colorBg }) => {
    const backgroundStyle = urlBg ?
        {
            background: `url(${urlBg})`,

        } : {
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
                    <div className={layoutStyle.desc, layoutStyle.full}>
                        <p>{descr}</p>
                    </div>
                </article>
            </div>
        </section>
    );
}
export default Layout;