'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Zap } from 'lucide-react';

interface CheckoutPageProps {
  itemName: string;
  amount: string;
  onBack: () => void;
}

export default function CheckoutPage({
  itemName,
  amount,
  onBack,
}: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handlePayWithSolanaPay = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        {/* Checkout Card */}
        <Card className="bg-card border border-border p-8 sm:p-10 space-y-8">
          {/* Item Details */}
          <div className="text-center space-y-6">
            <h2 className="text-muted-foreground text-sm sm:text-base font-medium">
              You&apos;re paying for
            </h2>
            <p className="text-foreground text-xl sm:text-2xl font-semibold text-balance">
              {itemName}
            </p>
          </div>

          {/* Amount Display */}
          <div className="text-center">
            <div className="text-6xl sm:text-7xl font-black text-primary">
              {amount}
            </div>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              USDC
            </p>
          </div>

          {/* Wallet Status */}
          {isWalletConnected && (
            <div className="flex items-center gap-2 bg-muted/50 border border-primary/20 rounded-lg px-4 py-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <p className="text-foreground text-xs sm:text-sm font-medium">
                Phantom wallet connected
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePayWithSolanaPay}
              disabled={isProcessing}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">⏳</span>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  {isWalletConnected ? 'Pay with Solana Pay' : 'Continue to Payment'}
                </span>
              )}
            </Button>

            {!isWalletConnected && (
              <Button
                onClick={handleConnectWallet}
                variant="outline"
                className="w-full bg-transparent border border-muted-foreground/30 text-foreground hover:bg-muted hover:border-primary py-3 sm:py-4 text-sm sm:text-base font-medium rounded-lg transition-all"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11z" />
                  </svg>
                  Connect Wallet
                </span>
              </Button>
            )}
          </div>

          {/* Trust Badge */}
          <div className="text-center border-t border-border pt-6">
            <p className="text-muted-foreground text-xs sm:text-sm">
              Secured by{' '}
              <span className="text-primary font-semibold">Solana</span>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
