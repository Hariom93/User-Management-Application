import React, { useEffect, useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    setUsers(data);
  };

  const handleSubmit = async (userData) => {
    if (editUser) {
      // Update user
      const updatedUser = { ...userData, id: editUser.id };
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${editUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
      const data = await response.json();
      setUsers(users.map(user => (user.id === editUser.id ? data : user)));
    } else {
      // Create user
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      setUsers([...users, data]);
    }
    setEditUser(null);
  };

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleDelete = async (userId) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: 'DELETE',
    });
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <div className="app">
      <h1>User Management Application</h1>
      <UserForm onSubmit={handleSubmit} editUser={editUser} />
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;
