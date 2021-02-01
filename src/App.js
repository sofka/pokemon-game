import { useState } from 'react';
import HomePage from './roots/Home';
import GamePage from './roots/Game';


const App = () => {
  const [page, setPage] = useState('app');
  const handleChangePage = (page) => {
    console.log('####: <Main/>');
    setPage(page);
  }
  switch (page) {
    case 'app':
      return <HomePage onChangePage={handleChangePage} />
    case 'game':
      return <GamePage />
    default:
      return <HomePage />
  }
}

export default App;