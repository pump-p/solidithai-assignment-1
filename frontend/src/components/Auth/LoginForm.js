import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/userApi';
import { useAuth } from '../../context/AuthContext';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@mui/material';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation(loginUser, {
    onSuccess: (data) => {
      login(data.token, data.user);
      toast.success('Login successful!');
      navigate('/');
    },
    onError: () => toast.error('Invalid email or password')
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    mutation.mutate({ email, password });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 4 }}>
      <Paper elevation={6} sx={{ p: 4 }}>
        <Typography variant="h4" textAlign="center" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
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
            Login
          </Button>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            sx={{ mt: 2 }}
          >
            Don’t have an account?{' '}
            <Button
              onClick={() => navigate('/signup')}
              sx={{ textTransform: 'none' }}
            >
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
