import React from 'react';
import { Bell } from 'lucide-react';
import type { Communication } from '../../types/company';

interface NotificationBadgeProps {
  communications: Communication[];
  onClick: () => void;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ communications, onClick }) => {
  const overdueCount = communications.filter(c => c.status === 'overdue').length;
  const pendingCount = communications.filter(c => c.status === 'pending').length;
  const totalCount = overdueCount + pendingCount;

  return (
    <button
      onClick={onClick}
      className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
    >
      <Bell className="h-6 w-6" />
      {totalCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
          {totalCount}
        </span>
      )}
    </button>
  );
};

export default NotificationBadge;