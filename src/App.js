import React, { Component } from 'react';

import './App.css';
import World from './World';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <p>Food-Guessr</p>
        <a
          className="App-link"
          href="https://github.com/CodeOne45/food-guessr/blob/develop/README.md"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
        <button>Play</button>
      </header>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      showHideHome: true,
      showHideWorld: false,
    };
    this.hideComponent = this.hideComponent.bind(this);
  }

  hideComponent(name) {
    console.log(name);
    switch (name) {
      case 'showHideHome':
        this.setState({ showHideHome: this.state.Header });
        break;
      case 'showHideWorld':
        this.hideComponent('showHideHome');
        this.setState({ showHideWorld: !this.state.World });
        break;
      default:
        return null;
    }
  }

  render() {
    const { showHideHome, showHideWorld } = this.state;
    return (
      <div>
        <div className="App">
          <button onClick={() => this.hideComponent('showHideWorld')}>
            Start
          </button>
          {showHideHome && <Header />}
          <body>{showHideWorld && <World />}</body>
        </div>
      </div>
    );
  }
}

export default App;
