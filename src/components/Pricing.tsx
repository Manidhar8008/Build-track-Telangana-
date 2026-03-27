import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight, Zap, Shield, Globe, Users } from 'lucide-react';
import { PRICING_PLANS } from '../constants';
import { cn } from '../lib/utils';

export default function Pricing() {
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleCheckout = async (plan: any) => {
    if (plan.price === 'Free') return;
    
    setLoading(plan.name);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName: plan.name,
          price: plan.price,
          period: plan.period,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Failed to start checkout. Please ensure STRIPE_SECRET_KEY is set in the environment.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Simple, Transparent <span className="text-orange-600 italic font-serif">Pricing</span></h1>
        <p className="text-gray-500 text-lg">
          Choose the plan that fits your construction needs. From individual homeowners to large-scale developers and investors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_PLANS.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "card p-8 flex flex-col relative",
              plan.highlight ? "border-orange-500 shadow-xl ring-1 ring-orange-500" : "hover:border-gray-300"
            )}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </div>
            )}
            
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500 text-sm">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => handleCheckout(plan)}
              disabled={loading !== null}
              className={cn(
                "w-full py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2",
                plan.highlight 
                  ? "bg-orange-600 text-white hover:bg-orange-700 shadow-lg shadow-orange-200" 
                  : "bg-gray-100 text-[#1A1A1A] hover:bg-gray-200",
                loading === plan.name && "opacity-50 cursor-not-allowed"
              )}
            >
              {loading === plan.name ? "Processing..." : plan.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Trust Section */}
      <div className="bg-white rounded-[40px] p-12 border border-[#E5E5E5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="font-bold mb-2">Secure Payments</h4>
          <p className="text-xs text-gray-500">Encrypted transactions via Razorpay/Stripe.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4">
            <Zap className="w-6 h-6" />
          </div>
          <h4 className="font-bold mb-2">Instant Access</h4>
          <p className="text-xs text-gray-500">Get Pro features immediately after upgrade.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-4">
            <Globe className="w-6 h-6" />
          </div>
          <h4 className="font-bold mb-2">Govt. Verified</h4>
          <p className="text-xs text-gray-500">Data sourced directly from TS Govt. portals.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h4 className="font-bold mb-2">24/7 Support</h4>
          <p className="text-xs text-gray-500">Dedicated helpdesk for all construction queries.</p>
        </div>
      </div>
    </div>
  );
}
