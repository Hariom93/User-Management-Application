import React, { useState, useEffect } from 'react';
import './UserFrom.css';
const UserForm = ({ onSubmit, editUser }) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    address: { street: '', city: '' },
    company: { name: '' },
    website: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editUser) {
      setUser(editUser);
    }
  }, [editUser]);

  const validate = () => {
    const newErrors = {};
    if (!user.name || user.name.length < 3) newErrors.name = 'Name must be at least 3 characters.';
    if (!user.email) newErrors.email = 'Please enter a valid email address.';
    if (!user.phone) newErrors.phone = 'Phone number must be at least 10 digits.';
    if (!user.address.street || !user.address.city) newErrors.address = 'Please enter a valid street and city';
    if (user.company.name && user.company.name.length < 3) newErrors.company = ' Company name must be at least 3 characters.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const key = name.split('.')[1];
      setUser({ ...user, address: { ...user.address, [key]: value } });
    } else if (name.startsWith('company.')) {
      const key = name.split('.')[1];
      setUser({ ...user, company: { ...user.company, [key]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(user);
      setUser({
        name: '',
        email: '',
        phone: '',
        address: { street: '', city: '' },
        company: { name: '' },
        website: '',
      });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="name" />
      {errors.name && <div className="error">{errors.name}</div>}
      
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="email" />
      {errors.email && <div className="error">{errors.email}</div>}
      
      <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="mobile no" />
      {errors.phone && <div className="error">{errors.phone}</div>}
      
      <input type="text" name="address.street" value={user.address.street} onChange={handleChange} placeholder="street" />
      <input type="text" name="address.city" value={user.address.city} onChange={handleChange} placeholder="city" />
      {errors.address && <div className="error">{errors.address}</div>}
      
      <input type="text" name="company.name" value={user.company.name} onChange={handleChange} placeholder="company name" />
      {errors.company && <div className="error">{errors.company}</div>}
      
      <input type="url" name="website" value={user.website} onChange={handleChange} placeholder="website" />
      {errors.website && <div className="error">{errors.website}</div>}
      
      <button className="btn-Join" type="submit">{editUser ? 'Edit' : 'Join'}</button>
    </form>
  );
};

export default UserForm;
