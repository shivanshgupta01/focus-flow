import { useTimerStore } from '../store/useTimerStore';

export default function Analytics() {
  const { sessionCount, streak, history } = useTimerStore();

  const totalMinutes = history.reduce((acc, session) => acc + (session.duration / 60), 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const exportCSV = () => {
    // 1. Create CSV content
    const headers = "Date,Task,Duration (Minutes)\n";
    const rows = history.map(s => `"${s.dateStr}","${s.task}",${s.duration / 60}`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8," + headers + rows;

    // 2. Trigger download
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "focus_flow_history.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          📊 Productivity Analytics
        </h2>
        <button 
          onClick={exportCSV}
          className="text-sm px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
        >
          📥 Export CSV
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="p-4 bg-indigo-50 dark:bg-gray-700/50 rounded-2xl border border-indigo-100 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Total Sessions</p>
          <p className="text-3xl font-bold text-primary dark:text-indigo-400">{sessionCount}</p>
        </div>
        <div className="p-4 bg-green-50 dark:bg-gray-700/50 rounded-2xl border border-green-100 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Focus Time</p>
          <p className="text-3xl font-bold text-focus dark:text-green-400">
            {hours}h {minutes}m
          </p>
        </div>
        <div className="p-4 bg-orange-50 dark:bg-gray-700/50 rounded-2xl border border-orange-100 dark:border-gray-600">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1">Current Streak</p>
          <p className="text-3xl font-bold text-break dark:text-orange-400">
            {streak} 🔥
          </p>
        </div>
      </div>
    </div>
  );
}