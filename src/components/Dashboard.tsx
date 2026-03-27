import React from 'react';
import { motion } from 'motion/react';
import { User } from 'firebase/auth';
import { MapPin, Building2, HardHat, TrendingUp, ArrowUpRight, Search, Filter, Users, User as UserIcon, ShieldCheck } from 'lucide-react';
import { MOCK_PROJECTS, MATERIAL_PRICES } from '../constants';
import { cn } from '../lib/utils';

interface DashboardProps {
  user: User | null;
}

export default function Dashboard({ user }: DashboardProps) {
  const stats = [
    { label: 'Active Projects', value: '1,248', change: '+12%', icon: Building2, color: 'text-blue-600' },
    { label: 'Permits Issued', value: '342', change: '+5%', icon: MapPin, color: 'text-green-600' },
    { label: 'Registered Contractors', value: '856', change: '+18%', icon: HardHat, color: 'text-orange-600' },
    { label: 'Market Growth', value: '24.5%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* User Welcome Section */}
      {user && (
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between bg-white p-4 rounded-2xl border border-gray-100 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              ) : (
                <UserIcon className="w-6 h-6 text-orange-600" />
              )}
            </div>
            <div>
              <h2 className="font-bold text-gray-900">Welcome back, {user.displayName?.split(' ')[0]}!</h2>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-green-500" /> Free Plan User
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Last Login: Just now</span>
          </div>
        </motion.div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1A1A1A] text-white rounded-3xl p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
          >
            Track the Future of <span className="text-orange-500 italic font-serif">Telangana</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-8"
          >
            Real-time construction monitoring across all districts. From Warangal's residential boom to Hyderabad's IT expansion.
          </motion.p>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search by district, builder or permit ID..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              />
            </div>
            <button className="btn-primary bg-orange-600 hover:bg-orange-700 border-none px-8">Search</button>
          </div>
        </div>
        
        {/* Abstract Map Background Decoration */}
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
          <svg viewBox="0 0 400 400" className="w-full h-full text-orange-500 fill-current">
            <path d="M100,100 Q150,50 200,100 T300,100 T350,200 T300,300 T200,350 T100,300 T50,200 Z" />
            <circle cx="200" cy="200" r="10" />
            <circle cx="150" cy="150" r="5" />
            <circle cx="250" cy="250" r="5" />
            <circle cx="100" cy="250" r="5" />
          </svg>
        </div>
      </section>

      {/* Beta Program CTA */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-orange-900">Join our Exclusive Beta Program</h3>
            <p className="text-sm text-orange-700">We're looking for our first 1,000 beta users. Get lifetime discounts and early access to premium features.</p>
          </div>
        </div>
        <button className="bg-orange-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-700 transition-all active:scale-95 whitespace-nowrap">
          Join Beta Now
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="card p-6 flex items-start justify-between"
          >
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-xs font-medium text-green-600 mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {stat.change} <span className="text-gray-400 font-normal ml-1">vs last month</span>
              </p>
            </div>
            <div className={cn("p-3 rounded-xl bg-gray-50", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Placeholder / Hotspots */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Construction Hotspots</h2>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Source: TG-bPASS Portal</span>
              <button className="text-sm font-medium text-orange-600 hover:underline flex items-center gap-1">
                View Full Map <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="card h-[400px] relative bg-gray-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
            <div className="relative z-10 text-center">
              <MapPin className="w-12 h-12 text-orange-600 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-500 font-medium">Interactive GIS Map Loading...</p>
              <p className="text-xs text-gray-400 mt-1">Showing 1,248 active sites in Telangana</p>
            </div>
            
            {/* Mock Hotspots */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-orange-500 rounded-full animate-ping" />
            <div className="absolute top-1/2 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping" />
            <div className="absolute bottom-1/3 left-1/2 w-5 h-5 bg-green-500 rounded-full animate-ping" />
          </div>

          {/* AI Cost Estimator CTA */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-orange-100">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                <TrendingUp className="w-6 h-6" /> AI Cost Estimator <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest">Beta</span>
              </h3>
              <p className="text-orange-50 text-sm">
                Estimate your construction costs in seconds using real-time Telangana material prices and AI-driven market analysis.
              </p>
            </div>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-bold hover:bg-orange-50 transition-all active:scale-95 whitespace-nowrap">
              Try Estimator
            </button>
          </div>
        </div>

        {/* Sidebar: Material Prices & Recent Permits */}
        <div className="space-y-8">
          {/* Material Price Tracker */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Material Prices</h3>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Live: TS Market</span>
            </div>
            <div className="space-y-4">
              {MATERIAL_PRICES.map((item) => (
                <div key={item.item} className="flex items-center justify-between group">
                  <div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-orange-600 transition-colors">{item.item}</p>
                    <p className="text-[10px] text-gray-400">Updated 2h ago</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold">{item.price}</p>
                    <p className={cn(
                      "text-[10px] font-bold",
                      item.change.startsWith('+') ? "text-red-500" : item.change === '0%' ? "text-gray-400" : "text-green-500"
                    )}>
                      {item.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-gray-500 hover:text-orange-600 border border-dashed border-gray-200 rounded-lg transition-colors">
              View Detailed Index
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Permits</h2>
              <button className="text-sm font-medium text-gray-500 hover:text-[#1A1A1A]">See All</button>
            </div>
            <div className="space-y-4">
              {MOCK_PROJECTS.slice(0, 3).map((project) => (
                <div key={project.id} className="card p-4 hover:border-orange-200 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded",
                      project.type === 'Residential' ? "bg-blue-100 text-blue-700" :
                      project.type === 'Commercial' ? "bg-purple-100 text-purple-700" :
                      "bg-orange-100 text-orange-700"
                    )}>
                      {project.type}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400">{project.permitDate}</span>
                  </div>
                  <h4 className="font-bold text-sm group-hover:text-orange-600 transition-colors">{project.title}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" /> {project.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
