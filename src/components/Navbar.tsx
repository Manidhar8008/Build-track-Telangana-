import React from 'react';
import { Map, LayoutDashboard, Briefcase, BarChart3, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Projects', icon: Map },
    { id: 'services', label: 'Marketplace', icon: Briefcase },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-white border-b border-[#E5E5E5] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight">BuildTrack <span className="text-orange-600">Telangana</span></span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-[#F5F5F5] text-[#1A1A1A]"
                      : "text-gray-500 hover:text-[#1A1A1A] hover:bg-[#F9F9F9]"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="btn-secondary text-sm">Login</button>
            <button className="btn-primary text-sm">Register Project</button>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-[#1A1A1A]"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-[#E5E5E5] px-2 pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2 rounded-md text-base font-medium",
                activeTab === item.id
                  ? "bg-[#F5F5F5] text-[#1A1A1A]"
                  : "text-gray-500 hover:text-[#1A1A1A] hover:bg-[#F9F9F9]"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
          <div className="pt-4 flex flex-col gap-2 px-3">
            <button className="btn-secondary w-full">Login</button>
            <button className="btn-primary w-full">Register Project</button>
          </div>
        </div>
      )}
    </nav>
  );
}
