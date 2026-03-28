import { useState, useEffect } from 'react';
import Timer from './components/Timer';
import Settings from './components/Settings';
import Analytics from './components/Analytics';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 flex flex-col items-center p-6 font-sans">
      <header className="w-full max-w-3xl flex justify-between items-center py-6 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <span className="text-primary">⚡</span> FocusFlow
        </h1>
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors shadow-sm"
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>
      
      <main className="w-full flex-1 flex flex-col items-center pb-12">
        <Timer />
        <Settings />
        <Analytics />
      </main>
    </div>
  );
}

export default App;