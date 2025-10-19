import { useState, useEffect } from 'react';
import { Menu, X, Droplet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = ['For Consumers', 'For Suppliers', 'How It Works', 'About Us'];
   
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/95 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Droplet className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-800">
              Water<span className="text-sky-400">Connect</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-slate-600 hover:text-sky-400 font-medium transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={()=>navigate('/login')} className="px-6 py-2.5 text-slate-700 font-medium hover:text-sky-400 transition-colors duration-200">
              Sign In
            </button>
            <button onClick={()=>navigate('/signup')} className="px-6 py-2.5 bg-sky-400 text-white font-medium rounded-lg hover:bg-sky-500 transform hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg">
              Join Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-slate-200 animate-fadeIn">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-3 text-slate-600 hover:text-sky-400 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <button onClick={()=>navigate('/login')} value="Sign In" className="w-full py-2.5 text-slate-700 font-medium border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                Sign In
              </button>
              <button onClick={()=>navigate('/signup')} value="Join Now" className="w-full py-2.5 bg-sky-400 text-white font-medium rounded-lg hover:bg-sky-500 transition-colors">
                    Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

