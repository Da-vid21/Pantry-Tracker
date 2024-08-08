import React, { useState, useEffect } from 'react';
import PantryItem from './PantryItem';
import { getPantryItems } from '@/lib/firebaseFunctions';
import { PantryItem as PantryItemType } from '@/models/PantryItem';

const PantryList = () => {
    const [items, setItems] = useState<PantryItemType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const pantryItems = await getPantryItems();
            console.log(pantryItems);
            setItems(pantryItems);
            setLoading(false);
        };

        fetchItems();
    }, []);

    const calculateDaysLeft = (expiryDate: number): number => {
        if (!expiryDate) return NaN; // Return NaN if no expiry date
        const today = new Date();
        const timeDiff = expiryDate - today.getTime();
        console.log(timeDiff);
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    };

    const calculateColor = (daysLeft: number): string => {
        if (isNaN(daysLeft)) return 'green'; // Default color if no expiry date
        if (daysLeft <= 3) {
            return 'red';
        } else if (daysLeft <= 6) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {items.map((item) => {
                const daysLeft = calculateDaysLeft(item.expiryDate);
                return (
                    <PantryItem
                        key={item.id}
                        name={item.name}
                        status={isNaN(daysLeft) ? 'No expiry date' : `${daysLeft} days left`}
                        color={calculateColor(daysLeft)}
                    />
                );
            })}
        </div>
    );
};

export default PantryList;
