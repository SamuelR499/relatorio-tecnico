import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import React from 'react';

import LoginPage from './Pages/Login';
import Dashboard from './Pages/Home';

function App() {
  return (
    <BrowserRouter> {/* Add a BrowserRouter component */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
