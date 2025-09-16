import React, { useEffect, useRef } from 'react';
import { Button } from '../components/ui/button';
import { ArrowRight, Target, Lightbulb, Settings, Eye, Heart, User, Sparkles } from 'lucide-react';

export default function AboutUs() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation observer for scroll effects
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.scroll-animate');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-luxury-bg-primary/95 backdrop-blur-md border-b border-luxury-grid-divider shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
                alt="Ailutions Logo" 
                className="h-8 sm:h-10 w-auto hover:scale-105 transition-transform duration-200"
              />
            </a>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="/" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Home</a>
              <a href="#problem" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Problems We Solve</a>
              <a href="#services" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">How It Works</a>
              <a href="/about" className="text-luxury-ai-start font-medium text-sm xl:text-base">About</a>
              <a href="/digital-maturity-tracker" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Free Assessment</a>
              <button 
                onClick={scrollToContact}
                className="btn-primary btn-small rounded-full"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center space-x-1 sm:space-x-2">
              <button 
                onClick={() => window.location.href = '/digital-maturity-tracker'}
                className="btn-primary rounded-full text-xs px-2 py-1 sm:px-3 sm:py-1.5"
                style={{fontSize: '11px', padding: '4px 8px'}}
              >
                Assessment
              </button>
              <button 
                onClick={scrollToContact}
                className="btn-secondary rounded-full text-xs px-2 py-1 sm:px-3 sm:py-1.5"
                style={{fontSize: '11px', padding: '4px 8px'}}
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 bg-luxury-bg-primary grid-section">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-bg-primary via-luxury-bg-secondary to-luxury-bg-primary opacity-50"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 gradient-primary rounded-full opacity-10 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 gradient-primary rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center section-mobile-safe scroll-animate">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-luxury-bg-secondary border border-luxury-grid-divider text-luxury-ai-start rounded-full px-4 sm:px-6 py-2 sm:py-3 luxury-card font-semibold text-sm sm:text-base">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>About Ailutions</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-luxury-text-heading leading-tight">
              Bridging the gap between 
              <span className="gradient-ai-text block">
                AI innovation
              </span>
              and real business outcomes
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-luxury-text-body max-w-4xl mx-auto leading-relaxed font-medium px-4">
              We don't just talk about AI—we implement it where it matters most.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 text-red-600 rounded-full px-4 py-2 font-semibold text-sm">
                <Target className="w-4 h-4" />
                <span>The Problem (Before)</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading leading-tight">
                The AI Gap Was 
                <span className="text-red-500">Widening</span>
              </h2>
              
              <p className="text-xl text-luxury-text-body leading-relaxed">
                AI is moving faster than any business trend we've seen in decades. But for most business owners and founders, it feels out of reach: they don't know how to integrate AI, the cost of teams and infrastructure is overwhelming, and they waste countless hours on repetitive tasks.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100 luxury-card">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">!</span>
                    </div>
                    <span className="text-luxury-text-secondary font-medium">Frustrated business owner</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Spreadsheets</div>
                      <div className="text-red-500 font-bold">99+</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Manual Tasks</div>
                      <div className="text-red-500 font-bold">8h/day</div>
                    </div>
                    <div className="bg-white p-4 rounded-xl border shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">AI Knowledge</div>
                      <div className="text-red-500 font-bold">0%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turning Point Section */}
      <section className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-12">
            <div className="inline-flex items-center space-x-2 bg-yellow-50 border border-yellow-200 text-yellow-600 rounded-full px-4 py-2 font-semibold text-sm">
              <Lightbulb className="w-4 h-4" />
              <span>The Turning Point</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading max-w-5xl mx-auto leading-tight">
              Businesses didn't need more 
              <span className="gradient-ai-text">hype</span>. 
              They needed clarity and execution.
            </h2>
            
            <p className="text-xl text-luxury-text-body max-w-4xl mx-auto leading-relaxed">
              That's why Ailutions was born—to walk in, audit workflows, and say: "Here's what to automate. Here's how to integrate AI. Here's how you save time and money—starting now."
            </p>
            
            <div className="flex justify-center items-center space-x-8 py-12">
              <div className="flex flex-col items-center space-y-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  <Target className="w-8 h-8" />
                </div>
                <span className="text-luxury-text-secondary font-medium">Audit</span>
              </div>
              
              <ArrowRight className="w-8 h-8 text-luxury-text-body animate-pulse" />
              
              <div className="flex flex-col items-center space-y-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  <Settings className="w-8 h-8" />
                </div>
                <span className="text-luxury-text-secondary font-medium">Integrate</span>
              </div>
              
              <ArrowRight className="w-8 h-8 text-luxury-text-body animate-pulse" />
              
              <div className="flex flex-col items-center space-y-4 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-white">
                  <Sparkles className="w-8 h-8" />
                </div>
                <span className="text-luxury-text-secondary font-medium">Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 text-green-600 rounded-full px-4 py-2 font-semibold text-sm">
                <Settings className="w-4 h-4" />
                <span>The Solution (Now)</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading leading-tight">
                Clear Path to 
                <span className="gradient-ai-text">AI Success</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg text-luxury-text-body">Audit workflows and identify AI opportunities</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg text-luxury-text-body">Design and deploy custom automations</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg text-luxury-text-body">Integrate AI into existing systems without overhauls</span>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-lg text-luxury-text-body">Empower teams to work seamlessly alongside AI</span>
                </div>
              </div>
              
              <p className="text-lg text-luxury-text-secondary italic bg-gradient-to-r from-luxury-bg-primary to-green-50 p-6 rounded-xl border border-green-100">
                "Every client moves through a digital maturity curve: Pre-Digital → Digital → Automated → AI-Powered."
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 border border-green-100 luxury-card">
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-luxury-text-heading">Digital Maturity Curve</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                      <span className="text-luxury-text-body">Pre-Digital</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                      <span className="text-luxury-text-body">Digital</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                      <span className="text-luxury-text-body">Automated</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-luxury-text-body font-medium">AI-Powered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-12">
            <div className="inline-flex items-center space-x-2 bg-purple-50 border border-purple-200 text-purple-600 rounded-full px-4 py-2 font-semibold text-sm">
              <Eye className="w-4 h-4" />
              <span>The Vision (Future)</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading max-w-5xl mx-auto leading-tight">
              Building an 
              <span className="gradient-ai-text">AI Venture Studio</span>
            </h2>
            
            <p className="text-xl text-luxury-text-body max-w-4xl mx-auto leading-relaxed">
              We're building an AI venture studio—a hub that creates and operates multiple AI-based startups under the Ailutions brand. The long game: an ecosystem of AI solutions that fuel continuous innovation, growth, and competitive advantage for businesses of all sizes.
            </p>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12 border border-purple-100 luxury-card">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-luxury-text-heading">Innovation Hub</h3>
                    <p className="text-luxury-text-body">Continuous AI research and development</p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <Settings className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-luxury-text-heading">Multiple Startups</h3>
                    <p className="text-luxury-text-body">AI-powered solutions across industries</p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-luxury-text-heading">Ecosystem Growth</h3>
                    <p className="text-luxury-text-body">Competitive advantage for all sizes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-600 rounded-full px-4 py-2 font-semibold text-sm">
              <Heart className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading max-w-5xl mx-auto leading-tight">
              Making AI 
              <span className="gradient-ai-text">Accessible, Impactful, and Integrated</span>
            </h2>
            
            <p className="text-xl text-luxury-text-body max-w-4xl mx-auto leading-relaxed">
              To make AI accessible, impactful, and integrated—transforming operations, decision-making, customer experience, and growth strategies across every sector.
            </p>
            
            <div className="grid md:grid-cols-4 gap-8 pt-12">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-float">
                  <Settings className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-luxury-text-heading">Operations</h3>
                <p className="text-luxury-text-body text-sm">Streamlined workflows</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-float" style={{animationDelay: '0.5s'}}>
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-luxury-text-heading">Decision-Making</h3>
                <p className="text-luxury-text-body text-sm">Data-driven insights</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-float" style={{animationDelay: '1s'}}>
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-luxury-text-heading">Customer Experience</h3>
                <p className="text-luxury-text-body text-sm">Personalized interactions</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto animate-float" style={{animationDelay: '1.5s'}}>
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-lg font-bold text-luxury-text-heading">Growth Strategies</h3>
                <p className="text-luxury-text-body text-sm">Scalable solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Note Section */}
      <section className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider scroll-animate">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-12">
            <div className="inline-flex items-center space-x-2 bg-gray-50 border border-gray-200 text-gray-600 rounded-full px-4 py-2 font-semibold text-sm">
              <User className="w-4 h-4" />
              <span>Founder's Note</span>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute -top-6 -left-6 text-6xl text-luxury-text-body opacity-20">"</div>
                <blockquote className="text-2xl md:text-3xl text-luxury-text-heading leading-relaxed font-medium italic">
                  When I looked at how fast AI was growing, I saw one truth: businesses wanted in, but had no idea how. They didn't have the budget for big-tech solutions or the teams to build it themselves. That's why I started Ailutions—to give every business, no matter the size, a real shot at becoming AI-powered. Not hype, not theory—just results you can see in your operations every single day.
                </blockquote>
                <div className="absolute -bottom-6 -right-6 text-6xl text-luxury-text-body opacity-20">"</div>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mt-12">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-bold text-luxury-text-heading">Ailutions Founder</div>
                  <div className="text-luxury-text-body">CEO & Visionary</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full opacity-10 animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full opacity-10 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white rounded-full opacity-5 animate-pulse-slow"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Ready to Bring AI Into Your Business?
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Start with a free Digital Maturity Assessment or book a strategy call.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button 
              onClick={() => window.location.href = '/digital-maturity-tracker'}
              className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Start Free Assessment
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </button>
            
            <button 
              onClick={scrollToContact}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-200 hover:scale-105"
            >
              Book a Call
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-bg-primary border-t border-luxury-grid-divider py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
              alt="Ailutions Logo" 
              className="h-8 w-auto"
            />
          </div>
          <p className="text-luxury-text-body">
            © 2024 Ailutions. Making AI accessible for every business.
          </p>
        </div>
      </footer>
    </div>
  );
}