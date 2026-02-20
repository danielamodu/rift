'use client';

import { useState } from 'react';
import VendorDashboard from '@/components/vendor-dashboard';
import CheckoutPage from '@/components/checkout-page';

export default function Home() {
  const [activeView, setActiveView] = useState<'vendor' | 'checkout'>('vendor');
  const [paymentData, setPaymentData] = useState({
    itemName: '',
    amount: 0,
  });

  const handleNavigateToCheckout = (amount: number, itemName: string) => {
    setPaymentData({ itemName, amount });
    setActiveView('checkout');
  };

  return (
    <>
      {activeView === 'vendor' ? (
        <VendorDashboard onNavigateToCheckout={handleNavigateToCheckout} />
      ) : (
        <CheckoutPage
          itemName={paymentData.itemName}
          amount={paymentData.amount}
          onBack={() => setActiveView('vendor')}
        />
      )}
    </>
  );
}
