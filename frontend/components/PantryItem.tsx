// components/PantryItem.tsx
import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

interface PantryItemProps {
    name: string;
    status: string;
    color: string;
}

const PantryItem: React.FC<PantryItemProps> = ({ name, status, color }) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 2, backgroundColor: '#333', borderRadius: 1, marginBottom: 1 }}>
                <Typography variant="h6" color="white">
                    {name}
                </Typography>
                <Chip label={status} sx={{ backgroundColor: color, color: 'white' }} />
            </Box>
        </>
    );
};

export default PantryItem;
