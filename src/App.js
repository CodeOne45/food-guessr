import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PageNotFound from 'Components/Error404/PageNotFound';
import Landing from 'Pages/Landing';
import foodGuessrURL from 'foodGuessrURL';
import Quiz from 'Pages/Quiz';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path={foodGuessrURL.quiz} exact component={Quiz} />
          <Route component={PageNotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
