import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from './pages/HomePage/HomePage';
import DiagramPage from './pages/DiagramPage/DiagramPage';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>testpage</div>}></Route>
        <Route path="/HomePage" element={<HomePage />}>
          {/* <HomePage /> */}
        </Route>
        <Route path="/DiagramPage" element={<DiagramPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
