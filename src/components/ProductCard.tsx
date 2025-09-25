import React from 'react';
import { Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-100">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          R$ {product.price.toFixed(2)}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="bg-pink-100 text-pink-800 text-xs px-3 py-1 rounded-full font-semibold">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-orange-800 mb-2 font-serif">
          {product.name}
        </h3>
        
        <p className="text-orange-600 text-sm mb-4 leading-relaxed">
          {product.description}
        </p>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 rounded-full font-semibold flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ShoppingCart size={18} />
          <span>Adicionar ao Carrinho</span>
          <Plus size={18} />
        </button>
      </div>
    </div>
  );
}