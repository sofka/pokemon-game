import { useRouteMatch, Route, Switch, Redirect } from 'react-router-dom';
import cn from 'classnames';

import HomePage from './rootes/HomePage';
import GamePage from './rootes/GamePage';
import AboutPage from './rootes/AboutPage';
import ContactPage from './rootes/ContactPage';
import NotFound from './rootes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';

import style from './style.module.css';
import { FireBaseContext } from './context/firebaseContext';
import Firebase from './service/firebase';


const App = () => {
  const match = useRouteMatch('/');
  return (
    <FireBaseContext.Provider value={new Firebase()}>
      <Switch>
        <Route path="/notFound" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!match.isExact} />
            <div className={cn(style.wrap, {
              [style.isHomePAge]: match.isExact
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <Route path="/game" component={GamePage} />
                <Route path="/about" component={AboutPage} />
                <Route path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to="/notFound" />
                )} />
              </Switch>

            </div>

            <Footer />
          </>
        </Route>
      </Switch>
    </FireBaseContext.Provider>
  );
}

export default App;