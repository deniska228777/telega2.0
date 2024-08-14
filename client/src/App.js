import React from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import WrongAdress from './pages/WrongPage.jsx';
import AuthProvider from './components/AuthProvider.js';
import CorePage from './pages/CorePage.jsx';
import PrivateRoutes from './components/PrivateRoutes.jsx';
import Chats from './pages/Chats.jsx';
import LeftNav from './components/LeftNav.jsx';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path = '/wrongpath' element = {<WrongAdress />}/>
            <Route path = '*' element = {<Navigate to = '/wrongpath'/>}/>
            <Route path='/auth' element={<CorePage />} />
            <Route element={<PrivateRoutes/>}>
              <Route path='/' element={<LeftNav/>}>
                <Route index element={<Chats/>}/>
                <Route path="/profile" element={<h1>lol</h1>}/>
              </Route>
            </Route>
          </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;