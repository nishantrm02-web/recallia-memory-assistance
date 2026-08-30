import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import type { Memory, AttemptRecord, Reminder } from '@/types';
import { mockMemories, mockReminders } from '@/data/mockData';

interface MemoryContextValue {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, 'id' | 'createdAt'>) => void;
  deleteMemory: (id: string) => void;
  attempts: AttemptRecord[];
  logAttempt: (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => void;
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'isDone'>) => void;
  toggleReminder: (id: string) => void;
  deleteReminder: (id: string) => void;
}

const MemoryContext = createContext<MemoryContextValue | null>(null);

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>(mockMemories);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>(mockReminders);

  const addMemory = (memory: Omit<Memory, 'id' | 'createdAt'>) => {
    const newMemory: Memory = {
      ...memory,
      id: `m${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setMemories((prev) => [newMemory, ...prev]);
  };

  const deleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
  };

  const logAttempt = (attempt: Omit<AttemptRecord, 'id' | 'timestamp'>) => {
    const record: AttemptRecord = {
      ...attempt,
      id: `a${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setAttempts((prev) => [...prev, record]);
  };

  const addReminder = (reminder: Omit<Reminder, 'id' | 'isDone'>) => {
    const newReminder: Reminder = {
      ...reminder,
      id: `r${Date.now()}`,
      isDone: false,
    };
    setReminders((prev) => [...prev, newReminder]);
  };

  const toggleReminder = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isDone: !r.isDone } : r)),
    );
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <MemoryContext.Provider
      value={{
        memories,
        addMemory,
        deleteMemory,
        attempts,
        logAttempt,
        reminders,
        addReminder,
        toggleReminder,
        deleteReminder,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemories() {
  const ctx = useContext(MemoryContext);
  if (!ctx) throw new Error('useMemories must be used within a MemoryProvider');
  return ctx;
}
