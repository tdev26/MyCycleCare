export interface User {
  id: string;
  name: string;
  email: string;
  cycleData: CycleData[];
  moodEntries: MoodEntry[];
  preferences: UserPreferences;
}

export interface CycleData {
  id: string;
  startDate: string;
  endDate?: string;
  symptoms: Symptom[];
  flow: FlowLevel;
  notes?: string;
}

export interface Symptom {
  type: SymptomType;
  severity: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

export type SymptomType = 
  | 'cramps' 
  | 'headache' 
  | 'bloating' 
  | 'backPain' 
  | 'breastTenderness' 
  | 'fatigue' 
  | 'acne' 
  | 'moodSwings'
  | 'other';

export type FlowLevel = 'spotting' | 'light' | 'medium' | 'heavy';

export interface MoodEntry {
  date: string;
  mood: string; // Could be 'happy', 'sad', 'anxious', etc.
  notes?: string;
}

export interface UserPreferences {
  cycleLengthAvg: number;
  periodLengthAvg: number;
  notificationsEnabled: boolean;
  remindersEnabled: boolean;
  darkModeEnabled: boolean;
  language: string;
}

export interface CycleStats {
  avgCycleLength: number;
  avgPeriodLength: number;
  nextPeriodPrediction?: string;
  ovulationPrediction?: string;
  fertileWindowStart?: string;
  fertileWindowEnd?: string;
}

export interface WellnessTip {
  id: string;
  title: string;
  description: string;
  category: 'period' | 'hygiene' | 'mental' | 'general';
  relatedSymptoms?: SymptomType[];
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dateTime: string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'cycle-based' | 'none';
  isCompleted: boolean;
  category: 'period' | 'hygiene' | 'medication' | 'water' | 'sleep' | 'other';
}