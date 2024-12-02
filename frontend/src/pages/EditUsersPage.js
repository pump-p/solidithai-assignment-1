import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  fetchAllUsers,
  createUser,
  updateUser,
  deleteUser
} from '../api/userApi';
import UserForm from '../components/User/UserForm';
import UserTable from '../components/User/UserTable';
import ConfirmDialog from '../components/User/ConfirmDialog';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { toast } from 'react-toastify';

const EditUsersPage = () => {
  const [editData, setEditData] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortCriteria, setSortCriteria] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default order ascending

  // Fetch users
  const { data: users, refetch } = useQuery('users', fetchAllUsers);

  // Add User Mutation
  const createMutation = useMutation(createUser, {
    onSuccess: () => {
      toast.success('User added successfully');
      refetch();
    },
    onError: () => toast.error('Failed to add user')
  });

  // Edit User Mutation
  const updateMutation = useMutation(
    ({ id, userData }) => updateUser(id, userData),
    {
      onSuccess: () => {
        toast.success('User updated successfully');
        refetch();
        setEditData(null);
      },
      onError: () => toast.error('Failed to update user')
    }
  );

  // Delete User Mutation
  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      toast.success('User deleted successfully');
      refetch();
    },
    onError: () => toast.error('Failed to delete user')
  });

  const handleAddUser = (userData) => {
    createMutation.mutate(userData);
  };

  const handleEditUser = (id, userData) => {
    updateMutation.mutate({ id, userData });
  };

  const handleDeleteUser = (id) => {
    deleteMutation.mutate(id);
  };

  // Filter and sort users based on search and criteria
  const filteredUsers = users
    ?.filter(
      (user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const fieldA =
        sortCriteria === 'name'
          ? a.username.toLowerCase()
          : a.email.toLowerCase();
      const fieldB =
        sortCriteria === 'name'
          ? b.username.toLowerCase()
          : b.email.toLowerCase();
      if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Manage Users
      </Typography>
      <Grid container spacing={4}>
        {/* Add User Block */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New User
            </Typography>
            <UserForm
              editData={null} // No edit data for Add User block
              onAdd={handleAddUser}
            />
          </Paper>
        </Grid>

        {/* Edit User Block */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              {editData ? 'Edit User' : 'Select a User to Edit'}
            </Typography>
            {editData ? (
              <UserForm
                editData={editData}
                onEdit={handleEditUser}
                onCancel={() => setEditData(null)}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                Select a user from the table to edit their details.
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Search and Sort Controls */}
      <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Search Input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by username or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2, flex: 1 }}
        />

        {/* Sort Criteria Dropdown */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Order Dropdown */}
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            label="Order"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* User Table */}
      <UserTable
        users={filteredUsers} // Pass filtered and sorted users to the table
        onEdit={(user) => setEditData(user)}
        onDelete={(id) => setConfirmDelete(id)}
      />

      {/* Confirm Delete Dialog */}
      {confirmDelete && (
        <ConfirmDialog
          open={!!confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => {
            handleDeleteUser(confirmDelete);
            setConfirmDelete(null);
          }}
        />
      )}
    </Container>
  );
};

export default EditUsersPage;
