export interface PantryItem {
    id?: string;
    name: string;
    category: string;
    quantity: number;
    units: string;
    expiryDate: number;
    notes?: string;
}