'use client';
import React, { useState, useEffect } from 'react';
import { Box, Container, Button, TextField, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';
import Header from '@/components/header';
import PantryList from '@/components/PantryList';
import { getPantryItems } from '@/lib/firebaseFunctions';
import { PantryItem as PantryItemType } from '@/models/PantryItem';
import styles from './page.module.css';

const Home: React.FC = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<PantryItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<PantryItemType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      const pantryItems = await getPantryItems();
      setItems(pantryItems);
      setFilteredItems(pantryItems);
      setLoading(false);
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
    router.push('/addItem');
  };

  const handleEditItemClick = (item: PantryItemType) => {
    router.push(`/addItem?id=${item.id}`);
  };

  return (
    <Box sx={{ backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
      <Header />
      <Container sx={{ paddingY: 4 }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
            <CircularProgress />
          </Box>
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
            <PantryList items={filteredItems} onEdit={handleEditItemClick} />
            <Button variant="contained" color="primary" onClick={handleAddItemsClick}>
              Add Items
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Home;
