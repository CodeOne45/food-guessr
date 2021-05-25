import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Header from 'Components/Header/Header';
// import World from 'Components/World/World';
// import PageNotFound from 'Components/Error404/PageNotFound';
import About from 'Components/About/About';
import CTA from 'Components/CTA/CTA';
import Footer from 'Components/Footer/Footer';
import Hero from 'Components/Hero/Hero';
import LogoClouds from 'Components/LogoClouds/LogoClouds';
import Team from 'Components/Team/Team';

function App() {
  return (
    <div>
      <div className="App">
        <Hero />
        <About />
        <LogoClouds />
        <CTA />
        <Team />
        <Footer />

        {/* <Router>
          <Switch>
            <Route path="/" exact component={Header} />
            <Route path="/foodGuess" exact component={World} />
            <Route component={PageNotFound} />
          </Switch>
        </Router> */}
      </div>
    </div>
  );
}
// <Header />

export default App;
