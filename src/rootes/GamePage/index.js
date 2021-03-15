import { useRouteMatch, Route, Switch } from 'react-router-dom';
import StartPage from './rootes/StartPage';
import BoardPage from './rootes/BoardPage';
import FinishPage from './rootes/FinishPage';
import PrivateRoute from '../../components/PrivateRoute';

const GamePage = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <PrivateRoute path={`${match.path}/`} exact component={StartPage} />
            <PrivateRoute path={`${match.path}/board`} component={BoardPage} />
            <PrivateRoute path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};
export default GamePage;