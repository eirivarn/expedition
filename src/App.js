import logo from './logo.svg';
import './App.css';
import { FirebaseApp } from '@firebase/app';
import { useRef } from 'react';
import handlesubmit from './hooks/handlesubmit';

function App() {
  const dataRef = useRef();

  const submithandler = (e) => {
    e.preventdefault();
    handlesubmit(dataRef.current.value);
    dataRef.current.value = "";
  }

  return (
    <div className="App">
      <form onSubmit={submithandler}>
        <input type='text' ref={dataRef} />
        <button type="submit">Save</button>
      </form>
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
