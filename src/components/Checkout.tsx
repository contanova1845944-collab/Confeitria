import React, { useState } from 'react';
import { X, User, Phone, MapPin, CreditCard, QrCode, Check } from 'lucide-react';
import { CartItem, Order } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onOrderComplete: (order: Omit<Order, 'id' | 'createdAt' | 'status'>) => void;
}

export default function Checkout({ isOpen, onClose, items, totalPrice, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'payment' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.address) {
      setStep('payment');
    }
  };

  const handlePaymentConfirm = () => {
    const order = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items,
      total: totalPrice,
      paymentMethod: 'pix' as const
    };
    
    onOrderComplete(order);
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setFormData({ name: '', email: '', phone: '', address: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      
      <div className="absolute inset-4 md:inset-8 bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-orange-50">
            <h2 className="text-2xl font-bold text-orange-800">
              {step === 'form' && 'Dados do Cliente'}
              {step === 'payment' && 'Pagamento PIX'}
              {step === 'success' && 'Pedido Confirmado'}
            </h2>
            <button
              onClick={handleClose}
              className="text-orange-600 hover:text-orange-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div>
                  <label className="flex items-center space-x-2 text-orange-800 font-semibold mb-2">
                    <User size={18} />
                    <span>Nome Completo</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-orange-800 font-semibold mb-2">
                    <span>Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-orange-800 font-semibold mb-2">
                    <Phone size={18} />
                    <span>Telefone</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors"
                    placeholder="(85) 99999-9999"
                  />
                </div>

                <div>
                  <label className="flex items-center space-x-2 text-orange-800 font-semibold mb-2">
                    <MapPin size={18} />
                    <span>Endereço Completo</span>
                  </label>
                  <textarea
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    rows={3}
                    placeholder="Rua, número, bairro, complemento..."
                  />
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-center space-x-2 mb-2">
                    <CreditCard className="text-orange-600" size={18} />
                    <span className="font-semibold text-orange-800">Forma de Pagamento</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="pix" name="payment" checked readOnly />
                    <label htmlFor="pix" className="text-orange-700">PIX</label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
                >
                  Continuar para Pagamento
                </button>
              </form>
            )}

            {step === 'payment' && (
              <div className="max-w-lg mx-auto text-center space-y-6">
                <div className="bg-orange-50 rounded-lg p-6 border-2 border-orange-200">
                  <QrCode className="text-orange-600 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-orange-800 mb-2">Pagamento via PIX</h3>
                  <p className="text-orange-600 mb-4">
                    Escaneie o QR Code ou use a chave PIX para fazer o pagamento
                  </p>
                  
                  <div className="bg-white p-4 rounded-lg border border-orange-200 mb-4">
                    <img 
                      src="/WhatsApp Image 2025-09-23 at 19.50.39.jpeg"
                      alt="QR Code PIX"
                      className="max-w-full h-auto mx-auto rounded-lg"
                    />
                  </div>
                  
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Chave PIX:</p>
                    <p className="font-mono text-gray-800 font-semibold">gvrocha1977@gmail.com</p>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg p-4 border-2 border-pink-200">
                  <h4 className="font-bold text-pink-800 mb-2">Total do Pedido</h4>
                  <p className="text-2xl font-bold text-pink-600">R$ {totalPrice.toFixed(2)}</p>
                </div>

                <button
                  onClick={handlePaymentConfirm}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
                >
                  Confirmar Pagamento Realizado
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="max-w-lg mx-auto text-center space-y-6">
                <div className="bg-green-50 rounded-full p-8 w-32 h-32 mx-auto flex items-center justify-center">
                  <Check className="text-green-500" size={64} />
                </div>
                
                <div>
                  <h3 className="text-3xl font-bold text-green-700 mb-4">
                    Pedido Confirmado!
                  </h3>
                  <div className="bg-gradient-to-r from-pink-100 to-orange-100 rounded-lg p-6 border-2 border-pink-200 mb-6">
                    <p className="text-pink-800 text-lg font-semibold mb-2">
                      💕 Muito obrigada pela sua confiança! 💕
                    </p>
                    <p className="text-orange-700 mb-2">
                      Seu pedido foi recebido com muito carinho e já está sendo preparado especialmente para você.
                    </p>
                    <p className="text-pink-700 text-sm">
                      ✨ Cada doce é feito com amor e dedicação para tornar seu momento ainda mais especial! ✨
                    </p>
                  </div>
                  <p className="text-green-600 text-lg mb-6">
                    Em breve entraremos em contato para confirmar os detalhes da entrega.
                  </p>
                  <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
                    <p className="text-green-800 font-semibold mb-2">
                      Aguarde nosso contato para os detalhes finais da entrega! 📞
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg"
                >
                  Voltar à Loja
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}