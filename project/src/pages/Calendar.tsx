import React, { useState } from 'react';
import CommunicationCalendar from '../components/CommunicationCalendar';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Communication Calendar</h1>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <CommunicationCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default Calendar;