import { Product, Category } from '../types';

export const initialCategories: Category[] = [
  { id: '1', name: 'Bolos Tradicionais' },
  { id: '2', name: 'Bolos Gourmet' },
  { id: '3', name: 'Tortas' },
  { id: '4', name: 'Cupcakes' },
  { id: '5', name: 'Docinhos' },
  { id: '6', name: 'Pães & Salgados' }
];

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Bolo de Chocolate Gourmet',
    description: 'Delicioso bolo de chocolate com cobertura especial e recheio cremoso',
    price: 45.00,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bolos Gourmet'
  },
  {
    id: '2',
    name: 'Bolo Red Velvet',
    description: 'Clássico bolo americano com massa vermelha e cream cheese',
    price: 38.00,
    image: 'https://images.pexels.com/photos/1721932/pexels-photo-1721932.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bolos Tradicionais'
  },
  {
    id: '3',
    name: 'Torta de Limão',
    description: 'Torta cremosa de limão com merengue tostado',
    price: 32.00,
    image: 'https://images.pexels.com/photos/6879282/pexels-photo-6879282.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Tortas'
  },
  {
    id: '4',
    name: 'Cupcakes Variados',
    description: 'Kit com 6 cupcakes de sabores variados',
    price: 24.00,
    image: 'https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Cupcakes'
  },
  {
    id: '5',
    name: 'Brigadeiros Gourmet',
    description: 'Caixa com 15 brigadeiros artesanais de sabores especiais',
    price: 28.00,
    image: 'https://images.pexels.com/photos/8104149/pexels-photo-8104149.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Docinhos'
  },
  {
    id: '6',
    name: 'Bolo de Cenoura com Chocolate',
    description: 'Tradicional bolo de cenoura com cobertura de chocolate',
    price: 35.00,
    image: 'https://images.pexels.com/photos/1721942/pexels-photo-1721942.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bolos Tradicionais'
  }
];