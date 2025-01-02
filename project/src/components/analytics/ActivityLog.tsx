import React from 'react';
import { Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import type { Communication } from '../../types/company';

interface ActivityLogProps {
  activities: Communication[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ activities }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'phone':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'linkedin':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div 
          key={index}
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="p-2 bg-gray-100 rounded-full">
            {getIcon(activity.methodId)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{activity.companyId}</p>
            <p className="text-xs text-gray-500">
              {new Date(activity.date).toLocaleString()}
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            activity.status === 'completed' ? 'bg-green-100 text-green-700' :
            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {activity.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;