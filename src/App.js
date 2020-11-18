import { Dashboard, Error } from "./pages";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
