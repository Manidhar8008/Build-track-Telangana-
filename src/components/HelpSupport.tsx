import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, Book, MessageSquare, Search, ChevronDown, ChevronUp, PlayCircle, FileText, Send } from 'lucide-react';
import { cn } from '../lib/utils';
import { submitContactMessage } from '../firebase';

const FAQS = [
  {
    question: "How do I register my construction project?",
    answer: "To register a project, click on the 'Register Project' button in the top navigation bar. You will need to provide project details, location, and TG-bPASS permit information."
  },
  {
    question: "Is the market data real-time?",
    answer: "Yes, our market analytics and material prices are updated daily based on data from major industrial hubs in Telangana like Hyderabad, Warangal, and Khammam."
  },
  {
    question: "How does the AI Cost Estimator work?",
    answer: "The AI Cost Estimator (Beta) uses historical data and current material prices to provide a ballpark estimate for your construction project based on square footage and location."
  },
  {
    question: "What is TG-bPASS?",
    answer: "TG-bPASS is the Telangana State Building Permission Approval and Self Certification System. Our platform helps you track your compliance with these guidelines."
  }
];

const TUTORIALS = [
  {
    title: "Getting Started with BuildTrack",
    duration: "5:20",
    type: "video",
    icon: PlayCircle,
    description: "Learn the basics of navigating the dashboard and tracking your first project."
  },
  {
    title: "Understanding Market Analytics",
    duration: "8 mins read",
    type: "article",
    icon: FileText,
    description: "A deep dive into how to interpret construction trends and material price fluctuations."
  },
  {
    title: "Using the Service Marketplace",
    duration: "4:15",
    type: "video",
    icon: PlayCircle,
    description: "How to find, vet, and contact verified architects and contractors in your district."
  }
];

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [formStatus, setFormStatus] = React.useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState({ email: '' });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'email') {
      if (value && !validateEmail(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setErrors({ email: 'Please enter a valid email address' });
      return;
    }
    setFormStatus('sending');
    try {
      await submitContactMessage(formData.name, formData.email, formData.message);
      setFormStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Failed to send message:", error);
      setFormStatus('idle');
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Header & Search */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Help & <span className="text-orange-600 italic font-serif">Support</span></h1>
        <p className="text-gray-500 text-lg">
          Everything you need to know about the BuildTrack Telangana platform.
        </p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-orange-600" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all hover:border-orange-200"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                >
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tutorials */}
          <div className="pt-8">
            <div className="flex items-center gap-3 mb-8">
              <Book className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold">Tutorials & Guides</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-orange-500 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-600 transition-colors">
                    <PlayCircle className="w-6 h-6 text-orange-600 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">5:20</span>
                </div>
                <h3 className="font-bold mb-2 group-hover:text-orange-600 transition-colors">Getting Started with BuildTrack</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">Learn the basics of navigating the dashboard and tracking your first project.</p>
                <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-inner">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    title="BuildTrack Tutorial" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {TUTORIALS.slice(1).map((tutorial, idx) => (
                <div key={idx} className="group bg-white border border-gray-100 p-6 rounded-2xl hover:border-orange-500 transition-all cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-600 transition-colors">
                      <tutorial.icon className="w-6 h-6 text-orange-600 group-hover:text-white" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">{tutorial.duration}</span>
                  </div>
                  <h3 className="font-bold mb-2 group-hover:text-orange-600 transition-colors">{tutorial.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{tutorial.description}</p>
                  <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">
                    <PlayCircle className="w-8 h-8 opacity-20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="space-y-8">
          <div className="bg-[#1A1A1A] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/20 blur-3xl rounded-full -mr-16 -mt-16" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="w-6 h-6 text-orange-500" />
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              <p className="text-gray-400 text-sm mb-8">
                Can't find what you're looking for? Send us a message and our team will get back to you within 24 hours.
              </p>

              {formStatus === 'sent' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-500/10 border border-green-500/20 p-6 rounded-2xl text-center"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-green-500 mb-2">Message Sent!</h3>
                  <p className="text-xs text-green-500/80">We'll be in touch shortly.</p>
                  <button 
                    onClick={() => setFormStatus('idle')}
                    className="mt-4 text-xs underline hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Full Name</label>
                    <input
                      required
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
                    <input
                      required
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full bg-white/5 border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all",
                        errors.email ? "border-red-500" : "border-white/10"
                      )}
                      placeholder="name@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wider">Message</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
                      placeholder="How can we help?"
                    />
                  </div>
                  <button
                    disabled={formStatus === 'sending'}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {formStatus === 'sending' ? "Sending..." : "Send Message"}
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="p-6 border border-gray-100 rounded-2xl bg-gray-50">
            <h4 className="font-bold mb-4 text-sm">Direct Support</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">📧</span>
                manidharmanidhar2@gmail.com
              </p>
              <p className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">📞</span>
                +91 8105056844
              </p>
              <p className="flex items-center gap-3">
                <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">🏢</span>
                Warangal, kreethinagar, TS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
