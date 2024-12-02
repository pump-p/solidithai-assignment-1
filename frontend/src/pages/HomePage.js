import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isLoggedIn, username } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Welcome to CRUD App
        </Typography>
        <Typography variant="body1" textAlign="center">
          Please <Button onClick={() => navigate('/login')}>Login</Button> or{' '}
          <Button onClick={() => navigate('/signup')}>Signup</Button> to
          continue.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Welcome, {username}
      </Typography>
      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2, bgcolor: '#6a7d5f' }}
        onClick={() => navigate('/edit-users')}
      >
        Edit Users
      </Button>
    </Container>
  );
};

export default HomePage;
