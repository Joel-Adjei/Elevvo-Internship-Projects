import React from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import { useJobs } from "../contexts/JobContext";
import { Briefcase, Download, Plus, Upload } from "lucide-react";
import JobForm from "../components/JobForm";

const JobLayout = () => {
  const { exportJobs, importJobs,addJob, isFormOpen , setIsFormOpen } = useJobs();

  
  const handleAddJob = (job) => {
    addJob(job);
    setIsFormOpen(false);
    toast.success("Application added successfully!");
  };

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
    <div>
      <header className="bg-card border-b border-border sticky top-0 z-30 shadow-sm">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Briefcase className="w-5 h-5" />
              </div>
              <h1 className="text-xl text-primary font-bold">Job Tracker</h1>
            </div>
            <div className="flex items-center md:gap-3">
              <button
                onClick={exportJobs}
                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm border border-primary text-primary rounded-full hover:bg-secondary/20 transition-smooth"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <label className="hidden md:flex items-center gap-2 px-4 py-2 text-sm border border-primary text-primary rounded-full hover:bg-secondary/20 transition-smooth cursor-pointer">
                <Upload className="w-4 h-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-smooth"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>
        </div>
      </header>

      <Outlet />

            {/* Modal */}
            {isFormOpen && (
        <JobForm
          onSubmit={handleAddJob}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};

export default JobLayout;
