import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MemoryProvider } from '@/context/MemoryContext';
import HomeScreen from '@/screens/HomeScreen';
import PatientHome from '@/screens/PatientHome';
import MemoriesScreen from '@/screens/MemoriesScreen';
import RecognizeScreen from '@/screens/RecognizeScreen';
import RemindersScreen from '@/screens/RemindersScreen';
import CaregiverScreen from '@/screens/CaregiverScreen';

export default function App() {
  return (
    <MemoryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/patient" element={<PatientHome />} />
          <Route path="/memories" element={<MemoriesScreen />} />
          <Route path="/recognize" element={<RecognizeScreen />} />
          <Route path="/reminders" element={<RemindersScreen />} />
          <Route path="/caregiver" element={<CaregiverScreen />} />
        </Routes>
      </BrowserRouter>
    </MemoryProvider>
  );
}
