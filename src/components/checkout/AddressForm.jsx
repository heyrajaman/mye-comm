import { useState } from "react";

const AddressForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      fullName: "",
      phone: "",
      addressLine1: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the data up to the parent (Checkout Page)
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fadeIn">
      {/* Grid for Name & Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            required
            placeholder="Aman Singh"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="9876543210"
            pattern="[0-9]{10}"
            title="Please enter a valid 10-digit phone number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      {/* Address Line */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address (House No, Building, Street)
        </label>
        <textarea
          name="addressLine1"
          required
          rows="2"
          placeholder="123 Main St, Apartment 4B"
          value={formData.addressLine1}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition resize-none"
        />
      </div>

      {/* Grid for City, State, Zip */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            name="zipCode"
            required
            pattern="[0-9]{6}"
            title="Please enter a valid 6-digit ZIP code"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-sm"
      >
        Continue to Payment
      </button>
    </form>
  );
};

export default AddressForm;
