// src/pages/Home.tsx
import React from 'react';
import UserList from '../components/UserList';

const Home: React.FC = () => {
  return (
    <div className="home">
      <h1>User Management</h1>
      <UserList />
    </div>
  );
};

export default Home;
