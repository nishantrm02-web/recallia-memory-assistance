import type { Memory, Reminder } from '@/types';

export const mockMemories: Memory[] = [
  {
    id: 'm1',
    name: 'Margaret',
    relationship: 'Daughter',
    photoUrl:
      'https://images.pexels.com/photos/892389/pexels-photo-892389.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    note: 'Lives in Portland with her husband Tom. Calls every Sunday at 4pm. Loves gardening and mystery novels.',
    createdAt: '2026-08-20T10:00:00Z',
  },
  {
    id: 'm2',
    name: 'Robert',
    relationship: 'Son',
    photoUrl:
      'https://images.pexels.com/photos/19981554/pexels-photo-19981554.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    note: 'Architect in Seattle. Has twin boys, James and Henry, age 14. Enjoys hiking and restoring old clocks.',
    createdAt: '2026-08-18T14:30:00Z',
  },
  {
    id: 'm3',
    name: 'Eleanor',
    relationship: 'Sibling',
    photoUrl:
      'https://images.pexels.com/photos/8439765/pexels-photo-8439765.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    note: 'My dear sister. Visits every Wednesday afternoon. We share a love of classical music and ginger tea.',
    createdAt: '2026-08-15T09:00:00Z',
  },
  {
    id: 'm4',
    name: 'Dr. Patel',
    relationship: 'Caregiver',
    photoUrl:
      'https://images.pexels.com/photos/39192347/pexels-photo-39192347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    note: 'Our family physician for over 20 years. Office on Maple Street. Kind, patient, always remembers everyone.',
    createdAt: '2026-08-10T11:00:00Z',
  },
  {
    id: 'm5',
    name: 'Grandpa Joe',
    relationship: 'Grandchild',
    photoUrl:
      'https://images.pexels.com/photos/1653895/pexels-photo-1653895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    note: 'Grew heirloom tomatoes along the south fence. Hummed old folk songs while he worked and saved the first ripe one for me.',
    createdAt: '2026-08-05T16:00:00Z',
  },
];

export const mockReminders: Reminder[] = [
  {
    id: 'r1',
    title: 'Take blood pressure medicine',
    time: '8:00 AM',
    type: 'Medicine',
    isDone: true,
    repeat: 'Daily',
  },
  {
    id: 'r2',
    title: 'Breakfast',
    time: '8:30 AM',
    type: 'Meal',
    isDone: true,
    repeat: 'Daily',
  },
  {
    id: 'r3',
    title: 'Lunch',
    time: '12:30 PM',
    type: 'Meal',
    isDone: false,
    repeat: 'Daily',
  },
  {
    id: 'r4',
    title: 'Afternoon walk in the park',
    time: '3:00 PM',
    type: 'Routine',
    isDone: false,
    repeat: 'Daily',
  },
  {
    id: 'r5',
    title: 'Evening medication',
    time: '6:00 PM',
    type: 'Medicine',
    isDone: false,
    repeat: 'Daily',
  },
];
