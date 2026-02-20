'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Copy, Check } from 'lucide-react';

interface Transaction {
  id: string;
  itemName: string;
  amount: string;
  status: 'Paid' | 'Pending';
  timestamp: string;
  link: string;
}

interface VendorDashboardProps {
  onGenerateLink: (itemName: string, amount: string) => void;
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    itemName: 'iPhone 15 Pro Case',
    amount: '45.50',
    status: 'Paid',
    timestamp: '2 hours ago',
    link: 'https://rift.pay/link-abc123',
  },
  {
    id: '2',
    itemName: 'Instagram Promo Package',
    amount: '100.00',
    status: 'Paid',
    timestamp: '5 hours ago',
    link: 'https://rift.pay/link-def456',
  },
  {
    id: '3',
    itemName: 'Design Service',
    amount: '75.25',
    status: 'Pending',
    timestamp: '1 day ago',
    link: 'https://rift.pay/link-ghi789',
  },
  {
    id: '4',
    itemName: 'Hair Styling Session',
    amount: '30.00',
    status: 'Paid',
    timestamp: '2 days ago',
    link: 'https://rift.pay/link-jkl012',
  },
];

export default function VendorDashboard({ onGenerateLink }: VendorDashboardProps) {
  const [amount, setAmount] = useState('');
  const [itemName, setItemName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleGenerateLink = () => {
    if (!amount || !itemName) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onGenerateLink(itemName, amount);
      setAmount('');
      setItemName('');
    }, 500);
  };

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border px-4 py-4 sm:px-6 sm:py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground font-sans">
            Rift
          </h1>
          <div className="bg-muted px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm text-muted-foreground font-mono">
            HN7c...3b9P
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Hero Generator Card */}
          <Card className="bg-card border border-border p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  Amount (USDC)
                </label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-3xl sm:text-4xl font-bold bg-muted border-0 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary py-4 sm:py-6 text-right pr-4"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg sm:text-xl text-muted-foreground font-semibold">
                    USDC
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-muted-foreground mb-2">
                  Item Name / Description
                </label>
                <Input
                  type="text"
                  placeholder="e.g., iPhone Case, Promo Package"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="bg-muted border-0 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary py-3 px-4"
                />
              </div>

              <Button
                onClick={handleGenerateLink}
                disabled={!amount || !itemName || isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg"
              >
                {isLoading ? 'Generating...' : 'Generate Payment Link'}
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {MOCK_TRANSACTIONS.map((tx) => (
                <Card
                  key={tx.id}
                  className="bg-card border border-border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="text-foreground font-medium text-sm sm:text-base truncate">
                      {tx.itemName}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {tx.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6">
                    <div className="text-right">
                      <p className="text-foreground font-semibold text-sm sm:text-base">
                        {tx.amount} USDC
                      </p>
                      <span
                        className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                          tx.status === 'Paid'
                            ? 'bg-primary/20 text-primary'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </div>

                    <button
                      onClick={() => handleCopyLink(tx.link, tx.id)}
                      className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                    >
                      {copiedId === tx.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
