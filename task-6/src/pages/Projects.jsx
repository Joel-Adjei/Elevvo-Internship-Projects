import Card from "../components/ui/Card";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, ChevronDown, Calendar } from "lucide-react";
import { MOCK_PROJECTS } from "../utils/data";

const StatusBadge = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
    let colorClasses = "";
  
    switch (status) {
      case 'In Progress':
        colorClasses = 'bg-yellow-100 text-yellow-700';
        break;
      case 'Completed':
        colorClasses = 'bg-green-100 text-green-700';
        break;
      case 'Pending Review':
        colorClasses = 'bg-blue-100 text-blue-700';
        break;
      case 'Late':
        colorClasses = 'bg-red-100 text-red-700';
        break;
      default:
        colorClasses = 'bg-gray-100 text-gray-700';
    }
  
    return (
      <span className={`${baseClasses} ${colorClasses}`}>
        {status}
      </span>
    );
  };

const Projects = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    useEffect(()=>{
      document.title = "Projects - Pro Dash";
      window.scrollTo(0,0);
    }, []);
    const filteredProjects = useMemo(() => {
      return MOCK_PROJECTS.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'All' || project.status === statusFilter;
        return matchesSearch && matchesStatus;
      });
    }, [searchTerm, statusFilter]);
  
    const allStatuses = ['All', ...new Set(MOCK_PROJECTS.map(p => p.status))];
  
    // Helper for progress bar
    const ProgressRing = ({ progress }) => {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (progress / 100) * circumference;
  
      let color = 'text-green-500';
      if (progress < 40) color = 'text-red-500';
      else if (progress < 80) color = 'text-yellow-500';
  
      return (
        <div className="relative h-13 w-13 rounded-full">
          <svg className="h-11 w-11 transform -rotate-90">
            <circle
              className="text-gray-200"
              strokeWidth="4"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
            />
            <circle
              className={color}
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50%"
              cy="50%"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-800">
            {progress}%
          </span>
        </div>
      );
    };
  
    const CardView = ({ project }) => (
      <Card className="flex flex-col justify-between h-full hover:shadow-yellow-200/50 transition duration-300">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-slate-900 truncate">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <div className="space-y-2 text-sm text-slate-600">
          <p className="flex justify-between items-center border-b pb-1">
            <span className="font-medium">Client:</span> <span>{project.client}</span>
          </p>
          <p className="flex justify-between items-center border-b pb-1">
            <span className="font-medium">Deadline:</span> <span className="flex items-center"><Calendar size={14} className="mr-1"/>{project.deadline}</span>
          </p>
          <p className="flex justify-between items-center">
            <span className="font-medium">Cost:</span> <span className="font-bold text-green-600">${project.totalCost.toLocaleString()}</span>
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center pt-4 border-t border-slate-100">
          <span className="text-sm font-medium text-slate-500">Progress</span>
          <ProgressRing progress={project.progress} />
        </div>
      </Card>
    );
  
    return (
      <div className="space-y-6 pt-4">
        <Card className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4">
          <div className="relative w-full sm:flex-1 sm:w-1/2">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
            />
          </div>
  
          <div className="relative sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full sm:w-40 flex justify-between items-center px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition duration-150"
            >
              <Filter size={18} className="mr-2 text-yellow-500" />
              {statusFilter}
              <ChevronDown size={16} className={`ml-2 transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'} transition-transform`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-lg shadow-xl z-10 border border-slate-100">
                {allStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => { setStatusFilter(status); setIsDropdownOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-yellow-50 transition-colors"
                  >
                    {status}
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
  
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map(project => (
              <CardView key={project.id} project={project} />
            ))
          ) : (
            <div className="md:col-span-2 xl:col-span-3 text-center p-10 bg-white rounded-xl shadow-lg text-slate-500">
              No projects found matching your criteria.
            </div>
          )}
        </div>
      </div>
    );
};

export default Projects;