// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import UserDetailPage from './pages/UserDetailPage';
import AddEditUserPage from './pages/AddEditUserPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<UserDetailPage />} />
        <Route path="/edit/:id" element={<AddEditUserPage />} />
        <Route path="/add" element={<AddEditUserPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

