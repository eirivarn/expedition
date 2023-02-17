import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FrontPage from './pages/Frontpage';
import UserPage from './pages/Userpage';
import TripPage from './pages/Trippage';
import ErrorPage from './pages/Errorpage';
import DemoPage from './pages/DemoPage';
import Header from './components/header';
import Protected from './components/Protected';
import { AuthContextProvider } from './Context/AuthContext';
import Account from './pages/Account';
import Signin from './pages/Signin';

function App() {
  return (
    <BrowserRouter>
      <div className='main-wrapper'>
      <AuthContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/trip" element={<TripPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/demopage" element={<DemoPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/account' element={
              <Protected><Account /></Protected>}/>
        </Routes>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
