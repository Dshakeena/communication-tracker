import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const ActivityLog: React.FC = () => {
  const activities = [
    { 
      type: 'email',
      company: 'TechCorp',
      time: '2h ago',
      status: 'sent'
    },
    {
      type: 'call',
      company: 'InnoSys',
      time: '4h ago',
      status: 'completed'
    },
    {
      type: 'message',
      company: 'DataFlow',
      time: '5h ago',
      status: 'pending'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-500" />;
      case 'call':
        return <Phone className="h-4 w-4 text-green-500" />;
      case 'message':
        return <MessageSquare className="h-4 w-4 text-purple-500" />;
      default:
        return null;
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
            {getIcon(activity.type)}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{activity.company}</p>
            <p className="text-xs text-gray-500">{activity.time}</p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            activity.status === 'completed' ? 'bg-green-100 text-green-700' :
            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {activity.status}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;