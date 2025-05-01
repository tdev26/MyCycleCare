import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
         addDays, isSameMonth, isSameDay, parseISO, isWithinInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { getPredictionData } from '../../data/mockData';

const CycleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { user } = useUser();
  
  if (!user) return null;
  
  const predictions = getPredictionData(user);
  
  const prevMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };
  
  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <h2 className="font-semibold text-lg">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
        <button 
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    );
  };
  
  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    return (
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((day, i) => (
          <div 
            key={i}
            className="text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
    );
  };
  
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    
    const rows = [];
    let days = [];
    let day = startDate;
    
    // Check if day is in a period
    const isInPeriod = (date: Date) => {
      return user.cycleData.some(cycle => {
        if (!cycle.endDate) return false;
        return isWithinInterval(date, {
          start: parseISO(cycle.startDate),
          end: parseISO(cycle.endDate)
        });
      });
    };
    
    // Check if day is predicted next period
    const isInPredictedPeriod = (date: Date) => {
      const nextPeriodStart = parseISO(predictions.nextPeriodPrediction);
      const nextPeriodEnd = addDays(nextPeriodStart, predictions.avgPeriodLength - 1);
      
      return isWithinInterval(date, {
        start: nextPeriodStart,
        end: nextPeriodEnd
      });
    };
    
    // Check if day is in fertile window
    const isInFertileWindow = (date: Date) => {
      return isWithinInterval(date, {
        start: parseISO(predictions.fertileWindowStart),
        end: parseISO(predictions.fertileWindowEnd)
      });
    };
    
    // Check if day is ovulation day
    const isOvulationDay = (date: Date) => {
      return isSameDay(date, parseISO(predictions.ovulationPrediction));
    };
    
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());
        const isPeriodDay = isInPeriod(day);
        const isPredictedPeriodDay = isInPredictedPeriod(day);
        const isFertileDay = isInFertileWindow(day);
        const isOvulation = isOvulationDay(day);
        
        days.push(
          <div
            key={day.toString()}
            className={`
              relative aspect-square rounded-full flex items-center justify-center
              ${isCurrentMonth ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}
              ${isToday ? 'font-bold' : ''}
            `}
          >
            {/* Background indicators */}
            {isPeriodDay && (
              <div className="absolute inset-0 rounded-full bg-red-200 dark:bg-red-900 opacity-50"></div>
            )}
            {isPredictedPeriodDay && !isPeriodDay && (
              <div className="absolute inset-0 rounded-full bg-red-100 dark:bg-red-900/30 opacity-50 border border-dashed border-red-300 dark:border-red-700"></div>
            )}
            {isFertileDay && !isPeriodDay && !isPredictedPeriodDay && (
              <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/30 opacity-50"></div>
            )}
            {isOvulation && (
              <div className="absolute inset-0 rounded-full bg-blue-200 dark:bg-blue-800 opacity-50"></div>
            )}
            
            {/* Day number */}
            <span className={`z-10 ${isToday ? 'text-purple-700 dark:text-purple-300' : ''}`}>
              {format(day, 'd')}
            </span>
            
            {/* Today indicator */}
            {isToday && (
              <div className="absolute inset-0 rounded-full border-2 border-purple-500 dark:border-purple-400"></div>
            )}
          </div>
        );
        
        day = addDays(day, 1);
      }
      
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2 mb-2">
          {days}
        </div>
      );
      
      days = [];
    }
    
    return <div className="mt-2">{rows}</div>;
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold mb-2">Your Cycle Calendar</h3>
      
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-200 dark:bg-red-900 mr-1"></div>
          <span>Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900/30 border border-dashed border-red-300 dark:border-red-700 mr-1"></div>
          <span>Predicted Period</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-100 dark:bg-blue-900/30 mr-1"></div>
          <span>Fertile Window</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-200 dark:bg-blue-800 mr-1"></div>
          <span>Ovulation</span>
        </div>
      </div>
    </div>
  );
};

export default CycleCalendar;