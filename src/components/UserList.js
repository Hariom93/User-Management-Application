import React from 'react';
import './UserList.css';
const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table className="user-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile no</th>
          <th>Street</th>
          <th>City</th>
          <th>Company name</th>
          <th>Website</th>
          <th>Work</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr>
            <td colSpan="8" style={{ textAlign: 'center' }}>
            </td>
          </tr>
        ) : (
          users.map((user, index) => (
            <tr key={user.id} style={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.address.street}</td>
              <td>{user.address.city}</td>
              <td>{user.company.name}</td>
              <td>{user.website}</td>
              <td>
                <p>
                <button className="editBtn"onClick={() => onEdit(user)}>Edit</button>
                </p>
                <button className="deleteBtn" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default UserList;
