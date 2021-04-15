/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-undef */
import React from 'react';
import World from './components/World/World';
import Header from './components/Header/Header';

class App extends React.Component {
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
    return null;
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
