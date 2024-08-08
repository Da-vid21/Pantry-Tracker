'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Button } from '@mui/material';
import AddItemForm from '@/components/AddItemForm';
import { PantryItem } from '@/models/PantryItem';
import { getPantryItemById } from '@/lib/firebaseFunctions'; // Ensure you have this function or replace it with the correct function
import styles from './addItem.module.css';

const AddItemPage: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const itemId = searchParams?.get('id');
    const [editingItem, setEditingItem] = useState<PantryItem | null>(null);
    useEffect(() => {
        document.title = itemId ? 'Edit Item' : 'Add Item';
        document.body.style.backgroundColor = '#000';
        if (itemId) {
            // Fetch the item by ID if editing (replace this with your actual fetch logic)
            const fetchItem = async () => {
                const item = await getPantryItemById(itemId); // Replace with your actual fetch function
                setEditingItem(item);
            };

            fetchItem();
        }
    }, [itemId]);
    const handleBack = () => {
        router.push('/');
    };

    return (
        <>
            <Button onClick={handleBack} className={styles.goBackButton}>Back</Button>
            <Box>
                <AddItemForm editingItem={editingItem} />
            </Box>
        </>
    );
};

export default AddItemPage;
