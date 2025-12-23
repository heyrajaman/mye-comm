import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaStore, FaUser, FaFileInvoiceDollar } from "react-icons/fa";

const VendorRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Personal
    name: "",
    email: "",
    phone: "",
    password: "",
    aadhar: "",

    // Business
    businessName: "",
    businessType: "Retail",
    businessAddress: "",
    yearsInBusiness: "",

    // Legal & Bank
    pan: "",
    gst: "",
    bankName: "",
    ifscCode: "",
    bankHolderName: "", // <--- Added Holder Name
    bankAccount: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Full Vendor Application:", formData);
    alert(
      "Application Submitted! Your account is under review (Pending Approval)."
    );
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-purple-700 px-8 py-6 text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Vendor Registration
          </h2>
          <p className="text-purple-200 mt-2">
            Join our marketplace and start selling today.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* SECTION 1: PERSONAL DETAILS */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
              <FaUser className="text-purple-600" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  name="aadhar"
                  placeholder="12-digit UID"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: BUSINESS INFORMATION */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
              <FaStore className="text-purple-600" /> Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business / Shop Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Business Type *
                </label>
                <select
                  name="businessType"
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Retail">Retailer</option>
                  <option value="Wholesale">Wholesaler</option>
                  <option value="Manufacturer">Manufacturer</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Physical Address *
                </label>
                <textarea
                  name="businessAddress"
                  rows="2"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Years in Business
                </label>
                <input
                  type="number"
                  name="yearsInBusiness"
                  min="0"
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: LEGAL & BANKING */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2 border-b pb-2 mb-4">
              <FaFileInvoiceDollar className="text-purple-600" /> Legal &
              Banking
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  PAN Number *
                </label>
                <input
                  type="text"
                  name="pan"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500 uppercase"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  GST Number *
                </label>
                <input
                  type="text"
                  name="gst"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500 uppercase"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Name *
                </label>
                <input
                  type="text"
                  name="bankName"
                  placeholder="e.g. HDFC Bank"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IFSC Code *
                </label>
                <input
                  type="text"
                  name="ifscCode"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500 uppercase"
                />
              </div>

              {/* --- NEW: ACCOUNT HOLDER NAME --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  name="bankHolderName"
                  placeholder="Name as per Passbook"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bank Account Number *
                </label>
                <input
                  type="password"
                  name="bankAccount"
                  required
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 p-2 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-purple-700 text-white font-bold py-4 rounded-xl hover:bg-purple-800 transition shadow-lg text-lg"
            >
              Submit Application for Review
            </button>
            <p className="text-center text-gray-500 mt-4 text-sm">
              By clicking submit, you agree to our Terms & Vendor Policy.
            </p>
          </div>
        </form>
      </div>

      <div className="text-center mt-8">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-purple-700 font-semibold hover:underline"
        >
          Login here
        </Link>
      </div>
    </div>
  );
};

export default VendorRegister;
