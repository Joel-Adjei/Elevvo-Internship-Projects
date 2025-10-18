import Card from "../components/ui/Card";
import { useEffect, useState } from "react";
import { Settings, User, Mail, Lock, UploadCloud, Save, Edit } from "lucide-react";
import { USER_PROFILE } from "../utils/data";
import Modal from "../components/ui/Modal";

const Profile = () => {
  const [formData, setFormData] = useState(USER_PROFILE);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    document.title = "Profile - Pro Dash";
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Saved:", formData);
    setDisplayModal(false);
  };

  return (
    <>
      <Card className="max-w-4xl mx-auto pt-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-3 flex items-center">
          <Settings size={22} className="mr-2 text-yellow-500" /> Profile &
          Account Settings
        </h2>
        <div onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-between space-y-6">
          {/* Profile Image */}
          <div className="flex items-center space-x-6 pb-4">
            <img
              src={formData.profileImage}
              alt="Profile Avatar"
              className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            />
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {formData.name}
              </h3>
              <p className="text-sm text-slate-500">{formData.email}</p>

              <label
                htmlFor="file-upload"
                className="flex items-center mt-3 cursor-pointer px-4 py-2 text-sm font-medium text-slate-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition duration-150 w-fit shadow-md"
              >
                <UploadCloud size={16} className="mr-2" />
                Change Photo
              </label>
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setDisplayModal(true)}
              className="px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition duration-300 transform hover:scale-[1.01]"
            >
              Update
              <Edit size={16} className="inline-block ml-2" />
            </button>
          </div>
        </div>
      </Card>

      {displayModal && (
        <Modal
          title="Edit Profile"
          handleclose={() => setDisplayModal(false)}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700 flex items-center"
                >
                  <User size={14} className="mr-1 text-slate-500" /> Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700 flex items-center"
                >
                  <Mail size={14} className="mr-1 text-slate-500" /> Email
                  Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 pt-4 border-t">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700 flex items-center"
              >
                <Lock size={14} className="mr-1 text-slate-500" /> New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
                className="w-full p-3 border border-slate-200 rounded-lg focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
              />
              <p className="text-xs text-slate-400">
                Passwords must be at least 8 characters long.
              </p>
            </div>

            <button
              type="submit"
              className="w-full mt-4 px-6 py-3 bg-slate-900 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 transition duration-300 flex items-center justify-center"
            >
              <Save size={16} className="inline-block mr-2" />
              Save
            </button>
          </form>
        </Modal>
      )}
    </>
  );
};

export default Profile;
