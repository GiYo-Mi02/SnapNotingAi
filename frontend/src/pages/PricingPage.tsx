import { useState } from 'react'
import { LogoSection } from '../components/LogoSection'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly')

  const pricingTiers = [
    {
      name: 'Free',
      description: 'Perfect for getting started',
      price: 0,
      period: '/month',
      features: [
        'Up to 5 capture sessions',
        'Basic AI summaries',
        'Quiz generation',
        'Basic history',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      description: 'For power users',
      price: billing === 'monthly' ? 9 : 90,
      period: billing === 'monthly' ? '/month' : '/year',
      features: [
        'Unlimited capture sessions',
        'Advanced AI summaries',
        'Priority quiz generation',
        'Full history & search',
        'Priority support',
        'Custom integrations',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For organizations',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'Custom integrations',
        'Dedicated support',
        'SLA guarantee',
        'Team management',
        'Advanced analytics',
      ],
      highlighted: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 animate-fadeIn">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-xl animate-slideInDown">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <LogoSection />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slideInUp">
          <h1 className="text-5xl font-bold text-white mb-4 animate-slideInUp">
            Choose the plan that fits your workflow
          </h1>
          <p className="text-lg text-slate-400 mb-8 animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Start free, upgrade when you're ready. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-slate-800/50 rounded-full p-1 animate-zoomIn" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setBilling('monthly')}
              className={`px-6 py-2 rounded-full font-medium transition-all transform hover:scale-105 ${
                billing === 'monthly'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 transform hover:scale-105 ${
                billing === 'yearly'
                  ? 'bg-white text-slate-900'
                  : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              Yearly
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded animate-pulse-soft">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto animate-stagger">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                tier.highlighted
                  ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-500/10 to-purple-500/5 shadow-2xl shadow-blue-500/20 scale-105 animate-bounce-soft'
                  : 'border border-slate-800/50 bg-gradient-to-br from-slate-900/60 to-slate-950/60 hover:border-slate-700'
              } p-8`}
            >
              {tier.highlighted && (
                <div className="mb-4 inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold animate-pulse-soft">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-slate-400 text-sm mb-6">{tier.description}</p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-5xl font-bold text-white">
                  {typeof tier.price === 'number' ? `$${tier.price}` : tier.price}
                </span>
                <span className="text-slate-400 ml-2">{tier.period}</span>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all mb-8 transform hover:scale-105 ${
                  tier.highlighted
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20'
                    : 'border border-slate-700 text-slate-100 hover:bg-slate-800 transition-colors'
                }`}
              >
                {tier.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </button>

              {/* Features */}
              <div className="space-y-4 animate-stagger">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3 animate-slideInLeft" style={{ animationDelay: `${featureIndex * 0.05}s` }}>
                    <CheckCircleIcon sx={{ fontSize: 20, color: '#10b981', marginTop: 0.25 }} />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <div className="mt-24 text-center animate-fadeIn" style={{ animationDelay: '0.5s' }}>
          <h2 className="text-2xl font-bold text-white mb-8 animate-slideInUp">Frequently Asked Questions</h2>
          <p className="text-slate-400 max-w-2xl mx-auto animate-slideInUp" style={{ animationDelay: '0.1s' }}>
            Have questions about our pricing? Contact our sales team at sales@snapnotesai.com or visit our help center for more information.
          </p>
        </div>
      </main>
    </div>
  )
}
