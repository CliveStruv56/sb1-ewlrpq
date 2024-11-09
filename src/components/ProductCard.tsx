import React from 'react';
import { Product, MilkOption, MILK_PRICES } from '../types';
import { useCartStore } from '../store/cartStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedMilk, setSelectedMilk] = React.useState<MilkOption>('whole');
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      product,
      quantity: 1,
      options: {
        milk: selectedMilk,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-lg font-bold mb-2">£{product.price.toFixed(2)}</p>
      
      {product.options?.milks && (
        <div className="mb-2">
          <select
            className="w-full p-2 border rounded"
            value={selectedMilk}
            onChange={(e) => setSelectedMilk(e.target.value as MilkOption)}
          >
            <option value="whole">Whole Milk (Free)</option>
            <option value="semi">Semi-Skimmed Milk (Free)</option>
            <option value="oat">Oat Milk (+£0.20)</option>
            <option value="almond">Almond Milk (+£0.20)</option>
            <option value="soy">Soy Milk (+£0.20)</option>
          </select>
        </div>
      )}
      
      <button
        onClick={handleAddToCart}
        className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
};