import React from 'react';
import { BarChart3 } from 'lucide-react';

const EngagementChart: React.FC = () => {
  const data = [
    { method: 'Email', count: 45, color: 'bg-blue-500' },
    { method: 'Phone', count: 30, color: 'bg-green-500' },
    { method: 'LinkedIn', count: 25, color: 'bg-purple-500' }
  ];

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{item.method}</span>
            <span className="text-gray-900 font-medium">{item.count}</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full ${item.color} transition-all duration-500`}
              style={{ width: `${(item.count / maxCount) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EngagementChart;