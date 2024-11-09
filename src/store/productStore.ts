import { create } from 'zustand';
import { Product } from '../types';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: Error | null;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const productsRef = collection(db, 'products');
      const q = query(productsRef, orderBy('category'));
      const snapshot = await getDocs(q);
      
      const products = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];

      set({ products, loading: false });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ error: error as Error, loading: false });
    }
  }
}));