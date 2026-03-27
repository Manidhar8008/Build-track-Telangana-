import React from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ProjectList from './components/ProjectList';
import ServiceMarketplace from './components/ServiceMarketplace';
import Analytics from './components/Analytics';
import Pricing from './components/Pricing';
import HelpSupport from './components/HelpSupport';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Mail, Phone, Github, Twitter, Linkedin, ArrowUpRight, AlertCircle } from 'lucide-react';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      let errorMessage = "Something went wrong.";
      try {
        const parsedError = JSON.parse(this.state.error.message);
        if (parsedError.error) {
          errorMessage = `Firestore Error: ${parsedError.error} (${parsedError.operationType} on ${parsedError.path})`;
        }
      } catch (e) {
        errorMessage = this.state.error.message || errorMessage;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-red-100 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Error</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">{errorMessage}</p>
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-[#1A1A1A] text-white font-bold py-4 rounded-xl hover:bg-black transition-all"
            >
              Reload Application
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthReady, setIsAuthReady] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  const renderContent = () => {
    if (!isAuthReady) {
      return (
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'projects':
        return <ProjectList />;
      case 'services':
        return <ServiceMarketplace />;
      case 'analytics':
        return <Analytics />;
      case 'pricing':
        return <Pricing />;
      case 'help':
        return <HelpSupport />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} user={user} />
        
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-[#1A1A1A] rounded-sm rotate-45" />
                  </div>
                  <span className="text-xl font-bold tracking-tight">BuildTrack <span className="text-orange-500">Telangana</span></span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Empowering the construction ecosystem of Telangana with real-time data, transparency, and a high-quality service marketplace.
                </p>
                <div className="flex items-center gap-4">
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Twitter className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Linkedin className="w-5 h-5 text-gray-400" />
                  </button>
                  <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <Github className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-orange-500">Platform</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-white transition-colors">Project Dashboard</button></li>
                  <li><button onClick={() => setActiveTab('projects')} className="hover:text-white transition-colors">Construction Map</button></li>
                  <li><button onClick={() => setActiveTab('services')} className="hover:text-white transition-colors">Service Marketplace</button></li>
                  <li><button onClick={() => setActiveTab('analytics')} className="hover:text-white transition-colors">Market Analytics</button></li>
                  <li><button onClick={() => setActiveTab('pricing')} className="hover:text-white transition-colors">Pricing & Plans</button></li>
                  <li><button onClick={() => setActiveTab('help')} className="hover:text-white transition-colors">Help & Support</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-orange-500">Resources</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">BuildNow Portal</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">TG-bPASS Guidelines</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">RERA Compliance (Beta)</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Developer API (Coming Soon)</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-6 uppercase text-xs tracking-widest text-orange-500">Contact</h4>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    Warangal, kreethinagar, TS
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-orange-500" />
                    +91 8105056844
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-orange-500" />
                    manidharmanidhar2@gmail.com
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-500">
                © 2026 BuildTrack Telangana. All rights reserved. Built for the Telangana Construction Ecosystem.
              </p>
              <div className="flex items-center gap-6 text-xs text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy <span className="text-[8px] bg-gray-600 px-1 rounded ml-1">COMING SOON</span></a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service <span className="text-[8px] bg-gray-600 px-1 rounded ml-1">COMING SOON</span></a>
                <a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                  Govt. Data MoU <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ErrorBoundary>
  );
}
