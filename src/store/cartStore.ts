import { create } from 'zustand';
import { CartItem, MilkOption, MILK_PRICES } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, milk: string | undefined, quantity: number) => void;
  clearCart: () => void;
  collectionTime: { date: Date; time: string } | null;
  setCollectionTime: (date: Date, time: string) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  collectionTime: null,

  addItem: (item) => {
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.product.id === item.product.id && 
        i.options.milk === item.options.milk
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.product.id === item.product.id && i.options.milk === item.options.milk
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return { items: [...state.items, item] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
  },

  updateQuantity: (productId, milk, quantity) => {
    set((state) => ({
      items: quantity > 0
        ? state.items.map((item) =>
            item.product.id === productId && item.options.milk === milk
              ? { ...item, quantity }
              : item
          )
        : state.items.filter(
            (item) => !(item.product.id === productId && item.options.milk === milk)
          )
    }));
  },

  clearCart: () => set({ items: [], collectionTime: null }),
  setCollectionTime: (date, time) => set({ collectionTime: { date, time } }),

  getTotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => {
      const basePrice = item.product.price * item.quantity;
      const milkPrice = item.options.milk ? 
        (MILK_PRICES[item.options.milk as MilkOption] * item.quantity) : 
        0;
      return sum + basePrice + milkPrice;
    }, 0);
  }
}));