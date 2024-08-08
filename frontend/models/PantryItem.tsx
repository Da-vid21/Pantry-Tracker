export interface PantryItem {
    id: string;
    name: string;
    status: string;
    category: string;
    expiryDate: number;
    notes?: string;
    color: string;
}