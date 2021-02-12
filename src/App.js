import { AppBar } from '@material-ui/core';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <AppBar className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <ol>
            <ul>Install Material UI</ul>
          </ol>
        </p>
      </header>
    </AppBar>
  );
}

export default App;
