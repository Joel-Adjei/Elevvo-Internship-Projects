import { useState, useEffect, useRef } from "react";
import { Menu, Bell , Briefcase, Home, UserCircle2 ,} from "lucide-react";
import { MOCK_ACTIVITIES, USER_PROFILE  } from "../utils/data";
import { useNavigate } from "react-router-dom";

const navItems = [
    { name: 'Overview', icon: Home, page: 'overview', path: '/' },
    { name: 'Projects', icon: Briefcase, page: 'projects' , path: '/projects' },
    { name: 'Profile', icon: UserCircle2, page: 'profile',path: '/profile' },
];
  

const Header = ({ setIsMenuOpen }) => {
    const notifications = MOCK_ACTIVITIES.slice(0, 3);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
  
    return (
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 bg-white shadow-sm z-30 transition-all duration-300">
        <div className="flex justify-between items-center h-full px-6">
          {/* Hamburger Menu (Mobile) and Page Title */}
          <div className="flex items-center">
            <button className="lg:hidden mr-4 text-slate-900" onClick={() => setIsMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-800">
              {navItems.find(item => item.page === localStorage.getItem('currentPage'))?.name || 'Dashboard'}
            </h1>
          </div>
  
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notification Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="p-2 rounded-full text-slate-600 hover:bg-slate-100 transition-colors duration-200 relative"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full border border-white"></span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 z-50">
                  <div className="p-4 border-b">
                    <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.map(activity => (
                      <div key={activity.id} className="flex items-start p-3 hover:bg-slate-50 border-b last:border-b-0">
                        <activity.icon size={16} className={`mt-1 mr-3 ${activity.color}`} />
                        <div>
                          <p className="text-sm text-slate-700 leading-tight">{activity.text}</p>
                          <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
  
            {/* User Avatar (Desktop) */}
            <img
              className="w-8 h-8 rounded-full cursor-pointer object-cover lg:block hidden border border-yellow-400"
              src={USER_PROFILE.profileImage}
              alt="User Avatar"
              onClick={() => navigate('/profile')}
            />
          </div>
        </div>
      </header>
    );
};

export default Header;