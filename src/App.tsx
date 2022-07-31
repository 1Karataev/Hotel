import React from 'react';
import { useSelector } from 'react-redux';
import {  Route, Routes } from 'react-router-dom';
import './App.scss';
import Main from './pages/Main';
import Registration from './pages/Registration';
import { RootState } from './redux/store';

function App() {
  const user = useSelector((store:RootState)=>store.auth.valid)


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
