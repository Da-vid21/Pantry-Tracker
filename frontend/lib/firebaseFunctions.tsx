// lib/firebaseFunctions.ts
import { database } from './firebaseConfig';
import { ref, set, get, update, remove, child } from "firebase/database";
import { PantryItem } from '../models/PantryItem';

// Add a pantry item
export const addPantryItem = async (item: PantryItem): Promise<boolean> => {
    try {
        const newItemRef = ref(database, 'pantry/' + item.id);
        await set(newItemRef, item);
        return true;
    } catch (error) {
        console.error("Error adding pantry item:", error);
        return false;
    }
};

// Get all pantry items
export const getPantryItems = async (): Promise<PantryItem[]> => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, 'pantry'));
    if (snapshot.exists()) {
        return Object.values(snapshot.val()) as PantryItem[];
    } else {
        return [];
    }
};

// Update a pantry item
export const updatePantryItem = async (id: string, item: PantryItem) => {
    const itemRef = ref(database, 'pantry/' + id);
    await update(itemRef, item);
};

// Delete a pantry item
export const deletePantryItem = async (id: string) => {
    const itemRef = ref(database, 'pantry/' + id);
    await remove(itemRef);
};

export const getPantryItemById = async (id: string) => {
    const itemRef = ref(database, 'pantry/' + id);
    const snapshot = await get(itemRef);
    if (snapshot.exists()) {
        return snapshot.val() as PantryItem;
    } else {
        return null;
    }
}
