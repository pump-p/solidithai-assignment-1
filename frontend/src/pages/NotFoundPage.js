import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        The page you are looking for doesn't exist.
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate('/')}
        sx={{ bgcolor: '#6a7d5f' }}
      >
        Go to Homepage
      </Button>
    </Container>
  );
};

export default NotFoundPage;
