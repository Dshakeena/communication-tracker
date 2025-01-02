import React from 'react';
import { X } from 'lucide-react';
import type { Communication } from '../../types/company';

interface NotificationPanelProps {
  communications: Communication[];
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ communications, onClose }) => {
  const overdueComms = communications.filter(c => c.status === 'overdue');
  const pendingComms = communications.filter(c => c.status === 'pending');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-end">
      <div className="w-96 bg-white h-full shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {overdueComms.length > 0 && (
          <div className="mb-6">
            <h3 className="text-red-600 font-medium mb-3">Overdue Communications</h3>
            <div className="space-y-2">
              {overdueComms.map((comm) => (
                <div key={comm.id} className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{comm.companyId}</p>
                  <p className="text-sm text-gray-600">{comm.notes}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(comm.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {pendingComms.length > 0 && (
          <div>
            <h3 className="text-yellow-600 font-medium mb-3">Due Today</h3>
            <div className="space-y-2">
              {pendingComms.map((comm) => (
                <div key={comm.id} className="p-3 bg-yellow-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{comm.companyId}</p>
                  <p className="text-sm text-gray-600">{comm.notes}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Due: {new Date(comm.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;