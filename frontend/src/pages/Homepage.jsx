import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { EnhancedServiceCard } from '../components/EnhancedServiceCard';
import { InteractiveCaseStudyCard } from '../components/InteractiveCaseStudyCard';
import { ConversationalContactForm } from '../components/ConversationalContactForm';
import { TrustBar } from '../components/TrustBar';
import { AnimatedHeroBackground } from '../components/AnimatedHeroBackground';
import { InteractiveMaturityPreview } from '../components/InteractiveMaturityPreview';
import { ArrowRight, Sparkles } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { heroData, servicesData, caseStudiesData, contactData, processSteps, blogPreviews } from '../data/mock';

export default function Homepage() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-600 to-green-600">
                Ailutions
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Services</a>
              <a href="#case-studies" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Case Studies</a>
              <a href="/digital-maturity-tracker" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Maturity Tracker</a>
              <Button 
                onClick={scrollToContact}
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full px-6 hover:scale-105 transition-all duration-300"
              >
                Contact
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <AnimatedHeroBackground />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="w-5 h-5 text-blue-600 animate-pulse" />
              <span className="text-sm font-medium text-gray-700">AI that powers your business</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight animate-float">
              <span className="block">Build, Integrate &</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-600 to-blue-600 animate-pulse">
                Automate with AI.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {heroData.subcopy}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-10 py-6 rounded-2xl text-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl btn-pulse"
              >
                {heroData.primaryCTA.label}
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = heroData.secondaryCTA.href}
                className="border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-10 py-6 rounded-2xl text-xl hover:scale-105 transition-all duration-300 bg-white/60 backdrop-blur-sm hover:shadow-xl"
              >
                {heroData.secondaryCTA.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {servicesData.headline}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              From custom AI tools to seamless integrations, we transform how you work
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {servicesData.cards.map((service, index) => (
              <EnhancedServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                desc={service.desc}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Our proven 5-step process ensures successful AI transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = LucideIcons[step.icon] || LucideIcons.Circle;
              return (
                <Card key={index} className="relative group hover:scale-105 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-green-600 transition-colors duration-300" />
                    </div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                  
                  {/* Connection line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-blue-400 to-green-400 z-10"></div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {caseStudiesData.headline}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Real results from real businesses. Click any card to explore the details.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesData.cards.map((study, index) => (
              <InteractiveCaseStudyCard
                key={index}
                title={study.title}
                metric={study.metric}
                problem={study.problem}
                solution={study.solution}
                outcome={study.outcome}
                details={study.details}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Digital Maturity Tracker CTA */}
      <InteractiveMaturityPreview />

      {/* Insights Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Latest Insights
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Expert insights on AI, automation, and digital transformation
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPreviews.map((post, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-blue-50/30 hover:shadow-xl cursor-pointer">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600">
                      {post.excerpt}
                    </p>
                    <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-green-600 transition-colors duration-300">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Why Choose Ailutions
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <LucideIcons.Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Outcome-First</h3>
              <p className="text-gray-600">We focus on measurable business results, not just technology for technology's sake.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <LucideIcons.Puzzle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Integrate, Don't Rebuild</h3>
              <p className="text-gray-600">We work with your existing systems, enhancing rather than replacing them.</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                <LucideIcons.Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Own Your Stack</h3>
              <p className="text-gray-600">Full ownership and control of your AI solutions with complete transparency.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {contactData.headline}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Ready to transform your business with AI? Let's start the conversation.
            </p>
          </div>
          
          <ConversationalContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                  Ailutions
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                AI that powers your business. Custom tools, seamless integrations, and automated workflows.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Custom AI Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ERPNext</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/digital-maturity-tracker" className="hover:text-white transition-colors">Maturity Tracker</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@ailutions.com</li>
                <li>+1 (555) 123-4567</li>
                <li>WhatsApp Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ailutions. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}