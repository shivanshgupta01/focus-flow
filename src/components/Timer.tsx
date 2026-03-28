import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTimerStore } from '../store/useTimerStore';

// Function to create a pleasant "ding" sound using the browser's built-in audio
const playChime = () => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine'; // Smooth bell-like tone
    osc.frequency.setValueAtTime(800, ctx.currentTime); // Pitch
    
    // Fade out the sound nicely
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 1.5);
  } catch (e) {
    console.log("Audio play failed:", e);
  }
};

export default function Timer() {
  const { 
    timeLeft, isRunning, mode, sessionCount, 
    currentTask, setTask, 
    startTimer, pauseTimer, resetTimer, tick 
  } = useTimerStore();

  // Request Notification Permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Handle the countdown interval
  useEffect(() => {
    let interval: number | undefined;
    if (isRunning) {
      interval = window.setInterval(() => {
        tick();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, tick]);

  // Handle sound and notifications when time reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      playChime(); // Play the custom ding!
      
      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(mode === 'break' ? 'Time for a break!' : 'Break is over!', {
          body: mode === 'break' ? `Great job on: ${currentTask || 'your task'}` : 'Let us get back to work.',
        });
      }
    }
  }, [timeLeft, mode, currentTask]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isFocus = mode === 'focus';

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-10">
      
      {/* Task Input */}
      <div className="w-full mb-6">
        <input 
          type="text" 
          placeholder="What are you working on?" 
          value={currentTask}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-center text-lg font-medium"
        />
      </div>

      {/* Timer Card */}
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl w-full">
        
        {/* Mode Indicator & Session Count */}
        <div className="flex justify-between w-full mb-8 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <span className={isFocus ? 'text-primary' : 'text-break'}>
            {isFocus ? '🧠 Focus' : '☕ Break'}
          </span>
          <span>🔥 Sessions: {sessionCount}</span>
        </div>

        {/* The Big Timer */}
        <motion.div 
          key={mode} 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`text-8xl font-bold tabular-nums mb-10 tracking-tight ${isFocus ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
        >
          {formattedTime}
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4">
          {isRunning ? (
            <button 
              onClick={pauseTimer}
              className="px-8 py-3 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white font-bold rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Pause
            </button>
          ) : (
            <button 
              onClick={startTimer}
              className={`px-8 py-3 font-bold rounded-full text-white transition-all shadow-lg shadow-${isFocus ? 'primary' : 'break'}/30 hover:scale-105 active:scale-95 ${isFocus ? 'bg-primary' : 'bg-break'}`}
            >
              Start
            </button>
          )}
          
          <button 
            onClick={resetTimer}
            className="px-8 py-3 bg-transparent border-2 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 font-bold rounded-full hover:border-gray-300 dark:hover:border-gray-500 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}