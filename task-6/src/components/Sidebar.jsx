import { Briefcase, Home, Settings , User, UserCircle2, X  } from "lucide-react";
import { NavLink } from "react-router-dom";
import { USER_PROFILE } from "../utils/data";

const navItems = [
    { name: 'Overview', icon: Home, page: 'overview', path: '/' },
    { name: 'Projects', icon: Briefcase, page: 'projects' , path: '/projects' },
    { name: 'Profile', icon: UserCircle2, page: 'profile',path: '/profile' },
];
  

  const Sidebar = ({ isMenuOpen, setIsMenuOpen, currentPage, navigate }) => {
    const brandName = "ADMIN DASH";
    const logoClasses = "font-extrabold text-2xl text-slate-900 tracking-wider";
  
    return (
      <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 transition-transform duration-300 transform lg:translate-x-0 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className=" h-full flex flex-col">

          <div className="flex py-4 px-6 bg-yellow-400 justify-between items-center mb-6">
            <div className={logoClasses}>{brandName}</div>
            <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
  
          {/* Navigation */}
          <nav className="p-6 pt-0 flex-grow space-y-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              const activeClasses = isActive
                ? 'bg-yellow-400 text-slate-900 shadow-md'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white';
  
              return (
                <NavLink
                    to={item.path}
                  key={item.page}
                  onClick={() => { navigate(item.page); setIsMenuOpen(false); }}
                  className={`flex items-center w-full p-3 rounded-lg font-medium transition-all duration-200 ${activeClasses}`}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
  
          {/* User Info (Optional - placed here for a professional look) */}
          <div className="p-4 mt-auto bg-slate-800 flex items-center shadow-lg">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
              src={USER_PROFILE.profileImage}
              alt="User Avatar"
            />
            <div className="ml-3">
              <p className="text-sm font-semibold text-white">{USER_PROFILE.name}</p>
              <p className="text-xs text-slate-400">Freelancer</p>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Sidebar;