export type Category = 'Coffees' | 'Teas' | 'Cakes' | 'Hot Chocolate';

export type MilkOption = 'whole' | 'semi' | 'oat' | 'almond' | 'soy';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  image: string;
  options?: {
    milks?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
  options: {
    milk?: MilkOption;
  };
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const MILK_PRICES: Record<MilkOption, number> = {
  whole: 0,
  semi: 0,
  oat: 0.20,
  almond: 0.20,
  soy: 0.20
};