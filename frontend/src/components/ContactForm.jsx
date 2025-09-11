import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Send } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission - store in localStorage for now
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', message: '' });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto border-0 bg-gradient-to-br from-green-50 to-blue-50 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
            <Send className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600">Thanks for reaching out. We'll get back to you soon.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto border-0 bg-white/90 backdrop-blur-sm shadow-xl">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
              Name *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
              Email *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <Label htmlFor="company" className="text-sm font-medium text-gray-700 mb-2 block">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              placeholder="Your company name"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
              Message *
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};