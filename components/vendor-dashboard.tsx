'use client';

import { useState } from 'react';
import { Copy, Check, Plus, Zap, Share2, MoreHorizontal, TrendingUp, ArrowRight, Smartphone, Gift, Briefcase, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Transaction {
  id: string;
  itemName: string;
  amount: number;
  status: 'paid' | 'pending';
  timestamp: string;
}

const VendorDashboard = ({ onNavigateToCheckout }: { onNavigateToCheckout: (amount: number, itemName: string) => void }) => {
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<Transaction | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const quickProducts = [
    { id: 'p1', name: 'Electronics', amount: 1245.30, icon: Smartphone, color: 'from-purple-500 to-purple-600' },
    { id: 'p2', name: 'Services', amount: 540.00, icon: Briefcase, color: 'from-blue-500 to-blue-600' },
    { id: 'p3', name: 'Gifts & More', amount: 600.00, icon: Gift, color: 'from-green-500 to-green-600' },
    { id: 'p4', name: 'Design Work', amount: 1080.50, icon: Palette, color: 'from-orange-500 to-orange-600' },
  ];

  const mockTransactions: Transaction[] = [
    { id: '1', itemName: 'iPhone 15 Pro', amount: 850, status: 'paid', timestamp: '2h ago' },
    { id: '2', itemName: 'Product Bundle', amount: 120, status: 'paid', timestamp: '5h ago' },
    { id: '3', itemName: 'Design Package', amount: 200, status: 'pending', timestamp: '1h ago' },
    { id: '4', itemName: 'Affiliate Package', amount: 450, status: 'paid', timestamp: '1d ago' },
  ];

  const handleGenerateLink = () => {
    if (!amount || !itemName) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      itemName,
      amount: parseFloat(amount),
      status: 'pending',
      timestamp: 'just now',
    };

    setGeneratedLink(newTransaction);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setAmount('');
    setItemName('');
  };

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`rift.pay/${id}`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Main Balance */}
        <div className="space-y-3">
          <p className="text-gray-600 text-sm">Main balance</p>
          <div className="flex items-baseline justify-between">
            <h1 className="text-6xl font-black">$3,465.80</h1>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
              <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all font-semibold">
            <Plus className="w-5 h-5" />
            Add
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all font-semibold">
            <Zap className="w-5 h-5" />
            Move
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all font-semibold">
            <Share2 className="w-5 h-5" />
            Send
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all font-semibold">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Actions Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Quick actions</h2>
            <button className="text-[#14F195] text-sm font-semibold hover:opacity-80">Edit</button>
          </div>

          {/* Colorful Cards Grid */}
          <div className="grid grid-cols-2 gap-4">
            {quickProducts.map((product) => {
              const Icon = product.icon;
              return (
                <button
                  key={product.id}
                  onClick={() => {
                    setItemName(product.name);
                    setAmount(product.amount.toString());
                    handleGenerateLink();
                  }}
                  className={`bg-gradient-to-br ${product.color} rounded-2xl p-6 text-white font-bold space-y-4 hover:shadow-lg hover:shadow-current/50 transition-all transform hover:scale-105 cursor-pointer group`}
                >
                  <div className="flex items-start justify-between">
                    <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-all">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm opacity-90">{product.name}</p>
                    <p className="text-2xl font-black">${product.amount.toFixed(2)}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4 pb-12">
          <h2 className="text-lg font-bold">Latest transactions</h2>
          <div className="space-y-3">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                <div className="flex-1">
                  <p className="font-semibold">{tx.itemName}</p>
                  <p className="text-xs text-gray-600">{tx.timestamp}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${tx.amount.toFixed(2)}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1 ${
                    tx.status === 'paid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {tx.status === 'paid' ? '✓ Paid' : 'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default VendorDashboard;
