import { useLocation, Route, Switch, Redirect } from 'react-router-dom';
import cn from 'classnames';
import { NotificationContainer } from 'react-notifications';

import HomePage from './rootes/HomePage';
import GamePage from './rootes/GamePage';
import AboutPage from './rootes/AboutPage';
import ContactPage from './rootes/ContactPage';
import UserPage from './rootes/UserPage';
import NotFound from './rootes/NotFound';
import MenuHeader from './components/MenuHeader';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

import style from './style.module.css';
import 'react-notifications/lib/notifications.css';
import { FireBaseContext } from './context/firebaseContext';
import FirebaseClass from './service/firebase';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAsync, selectUserLoading } from './store/user';


const App = () => {
  const isUserLoading = useSelector(selectUserLoading);
  const location = useLocation('/');
  const isPadding = location.pathname === '/' || location.pathname === '/game/board';
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsync());
  }, [])

  if (isUserLoading) {
    return 'Loading...';
  }
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
                <PrivateRoute path="/user" component={UserPage} />
                <Route render={() => (
                  <Redirect to="/notFound" />
                )} />
              </Switch>

            </div>

            <Footer />
          </>
        </Route>
      </Switch>
      <NotificationContainer />
    </FireBaseContext.Provider>
  );
}

export default App;