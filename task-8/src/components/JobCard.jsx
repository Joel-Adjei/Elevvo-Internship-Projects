import StatusBadge from './StatusBadge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const JobCard = ({ job, onClick }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-smooth cursor-pointer border border-border"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-1">{job.jobTitle}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <Briefcase className="w-4 h-4 mr-1.5" />
            <span>{job.companyName}</span>
          </div>
        </div>
        <StatusBadge status={job.status} />
      </div>

      <div className="space-y-2">
        {job.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1.5" />
            <span>{job.location}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 mr-1.5" />
          <span>Applied on {formatDate(job.appliedDate)}</span>
        </div>
      </div>

      {job.notes && (
        <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
          {job.notes}
        </p>
      )}
    </div>
  );
};

export default JobCard;
