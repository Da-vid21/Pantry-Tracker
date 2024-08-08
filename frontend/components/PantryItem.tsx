import React from 'react';
import { Box, Typography, Chip, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deletePantryItem, updatePantryItem } from '@/lib/firebaseFunctions';
import { PantryItem as PantryItemType } from '@/models/PantryItem';

interface PantryItemProps {
    item: PantryItemType;
    onEdit: (item: PantryItemType) => void;
}

const PantryItem: React.FC<PantryItemProps> = ({ item, onEdit }) => {
    const handleDelete = async () => {
        await deletePantryItem(item.id);
        // Refresh the UI
        window.location.reload();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2, backgroundColor: '#333', borderRadius: 1, marginBottom: 1 }}>
            <Box sx={{ flex: 1 }}>
                <Typography variant="h6" color="white">
                    {item.name}
                </Typography>
                <Chip label={item.status} sx={{ backgroundColor: item.color, color: 'white' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" onClick={() => onEdit(item)}>
                    <EditIcon />
                </IconButton>
                <IconButton color="secondary" onClick={handleDelete}>
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default PantryItem;
