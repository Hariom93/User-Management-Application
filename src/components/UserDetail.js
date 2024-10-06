import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUser(response.data);
      setLoading(false);
    };
    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Detail</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      {/* Add more user details as needed */}
    </div>
  );
}

export default UserDetail;
