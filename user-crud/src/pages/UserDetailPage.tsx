import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { User } from '../types';
import Loader from '../components/Loader';

const UserDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h2>{user.name}'s Details</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Phone:</strong> {user.phone}</p>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Address:</strong> {user.address.street}, {user.address.city}</p>
      <p><strong>Company:</strong> {user.company?.name || 'N/A'}</p>
    </div>
  );
};

export default UserDetailPage;
