
import React from 'react';
import { Button } from '../../components/ui/button';
import { ArrowRight, ShoppingCart, MessageCircle, TrendingUp, Repeat, BarChart, CheckCircle, AlertTriangle } from 'lucide-react';
import { Helmet } from 'react-helmet';


const Section = ({ title, subtitle, children, titleClassName = "text-4xl md:text-5xl" }) => (
    <section className="py-16 border-b border-luxury-grid-divider">
        <div className="max-w-4xl mx-auto text-center">
            {title && <h2 className={`${titleClassName} font-bold text-luxury-text-heading mb-4`}>{title}</h2>}
            {subtitle && <p className="text-xl text-luxury-text-body max-w-3xl mx-auto">{subtitle}</p>}
            {title && <div className="w-24 h-1.5 gradient-ai mx-auto mt-6 mb-12 rounded-full"></div>}
        </div>
        <div className="max-w-5xl mx-auto px-6">
            {children}
        </div>
    </section>
);

const BenefitCard = ({ icon, title, description, stat }) => (
    <div className="bg-luxury-bg-secondary p-8 rounded-lg border border-luxury-grid-divider luxury-card flex flex-col">
        <div className="flex-grow">
            <div className="flex items-center space-x-4 mb-4">
                {icon}
                <h3 className="text-2xl font-bold text-luxury-text-heading">{title}</h3>
            </div>
            <p className="text-luxury-text-body">{description}</p>
        </div>
        {stat && <p className="text-2xl font-bold gradient-ai-text mt-6">{stat}</p>}
    </div>
);

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a WhatsApp Sales Agent for eCommerce?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A WhatsApp Sales Agent is an AI-powered assistant that engages customers on WhatsApp to answer pre-purchase questions, recover abandoned carts, offer personalized recommendations, and drive sales for eCommerce businesses in the UAE. It automates conversations to boost conversion rates and customer satisfaction."
      }
    },
    {
      "@type": "Question",
      "name": "How does a WhatsApp agent help with abandoned carts in the UAE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It automatically sends timely reminders, special offers, or stock notices to customers in the UAE who have left items in their shopping cart. With WhatsApp's high open rates (over 90%), this method is highly effective, recovering up to 30% more orders compared to traditional email-only follow-ups."
      }
    },
    {
      "@type": "Question",
      "name": "Is a WhatsApp Sales Agent effective for driving repeat purchases?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. It can send smart reminders for product refills, share promotions for UAE-specific events like Ramadan or Eid, and offer exclusive deals to loyal customers. This keeps your brand top-of-mind and significantly increases customer Lifetime Value (LTV)."
      }
    },
    {
      "@type": "Question",
      "name": "What are the benefits of using a WhatsApp agent with Click-to-WhatsApp (CTWA) ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "By providing an instant, automated response to leads from Facebook and Instagram CTWA ads, a WhatsApp agent engages customers while their interest is highest. This immediate interaction qualifies leads and pushes them towards a purchase, leading to 2-3x higher conversion rates compared to manual follow-ups."
      }
    }
  ]
};

export default function WhatsAppSalesAgentEcommerce() {
  const metaTitle = "Boost eCommerce Sales in UAE (2025) with a WhatsApp Sales Agent | Ailutions";
  const metaDescription = "Learn 5 ways a WhatsApp Sales Agent can recover abandoned carts, answer questions instantly, and increase your eCommerce revenue in the UAE. Boost sales by 30% or more.";

  return (
    <div className="bg-luxury-bg-primary text-luxury-text-primary">
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <script type="application/ld+json">{JSON.stringify(faqData)}</script>
      </Helmet>
      
       <header className="sticky top-0 z-50 w-full border-b border-luxury-grid-divider bg-luxury-bg-primary/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
                  alt="Ailutions Logo" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
                <a href="/#problem" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Problems We Solve</a>
                <a href="/#services" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">How It Works</a>
                <a href="/case-studies" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Results</a>
                <Button onClick={() => window.location.href = '/#contact'} className="btn-primary btn-small rounded-full">
                  Get Started
                </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero */}
        <div className="text-center py-20 px-6 bg-luxury-bg-secondary border-b border-luxury-grid-divider">
            <h1 className="text-4xl md:text-6xl font-bold text-luxury-text-heading leading-tight">
                5 Ways a WhatsApp Sales Agent Can 
                <span className="gradient-ai-text block">Boost eCommerce Sales in UAE (2025)</span>
            </h1>
            <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
                In a market where WhatsApp open rates are 98%, not using it for sales is leaving money on the table. Here’s how an AI assistant can help you sell more.
            </p>
        </div>

        {/* 5 Ways Section */}
        <Section title="5 Proven Ways to Sell More in 2025" subtitle="An AI-powered WhatsApp agent engages customers, answers questions, and nudges them to buy—24/7.">
            <div className="grid md:grid-cols-1 gap-8">
                <BenefitCard
                    icon={<ShoppingCart className="w-10 h-10 text-luxury-ai-start" />}
                    title="1. Recover Abandoned Carts"
                    description="Automatically send a reminder, a discount, or a limited stock notice to win back customers. With 60-70% cart abandonment in MENA, this is your lowest-hanging fruit."
                    stat="Recover up to 30% more orders vs. email alone."
                />
                <BenefitCard
                    icon={<MessageCircle className="w-10 h-10 text-luxury-ai-start" />}
                    title="2. Answer Pre-Purchase Questions Instantly"
                    description="Customers hesitate when they can't get clarity on size, delivery, or payment. Instead of making them wait, the agent responds in seconds, preventing drop-offs."
                    stat="79% of UAE shoppers abandon a purchase if they don’t get answers quickly."
                />
                <BenefitCard
                    icon={<TrendingUp className="w-10 h-10 text-luxury-ai-start" />}
                    title="3. Personalized Upselling & Cross-Selling"
                    description="Like a personal shopper, the agent suggests relevant items based on browsing history or items in the cart—sneakers with socks, skincare with bundles. "
                    stat="Lift average order value by 20-30%."
                />
                <BenefitCard
                    icon={<Repeat className="w-10 h-10 text-luxury-ai-start" />}
                    title="4. Drive Repeat Purchases with Smart Reminders"
                    description="Lifetime value beats one-time sales. The agent sends refill reminders, seasonal promos for Eid or DSF, and exclusive deals to keep your brand top-of-mind and build loyalty."
                    stat="Increase repeat purchase rate and customer LTV."
                />
                <BenefitCard
                    icon={<BarChart className="w-10 h-10 text-luxury-ai-start" />}
                    title="5. Closing Sales from Ads (Click-to-WhatsApp)"
                    description="Instead of routing CTWA leads to busy human agents, the AI replies instantly, qualifies the lead, and pushes the sale forward while interest is highest."
                    stat="See 2-3x higher conversion from ads vs. traditional lead forms."
                />
            </div>
        </Section>
        
        {/* Real Example */}
        <Section title="🏆 Real Example: UAE Store Boost" subtitle="One UAE fashion retailer integrated a WhatsApp agent. The results weren't just about support—they were about sales.">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border-luxury-grid-divider">
                    <p className="text-4xl font-bold gradient-ai-text">+27%</p>
                    <p className="text-luxury-text-body">Abandoned Cart Orders Recovered</p>
                </div>
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border-luxury-grid-divider">
                    <p className="text-4xl font-bold gradient-ai-text">&lt;1 min</p>
                    <p className="text-luxury-text-body">Average Response Time</p>
                </div>
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border-luxury-grid-divider">
                    <p className="text-4xl font-bold gradient-ai-text">+22%</p>
                    <p className="text-luxury-text-body">Repeat Purchase Rate in 3 Months</p>
                </div>
            </div>
        </Section>
        
        {/* Best Practices */}
        <Section title="✅ Best Practices (So You Don’t Get Blocked)" subtitle="Compliance and a good user experience are key to long-term success.">
             <div className="space-y-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start space-x-4"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><h3 className="font-bold">Always use opt-in and approved Meta templates.</h3></div></div>
                <div className="flex items-start space-x-4"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><h3 className="font-bold">Keep messages conversational and value-driven, not spammy.</h3></div></div>
                <div className="flex items-start space-x-4"><CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" /><div><h3 className="font-bold">Provide a clear and easy way for customers to opt-out.</h3></div></div>
                <div className="flex items-start space-x-4"><AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" /><div><h3 className="font-bold">Blend automation with a seamless handoff to a human agent for complex cases.</h3></div></div>
            </div>
        </Section>

        {/* FAQ Section */}
        <Section title="Frequently Asked Questions">
            <div className="max-w-3xl mx-auto text-left space-y-6">
                {faqData.mainEntity.map((faq, index) => (
                    <div key={index} className="bg-luxury-bg-secondary p-6 rounded-lg border border-luxury-grid-divider">
                        <h3 className="font-bold text-lg text-luxury-text-heading">{faq.name}</h3>
                        <p className="text-luxury-text-body mt-2">{faq.acceptedAnswer.text}</p>
                    </div>
                ))}
            </div>
        </Section>
        
        {/* CTA */}
        <div className="bg-luxury-bg-secondary border-t border-luxury-grid-divider">
            <div className="max-w-4xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-luxury-text-heading mb-6">Your Unfair Advantage in a $17B Market</h2>
                <p className="text-xl text-luxury-text-body mb-8 max-w-3xl mx-auto">
                    In 2025, eCommerce in the UAE is fiercely competitive. A WhatsApp Sales Agent is the advantage you need to convert more clicks into customers.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')} className="btn-primary btn-large rounded-full group">
                        Book a Free Consultation
                        <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    <Button
                        onClick={() => window.open('https://wa.me/971585695177', '_blank')}
                        variant="outline"
                        className="btn-secondary btn-large rounded-full group"
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp
                    </Button>
                </div>
            </div>
        </div>
      </main>

      <footer className="bg-luxury-text-heading text-white py-12 border-t border-luxury-grid-divider">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400">© 2025 Ailutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
