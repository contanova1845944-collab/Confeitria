import React from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export default function Cart({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  totalPrice
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-orange-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="text-orange-600" size={24} />
              <h2 className="text-xl font-bold text-orange-800">Seu Carrinho</h2>
            </div>
            <button
              onClick={onClose}
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag size={48} className="text-orange-300 mx-auto mb-4" />
                <p className="text-orange-600 text-lg mb-2">Seu carrinho está vazio</p>
                <p className="text-orange-500 text-sm">Adicione alguns produtos deliciosos!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.product.id} className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-orange-800">{item.product.name}</h3>
                        <p className="text-sm text-orange-600 mb-2">{item.product.description}</p>
                        <p className="font-bold text-orange-700">R$ {item.product.price.toFixed(2)}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="bg-orange-200 hover:bg-orange-300 text-orange-800 rounded-full p-1 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-semibold text-orange-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="bg-orange-200 hover:bg-orange-300 text-orange-800 rounded-full p-1 transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <p className="font-bold text-orange-700">
                        R$ {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-orange-200 p-6 bg-orange-50">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-orange-800">Total:</span>
                <span className="text-2xl font-bold text-orange-600">
                  R$ {totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
              >
                Finalizar Pedido
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}