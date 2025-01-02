import React, { useState } from 'react';
import CompanyForm from '../components/admin/CompanyForm';
import CommunicationMethodForm from '../components/admin/CommunicationMethodForm';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'companies' | 'methods'>('companies');

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('companies')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'companies'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Companies
            </button>
            <button
              onClick={() => setActiveTab('methods')}
              className={`py-4 px-6 text-sm font-medium border-b-2 ${
                activeTab === 'methods'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Communication Methods
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'companies' ? (
            <CompanyForm onSubmit={console.log} />
          ) : (
            <CommunicationMethodForm onSubmit={console.log} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;