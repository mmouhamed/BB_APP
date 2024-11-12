"use client"

import { useState } from "react";

export default function CreateWorkOrder() {
  const [formData, setFormData] = useState({
    requestedService: "",
    worksite: "",
    serviceDueDate: "",
    serviceType: "Cleaning",
    specificLocation: "",
    additionalDetails: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("/api/work-orders", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Work Order created successfully!");
      } else {
        alert("There was an error creating the work order.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-blue-700 mb-6">Create New Work Order</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-4">
        {/* Requested Service */}
        <div>
          <label htmlFor="requestedService" className="block text-lg font-medium text-gray-700">
            Requested Service
          </label>
          <input
            type="text"
            id="requestedService"
            name="requestedService"
            value={formData.requestedService}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
            required
          />
        </div>

        {/* Worksite */}
        <div>
          <label htmlFor="worksite" className="block text-lg font-medium text-gray-700">
            Worksite
          </label>
          <input
            type="text"
            id="worksite"
            name="worksite"
            value={formData.worksite}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
            required
          />
        </div>

        {/* Service Due Date */}
        <div>
          <label htmlFor="serviceDueDate" className="block text-lg font-medium text-gray-700">
            Service Due Date
          </label>
          <input
            type="date"
            id="serviceDueDate"
            name="serviceDueDate"
            value={formData.serviceDueDate}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
            required
          />
        </div>

        {/* Service Type */}
        <div>
          <label htmlFor="serviceType" className="block text-lg font-medium text-gray-700">
            Service Type
          </label>
          <select
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
          >
            <option value="Cleaning">Cleaning</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Additional Labor">Additional Labor</option>
            <option value="HVAC">HVAC</option>
          </select>
        </div>

        {/* Specific Location */}
        <div>
          <label htmlFor="specificLocation" className="block text-lg font-medium text-gray-700">
            Specific Location in Building
          </label>
          <textarea
            id="specificLocation"
            name="specificLocation"
            value={formData.specificLocation}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
            rows="4"
          />
        </div>

        {/* Additional Details */}
        <div>
          <label htmlFor="additionalDetails" className="block text-lg font-medium text-gray-700">
            Additional Details
          </label>
          <textarea
            id="additionalDetails"
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
            rows="4"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">
            Upload Image (Optional)
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="mt-2 p-3 w-full border rounded-lg"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Create New Order
          </button>
        </div>
      </form>
    </div>
  );
}
