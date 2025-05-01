import React, { useState } from 'react';
import { Bell, ShieldCheck, Moon, Globe, Clock, Calendar } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const { user } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const [cycleLengthAvg, setCycleLengthAvg] = useState(user?.preferences.cycleLengthAvg || 28);
  const [periodLengthAvg, setPeriodLengthAvg] = useState(user?.preferences.periodLengthAvg || 5);
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.preferences.notificationsEnabled || false);
  const [remindersEnabled, setRemindersEnabled] = useState(user?.preferences.remindersEnabled || false);
  
  const saveSettings = () => {
    // In a real app, this would save to backend
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Calendar size={20} className="text-purple-600 dark:text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold">Cycle Settings</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="cycleLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Average Cycle Length (days)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="cycleLength"
                min="21"
                max="35"
                value={cycleLengthAvg}
                onChange={(e) => setCycleLengthAvg(parseInt(e.target.value))}
                className="flex-grow h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700"
              />
              <span className="ml-4 w-8 text-center">{cycleLengthAvg}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              The average length of your menstrual cycle
            </p>
          </div>
          
          <div>
            <label htmlFor="periodLength" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Average Period Length (days)
            </label>
            <div className="flex items-center">
              <input
                type="range"
                id="periodLength"
                min="2"
                max="10"
                value={periodLengthAvg}
                onChange={(e) => setPeriodLengthAvg(parseInt(e.target.value))}
                className="flex-grow h-2 rounded-lg appearance-none bg-gray-200 dark:bg-gray-700"
              />
              <span className="ml-4 w-8 text-center">{periodLengthAvg}</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              The average length of your period
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Bell size={20} className="text-purple-600 dark:text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Enable Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Receive notifications about your cycle
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="notificationsToggle"
                className="sr-only"
                checked={notificationsEnabled}
                onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              />
              <label
                htmlFor="notificationsToggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                  notificationsEnabled ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Reminders</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get reminders for period start, medication, etc.
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="remindersToggle"
                className="sr-only"
                checked={remindersEnabled}
                onChange={() => setRemindersEnabled(!remindersEnabled)}
                disabled={!notificationsEnabled}
              />
              <label
                htmlFor="remindersToggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                  remindersEnabled && notificationsEnabled 
                    ? 'bg-purple-600' 
                    : 'bg-gray-200 dark:bg-gray-700'
                } ${!notificationsEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    remindersEnabled && notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <ShieldCheck size={20} className="text-purple-600 dark:text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold">Privacy & Security</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">App Lock</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Require authentication to open the app
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="appLockToggle"
                className="sr-only"
              />
              <label
                htmlFor="appLockToggle"
                className="block overflow-hidden h-6 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700"
              >
                <span
                  className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-0 transition-transform"
                ></span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Data Encryption</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Encrypt all your sensitive data
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="encryptionToggle"
                className="sr-only"
                checked={true}
                readOnly
              />
              <label
                htmlFor="encryptionToggle"
                className="block overflow-hidden h-6 rounded-full cursor-not-allowed bg-purple-600"
              >
                <span
                  className="block h-6 w-6 rounded-full bg-white shadow transform translate-x-6 transition-transform"
                ></span>
              </label>
            </div>
          </div>
          
          <div className="pt-2">
            <button className="text-purple-600 dark:text-purple-400 text-sm font-medium hover:underline">
              Delete All My Data
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-4">
          <Moon size={20} className="text-purple-600 dark:text-purple-400 mr-2" />
          <h2 className="text-lg font-semibold">Appearance</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">Dark Mode</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <div className="relative inline-block w-12 align-middle select-none">
              <input
                type="checkbox"
                id="themeToggle"
                className="sr-only"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <label
                htmlFor="themeToggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                  theme === 'dark' ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                    theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></span>
              </label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        <button
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-md font-medium shadow-sm hover:from-purple-600 hover:to-indigo-700 transition-colors"
          onClick={saveSettings}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;