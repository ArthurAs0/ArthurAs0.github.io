import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { 
  Check, 
  X, 
  Star,
  ArrowRight,
  Download,
  Share2,
  FileText,
  Palette,
  Shield,
  BarChart3,
  Users,
  Crown,
  Zap
} from 'lucide-react';

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  popular?: boolean;
  features: {
    name: string;
    included: boolean;
    description?: string;
  }[];
  limitations?: string[];
  cta: string;
  highlight?: string;
}

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ResumeBuilder Pro",
    "description": "Professional resume builder with multiple pricing plans",
    "offers": [
      {
        "@type": "Offer",
        "name": "Free Plan",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Basic resume building features"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "9.99",
        "priceCurrency": "USD",
        "billingIncrement": "monthly",
        "description": "Advanced features for professional resume building"
      },
      {
        "@type": "Offer",
        "name": "Premium Plan",
        "price": "19.99",
        "priceCurrency": "USD",
        "billingIncrement": "monthly",
        "description": "Complete resume building suite with analytics"
      }
    ]
  };

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      description: 'Perfect for getting started with basic resume building',
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { name: 'Basic resume builder', included: true },
        { name: '3 template designs', included: true },
        { name: 'PDF download', included: true },
        { name: 'Basic customization', included: true },
        { name: 'Public resume link', included: false },
        { name: 'Analytics dashboard', included: false },
        { name: 'Premium templates', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom branding', included: false }
      ],
      limitations: ['1 resume', 'Basic templates only', 'Watermark on PDF'],
      cta: 'Get Started Free'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Ideal for job seekers who want professional features',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99,
      popular: true,
      features: [
        { name: 'Advanced resume builder', included: true },
        { name: 'All template designs', included: true },
        { name: 'Unlimited PDF downloads', included: true },
        { name: 'Advanced customization', included: true },
        { name: 'Public resume links', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Premium templates', included: true },
        { name: 'Email support', included: true },
        { name: 'Custom branding', included: false }
      ],
      limitations: ['5 resumes', 'Basic analytics'],
      cta: 'Start Pro Trial',
      highlight: 'Most Popular'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'For professionals who need advanced features and analytics',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      features: [
        { name: 'Full resume builder suite', included: true },
        { name: 'All template designs', included: true },
        { name: 'Unlimited everything', included: true },
        { name: 'Complete customization', included: true },
        { name: 'Advanced public links', included: true },
        { name: 'Detailed analytics', included: true },
        { name: 'Exclusive templates', included: true },
        { name: 'Priority support', included: true },
        { name: 'Custom branding', included: true }
      ],
      cta: 'Go Premium'
    }
  ];

  const getPrice = (plan: PricingPlan) => {
    return isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  };

  const getSavings = (plan: PricingPlan) => {
    if (plan.monthlyPrice === 0) return 0;
    const monthlyTotal = plan.monthlyPrice * 12;
    const savings = monthlyTotal - plan.yearlyPrice;
    return Math.round((savings / monthlyTotal) * 100);
  };

  return (
    <>
      <SEO
        title="Resume Builder Pricing - Choose Your Perfect Plan"
        description="Flexible pricing plans for professional resume building. Start free or upgrade to Pro/Premium for advanced features. No hidden fees, cancel anytime."
        keywords="resume builder pricing, subscription plans, professional resume tools, career services pricing, resume templates cost"
        canonicalUrl="https://resumebuilder.pro/pricing"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-softyellowaccent rounded-full">
            <span className="font-paragraph text-sm text-primary font-medium">
              Simple, Transparent Pricing
            </span>
          </div>
          
          <h1 className="font-heading text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Choose the Perfect Plan for Your Career
          </h1>
          
          <p className="font-paragraph text-xl text-primary/70 leading-relaxed max-w-3xl mx-auto">
            Start building professional resumes for free, then upgrade when you need 
            advanced features. No hidden fees, cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <span className={`font-paragraph ${!isYearly ? 'text-primary font-medium' : 'text-primary/70'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`font-paragraph ${isYearly ? 'text-primary font-medium' : 'text-primary/70'}`}>
              Yearly
            </span>
            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
              Save up to 17%
            </Badge>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative p-8 bg-background border transition-all duration-300 hover:shadow-lg ${
                plan.popular 
                  ? 'border-primary shadow-lg scale-105' 
                  : 'border-secondary/20 hover:border-secondary/40'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    {plan.highlight}
                  </Badge>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="font-paragraph text-primary/70 mb-6">
                  {plan.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex items-baseline justify-center">
                    <span className="font-heading text-4xl font-bold text-primary">
                      ${getPrice(plan)}
                    </span>
                    {plan.monthlyPrice > 0 && (
                      <span className="font-paragraph text-primary/70 ml-2">
                        /{isYearly ? 'year' : 'month'}
                      </span>
                    )}
                  </div>
                  
                  {isYearly && plan.monthlyPrice > 0 && getSavings(plan) > 0 && (
                    <p className="font-paragraph text-sm text-secondary">
                      Save {getSavings(plan)}% with yearly billing
                    </p>
                  )}
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-primary/30 flex-shrink-0 mt-0.5" />
                    )}
                    <span className={`font-paragraph text-sm ${
                      feature.included ? 'text-primary' : 'text-primary/50'
                    }`}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Limitations */}
              {plan.limitations && (
                <div className="mb-6 p-3 bg-secondary/5 rounded-lg">
                  <p className="font-paragraph text-xs text-primary/70 mb-2">Limitations:</p>
                  <ul className="space-y-1">
                    {plan.limitations.map((limitation, index) => (
                      <li key={index} className="font-paragraph text-xs text-primary/60">
                        • {limitation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA Button */}
              <Link to="/dashboard">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-secondary text-primary-foreground hover:bg-secondary/90'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="w-full bg-secondary/5 py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-heading text-4xl font-bold text-primary">
              Compare All Features
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
              See exactly what's included in each plan to make the best choice for your needs.
            </p>
          </div>

          {/* Feature Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg border border-secondary/20">
              <thead>
                <tr className="border-b border-secondary/20">
                  <th className="text-left p-6 font-heading text-lg font-semibold text-primary">
                    Features
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.id} className="text-center p-6">
                      <div className="space-y-2">
                        <h3 className="font-heading text-lg font-semibold text-primary">
                          {plan.name}
                        </h3>
                        <p className="font-paragraph text-sm text-primary/70">
                          ${getPrice(plan)}{plan.monthlyPrice > 0 ? `/${isYearly ? 'year' : 'month'}` : ''}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Resume Builder', free: 'Basic', pro: 'Advanced', premium: 'Full Suite' },
                  { name: 'Templates', free: '3', pro: 'All', premium: 'All + Exclusive' },
                  { name: 'PDF Downloads', free: 'Limited', pro: 'Unlimited', premium: 'Unlimited' },
                  { name: 'Public Links', free: '✗', pro: '✓', premium: '✓ Advanced' },
                  { name: 'Analytics', free: '✗', pro: 'Basic', premium: 'Detailed' },
                  { name: 'Support', free: 'Community', pro: 'Email', premium: 'Priority' },
                  { name: 'Custom Branding', free: '✗', pro: '✗', premium: '✓' }
                ].map((feature, index) => (
                  <tr key={index} className="border-b border-secondary/10 last:border-b-0">
                    <td className="p-6 font-paragraph text-primary font-medium">
                      {feature.name}
                    </td>
                    <td className="p-6 text-center font-paragraph text-primary/70">
                      {feature.free}
                    </td>
                    <td className="p-6 text-center font-paragraph text-primary/70">
                      {feature.pro}
                    </td>
                    <td className="p-6 text-center font-paragraph text-primary/70">
                      {feature.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-heading text-4xl font-bold text-primary">
            Frequently Asked Questions
          </h2>
          <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
            Have questions about our pricing? We've got answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: "Can I change plans anytime?",
              answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences."
            },
            {
              question: "Is there a free trial?",
              answer: "Yes! Our Pro plan comes with a 14-day free trial. No credit card required to start, and you can cancel anytime during the trial."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit cards (Visa, MasterCard, American Express) and PayPal for your convenience."
            },
            {
              question: "Can I cancel my subscription?",
              answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
            },
            {
              question: "Do you offer refunds?",
              answer: "We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us for a full refund within 30 days."
            },
            {
              question: "Is my data secure?",
              answer: "Yes, we use enterprise-grade security measures including SSL encryption and secure data centers to protect your information."
            }
          ].map((faq, index) => (
            <Card key={index} className="p-6 bg-background border border-secondary/20">
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                {faq.question}
              </h3>
              <p className="font-paragraph text-primary/70 leading-relaxed">
                {faq.answer}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-[120rem] mx-auto px-6 text-center space-y-8">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Ready to Build Your Professional Resume?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our resume builder. 
            Start free, upgrade when you need more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
              >
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4"
            >
              View All Features
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}