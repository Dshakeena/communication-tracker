import React from 'react';
import CompanyGrid from '../components/dashboard/CompanyGrid';

const Dashboard = () => {
  // TODO: Fetch real data from Supabase
  const mockCompanies = [];
  const mockCommunications = [];

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Company Dashboard</h1>
        <button className="btn-primary">
          Log Communication
        </button>
      </header>

      <CompanyGrid
        companies={mockCompanies}
        communications={mockCommunications}
      />
    </div>
  );
};

export default Dashboard;