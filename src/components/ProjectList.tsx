import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, Calendar, Building2, ChevronRight, MoreVertical, Download, Share2, ShieldCheck, ExternalLink } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';
import { cn } from '../lib/utils';

export default function ProjectList() {
  const [filter, setFilter] = React.useState('All');
  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Public'];

  const filteredProjects = filter === 'All' 
    ? MOCK_PROJECTS 
    : MOCK_PROJECTS.filter(p => p.type === filter);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Construction Projects</h1>
          <p className="text-gray-500 mt-1">Explore 1,248 active construction sites across Telangana.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="btn-primary flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share View
          </button>
        </div>
      </div>

      {/* TG-bPASS Tracker Banner */}
      <div className="bg-blue-600 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-100">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <ExternalLink className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold">TG-bPASS Permit Tracker <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full uppercase tracking-widest ml-2">Beta</span></h3>
            <p className="text-blue-100 text-sm">Track your building permit application status directly through our integrated portal.</p>
          </div>
        </div>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-all active:scale-95">
          Track Permit
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by project name, location, or contractor..." 
            className="w-full bg-white border border-[#E5E5E5] rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                filter === cat
                  ? "bg-[#1A1A1A] text-white"
                  : "bg-white border border-[#E5E5E5] text-gray-500 hover:bg-gray-50"
              )}
            >
              {cat}
            </button>
          ))}
          <button className="p-2.5 rounded-xl border border-[#E5E5E5] bg-white text-gray-500 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            className="card group hover:border-orange-500 transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${project.id}/800/600`} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
                  project.status === 'In Progress' ? "bg-blue-500 text-white" :
                  project.status === 'Permit Issued' ? "bg-green-500 text-white" :
                  project.status === 'Finishing' ? "bg-orange-500 text-white" :
                  "bg-gray-500 text-white"
                )}>
                  {project.status}
                </span>
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <span className="text-[9px] font-bold text-green-700 uppercase tracking-widest">RERA Verified</span>
                </div>
              </div>
              <div className="absolute top-4 right-4">
                <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                  <MoreVertical className="w-4 h-4 text-[#1A1A1A]" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2 font-mono">
                <Building2 className="w-3 h-3" />
                {project.type} • {project.sqft.toLocaleString()} SQFT
              </div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-orange-600 transition-colors">{project.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-4">
                <MapPin className="w-4 h-4 text-orange-500" /> {project.location}
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Permit Date</p>
                  <p className="text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" /> {project.permitDate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Est. Completion</p>
                  <p className="text-xs font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-gray-400" /> {project.estimatedCompletion}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs">
                    {project.contractor?.charAt(0)}
                  </div>
                  <div className="text-[10px]">
                    <p className="text-gray-400 uppercase font-bold tracking-tight">Contractor</p>
                    <p className="font-bold text-[#1A1A1A]">{project.contractor}</p>
                  </div>
                </div>
                <button className="p-2 rounded-lg bg-gray-50 text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
