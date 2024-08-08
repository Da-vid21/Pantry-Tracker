import React from 'react';
import PantryItem from './PantryItem';
import { PantryItem as PantryItemType } from '@/models/PantryItem';

interface PantryListProps {
    items: PantryItemType[];
    onEdit: (item: PantryItemType) => void;
}

const PantryList: React.FC<PantryListProps> = ({ items, onEdit }) => {
    const calculateDaysLeft = (expiryDate: number): number => {
        if (!expiryDate) return NaN;
        const today = new Date();
        const timeDiff = expiryDate - today.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    };

    const calculateColor = (daysLeft: number): string => {
        if (isNaN(daysLeft)) return 'green';
        if (daysLeft <= 3) {
            return 'red';
        } else if (daysLeft <= 6) {
            return 'yellow';
        } else {
            return 'green';
        }
    };

    return (
        <div>
            {items.map((item) => {
                const daysLeft = calculateDaysLeft(item.expiryDate);
                return (
                    <PantryItem
                        key={item.id}
                        item={{
                            ...item,
                            status: isNaN(daysLeft) ? 'No expiry date' : `${daysLeft} days left`,
                            color: calculateColor(daysLeft),
                        }}
                        onEdit={onEdit}
                    />
                );
            })}
        </div>
    );
};

export default PantryList;
