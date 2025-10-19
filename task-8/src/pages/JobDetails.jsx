import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import JobForm from '../components/JobForm';
import StatusBadge from '../components/StatusBadge';
import { ArrowLeft, Briefcase, MapPin, Calendar, DollarSign, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';
import Alert from '../components/ui/Alert';
import usePageTitle from '../hooks/usePageTitle';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getJobById, updateJob, deleteJob } = useJobs();
  const [isEditing, setIsEditing] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);

  const job = id ? getJobById(id) : null;
  usePageTitle({ title : job ? `${job.jobTitle} at ${job.companyName}` : 'Job Details'});

  if (!job) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Job not found</h2>
          <button
            onClick={() => navigate('/jobs')}
            className="text-primary hover:underline"
          >
            Return to Jobs
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleUpdate = (updatedJob) => {
    if (id) {
      updateJob(id, updatedJob);
      setIsEditing(false);
      toast.success('Application updated successfully!');
    }
  };

  const handleDelete = () => {
    if (id) {
      deleteJob(id);
      toast.success('Application deleted successfully!');
      navigate('/jobs');
    }
  };

  return (
    <div className=" min-h-screen">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>

        <div className="bg-card min-h-[500px] rounded-2xl shadow-lg border border-border overflow-y-auto">
          <div className="p-8 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-3xl font-semibold mb-2">{job.jobTitle}</h1>
                <div className="flex items-center text-muted-foreground mb-3">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <span className="text-lg">{job.companyName}</span>
                </div>
              </div>
              <StatusBadge status={job.status} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-muted-foreground">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Applied on {formatDate(job.appliedDate)}</span>
              </div>

              {job.location && (
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>{job.location}</span>
                </div>
              )}

              {job.salary && (
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <span>{job.salary}</span>
                </div>
              )}

              {job.jobUrl && (
                <div className="flex items-center">
                  <ExternalLink className="w-5 h-5 mr-3 text-muted-foreground" />
                  <a
                    href={job.jobUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View Job Posting
                  </a>
                </div>
              )}
            </div>

            {job.notes && (
              <div>
                <h2 className="font-medium text-lg mb-2">Notes</h2>
                <p className="text-foreground min-h-40 whitespace-pre-wrap bg-secondary/30 p-4 rounded-lg">
                  {job.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <button
                onClick={() => setIsEditing(true)}
                className=" flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary-hover transition-smooth"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setDisplayAlert(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-destructive/10 text-destructive rounded-lg font-medium hover:bg-destructive/20 transition-smooth"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <JobForm
          job={job}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <Alert
        display={displayAlert}
        heading="Delete Application"
        subheading="Are you sure you want to delete this application?"
        meassage="This action cannot be undone."
        onOkay={() => {
          handleDelete();
          setDisplayAlert(false);
        }}
        onCancel={() => setDisplayAlert(false)}
        type="error"
      />
    </div>
  );
};

export default JobDetail;
