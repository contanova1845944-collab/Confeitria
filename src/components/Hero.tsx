import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-orange-100 py-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-yellow-200 rounded-full opacity-40"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-white rounded-full px-6 py-3 shadow-lg">
              <Heart className="text-pink-500" size={24} />
              <span className="text-orange-800 font-semibold">Feito com Amor</span>
              <Sparkles className="text-yellow-500" size={24} />
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold text-orange-800 mb-6 font-serif leading-tight">
            Sabores que
            <span className="text-pink-600"> Encantam</span>
          </h2>
          
          <p className="text-xl text-orange-700 mb-8 max-w-2xl mx-auto font-medium">
            Descubra nossa seleção especial de bolos artesanais, tortas irresistíveis e docinhos que transformam qualquer momento em uma celebração única.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="bg-white rounded-lg p-6 shadow-xl border-4 border-pink-200 transform rotate-3">
              <p className="text-orange-800 font-bold text-lg mb-2">✨ Receitas Exclusivas</p>
              <p className="text-orange-600 text-sm">Desenvolvidas com ingredientes selecionados</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-xl border-4 border-yellow-200 transform -rotate-2">
              <p className="text-orange-800 font-bold text-lg mb-2">🚚 Entrega Rápida</p>
              <p className="text-orange-600 text-sm">Levamos até você com todo carinho</p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-xl border-4 border-orange-200 transform rotate-1">
              <p className="text-orange-800 font-bold text-lg mb-2">💝 Momentos Especiais</p>
              <p className="text-orange-600 text-sm">Tornando suas celebrações inesquecíveis</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}