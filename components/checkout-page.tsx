'use client';

import { useState } from 'react';
import { ArrowLeft, Zap, Check, Wallet, Lock } from 'lucide-react';
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
    }, 2500);
  };

  const handleConnectWallet = () => {
    setIsWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#14F195] rounded-full blur-3xl mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#2775CA] rounded-full blur-3xl mix-blend-screen" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-[#1a1a1a] backdrop-blur-xl bg-black/40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-all group"
          >
            <ArrowLeft className="w-5 h-5 text-[#808080] group-hover:text-white transition-colors group-hover:-translate-x-0.5" />
          </button>
          <p className="text-sm text-[#808080]">Payment</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Checkout Layout */}
          {!isComplete ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Left: Item Details */}
              <div className="md:col-span-2 space-y-8">
                {/* Item Card */}
                <div className="space-y-6 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm hover:border-[#14F195]/30 transition-all duration-500">
                  <div className="space-y-3">
                    <p className="text-[#808080] text-sm font-bold uppercase tracking-widest">You&apos;re buying</p>
                    <h1 className="text-5xl md:text-6xl font-black leading-tight">{itemName}</h1>
                  </div>

                  {/* Description */}
                  <p className="text-[#808080] leading-relaxed">
                    Secure payment via Solana blockchain. Instant settlement to your wallet.
                  </p>
                </div>

                {/* Amount Breakdown */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[#808080] text-sm">
                    <span>Subtotal</span>
                    <span>{amount.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex items-center justify-between text-[#808080] text-sm">
                    <span>Network Fee</span>
                    <span className="text-[#14F195]">FREE</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-transparent via-[#1a1a1a] to-transparent" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-4xl font-black text-[#14F195]">{amount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Right: Payment Actions */}
              <div className="space-y-4">
                {/* Wallet Status Card */}
                {isWalletConnected && (
                  <div className="bg-gradient-to-br from-[#14F195]/15 to-transparent border border-[#14F195]/40 rounded-2xl p-6 space-y-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
                      <p className="text-sm font-bold text-white">Wallet Ready</p>
                    </div>
                    <p className="text-xs text-[#808080]">Phantom wallet connected and ready to process payment</p>
                  </div>
                )}

                {/* Pay Button */}
                <Button
                  onClick={handlePayWithSolanaPay}
                  disabled={isProcessing}
                  className="w-full h-14 bg-gradient-to-r from-[#14F195] to-[#0fa876] hover:from-[#14F195]/90 hover:to-[#0fa876]/90 text-black font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#14F195]/30 group text-base"
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="relative w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      <Zap className="w-5 h-5" />
                      {isWalletConnected ? 'Pay Now' : 'Continue'}
                    </span>
                  )}
                </Button>

                {/* Connect Wallet Button */}
                {!isWalletConnected && (
                  <Button
                    onClick={handleConnectWallet}
                    className="w-full h-12 bg-[#2775CA] hover:bg-[#2775CA]/90 text-white font-semibold rounded-xl transition-all group"
                  >
                    <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all">
                      <Wallet className="w-5 h-5" />
                      Connect Wallet
                    </span>
                  </Button>
                )}

                {/* Security Info */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#808080]">
                    <Lock className="w-4 h-4 text-[#14F195]" />
                    <span>Secured by Solana</span>
                  </div>
                  <p className="text-xs text-[#808080]">Your payment is protected by blockchain technology</p>
                </div>
              </div>
            </div>
          ) : (
            // Success Screen
            <div className="flex flex-col items-center justify-center text-center space-y-8 py-12">
              <div className="relative">
                <div className="absolute inset-0 bg-[#14F195]/20 rounded-full blur-3xl" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#14F195] to-[#0fa876] flex items-center justify-center">
                  <Check className="w-12 h-12 text-black animate-bounce" />
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <h2 className="text-4xl font-black">Payment Confirmed</h2>
                <p className="text-[#808080]">Your {amount.toFixed(2)} USDC has been sent successfully</p>
              </div>

              <div className="space-y-3 w-full">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#808080]">Amount</span>
                    <span className="font-bold">{amount.toFixed(2)} USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#808080]">Status</span>
                    <span className="text-[#14F195] font-bold">Confirmed</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#808080]">Network</span>
                    <span className="font-bold">Solana</span>
                  </div>
                </div>

                <Button
                  onClick={onBack}
                  className="w-full bg-[#2775CA] hover:bg-[#2775CA]/90 text-white font-semibold py-3 rounded-xl transition-all"
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
