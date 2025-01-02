import React, { useState } from 'react';
import CalendarHeader from './calendar/CalendarHeader';
import EventTooltip from './calendar/EventTooltip';
import { Mail, Phone, MessageSquare } from 'lucide-react';
import type { DayEvents } from '../types/calendar';

interface CommunicationCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

const CommunicationCalendar: React.FC<CommunicationCalendarProps> = ({ selectedDate, onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dummyEvents] = useState<DayEvents[]>([
    { 
      date: 15,
      events: [
        { type: 'email', notes: 'Follow-up email sent', status: 'completed', company: 'TechCorp' },
        { type: 'linkedin', notes: 'LinkedIn connection request', status: 'pending', company: 'InnoSys' }
      ]
    },
    {
      date: 18,
      events: [
        { type: 'phone', notes: 'Client meeting scheduled', status: 'upcoming', company: 'DataFlow' }
      ]
    }
  ]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-3 w-3 text-blue-500" />;
      case 'phone':
        return <Phone className="h-3 w-3 text-green-500" />;
      case 'linkedin':
        return <MessageSquare className="h-3 w-3 text-purple-500" />;
      default:
        return null;
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1));
  };

  const currentMonth = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="calendar-container p-4 bg-white rounded-xl shadow-sm">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />

      <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-500 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center py-1">{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => {
          const dayNumber = ((i - 2 + 31) % 31) + 1;
          const hasEvents = dummyEvents.find(e => e.date === dayNumber);
          
          return (
            <div key={i} className="relative group">
              <button
                onClick={() => onDateSelect(new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNumber))}
                className={`w-full aspect-square flex flex-col items-center justify-center rounded-lg
                  transition-all duration-200
                  ${hasEvents ? 'hover:bg-indigo-100 hover:shadow-md' : 'hover:bg-gray-50'}
                  ${dayNumber === selectedDate?.getDate() ? 'bg-indigo-50 ring-2 ring-indigo-200' : 'bg-white'}
                  ${i < 3 || i > 31 ? 'text-gray-300' : 'text-gray-700'}
                `}
              >
                <span className={`text-sm ${hasEvents ? 'font-medium' : ''}`}>
                  {dayNumber}
                </span>
                {hasEvents && (
                  <div className="flex gap-1 mt-1">
                    {hasEvents.events.map((event, idx) => (
                      <div key={idx} className="flex items-center">
                        {getEventIcon(event.type)}
                      </div>
                    ))}
                  </div>
                )}
              </button>

              {hasEvents && <EventTooltip events={hasEvents.events} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunicationCalendar;