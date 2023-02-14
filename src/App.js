import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/Frontpage';
import UserPage from './pages/Userpage';
import TripPage from './pages/Trippage';
import ErrorPage from './pages/Errorpage';
import DemoPage from './pages/DemoPage';

function App() {
  return (
    <BrowserRouter>
      <div className='main-wrapper'>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/trip" element={<TripPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/demopage" element={<DemoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
