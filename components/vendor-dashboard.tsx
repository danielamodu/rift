'use client';

import { useState } from 'react';
import { Copy, Check, Send, TrendingUp, ArrowRight } from 'lucide-react';
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
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#14F195] rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-[#2775CA] rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-[#1a1a1a]">
          <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#14F195] to-[#0fa876] flex items-center justify-center shadow-lg shadow-[#14F195]/50">
                <span className="text-black font-bold text-lg">◆</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">Rift</span>
            </div>
            <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-[#808080] font-mono">
              HN7c...3b9P
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <main className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Hero & Generator */}
          <div className="space-y-12">
            {/* Hero Text */}
            <div className="space-y-6">
              <div className="relative">
                <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tighter">
                  Payment
                  <br />
                  <span className="relative inline-block">
                    <span className="absolute inset-0 text-[#14F195] blur-xl opacity-50">Links</span>
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#14F195] via-white to-[#2775CA]">
                      Links
                    </span>
                  </span>
                </h1>
              </div>
              <p className="text-lg text-[#808080] max-w-sm leading-relaxed">
                One-click payment links for your social media business. Share instantly on Instagram, WhatsApp, or anywhere.
              </p>
            </div>

            {/* Generator Card */}
            <div className="space-y-6 bg-gradient-to-br from-[#0a0a0a]/80 to-[#000000]/40 border border-[#14F195]/20 rounded-2xl p-8 backdrop-blur-sm hover:border-[#14F195]/40 transition-all duration-500">
              {/* Amount Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-widest opacity-70">
                  Amount (USDC)
                </label>
                <div className="relative group">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full h-16 bg-black/50 border border-[#1a1a1a] text-white text-4xl font-black rounded-xl focus:border-[#14F195] focus:ring-2 focus:ring-[#14F195]/30 transition-all placeholder-[#404040]"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#808080] font-semibold">USDC</span>
                </div>
              </div>

              {/* Item Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-white uppercase tracking-widest opacity-70">
                  What are you selling?
                </label>
                <Input
                  type="text"
                  placeholder="e.g., iPhone 15 Pro, Design Service"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full h-12 bg-black/50 border border-[#1a1a1a] text-white rounded-xl focus:border-[#14F195] focus:ring-2 focus:ring-[#14F195]/30 transition-all placeholder-[#404040]"
                />
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerateLink}
                disabled={!amount || !itemName}
                className="w-full h-14 bg-gradient-to-r from-[#14F195] to-[#0fa876] hover:from-[#14F195]/90 hover:to-[#0fa876]/90 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-[#14F195]/30 text-base"
              >
                <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                Generate Link
              </Button>
            </div>
          </div>

          {/* Right Column: Activity & Stats */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-[#14F195]/10 to-transparent border border-[#14F195]/30 rounded-xl p-6 space-y-3 hover:border-[#14F195]/60 transition-all">
                <p className="text-[#14F195] text-sm font-bold uppercase tracking-wider">Total Revenue</p>
                <p className="text-3xl font-black">1,620</p>
                <p className="text-xs text-[#808080]">USDC earned</p>
              </div>
              <div className="bg-gradient-to-br from-[#2775CA]/10 to-transparent border border-[#2775CA]/30 rounded-xl p-6 space-y-3 hover:border-[#2775CA]/60 transition-all">
                <p className="text-[#2775CA] text-sm font-bold uppercase tracking-wider">Links Generated</p>
                <p className="text-3xl font-black">47</p>
                <p className="text-xs text-[#808080]">Total links</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-black">Recent Activity</h2>
                <p className="text-sm text-[#808080]">Your latest transactions</p>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {mockTransactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-[#14F195]/30 transition-all duration-300 group cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-semibold text-white group-hover:text-[#14F195] transition-colors">{tx.itemName}</p>
                        <p className="text-xs text-[#808080] mt-1">{tx.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{tx.amount}</p>
                        <span
                          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full mt-1.5 ${
                            tx.status === 'paid'
                              ? 'bg-[#14F195]/20 text-[#14F195] border border-[#14F195]/40'
                              : 'bg-[#1a1a1a] text-[#808080] border border-[#1a1a1a]'
                          }`}
                        >
                          {tx.status === 'paid' ? '✓ Paid' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Success Toast */}
        {showSuccess && generatedLink && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-[#14F195]/20 to-[#2775CA]/20 border border-[#14F195]/40 rounded-xl p-6 backdrop-blur-xl space-y-4 max-w-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#14F195] flex items-center justify-center">
                <Check className="w-5 h-5 text-black" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-white">{generatedLink.itemName}</p>
                <p className="text-sm text-[#808080]">{generatedLink.amount} USDC</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleCopyLink(generatedLink.id);
                  setShowSuccess(false);
                }}
                className="flex-1 bg-[#14F195] text-black font-bold py-2 rounded-lg hover:bg-[#14F195]/90 transition-all"
              >
                {copiedId === generatedLink.id ? 'Copied!' : 'Copy Link'}
              </button>
              <button
                onClick={() => {
                  onNavigateToCheckout(generatedLink.amount, generatedLink.itemName);
                  setShowSuccess(false);
                }}
                className="flex-1 bg-[#2775CA] text-white font-bold py-2 rounded-lg hover:bg-[#2775CA]/90 transition-all flex items-center justify-center gap-2"
              >
                Preview
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;
