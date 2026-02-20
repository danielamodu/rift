'use client';

import { useState } from 'react';
import VendorDashboard from '@/components/vendor-dashboard';
import CheckoutPage from '@/components/checkout-page';

export default function Home() {
  const [activeView, setActiveView] = useState<'vendor' | 'checkout'>('vendor');
  const [paymentData, setPaymentData] = useState({
    itemName: '',
    amount: '',
  });

  const handleGenerateLink = (itemName: string, amount: string) => {
    setPaymentData({ itemName, amount });
    setActiveView('checkout');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {activeView === 'vendor' ? (
        <VendorDashboard onGenerateLink={handleGenerateLink} />
      ) : (
        <CheckoutPage
          itemName={paymentData.itemName}
          amount={paymentData.amount}
          onBack={() => setActiveView('vendor')}
        />
      )}
    </div>
  );
}
