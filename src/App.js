/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from 'Components/Header/Header';
import World from 'Components/World/World';
import PageNotFound from 'Components/Error404/PageNotFound';

function App() {
  return (
    <div>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Header} />
            <Route path="/foodGuess" exact component={World} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}
// <Header />

export default App;
