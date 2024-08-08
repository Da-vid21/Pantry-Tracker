'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for useRouter
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addPantryItem, updatePantryItem } from '../lib/firebaseFunctions';
import { PantryItem } from '../models/PantryItem';
import styles from './AddItemForm.module.css';
import { v4 as uuidv4 } from 'uuid';

interface AddItemFormProps {
    editingItem?: PantryItem | null;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ editingItem }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [units, setUnits] = useState('');
    const [expiryDate, setExpiryDate] = useState<Date | null>(new Date());
    const [notes, setNotes] = useState('');

    useEffect(() => {
        if (editingItem) {
            setName(editingItem.name);
            setCategory(editingItem.category);
            setExpiryDate(new Date(editingItem.expiryDate));
            setNotes(editingItem.notes || '');
        }
    }, [editingItem]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const buttonName = (e.nativeEvent as any).submitter.name;

        const newItem: PantryItem = {
            id: editingItem ? editingItem.id : uuidv4(),
            name,
            category,
            expiryDate: expiryDate ? expiryDate.getTime() : new Date().getTime(), // Convert to timestamp
            notes: notes || '',
            status: 'status',
            color: 'color'
        };

        if (editingItem) {
            await updatePantryItem(newItem.id, newItem);
        } else {
            await addPantryItem(newItem);
        }

        if (buttonName === 'addMore') {
            // Reset form fields if adding a new item
            setName('');
            setCategory('');
            setQuantity('');
            setUnits('');
            setExpiryDate(new Date());
            setNotes('');
        } else if (buttonName === 'done') {
            // Navigate back to the main page
            router.push('/');
        }
    };

    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h6" color="white" gutterBottom>
                {editingItem ? 'Edit Item' : 'Add Items'}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    InputLabelProps={{ className: styles.label }}
                    InputProps={{
                        className: styles.input,
                        classes: {
                            root: styles.inputFocus,
                            notchedOutline: styles.inputOutlined,
                        },
                    }}
                    className={`${styles.text} ${styles.form}`}
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    sx={{ marginBottom: 2 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <FormControl fullWidth sx={{ marginBottom: 2 }} className={styles.form}>
                    <InputLabel className={styles.label}>Category</InputLabel>
                    <Select
                        className={`${styles.input} ${styles.inputFocus}`}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <MenuItem value="Vegetables">Vegetables</MenuItem>
                        <MenuItem value="Fruits">Fruits</MenuItem>
                        <MenuItem value="Dairy">Dairy</MenuItem>
                        <MenuItem value="Meat">Meat</MenuItem>
                        <MenuItem value="Grains">Grains</MenuItem>
                        <MenuItem value="Spices">Spices</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                    </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Expiry Date"
                        value={expiryDate}
                        onChange={(newValue: Date | null) => {
                            if (newValue && newValue >= new Date()) {
                                setExpiryDate(newValue);
                            }
                        }}
                        minDate={new Date()} // Ensure date cannot be set before today
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                InputLabelProps={{ className: styles.label }}
                                InputProps={{
                                    ...params.InputProps,
                                    className: styles.input,
                                    classes: {
                                        root: styles.inputFocus,
                                        notchedOutline: styles.inputOutlined,
                                    },
                                }}
                                className={styles.text && styles.form}
                                variant="outlined"
                                fullWidth
                                sx={{ marginBottom: 2 }}
                                required
                            />
                        )}
                    />
                </LocalizationProvider>
                <TextField
                    InputLabelProps={{ className: styles.label }}
                    InputProps={{
                        className: styles.input,
                        classes: {
                            root: styles.inputFocus,
                            notchedOutline: styles.inputOutlined,
                        },
                    }}
                    className={`${styles.text} ${styles.form}`}
                    label="Notes"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="contained" color="primary" type="submit" name="addMore">
                        Add More
                    </Button>
                    <Button variant="contained" color="success" type="submit" name="done">
                        Done
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default AddItemForm;
