import { useState } from 'react';

export default function SignatureForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
    affiliation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/signatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Signature submitted successfully! Please check your email to validate your signature.'
        });
        setFormData({ name: '', email: '', jobTitle: '', affiliation: '' });
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'An error occurred. Please try again.'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-16 border-2 border-gray-300 rounded-lg px-8 pt-6 pb-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-4">Add your name to the list</h2>
      <p className="mb-6 text-lg">
        Demonstrate your support for this open letter by adding your own signature to the list:
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <p className="mt-1 text-sm text-gray-600">
            An email will be sent to this address to validate the signature.
          </p>
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-1">
            Affiliation
          </label>
          <input
            type="text"
            id="affiliation"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {message.text && (
          <div className={`p-4 rounded-md ${
            message.type === 'success'
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Validate'}
        </button>

        <p className="text-xs text-gray-600 text-center">
          We store the data you have entered into this form, including some basic information about your system,
          in order for us to validate and display signatories of this open letter. By clicking 'Validate',
          you consent to your data being stored for this purpose. This notice is required in order for us to
          comply with EU data protection regulations.
        </p>
      </form>
    </div>
  );
}
