import React from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Search, Filter, Phone, Mail, ChevronRight, Heart, Share2 } from 'lucide-react';
import { MOCK_SERVICES } from '../constants';
import { cn } from '../lib/utils';

export default function ServiceMarketplace() {
  const categories = ['Architect', 'Contractor', 'Material Supplier', 'Electrician', 'Plumber', 'Interior Designer'];
  const [activeCategory, setActiveCategory] = React.useState('Architect');

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section */}
      <section className="bg-[#F5F2ED] rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#5A5A40] mb-6"
          >
            Find the Best <span className="italic">Craftsmen</span> for Your Dream Home
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[#8E8E70] text-lg mb-10"
          >
            Connect with verified architects, contractors, and material suppliers across Telangana. Quality guaranteed.
          </motion.p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8E8E70]" />
              <input 
                type="text" 
                placeholder="What service are you looking for?" 
                className="w-full bg-white border-none rounded-full py-4 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-[#5A5A40] transition-all"
              />
            </div>
            <button className="bg-[#5A5A40] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4A4A30] transition-all shadow-lg active:scale-95">
              Find Services
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#5A5A40]/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#5A5A40]/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Categories */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2",
              activeCategory === cat
                ? "bg-[#5A5A40] text-white border-[#5A5A40]"
                : "bg-white text-[#5A5A40] border-[#E5E5E5] hover:border-[#5A5A40]"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Service Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_SERVICES.map((service, idx) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#E5E5E5] group hover:shadow-xl transition-all duration-500"
          >
            <div className="relative h-64">
              <img 
                src={service.image} 
                alt={service.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white text-[#5A5A40] transition-colors shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white text-[#5A5A40] transition-colors shadow-sm">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="bg-[#5A5A40] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                  {service.category}
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A] group-hover:text-[#5A5A40] transition-colors">
                  {service.name}
                </h3>
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold">
                  <Star className="w-3 h-3 fill-current" />
                  {service.rating}
                </div>
              </div>
              
              <p className="text-[#8E8E70] text-sm flex items-center gap-1.5 mb-6">
                <MapPin className="w-4 h-4" /> {service.location}, Telangana
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {service.specialization.map(spec => (
                  <span key={spec} className="text-[10px] font-bold text-[#5A5A40] bg-[#5A5A40]/5 px-2 py-1 rounded-md">
                    {spec}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-3 pt-6 border-t border-[#F5F2ED]">
                <button className="flex-1 bg-[#5A5A40] text-white py-3 rounded-2xl font-bold text-sm hover:bg-[#4A4A30] transition-all active:scale-95 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Contact Now
                </button>
                <button className="p-3 bg-[#F5F2ED] text-[#5A5A40] rounded-2xl hover:bg-[#E5E2DD] transition-all active:scale-95">
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Become a Partner CTA */}
      <section className="bg-[#1A1A1A] text-white rounded-[40px] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 italic">Are you a skilled professional?</h2>
          <p className="text-gray-400 text-lg mb-8">
            Join 800+ service providers growing their business with BuildTrack Telangana. Get verified leads and showcase your work.
          </p>
          <button className="bg-white text-[#1A1A1A] px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-all active:scale-95 flex items-center gap-2">
            Join the Marketplace <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="space-y-4">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-bold text-orange-500">2.4k+</h4>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Leads/Month</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 translate-x-4">
              <h4 className="text-2xl font-bold text-blue-500">98%</h4>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Satisfaction</p>
            </div>
          </div>
          <div className="space-y-4 translate-y-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-bold text-green-500">15+</h4>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Districts</p>
            </div>
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 translate-x-4">
              <h4 className="text-2xl font-bold text-purple-500">500+</h4>
              <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mt-1">Verified Pros</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
