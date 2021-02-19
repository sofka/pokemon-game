import { useRouteMatch, Route, Switch } from 'react-router-dom';
import StartPage from './rootes/StartPage';
import BoardPage from './rootes/BoardPage';
import FinishPage from './rootes/FinishPage';

const GamePage = () => {
    const match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/`} exact component={StartPage} />
            <Route path={`${match.path}/board`} component={BoardPage} />
            <Route path={`${match.path}/finish`} component={FinishPage} />
        </Switch>
    );
};
export default GamePage;