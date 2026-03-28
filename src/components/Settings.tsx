import { useTimerStore } from '../store/useTimerStore';

export default function Settings() {
  const { focusDuration, breakDuration, setDurations } = useTimerStore();

  return (
    <div className="w-full max-w-md mx-auto mt-6 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-md border border-gray-100 dark:border-gray-700">
      <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">⚙️ Timer Settings</h3>
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Focus (min)</label>
          <input 
            type="number" 
            min="1" max="120"
            value={focusDuration}
            onChange={(e) => setDurations(Number(e.target.value), breakDuration)}
            className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Break (min)</label>
          <input 
            type="number" 
            min="1" max="60"
            value={breakDuration}
            onChange={(e) => setDurations(focusDuration, Number(e.target.value))}
            className="w-full p-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
          />
        </div>
      </div>
    </div>
  );
}