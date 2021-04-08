import "./App.css";
import World from "./World";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Food-Guessr</p>
        <a
          className="App-link"
          href="https://github.com/CodeOne45/food-guessr/blob/develop/README.md"
          target="_blank"
        >
          Learn more
        </a>
      </header>

      <body>
        <World />
      </body>
    </div>
  );
}

export default App;
