import { createContext, useContext, useState, useEffect, ReactNode } from 'react';


const JobContext = createContext();

const STORAGE_KEY = 'job-tracker-applications';

export const JobProvider = ({ children }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [jobs, setJobs] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const addJob = (job) => {
    const newJob = {
      ...job,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id, updatedJob) => {
    setJobs(prev =>
      prev.map(job => (job.id === id ? { ...job, ...updatedJob } : job))
    );
  };

  const deleteJob = (id) => {
    setJobs(prev => prev.filter(job => job.id !== id));
  };

  const getJobById = (id) => {
    return jobs.find(job => job.id === id);
  };

  const exportJobs = () => {
    const dataStr = JSON.stringify(jobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `job-applications-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const importJobs = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedJobs = JSON.parse(e.target?.result );
          if (Array.isArray(importedJobs)) {
            setJobs(importedJobs);
            resolve();
          } else {
            reject(new Error('Invalid file format'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        isFormOpen,
        setIsFormOpen,
        addJob,
        updateJob,
        deleteJob,
        getJobById,
        exportJobs,
        importJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobs =()=> useContext(JobContext);
