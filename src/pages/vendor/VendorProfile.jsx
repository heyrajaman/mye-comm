import { useState } from "react";
import { FaStore, FaUniversity, FaSave } from "react-icons/fa";

const VendorProfile = () => {
  // Mock Data (In real app, fetch from API)
  const [profile, setProfile] = useState({
    name: "Rahul Sharma",
    email: "rahul@myshop.com",
    phone: "9876543210",
    businessName: "Rahul Electronics",
    businessAddress: "Shop 12, MG Road, Mumbai",
    gst: "27ABCDE1234F1Z5",
    bankName: "HDFC Bank",
    bankAccount: "********9876",
    ifsc: "HDFC0001234",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Shop Settings</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card 1: Business Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <FaStore className="text-purple-600" /> Business Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Owner Name
              </label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Shop Name
              </label>
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                GST Number
              </label>
              <input
                type="text"
                name="gst"
                value={profile.gst}
                disabled
                className="w-full border p-2 rounded mt-1 bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">
                Contact Admin to change GST
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Address
              </label>
              <textarea
                name="businessAddress"
                value={profile.businessAddress}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Card 2: Banking Details */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
            <FaUniversity className="text-purple-600" /> Banking Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Bank Name
              </label>
              <input
                type="text"
                name="bankName"
                value={profile.bankName}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">
                IFSC Code
              </label>
              <input
                type="text"
                name="ifsc"
                value={profile.ifsc}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-600">
                Account Number
              </label>
              <input
                type="password"
                name="bankAccount"
                value={profile.bankAccount}
                onChange={handleChange}
                className="w-full border p-2 rounded mt-1"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <FaSave /> Save Changes
        </button>
      </form>
    </div>
  );
};

export default VendorProfile;
