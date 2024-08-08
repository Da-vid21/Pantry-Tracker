'use client';
import React from 'react';
import { Box, Container, Button } from '@mui/material';
import AddItemFormNoSSR from '@/components/AddItemFormNoSSR';
import Header from '@/components/Header';
import PantryList from '@/components/PantryList';

const Home: React.FC = () => {
  const [showForm, setShowForm] = React.useState(false);

  const handleAddItemsClick = () => {
    setShowForm(true);
  };

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Container sx={{ paddingY: 4 }}>
        {showForm ? <AddItemFormNoSSR /> : <PantryList />}
        {!showForm && (
          <Button variant="contained" color="primary" onClick={handleAddItemsClick}>
            Add Items
          </Button>
        )}
      </Container>
    </Box>
  );
};

export default Home;
