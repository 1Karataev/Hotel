import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Main from './pages/Main';
import Registration from './pages/Registration';

function App() {
  return (
    
    <div className="App">
      <Routes>
        <Route path='/reg' element={<Registration/>}/>
        <Route path='/' element={<Main/>}/>
      </Routes>
    </div>
  );
}

export default App;
