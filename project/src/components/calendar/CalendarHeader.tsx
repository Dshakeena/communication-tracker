import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: string;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}) => (
  <div className="flex justify-between items-center mb-4">
    <button 
      onClick={onPrevMonth}
      className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
      aria-label="Previous month"
    >
      <ChevronLeft className="h-5 w-5 text-indigo-600" />
    </button>
    <h2 className="text-lg font-semibold text-gray-800">{currentMonth}</h2>
    <button 
      onClick={onNextMonth}
      className="p-2 hover:bg-indigo-50 rounded-full transition-colors"
      aria-label="Next month"
    >
      <ChevronRight className="h-5 w-5 text-indigo-600" />
    </button>
  </div>
);

export default CalendarHeader;