import React from 'react';
import { BarChart3 } from 'lucide-react';

interface EngagementChartProps {
  data: {
    method: string;
    count: number;
    successRate: number;
  }[];
}

const EngagementChart: React.FC<EngagementChartProps> = ({ data }) => {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Communication Methods</h3>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{item.method}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-900 font-medium">{item.count}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.successRate >= 75 ? 'bg-green-100 text-green-700' :
                  item.successRate >= 50 ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.successRate}% success
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${
                  item.successRate >= 75 ? 'bg-green-500' :
                  item.successRate >= 50 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementChart;