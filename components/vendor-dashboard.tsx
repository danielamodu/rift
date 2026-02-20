'use client';

import { useState } from 'react';
import { Copy, Check, Send, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Transaction {
  id: string;
  itemName: string;
  amount: number;
  status: 'paid' | 'pending';
  timestamp: string;
  link: string;
}

const VendorDashboard = ({ onNavigateToCheckout }: { onNavigateToCheckout: (amount: number, itemName: string) => void }) => {
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<Transaction | null>(null);

  const mockTransactions: Transaction[] = [
    { id: '1', itemName: 'iPhone 15 Pro', amount: 850, status: 'paid', timestamp: '2 hours ago', link: 'rift.pay/abc123' },
    { id: '2', itemName: 'Product Bundle', amount: 120, status: 'paid', timestamp: '5 hours ago', link: 'rift.pay/def456' },
    { id: '3', itemName: 'Design Package', amount: 200, status: 'pending', timestamp: '1 hour ago', link: 'rift.pay/ghi789' },
  ];

  const handleGenerateLink = () => {
    if (!amount || !itemName) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      itemName,
      amount: parseFloat(amount),
      status: 'pending',
      timestamp: 'just now',
      link: `rift.pay/${Math.random().toString(36).substr(2, 6)}`,
    };

    setGeneratedLink(newTransaction);
    setAmount('');
    setItemName('');
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#000000] to-[#0a0a0a] pb-8">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-[#1a1a1a] bg-black/80 backdrop-blur-xl">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#14F195] to-[#0fa876] flex items-center justify-center">
              <span className="text-black text-xs font-bold">◆</span>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Rift</span>
          </div>
          <div className="px-3 py-1.5 bg-gradient-to-r from-[#14F195]/5 to-[#2775CA]/5 border border-[#1a1a1a] rounded-full text-xs text-[#808080] font-mono hover:border-[#14F195]/30 transition-colors">
            HN7c...3b9P
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto px-4 pt-8 space-y-8">
        {/* Hero Section */}
        <div className="slide-up space-y-4">
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white leading-tight">Generate Links</h1>
            <p className="text-[#808080] text-sm">Create payment links for your products instantly</p>
          </div>
        </div>

        {/* Generator Card */}
        <div className="slide-up bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-[#1a1a1a] rounded-2xl p-6 space-y-5 hover:border-[#14F195]/20 transition-all duration-500 shadow-2xl">
          {/* Amount Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-white uppercase tracking-widest opacity-70">Amount (USDC)</label>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#14F195]/10 to-[#2775CA]/10 rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#808080] text-lg">$</span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 h-14 bg-black border border-[#1a1a1a] text-white text-3xl font-bold rounded-xl focus:border-[#14F195] focus:ring-2 focus:ring-[#14F195]/30 transition-all placeholder-[#404040]"
              />
            </div>
          </div>

          {/* Item Name Input */}
          <div className="space-y-3">
            <label className="text-xs font-semibold text-white uppercase tracking-widest opacity-70">Item Description</label>
            <Input
              type="text"
              placeholder="What are you selling?"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="h-12 bg-black border border-[#1a1a1a] text-white rounded-xl focus:border-[#14F195] focus:ring-2 focus:ring-[#14F195]/30 transition-all placeholder-[#404040]"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerateLink}
            disabled={!amount || !itemName}
            className="w-full h-13 bg-gradient-to-r from-[#14F195] to-[#0fa876] hover:from-[#14F195]/90 hover:to-[#0fa876]/90 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-pulse shadow-lg hover:shadow-xl text-base"
          >
            <Send className="w-4 h-4 mr-2" />
            Generate Link
          </Button>
        </div>

        {/* Generated Link Display */}
        {generatedLink && (
          <div className="slide-up bg-gradient-to-br from-[#14F195]/15 to-[#2775CA]/15 border border-[#14F195]/40 rounded-2xl p-6 space-y-4 backdrop-blur-sm">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#14F195] uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="w-3 h-3" /> New Link Ready
              </p>
              <h3 className="text-2xl font-bold text-white">{generatedLink.itemName}</h3>
              <p className="text-2xl font-bold text-[#14F195]">{generatedLink.amount.toFixed(2)} USDC</p>
            </div>

            <div className="flex items-center gap-2 bg-black/40 border border-[#14F195]/30 rounded-xl p-3.5 backdrop-blur-sm">
              <code className="flex-1 text-xs text-[#14F195] font-mono font-semibold">{generatedLink.link}</code>
              <button
                onClick={() => handleCopyLink(generatedLink.link, generatedLink.id)}
                className="p-2 hover:bg-[#14F195]/10 rounded-lg transition-all hover:text-[#14F195]"
              >
                {copiedId === generatedLink.id ? (
                  <Check className="w-4 h-4 text-[#14F195]" />
                ) : (
                  <Copy className="w-4 h-4 text-[#14F195]/60" />
                )}
              </button>
            </div>

            <Button
              onClick={() => onNavigateToCheckout(generatedLink.amount, generatedLink.itemName)}
              className="w-full bg-[#2775CA] hover:bg-[#2775CA]/90 text-white rounded-xl font-semibold transition-all shadow-lg"
            >
              Preview as Buyer
            </Button>
          </div>
        )}

        {/* Recent Activity Section */}
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-white">Recent Activity</h2>
            <p className="text-xs text-[#808080] mt-1">Your latest payments</p>
          </div>

          <div className="space-y-2">
            {mockTransactions.map((tx) => (
              <div
                key={tx.id}
                className="bg-gradient-to-r from-[#0a0a0a] to-[#000000] border border-[#1a1a1a] rounded-xl p-4 hover:border-[#14F195]/30 hover:shadow-lg hover:shadow-[#14F195]/10 transition-all duration-300 flex items-center justify-between group cursor-pointer"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white group-hover:text-[#14F195] transition-colors">{tx.itemName}</p>
                  <p className="text-xs text-[#808080]">{tx.timestamp}</p>
                </div>

                <div className="text-right space-y-1">
                  <p className="text-sm font-bold text-white">{tx.amount.toFixed(2)} USDC</p>
                  <div className="flex gap-2 items-center justify-end">
                    {tx.status === 'paid' ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#14F195]/20 to-[#14F195]/10 text-[#14F195] border border-[#14F195]/30">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#1a1a1a] text-[#808080] border border-[#1a1a1a]">
                        Pending
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
