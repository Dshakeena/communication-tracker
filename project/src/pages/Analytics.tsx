import React from 'react';
import EngagementChart from '../components/analytics/EngagementChart';
import ActivityLog from '../components/analytics/ActivityLog';

const Analytics = () => {
  // TODO: Fetch real data from Supabase
  const mockEngagementData = [
    { method: 'LinkedIn Post', count: 45, successRate: 80 },
    { method: 'Email', count: 30, successRate: 65 },
    { method: 'Phone Call', count: 25, successRate: 90 }
  ];

  const mockActivities = [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <EngagementChart data={mockEngagementData} />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ActivityLog activities={mockActivities} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;