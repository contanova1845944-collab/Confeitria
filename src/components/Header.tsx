import React from 'react';
import { ShoppingCart, Instagram, Phone } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartOpen: () => void;
  shopInfo: { siteName: string; logoUrl: string; phone: string; instagram: string };
}

export default function Header({ cartItemsCount, onCartOpen, shopInfo }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-orange-50 to-orange-100 shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={shopInfo.logoUrl} 
              alt={shopInfo.siteName} 
              className="h-16 w-16 rounded-full border-4 border-orange-200 shadow-md"
            />
            <div>
              <h1 className="text-3xl font-bold text-orange-800 font-serif">
                {shopInfo.siteName}
              </h1>
              <p className="text-orange-600 text-sm font-medium">Confeitaria Artesanal</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href={`tel:${shopInfo.phone}`}
              className="flex items-center space-x-2 text-orange-700 hover:text-orange-800 transition-colors"
            >
              <Phone size={18} />
              <span className="font-medium">{shopInfo.phone}</span>
            </a>
            <a 
              href={shopInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-pink-600 hover:text-pink-700 transition-colors"
            >
              <Instagram size={18} />
              <span className="font-medium">@gebolosgoumet</span>
            </a>
          </div>
          
          <button
            onClick={onCartOpen}
            className="relative bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-colors shadow-lg"
          >
            <ShoppingCart size={20} />
            <span className="font-medium">Carrinho</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
        
        <div className="md:hidden mt-4 flex justify-center space-x-6">
          <a 
            href={`tel:${shopInfo.phone}`}
            className="flex items-center space-x-2 text-orange-700"
          >
            <Phone size={16} />
            <span className="text-sm">{shopInfo.phone}</span>
          </a>
          <a 
            href={shopInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-pink-600"
          >
            <Instagram size={16} />
            <span className="text-sm">@gebolosgoumet</span>
          </a>
        </div>
      </div>
    </header>
  );
}