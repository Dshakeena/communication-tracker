export interface CalendarEvent {
  type: 'email' | 'phone' | 'linkedin';
  notes: string;
  status: 'completed' | 'pending' | 'upcoming';
  company?: string;
}

export interface DayEvents {
  date: number;
  events: CalendarEvent[];
}