import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import type { CalendarEvent } from '../../types/calendar';

interface EventTooltipProps {
  events: CalendarEvent[];
}

const EventTooltip: React.FC<EventTooltipProps> = ({ events }) => {
  const getEventIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'email':
        return <Mail className="h-3 w-3 text-blue-500" />;
      case 'phone':
        return <Phone className="h-3 w-3 text-green-500" />;
      case 'linkedin':
        return <MessageSquare className="h-3 w-3 text-purple-500" />;
    }
  };

  return (
    <div className="absolute hidden group-hover:block z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
      <div className="bg-white text-sm rounded-lg py-2 px-3 shadow-lg border border-gray-100 w-64">
        <div className="font-medium text-gray-800 mb-2">Communications</div>
        {events.map((event, idx) => (
          <div key={idx} className="flex items-center gap-2 py-1">
            {getEventIcon(event.type)}
            <div className="flex-1">
              <span className="text-gray-600">{event.notes}</span>
              {event.company && (
                <span className="block text-xs text-gray-500">{event.company}</span>
              )}
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap
              ${event.status === 'completed' ? 'bg-green-100 text-green-700' :
                event.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-blue-100 text-blue-700'}`}>
              {event.status}
            </span>
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2">
        <div className="border-8 border-transparent border-t-white drop-shadow-sm" />
      </div>
    </div>
  );
};

export default EventTooltip;