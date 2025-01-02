import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Company } from '../../types/company';

interface CompanyFormProps {
  onSubmit: (company: Partial<Company>) => void;
  initialData?: Company;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ onSubmit, initialData }) => {
  const [emails, setEmails] = React.useState<string[]>(initialData?.emails || ['']);
  const [phones, setPhones] = React.useState<string[]>(initialData?.phoneNumbers || ['']);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      location: formData.get('location') as string,
      linkedinProfile: formData.get('linkedin') as string,
      emails: emails.filter(Boolean),
      phoneNumbers: phones.filter(Boolean),
      comments: formData.get('comments') as string,
      communicationPeriodicity: parseInt(formData.get('periodicity') as string, 10),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.name}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            defaultValue={initialData?.location}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn Profile</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            defaultValue={initialData?.linkedinProfile}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
          {emails.map((email, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  const newEmails = [...emails];
                  newEmails[index] = e.target.value;
                  setEmails(newEmails);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {emails.length > 1 && (
                <button
                  type="button"
                  onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setEmails([...emails, ''])}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Email
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Numbers</label>
          {phones.map((phone, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const newPhones = [...phones];
                  newPhones[index] = e.target.value;
                  setPhones(newPhones);
                }}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              {phones.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPhones(phones.filter((_, i) => i !== index))}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPhones([...phones, ''])}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Phone
          </button>
        </div>

        <div>
          <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700">
            Communication Periodicity (days)
          </label>
          <input
            type="number"
            id="periodicity"
            name="periodicity"
            min="1"
            defaultValue={initialData?.communicationPeriodicity || 14}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium text-gray-700">Comments</label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            defaultValue={initialData?.comments}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Company' : 'Add Company'}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;