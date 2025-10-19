import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJobs } from '../contexts/JobContext';
import { Briefcase, TrendingUp, Clock, CheckCircle2, XCircle } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import usePageTitle from '../hooks/usePageTitle';

const Dashboard = () => {
  const navigate = useNavigate();
  const { jobs } = useJobs();
  usePageTitle({ title: 'Dashboard' });

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      applied: jobs.filter(j => j.status === 'Applied').length,
      interviewing: jobs.filter(j => j.status === 'Interviewing').length,
      offers: jobs.filter(j => j.status === 'Offer').length,
      rejected: jobs.filter(j => j.status === 'Rejected').length,
    };
  }, [jobs]);

  const recentJobs = useMemo(() => {
    return [...jobs]
      .sort((a, b) => new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime())
      .slice(0, 5);
  }, [jobs]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-xl text-accent font-bold mb-1">Dashboard</h1>
          <p className="text-primary text-md">Track your job application progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-primary rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <Briefcase className="w-8 h-8 text-white" />
              <div className="text-3xl text-white font-bold">{stats.total}</div>
            </div>
            <div className="text-sm text-green-50">Total Applications</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <Clock className="w-8 h-8 text-status-applied" />
              <div className="text-3xl font-bold text-status-applied">{stats.applied}</div>
            </div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="w-8 h-8 text-status-interviewing" />
              <div className="text-3xl font-bold text-status-interviewing">{stats.interviewing}</div>
            </div>
            <div className="text-sm text-muted-foreground">Interviewing</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <CheckCircle2 className="w-8 h-8 text-status-offer" />
              <div className="text-3xl font-bold text-status-offer">{stats.offers}</div>
            </div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </div>

          <div className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-smooth">
            <div className="flex items-center justify-between mb-3">
              <XCircle className="w-8 h-8 text-status-rejected" />
              <div className="text-3xl font-bold text-status-rejected">{stats.rejected}</div>
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-card rounded-xl shadow-card border border-border">
          <div className="px-6 py-2 bg-green-800/90 rounded-t-xl border-b border-border flex items-center justify-between">
            <h2 className="text-lg text-white font-semibold">Recent Applications</h2>
            <button
              onClick={() => navigate('/jobs')}
              className="text-white hover:underline text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="p-6">
            {recentJobs.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No applications yet</p>
                <button
                  onClick={() => navigate('/jobs')}
                  className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-smooth"
                >
                  Add Your First Application
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    onClick={() => navigate(`/jobs/${job.id}`)}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-secondary/50 cursor-pointer transition-smooth border border-border"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{job.jobTitle}</h3>
                      <p className="text-sm text-muted-foreground">{job.companyName}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {new Date(job.appliedDate).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium `}
                      >
                        {<StatusBadge status={job.status} />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
