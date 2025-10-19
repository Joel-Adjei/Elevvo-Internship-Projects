import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useJobs } from "../contexts/JobContext";
import JobCard from "../components/JobCard";
import JobForm from "../components/JobForm";
import { Plus, Download, Upload, Briefcase } from "lucide-react";
import { toast } from "react-toastify";
import StatusBadge from "../components/StatusBadge";
import Select from "../components/ui/Select";
import usePageTitle from "../hooks/usePageTitle";

const Jobs = () => {
  const navigate = useNavigate();
  const { exportJobs, importJobs, jobs, setIsFormOpen } =
    useJobs();
  const [filterStatus, setFilterStatus] = useState("All");
  usePageTitle({ title: "Jobs" });
  
  const stats = useMemo(() => {
    return {
      total: jobs.length,
      applied: jobs.filter((j) => j.status === "Applied").length,
      interviewing: jobs.filter((j) => j.status === "Interviewing").length,
      offers: jobs.filter((j) => j.status === "Offer").length,
      rejected: jobs.filter((j) => j.status === "Rejected").length,
    };
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (filterStatus === "All") return jobs;
    return jobs.filter((job) => job.status === filterStatus);
  }, [jobs, filterStatus]);


  const handleImport = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importJobs(file);
        toast.success("Applications imported successfully!");
      } catch (error) {
        console.error("Import Error:", error);
        toast.error("Failed to import applications");
      }
      e.target.value = "";
    }
  };

  return (
    <div className="min-h-screen">
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex md:hidden mb-4 items-center gap-3">
          <button
            onClick={exportJobs}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-primary text-primary rounded-full hover:bg-secondary/20 transition-smooth"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 text-sm border border-primary text-primary rounded-full hover:bg-secondary/20 transition-smooth cursor-pointer">
            <Upload className="w-4 h-4" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-2xl font-bold mb-1">{stats.total}</div>
            <div className="text-sm text-muted-foreground">
              Total Applications
            </div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-2xl font-bold text-status-applied mb-1">
              {stats.applied}
            </div>
            <div className="text-sm text-muted-foreground">Applied</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-2xl font-bold text-status-interviewing mb-1">
              {stats.interviewing}
            </div>
            <div className="text-sm text-muted-foreground">Interviewing</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-2xl font-bold text-status-offer mb-1">
              {stats.offers}
            </div>
            <div className="text-sm text-muted-foreground">Offers</div>
          </div>
          <div className="bg-card rounded-xl p-5 shadow-card border border-border">
            <div className="text-2xl font-bold text-status-rejected mb-1">
              {stats.rejected}
            </div>
            <div className="text-sm text-muted-foreground">Rejected</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 w-full px-3 overflow-x-auto">
        <div className="hidden sm:grid w-4xl md:w-full grid-cols-5 bg-white gap-5 px-2 rounded-sm shadow py-2">
          {["All", "Applied", "Interviewing", "Offer", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-2 w-fit md:w-full rounded-lg font-medium text-sm whitespace-nowrap transition-smooth ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg- text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>

        <div>
          <Select 
            label="Filter by Status"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { label: "All", value: "All" },
              { label: "Applied", value: "Applied" },
              { label: "Interviewing", value: "Interviewing" },
              { label: "Offer", value: "Offer" },
              { label: "Rejected", value: "Rejected" },
            ]}
            className="sm:hidden"
          />
        </div>
        </div>

        {/* Job Cards */}
        {filteredJobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-secondary/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your job applications by adding your first one!
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-smooth"
            >
              <Plus className="w-5 h-5" />
              Add Your First Application
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onClick={() => navigate(`/jobs/${job.id}`)}
              />
            ))}
          </div>
        )}
      </main>


    </div>
  );
};

export default Jobs;
