import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell, Legend 
} from 'recharts';
import { TrendingUp, Building2, MapPin, Calendar, ArrowUpRight, ArrowDownRight, Info, Zap } from 'lucide-react';
import { MOCK_TRENDS } from '../constants';
import { cn } from '../lib/utils';

export default function Analytics() {
  const COLORS = ['#1A1A1A', '#F27D26', '#3B82F6', '#10B981'];
  
  const districtData = [
    { name: 'Hyderabad', value: 450, growth: '+12%', score: 92 },
    { name: 'Warangal', value: 320, growth: '+24%', score: 88 },
    { name: 'Nizamabad', value: 180, growth: '+8%', score: 76 },
    { name: 'Khammam', value: 150, growth: '+15%', score: 82 },
    { name: 'Karimnagar', value: 120, growth: '+5%', score: 79 },
  ];

  const typeData = [
    { name: 'Residential', value: 65 },
    { name: 'Commercial', value: 20 },
    { name: 'Industrial', value: 10 },
    { name: 'Public', value: 5 },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Analytics</h1>
          <p className="text-gray-500 mt-1">Real-time construction trends and growth metrics. <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest ml-2">Source: TS Govt. Open Data</span></p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#E5E5E5]">
          <button className="px-4 py-2 rounded-lg text-sm font-bold bg-[#1A1A1A] text-white">Last 6 Months</button>
          <button className="px-4 py-2 rounded-lg text-sm font-bold text-gray-500 hover:bg-gray-50">Yearly</button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Market Value</p>
          <h3 className="text-2xl font-bold mt-1">₹4,250 Cr</h3>
          <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">Projected Growth for 2026</p>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Building2 className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-green-600 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +24%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">New Permits (Warangal)</p>
          <h3 className="text-2xl font-bold mt-1">342</h3>
          <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">Highest Growth District</p>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold text-red-600 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> -2.1%
            </span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Avg. Completion Time</p>
          <h3 className="text-2xl font-bold mt-1">14.2 Months</h3>
          <p className="text-[10px] text-gray-400 mt-4 uppercase font-bold tracking-widest">Efficiency Improvement</p>
        </div>
      </div>

      {/* Investor Heatmap Banner (Beta) */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1A1A1A] text-white p-8 mb-8">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600 text-[10px] font-bold uppercase tracking-wider mb-4">
              <Zap className="w-3 h-3" /> Beta Feature
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 italic serif">Investor Heatmap 2.0</h2>
            <p className="text-gray-400 text-sm md:text-base">
              Identify high-yield construction zones using AI-powered predictive modeling. 
              Available exclusively for Pro and Enterprise members.
            </p>
          </div>
          <button className="whitespace-nowrap px-8 py-4 bg-white text-[#1A1A1A] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105">
            Explore Heatmap
          </button>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/20 blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 blur-[80px] -ml-24 -mb-24" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Trend */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Construction Growth Trend</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#1A1A1A]" />
                <span className="text-xs text-gray-500">Residential</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F27D26]" />
                <span className="text-xs text-gray-500">Commercial</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_TRENDS}>
                <defs>
                  <linearGradient id="colorRes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorCom" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F27D26" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#999' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="residential" 
                  stroke="#1A1A1A" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRes)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="commercial" 
                  stroke="#F27D26" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCom)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* District Distribution */}
        <div className="card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Project Distribution by Type</h3>
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <div className="h-[300px] w-full flex flex-col md:flex-row items-center">
            <div className="h-full w-full md:w-1/2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {typeData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span className="text-sm font-medium text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-bold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* District Rankings Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
          <h3 className="font-bold text-lg">District-wise Activity Ranking</h3>
          <button className="text-sm font-bold text-orange-600">Download Report</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] uppercase font-bold tracking-widest text-gray-400">
                <th className="px-6 py-4">District</th>
                <th className="px-6 py-4">Active Projects</th>
                <th className="px-6 py-4">Growth Rate</th>
                <th className="px-6 py-4">Market Share</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {districtData.map((district, idx) => (
                <tr key={district.name} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                        0{idx + 1}
                      </span>
                      <span className="font-bold group-hover:text-orange-600 transition-colors">{district.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-sm">{district.value}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" /> {district.growth}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#1A1A1A] h-full rounded-full" 
                        style={{ width: `${(district.value / 450) * 100}%` }} 
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-gray-400 hover:text-[#1A1A1A]">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
