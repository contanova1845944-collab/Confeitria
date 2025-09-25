import React, { useState } from 'react';
import { X, Lock, User } from 'lucide-react';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => boolean;
}

export default function AdminLogin({ isOpen, onClose, onLogin }: AdminLoginProps) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = onLogin(credentials.email, credentials.password);
    if (!success) {
      setError('Email ou senha incorretos');
    } else {
      setCredentials({ email: '', password: '' });
    }
  };

  const handleClose = () => {
    setCredentials({ email: '', password: '' });
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose} />
      
      <div className="absolute inset-4 md:inset-20 lg:inset-32 bg-white rounded-xl shadow-2xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Acesso Administrativo</h2>
            <button
              onClick={handleClose}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-6">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                  <User size={18} />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="admin@email.com"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-2">
                  <Lock size={18} />
                  <span>Senha</span>
                </label>
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold transition-colors"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}