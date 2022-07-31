import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.scss';
import Main from './pages/Main';
import Registration from './pages/Registration';


function App() {
  


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Registration />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
