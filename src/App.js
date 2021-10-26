import logo from './logo.svg';
import './App.css';

function App() {
  let Pokedex = require('pokedex-promise-v2');
  let P = new Pokedex();

  // P.getPokemonByName('eevee') // with Promise
  // .then(function(response) {
  //   console.log(response);
  // })
  // .catch(function(error) {
  //   console.log('There was an ERROR: ', error);
  // });

  P.getPokemonByName(35, (response, error) => { // with callback
    if(!error) {
      console.log(response.sprites.other.home.front_default);
    } else {
      console.log(error);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
