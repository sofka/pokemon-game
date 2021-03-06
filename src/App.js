import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import cn from 'classnames';
import {NotificationContainer} from 'react-notifications';

import HomePage from './rootes/HomePage';
import GamePage from './rootes/GamePage';
import AboutPage from './rootes/AboutPage';
import ContactPage from './rootes/ContactPage';
import NotFound from './rootes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import style from './style.module.css';
import 'react-notifications/lib/notifications.css';
import { FireBaseContext } from './context/firebaseContext';
import FirebaseClass from './service/firebase';


const App = () => {
  const location = useLocation('/');
  const isPadding = location.pathname === '/'|| location.pathname==='/game/board';
  return (
    <FireBaseContext.Provider value={FirebaseClass}>
      <Switch>
        <Route path="/notFound" component={NotFound} />
        <Route>
          <>
            <MenuHeader bgActive={!isPadding} />
            <div className={cn(style.wrap, {
              [style.isHomePAge]: isPadding
            })}>
              <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/home" component={HomePage} />
                <PrivateRoute path="/game" component={GamePage} />
                <PrivateRoute path="/about" component={AboutPage} />
                <PrivateRoute path="/contact" component={ContactPage} />
                <Route render={() => (
                  <Redirect to="/notFound" />
                )} />
              </Switch>

            </div>

            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer/>
    </FireBaseContext.Provider>
  );
}

export default App;