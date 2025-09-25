import React, { useState } from 'react';
import { useCart } from './hooks/useCart';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { Product, Order, Category, ShopInfo } from './types';
import { initialProducts, initialCategories } from './data/initialData';

function App() {
  const cart = useCart();
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);
  const [categories, setCategories] = useLocalStorage<Category[]>('categories', initialCategories);
  const [orders, setOrders] = useLocalStorage<Order[]>('orders', []);
  const [shopInfo, setShopInfo] = useLocalStorage<ShopInfo>('shopInfo', {
    siteName: 'Ge Bolos Gourmet',
    logoUrl: '/WhatsApp Image 2025-09-23 at 19.50.39 (2).jpeg',
    phone: '+55 85 8412-8195',
    instagram: 'https://www.instagram.com/gebolosgoumet?igsh=ejBwNnp4ejhpMnd5'
  });
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleCheckout = () => {
    setShowCheckout(true);
    cart.setIsOpen(false);
  };

  const handleOrderComplete = (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      createdAt: new Date(),
      status: 'pending'
    };
    
    setOrders(prev => [newOrder, ...prev]);
    cart.clearCart();
    setShowCheckout(false);
  };

  const handleAdminLogin = (email: string, password: string): boolean => {
    if (email === 'grvidal03@gmail.com' && password === '08052003') {
      setIsAdminAuthenticated(true);
      setShowAdminLogin(false);
      setShowAdminPanel(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setShowAdminPanel(false);
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };
  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(prev => prev.map(product => 
      product.id === updatedProduct.id ? updatedProduct : product
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  const handleAddCategory = (categoryData: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories(prev => prev.filter(category => category.id !== categoryId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50">
      <Header 
        cartItemsCount={cart.getTotalItems()}
        onCartOpen={() => cart.setIsOpen(true)}
        shopInfo={shopInfo}
      />
      
      <Hero />
      
      <ProductGrid 
        products={products}
        categories={categories}
        onAddToCart={cart.addToCart}
      />

      <Cart
        isOpen={cart.isOpen}
        onClose={() => cart.setIsOpen(false)}
        items={cart.items}
        onUpdateQuantity={cart.updateQuantity}
        onRemoveItem={cart.removeFromCart}
        onCheckout={handleCheckout}
        totalPrice={cart.getTotalPrice()}
      />

      <Checkout
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={cart.items}
        totalPrice={cart.getTotalPrice()}
        onOrderComplete={handleOrderComplete}
      />

      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onLogin={handleAdminLogin}
      />

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        orders={orders}
        products={products}
        categories={categories}
        shopInfo={shopInfo}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onUpdateShopInfo={setShopInfo}
        onLogout={handleAdminLogout}
      />

      {/* Admin Access Button - discreto */}
      <button
        onClick={() => setShowAdminLogin(true)}
        className="fixed bottom-6 left-6 w-3 h-3 bg-gray-400 hover:bg-gray-600 rounded-full opacity-30 hover:opacity-60 transition-all duration-300"
        aria-label="Admin Access"
      />
      
      <footer className="bg-gradient-to-r from-orange-800 to-pink-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src={shopInfo.logoUrl} 
              alt={shopInfo.siteName} 
              className="h-16 w-16 rounded-full border-4 border-white shadow-lg"
            />
          </div>
          <h3 className="text-2xl font-bold mb-4 font-serif">{shopInfo.siteName}</h3>
          <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
            Transformando momentos especiais em memórias doces e inesquecíveis. 
            Cada bolo é uma obra de arte feita com amor e dedicação.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-orange-100">
            <p>📞 {shopInfo.phone}</p>
            <p>📍 Fortaleza, CE</p>
            <p>🕒 Segunda a Sábado: 8h às 18h</p>
          </div>
          <div className="mt-6 pt-6 border-t border-orange-700">
            <p className="text-orange-200 text-sm">
              © 2025 {shopInfo.siteName}. Todos os direitos reservados. Feito com ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;