export type Relationship =
  | 'Daughter'
  | 'Son'
  | 'Spouse'
  | 'Grandchild'
  | 'Friend'
  | 'Sibling'
  | 'Caregiver'
  | 'Other';

export interface Memory {
  id: string;
  name: string;
  relationship: Relationship;
  photoUrl: string;
  note: string;
  createdAt: string;
}

export type ReminderType = 'Medicine' | 'Meal' | 'Routine' | 'Appointment';
export type ReminderRepeat = 'Daily' | 'Once';

export interface Reminder {
  id: string;
  title: string;
  time: string;
  type: ReminderType;
  isDone: boolean;
  repeat: ReminderRepeat;
}

export interface AttemptRecord {
  id: string;
  memoryId: string;
  personName: string;
  selectedName: string;
  correct: boolean;
  timestamp: string;
}

export type ViewMode = 'patient' | 'caregiver';
