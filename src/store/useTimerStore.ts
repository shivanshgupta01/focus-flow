import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type TimerMode = 'focus' | 'break';

export interface Session {
  timestamp: number;
  dateStr: string;
  duration: number; // in seconds
  task: string;
}

interface TimerState {
  // Settings
  focusDuration: number; // in minutes
  breakDuration: number; // in minutes
  setDurations: (focus: number, breakDur: number) => void;

  // Current State
  timeLeft: number;
  isRunning: boolean;
  mode: TimerMode;
  currentTask: string;
  setTask: (task: string) => void;

  // Stats
  sessionCount: number;
  history: Session[];
  streak: number;
  lastActiveDate: string | null;

  // Actions
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  tick: () => void;
}

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      focusDuration: 25,
      breakDuration: 5,
      timeLeft: 25 * 60,
      isRunning: false,
      mode: 'focus',
      currentTask: '',
      sessionCount: 0,
      history: [],
      streak: 0,
      lastActiveDate: null,

      setDurations: (focus, breakDur) => set((state) => ({
        focusDuration: focus,
        breakDuration: breakDur,
        // Reset timer to new duration if not running
        timeLeft: !state.isRunning && state.mode === 'focus' ? focus * 60 : 
                  !state.isRunning && state.mode === 'break' ? breakDur * 60 : state.timeLeft
      })),

      setTask: (task) => set({ currentTask: task }),
      startTimer: () => set({ isRunning: true }),
      pauseTimer: () => set({ isRunning: false }),
      
      resetTimer: () => set((state) => ({
        isRunning: false,
        timeLeft: state.mode === 'focus' ? state.focusDuration * 60 : state.breakDuration * 60
      })),

      tick: () => set((state) => {
        if (state.timeLeft > 0) {
          return { timeLeft: state.timeLeft - 1 };
        }
        
        // Time is up!
        const isFocus = state.mode === 'focus';
        const todayStr = new Date().toDateString();
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toDateString();

        let newStreak = state.streak;
        if (isFocus) {
          if (state.lastActiveDate === yesterdayStr) newStreak += 1; // Continued streak
          else if (state.lastActiveDate !== todayStr) newStreak = 1; // New streak
        }

        const newSession: Session | null = isFocus ? {
          timestamp: Date.now(),
          dateStr: todayStr,
          duration: state.focusDuration * 60,
          task: state.currentTask || 'Untitled Task'
        } : null;

        return {
          mode: isFocus ? 'break' : 'focus',
          timeLeft: isFocus ? state.breakDuration * 60 : state.focusDuration * 60,
          sessionCount: isFocus ? state.sessionCount + 1 : state.sessionCount,
          history: newSession ? [...state.history, newSession] : state.history,
          streak: isFocus ? newStreak : state.streak,
          lastActiveDate: isFocus ? todayStr : state.lastActiveDate,
          isRunning: false,
        };
      }),
    }),
    {
      name: 'focus-flow-storage',
      partialize: (state) => ({ 
        focusDuration: state.focusDuration,
        breakDuration: state.breakDuration,
        sessionCount: state.sessionCount, 
        currentTask: state.currentTask,
        history: state.history,
        streak: state.streak,
        lastActiveDate: state.lastActiveDate
      }),
    }
  )
);