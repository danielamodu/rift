'use client';

import { useState } from 'react';
import { ArrowLeft, Zap, Check, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CheckoutPageProps {
  itemName: string;
  amount: number;
  onBack: () => void;
}

export default function CheckoutPage({ itemName, amount, onBack }: CheckoutPageProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handlePayWithSolanaPay = () => {
    if (!isWalletConnected) {
      setIsWalletConnected(true);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#000000] to-[#0a0a0a] flex flex-col items-center justify-center px-4 py-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 flex items-center gap-2 text-[#808080] hover:text-white transition-colors text-sm group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      {/* Checkout Card */}
      <div className="w-full max-w-md slide-up">
        <div className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-[#1a1a1a] rounded-2xl p-8 sm:p-10 space-y-8 shadow-2xl">
          {/* Item Details */}
          <div className="text-center space-y-4">
            <h2 className="text-[#808080] text-xs sm:text-sm font-semibold uppercase tracking-widest">
              Ready to pay
            </h2>
            <p className="text-white text-2xl sm:text-3xl font-bold leading-tight text-balance">
              {itemName}
            </p>
          </div>

          {/* Amount Display - Big & Bold */}
          <div className="text-center bg-gradient-to-br from-[#14F195]/10 to-[#2775CA]/10 border border-[#14F195]/30 rounded-2xl py-8 px-4">
            <p className="text-[#14F195] text-xs font-semibold uppercase tracking-wider mb-2">Amount</p>
            <div className="text-6xl sm:text-7xl font-black text-white leading-none">
              {amount.toFixed(2)}
            </div>
            <p className="text-[#14F195] text-base sm:text-lg font-bold mt-3">USDC</p>
          </div>

          {/* Wallet Status */}
          {isWalletConnected && !isComplete && (
            <div className="flex items-center gap-3 bg-[#14F195]/10 border border-[#14F195]/40 rounded-xl px-4 py-3.5 animate-fade-in">
              <div className="w-2.5 h-2.5 rounded-full bg-[#14F195] animate-pulse" />
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold">Wallet Connected</p>
                <p className="text-[#808080] text-xs">Phantom • Ready to pay</p>
              </div>
            </div>
          )}

          {/* Success State */}
          {isComplete && (
            <div className="flex flex-col items-center justify-center bg-gradient-to-br from-[#14F195]/10 to-[#2775CA]/10 border border-[#14F195]/40 rounded-xl py-8 px-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-[#14F195]/20 flex items-center justify-center mb-4 animate-bounce">
                <Check className="w-8 h-8 text-[#14F195]" />
              </div>
              <p className="text-white text-lg sm:text-xl font-bold text-center">Payment Complete!</p>
              <p className="text-[#808080] text-xs sm:text-sm mt-2 text-center">Transaction confirmed on Solana</p>
            </div>
          )}

          {/* Action Buttons */}
          {!isComplete && (
            <div className="space-y-3">
              <Button
                onClick={handlePayWithSolanaPay}
                disabled={isProcessing}
                className="w-full h-14 bg-gradient-to-r from-[#14F195] to-[#0fa876] hover:from-[#14F195]/90 hover:to-[#0fa876]/90 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-pulse shadow-lg text-base sm:text-lg"
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
                  className="w-full h-12 bg-[#2775CA] hover:bg-[#2775CA]/90 text-white font-semibold rounded-xl transition-all shadow-lg text-base"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5" />
                    Connect Wallet
                  </span>
                </Button>
              )}
            </div>
          )}

          {/* Trust Badge */}
          <div className="text-center border-t border-[#1a1a1a] pt-6">
            <p className="text-[#808080] text-xs sm:text-sm font-medium">
              Secured by <span className="text-[#14F195] font-bold">Solana</span>
            </p>
            <p className="text-[#404040] text-xs mt-2">Fast, secure, and zero fees</p>
          </div>
        </div>
      </div>
    </div>
  );
}
