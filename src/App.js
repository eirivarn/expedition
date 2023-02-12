import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
//import { Trips } from './components/trips';
import Frontpage from './pages/Frontpage';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={< Frontpage />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
