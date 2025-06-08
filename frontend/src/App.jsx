import React from 'react';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Checklist from './pages/Checklist';
import Navbar from './components/navbar';

function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/checklists" element={<Checklist/>}/>
      </Routes>
    </BrowserRouter>
  )
} export default App
