import React from 'react';
import type { CommunicationMethod } from '../../types/company';

interface CommunicationMethodFormProps {
  onSubmit: (method: Partial<CommunicationMethod>) => void;
  initialData?: CommunicationMethod;
}

const CommunicationMethodForm: React.FC<CommunicationMethodFormProps> = ({ onSubmit, initialData }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onSubmit({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      sequence: parseInt(formData.get('sequence') as string, 10),
      isMandatory: formData.get('mandatory') === 'true',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Method Name</label>
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
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows={3}
            defaultValue={initialData?.description}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="sequence" className="block text-sm font-medium text-gray-700">Sequence</label>
          <input
            type="number"
            id="sequence"
            name="sequence"
            min="1"
            defaultValue={initialData?.sequence}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="mandatory" className="block text-sm font-medium text-gray-700">Mandatory</label>
          <select
            id="mandatory"
            name="mandatory"
            defaultValue={initialData?.isMandatory ? 'true' : 'false'}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {initialData ? 'Update Method' : 'Add Method'}
        </button>
      </div>
    </form>
  );
};

export default CommunicationMethodForm;