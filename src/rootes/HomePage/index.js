import { useHistory } from 'react-router';
import Header from '../../components/Header';
import Layout from '../../components/Layout';


import ImageBg2 from '../../images/bg2.jpg';
import ImageBg3 from '../../images/bg3.jpg';
import logoIMG from '../../images/pikachu.jpg';


const HomePage = ({ onChangePage }) => {

    const history = useHistory();
    const handleClickButton = () => {
        history.push('/game');
    }
    return (
        <>
            <Header title="Титл" descr="Дескрипшн" onClickButton={handleClickButton} />
            <Layout id={1} urlBg={ImageBg2} colorBg="blue">
                <p>Ласточка примчалась
                Из-за бела моря,
                Села и запела:
                "Как, февраль, не злися,
                Как ты, март, не хмурься,
                Будь хоть снег, хоть дождик -
                Все весною пахнет!"
                </p>
            </Layout>
            <Layout id={3} urlBg={ImageBg3} >
                <img src={logoIMG} alt="Logo" />
                <p>
                    Распустился ландыш в мае
                    В самый праздник — в первый день.
                    Май цветами провожая,
                    Распускается сирень.
                </p>
            </Layout>
        </>
    );
}
export default HomePage;