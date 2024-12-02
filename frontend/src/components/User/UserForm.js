import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';

const UserForm = ({ editData, onAdd, onEdit, onCancel }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({ ...editData, password: '', confirmPassword: '' }); // Password fields are empty by default
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    }
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (editData) {
      onEdit(editData.id, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        margin="normal"
        required
      />
      {editData && (
        <>
          <TextField
            fullWidth
            label="New Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Confirm New Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            margin="normal"
          />
        </>
      )}
      {!editData && (
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          margin="normal"
          required
        />
      )}
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button type="submit" variant="contained" sx={{ bgcolor: '#6a7d5f' }}>
          {editData ? 'Update User' : 'Add User'}
        </Button>
        {editData && (
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default UserForm;
