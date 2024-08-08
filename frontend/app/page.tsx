'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Button, TextField } from '@mui/material';
import AddItemFormNoSSR from '@/components/AddItemFormNoSSR';
import Header from '@/components/Header';
import PantryList from '@/components/PantryList';
import { getPantryItems } from '@/lib/firebaseFunctions';
import { PantryItem as PantryItemType } from '@/models/PantryItem';
import styles from './page.module.css'

const Home: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<PantryItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<PantryItemType[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const pantryItems = await getPantryItems();
      setItems(pantryItems);
      setFilteredItems(pantryItems);
    };

    fetchItems();
  }, []);

  useEffect(() => {
    setFilteredItems(
      items.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, items]);

  const handleAddItemsClick = () => {
    setShowForm(true);
  };



  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Container sx={{ paddingY: 4 }}>
        {showForm ? (
          <AddItemFormNoSSR />
        ) : (
          <>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginBottom: 2 }}
              className={styles.searchBox}
            />
            <PantryList items={filteredItems} />
          </>
        )}
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
