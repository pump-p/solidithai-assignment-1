import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { signupUser } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';

const SignupForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(signupUser, {
    onSuccess: (data) => {
      login(data.token, data.user);
      toast.success('Signup successful!');
      navigate('/');
    },
    onError: (error) => {
      const message = error.response?.data?.error || 'Signup failed';
      toast.error(message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    mutation.mutate({ username, email, password });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, bgcolor: '#6a7d5f' }}
          >
            Sign Up
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            Already have an account?{' '}
            <Button
              onClick={() => navigate('/login')}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupForm;
