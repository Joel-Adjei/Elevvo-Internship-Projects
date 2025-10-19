import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Briefcase, List, LayoutDashboard, Menu, X } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/jobs', label: 'Jobs', icon: List },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card border border-border rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav
        className={`bg-card border-r border-border h-screen w-64 fixed left-0 top-0 flex flex-col shadow-lg z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="px-6 py-4 bg-primary border-b border-border">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-green-50 p-2 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
            <h1 className="text-xl text-green-50 font-bold">Job Tracker</h1>
          </div>
        </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth ${
                    isActive(link.to)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
