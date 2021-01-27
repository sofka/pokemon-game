import Header from './components/Header';
import Layout from './components/Layout';
import Footer from './components/Footer';

import ImageBg2 from './images/bg2.jpg';
import ImageBg3 from './images/bg3.jpg';

const App = () => {
  return (
    <>
      <Header title="Титл" descr="Дескрипшн"/>
      <Layout id={1} urlBg={ImageBg2} />
      <Layout id={2} colorBg="yellow" />
      <Layout id={3} urlBg={ImageBg3} />
      <Footer />
    </>
  );
}
export default App;