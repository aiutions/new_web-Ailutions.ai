
import React from 'react';
import { ArrowRight, Search, MessageCircle, Globe, ShoppingCart, BarChart, CheckCircle } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Button } from '../../components/ui/button';

const ChallengeCard = ({ icon, title, description, solution, example, image }) => (
    <div className="bg-luxury-bg-secondary border border-luxury-grid-divider rounded-2xl p-6 md:p-8 mb-12 luxury-card-hover">
        <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
            <div className="bg-luxury-bg-primary p-3 rounded-full border border-luxury-grid-divider self-start">
                {icon}
            </div>
            <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold text-luxury-text-heading mb-3">{title}</h2>
                <p className="text-luxury-text-body text-lg leading-relaxed mb-6">{description}</p>
                <h3 className="text-xl md:text-2xl font-semibold text-luxury-ai-start mb-3">AskAngle AI Solution</h3>
                <p className="text-luxury-text-body text-lg leading-relaxed mb-4">{solution}</p>
                {example && (
                    <div className="bg-luxury-bg-primary border border-luxury-grid-divider rounded-lg p-4 mb-6">
                        <p className="text-luxury-text-body font-mono italic">"{example}"</p>
                    </div>
                )}
                {image && <img src={image} alt={title} className="rounded-lg border border-luxury-grid-divider mt-4" />}
            </div>
        </div>
    </div>
);

export default function ShopifyMerchantsUAE() {
    return (
        <div className="bg-luxury-bg-primary text-luxury-text-primary">
            <Helmet>
                <title>Top 5 Challenges Shopify Merchants Face in the UAE — and How AskAngle AI Sales Agents Solve Them</title>
                <meta name="description" content="Shopify merchants in Dubai & Abu Dhabi face unique challenges — from COD orders to multilingual shoppers. Discover how AskAngle AI sales agents solve the top 5 problems and help boost conversions in the UAE." />
                <meta name="keywords" content="Shopify sales agent UAE, AskAngle AI sales agent, AI shopping assistant Shopify Dubai, Shopify chatbot UAE, AI for Shopify merchants UAE, Shopify automation UAE, Reduce abandoned carts Shopify UAE, Shopify sales conversion UAE" />
                <meta property="og:title" content="Top 5 Challenges Shopify Merchants Face in the UAE — and How AskAngle AI Sales Agents Solve Them" />
                <meta property="og:description" content="Shopify merchants in Dubai & Abu Dhabi face unique challenges — from COD orders to multilingual shoppers. Discover how AskAngle AI sales agents solve the top 5 problems and help boost conversions in the UAE." />
            </Helmet>
            
            <main>
                {/* Intro */}
                <div className="text-center py-20 px-6 bg-luxury-bg-secondary border-b border-luxury-grid-divider">
                    <h1 className="text-4xl md:text-6xl font-bold text-luxury-text-heading leading-tight max-w-4xl mx-auto">
                        Top 5 Challenges Shopify Merchants Face in the UAE 
                        <span className="gradient-ai-text block">— and How AskAngle AI Solves Them</span>
                    </h1>
                    <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
                        The UAE's Shopify market is booming, but merchants face unique challenges with COD, bilingual shoppers, and expensive ads. AskAngle AI is a Shopify sales agent built to solve these problems by acting as your 24/7 digital salesperson.
                    </p>
                    <Button size="lg" className="mt-8 btn-primary btn-large" onClick={() => window.open('https://apps.shopify.com/angle?mref=ailutions', '_blank')}>
                        👉 Try AskAngle AI for Your Store Here <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <img src="https://i.postimg.cc/5y8JRD2v/image.png" alt="AskAngle AI chat example" className="mt-12 mx-auto rounded-lg border border-luxury-grid-divider shadow-lg" />
                </div>

                <div className="max-w-4xl mx-auto py-16 px-6">
                    <ChallengeCard
                        icon={<Search className="w-8 h-8 text-luxury-ai-start" />}
                        title="Challenge 1: Traffic but Low Conversions"
                        description="Many merchants in the UAE get good traffic from ads, but sales remain low because shoppers can't find what they need in a large catalog."
                        solution="AskAngle AI provides natural-language search, allowing customers to ask for exactly what they want."
                        example="Show me abayas under AED 300"
                        image="https://i.postimg.cc/ht2B6Lcp/image.png"
                    />

                    <ChallengeCard
                        icon={<MessageCircle className="w-8 h-8 text-luxury-ai-start" />}
                        title="Challenge 2: Customer Support Overload"
                        description="Repetitive queries about delivery, returns, and order status waste valuable time that could be spent growing your business."
                        solution="AskAngle AI instantly answers up to 80% of frequently asked questions, freeing up your team for high-value tasks."
                        example="Do you deliver to Abu Dhabi?"
                    />

                    <ChallengeCard
                        icon={<Globe className="w-8 h-8 text-luxury-ai-start" />}
                        title="Challenge 3: Multilingual Shoppers"
                        description="The UAE has a diverse, multilingual customer base. If your store only communicates in English, you're missing out on a huge segment of the market."
                        solution="AskAngle AI understands and responds in both English and Arabic, providing a seamless experience for all your customers."
                        example="سماعات تحت 500 درهم"
                        image="https://i.postimg.cc/MGw974hv/image.png"
                    />

                    <ChallengeCard
                        icon={<ShoppingCart className="w-8 h-8 text-luxury-ai-start" />}
                        title="Challenge 4: High Cart Abandonment"
                        description="Last-minute doubts about Cash on Delivery (COD) availability or delivery times are a major cause of abandoned carts in the UAE."
                        solution="AskAngle AI can proactively pop up at checkout to reassure customers and answer critical questions before they leave."
                        example="Yes, COD is available in Dubai. Delivery is tomorrow."
                    />
                    
                    <ChallengeCard
                        icon={<BarChart className="w-8 h-8 text-luxury-ai-start" />}
                        title="Challenge 5: Scaling Without High Costs"
                        description="Hiring a 24/7 team of live agents is too expensive for most merchants. This makes it difficult to scale customer support as your business grows."
                        solution="AskAngle AI scales instantly with your traffic, handling thousands of conversations at once with no added staff cost. It's perfect for merchants managing 300+ SKUs."
                        example={null}
                    />

                    {/* Why AskAngle Section */}
                    <div className="bg-luxury-bg-secondary border border-luxury-grid-divider rounded-2xl p-8 mb-12">
                        <h2 className="text-3xl font-bold text-luxury-text-heading mb-6 text-center">Why AskAngle AI is Built for UAE Shopify Merchants</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                                <p className="text-lg text-luxury-text-body">Tailored to UAE e-commerce habits: COD, multilingual, and WhatsApp-first shoppers.</p>
                            </div>
                             <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                                <p className="text-lg text-luxury-text-body">Works seamlessly with Shopify stores, integrating in just a few clicks.</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                                <p className="text-lg text-luxury-text-body">Provides powerful analytics and upselling suggestions to maximize order value.</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                                <p className="text-lg text-luxury-text-body">Turns your visitor traffic into paying customers by providing an instant, interactive experience.</p>
                            </div>
                        </div>
                         <div className="text-center mt-8">
                            <Button size="lg" className="btn-primary btn-large" onClick={() => window.open('https://apps.shopify.com/angle?mref=ailutions', '_blank')}>
                                👉 Ready to See AskAngle AI in Action? Try It Free <ArrowRight className="w-5 h-5 ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <section className="mb-12">
                        <h2 className="text-3xl font-bold text-luxury-text-heading mb-8 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-luxury-text-heading">1. What is AskAngle AI and how does it integrate with Shopify?</h3>
                                <p className="text-lg text-luxury-text-body mt-2">AskAngle AI is an intelligent sales agent that integrates directly into your Shopify store. Setup is simple and requires no code, allowing you to be running in minutes.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-luxury-text-heading">2. Does AskAngle AI support Arabic queries in the UAE?</h3>
                                <p className="text-lg text-luxury-text-body mt-2">Yes, it is fully bilingual and can handle conversations in English, Arabic, or a mix of both (Arabish) to cater to the diverse UAE market.</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-luxury-text-heading">3. Can AskAngle AI handle Cash on Delivery (COD) related questions?</h3>
                                <p className="text-lg text-luxury-text-body mt-2">Absolutely. It can be programmed to confirm COD availability based on the customer's location and answer any related questions, a crucial feature for the UAE.</p>
                            </div>
                             <div>
                                <h3 className="text-xl font-semibold text-luxury-text-heading">4. Is AskAngle AI useful for small Shopify stores or only larger ones?</h3>
                                <p className="text-lg text-luxury-text-body mt-2">It's highly valuable for small and large stores alike. It allows smaller stores to offer the 24/7 service of a large enterprise without the high cost, helping them compete and grow.</p>
                            </div>
                              <div>
                                <h3 className="text-xl font-semibold text-luxury-text-heading">5. How does AskAngle AI increase conversions for Shopify merchants in Dubai?</h3>
                                <p className="text-lg text-luxury-text-body mt-2">By providing instant product discovery, answering questions that block sales, reducing cart abandonment, and creating a personalized shopping experience for every visitor.</p>
                            </div>
                        </div>
                    </section>

                    {/* Conclusion + Final CTA */}
                    <div className="text-center mt-16 bg-luxury-bg-secondary border border-luxury-grid-divider rounded-2xl p-8">
                        <h2 className="text-3xl font-bold text-luxury-text-heading mb-4">Don’t Let Your Traffic Go to Waste.</h2>
                        <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
                           Let AskAngle AI turn your visitors into paying customers.
                        </p>
                        <Button size="lg" className="mt-8 btn-primary btn-large" onClick={() => window.open('https://apps.shopify.com/angle?mref=ailutions', '_blank')}>
                            👉 Try It Today at askangle.com/try <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
