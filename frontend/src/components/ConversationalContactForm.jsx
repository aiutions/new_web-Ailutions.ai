import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent } from './ui/card';
import { ArrowRight, ArrowLeft, Send, MessageCircle } from 'lucide-react';

export const ConversationalContactForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    goal: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    {
      question: "Hi there! What's your name?",
      field: "name",
      type: "text",
      placeholder: "Your full name",
      validation: (value) => value.length >= 2
    },
    {
      question: "Nice to meet you! What's your email?",
      field: "email",
      type: "email",
      placeholder: "your@company.com",
      validation: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    },
    {
      question: "Great! Which company do you work for?",
      field: "company",
      type: "text",
      placeholder: "Your company name",
      validation: (value) => value.length >= 2
    },
    {
      question: "What's your main goal with AI automation?",
      field: "goal",
      type: "select",
      options: [
        "Reduce operational costs",
        "Improve efficiency & productivity",
        "Automate repetitive tasks",
        "Integrate AI into existing systems",
        "Build custom AI tools",
        "ERP implementation",
        "Other"
      ],
      validation: (value) => value.length > 0
    },
    {
      question: "Tell us more about your project:",
      field: "message",
      type: "textarea",
      placeholder: "Describe your current challenges, timeline, or any specific requirements...",
      validation: (value) => value.length >= 10
    }
  ];

  const handleInputChange = (value) => {
    setFormData(prev => ({
      ...prev,
      [steps[currentStep].field]: value
    }));
  };

  const handleNext = () => {
    const currentField = steps[currentStep];
    const value = formData[currentField.field];
    
    if (currentField.validation(value)) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final submission
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submission - store in localStorage
    const submissions = JSON.parse(localStorage.getItem('conversationalContactSubmissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'conversational_form'
    });
    localStorage.setItem('conversationalContactSubmissions', JSON.stringify(submissions));
    
    setIsSubmitted(true);
    
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setCurrentStep(0);
      setFormData({ name: '', email: '', company: '', goal: '', message: '' });
    }, 5000);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in AI automation solutions. My name is ${formData.name || 'N/A'}, I work at ${formData.company || 'N/A'}, and I'd like to discuss ${formData.goal || 'AI automation opportunities'}.`
    );
    window.open(`https://wa.me/YOUR_WHATSAPP_NUMBER?text=${message}`, '_blank');
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-lg mx-auto border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-2xl">
        <CardContent className="p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <Send className="w-10 h-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank you, {formData.name}!</h3>
          <p className="text-gray-600 mb-6">
            We've received your message and will get back to you within 24 hours.
          </p>
          <div className="space-y-4">
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Continue on WhatsApp
            </Button>
            <p className="text-sm text-gray-500">Or wait for our email response</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStepData = steps[currentStep];
  const currentValue = formData[currentStepData.field];
  const isValid = currentStepData.validation(currentValue);

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm font-medium text-gray-500">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-10">
          <div className="space-y-8">
            {/* Question */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 animate-fade-in-up">
                {currentStepData.question}
              </h3>
              {currentStep > 0 && (
                <p className="text-gray-600">
                  Hey {formData.name}! 👋
                </p>
              )}
            </div>

            {/* Input field */}
            <div className="space-y-4">
              {currentStepData.type === 'select' ? (
                <div className="space-y-3">
                  {currentStepData.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={currentValue === option ? "default" : "outline"}
                      onClick={() => handleInputChange(option)}
                      className={`w-full p-4 text-left justify-start transition-all duration-300 ${
                        currentValue === option 
                          ? "bg-gradient-to-r from-blue-600 to-green-600 text-white" 
                          : "hover:bg-gray-50 hover:scale-105"
                      }`}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              ) : currentStepData.type === 'textarea' ? (
                <Textarea
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  rows={4}
                  className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 text-lg p-4"
                />
              ) : (
                <Input
                  type={currentStepData.type}
                  value={currentValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={currentStepData.placeholder}
                  className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 text-lg p-4"
                />
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center space-x-2 px-6 py-3 disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isValid}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-8 py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-all duration-300"
              >
                <span>{currentStep === steps.length - 1 ? 'Send Message' : 'Continue'}</span>
                {currentStep === steps.length - 1 ? <Send className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp CTA */}
      <div className="mt-6 text-center">
        <p className="text-gray-500 text-sm mb-3">Prefer instant messaging?</p>
        <Button
          onClick={handleWhatsApp}
          variant="outline"
          className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:border-green-300"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Chat on WhatsApp
        </Button>
      </div>
    </div>
  );
};