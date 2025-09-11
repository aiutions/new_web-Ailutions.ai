import React from 'react';
import { Button } from '../components/ui/button';
import { ServiceCard } from '../components/ServiceCard';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { ContactForm } from '../components/ContactForm';
import { ArrowRight, Sparkles } from 'lucide-react';
import { heroData, servicesData, caseStudiesData, ctaData, contactData } from '../data/mock';

export default function Homepage() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gray-900">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-blue-600">
                Ailutions
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#case-studies" className="text-gray-600 hover:text-blue-600 transition-colors">Case Studies</a>
              <a href="/digital-maturity-tracker" className="text-gray-600 hover:text-blue-600 transition-colors">Maturity Tracker</a>
              <Button 
                onClick={scrollToContact}
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full px-6"
              >
                Contact
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">AI that powers your business</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {heroData.headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {heroData.subcopy}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Button 
                onClick={scrollToContact}
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
              >
                {heroData.primaryCTA.label}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = heroData.secondaryCTA.href}
                className="border-2 border-gray-200 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300 bg-white/60 backdrop-blur-sm"
              >
                {heroData.secondaryCTA.label}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {servicesData.headline}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.cards.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                icon={service.icon}
                desc={service.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {caseStudiesData.headline}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudiesData.cards.map((study, index) => (
              <CaseStudyCard
                key={index}
                title={study.title}
                metric={study.metric}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10"></div>
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {ctaData.headline}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {ctaData.subcopy}
          </p>
          
          <Button 
            size="lg"
            onClick={() => window.location.href = ctaData.ctaButton.href}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-10 py-5 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl"
          >
            {ctaData.ctaButton.label}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {contactData.headline}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
          </div>
          
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-2xl font-bold mb-4 md:mb-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                Ailutions
              </span>
            </div>
            <div className="text-gray-400 text-center md:text-right">
              <p>© 2025 Ailutions. AI that powers your business.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}