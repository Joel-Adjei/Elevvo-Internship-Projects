import { useState } from 'react';
import { X } from 'lucide-react';
import Input from './ui/Input';


const JobForm = ({ job, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    companyName: job?.companyName || '',
    jobTitle: job?.jobTitle || '',
    status: job?.status || 'Applied' ,
    appliedDate: job?.appliedDate || new Date().toISOString().split('T')[0],
    location: job?.location || '',
    salary: job?.salary || '',
    jobUrl: job?.jobUrl || '',
    notes: job?.notes || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky bg-secondary top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {job ? 'Edit Application' : 'Add Application'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-secondary rounded-lg transition-smooth"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Company Name *"
              value={formData.companyName}
              onChange={handleChange}
              placeholder={"e.g., Acme Corp"}
              name={"companyName"}
            />
            
            <Input
              label="Job Title *"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder={"e.g., Software Engineer"}
              name={"jobTitle"}
            />


            <div>
              <label className="block text-sm font-medium mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-green-50/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <Input
              label="Applied Date *"
              type="date"
              value={formData.appliedDate}
              onChange={handleChange}
              name={"appliedDate"}
            />
            <Input
              label="Location"
              value={formData.location}
              onChange={handleChange}
              name={"location"}
              placeholder={"e.g., Haatso, Accra"}
            />
            <Input
              label="Salary"
              value={formData.salary}
              onChange={handleChange}
              name={"salary"}
              placeholder={"$50,000"}
            />
          </div>

          <Input 
            label="Job URL"
            type="url"
            value={formData.jobUrl}
            onChange={handleChange}
            name={"jobUrl"}
            placeholder={"https://example.com/job-posting"}
          />

          <div>
            <label className="block text-sm font-medium mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 bg-green-50/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Add any additional notes..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary-hover transition-smooth"
            >
              {job ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-primary text-primary rounded-full font-medium hover:bg-secondary/20 transition-smooth"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
