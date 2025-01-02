export interface Company {
  id: string;
  name: string;
  location: string;
  linkedinProfile: string;
  emails: string[];
  phoneNumbers: string[];
  comments: string;
  communicationPeriodicity: number; // in days
  isHighlighted?: boolean;
}

export interface CommunicationMethod {
  id: string;
  name: string;
  description: string;
  sequence: number;
  isMandatory: boolean;
}

export interface Communication {
  id: string;
  companyId: string;
  methodId: string;
  date: string;
  notes: string;
  status: 'completed' | 'pending' | 'overdue';
}