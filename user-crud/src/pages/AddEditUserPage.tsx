import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Updated to useNavigate
import axios from 'axios';
import UserForm from '../components/UserForm';
import { User } from '../types';

const AddEditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const handleSubmit = async (data: User) => {
    if (id) {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, data);
    } else {
      await axios.post('https://jsonplaceholder.typicode.com/users', data);
    }
    navigate('/'); 
  };

  return (
    <div>
      {loading ? (
        <p>Loading user data...</p>
      ) : (
        <UserForm user={user} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default AddEditUserPage;
