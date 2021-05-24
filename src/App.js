import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import World from 'Components/World/World';
import PageNotFound from 'Components/Error404/PageNotFound';
import Landing from 'Pages/Landing';
import foodGuessrURL from 'foodGuessrURL';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path={foodGuessrURL.quiz} exact component={World} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
