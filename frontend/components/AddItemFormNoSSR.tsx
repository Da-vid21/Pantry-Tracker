// components/AddItemFormNoSSR.tsx
import dynamic from 'next/dynamic';

// Dynamically import the component with no SSR
const AddItemFormNoSSR = dynamic(() => import('./AddItemForm'), { ssr: false });

export default AddItemFormNoSSR;
