import React, { useState, useEffect, useRef } from 'react';
import { CalendarIcon } from './Icons';

interface DatePickerProps {
  selectedDate: string; // YYYY-MM-DD
  onDateChange: (date: string) => void;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());

  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect runs only on mount to initialize the state from the prop.
    if (selectedDate) {
      const [y, m, d] = selectedDate.split('-').map(Number);
      if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
          setYear(y);
          setMonth(m - 1);
          setDay(d);
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleDateUpdate = (newDay: number, newMonth: number, newYear: number) => {
    // Ensure the day is valid for the new month/year
    const clampedDay = Math.min(newDay, new Date(newYear, newMonth + 1, 0).getDate());
    
    setDay(clampedDay);
    setMonth(newMonth);
    setYear(newYear);
    
    const formattedDate = `${newYear}-${String(newMonth + 1).padStart(2, '0')}-${String(clampedDay).padStart(2, '0')}`;
    onDateChange(formattedDate);
  };

  const handleDaySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleDateUpdate(Number(e.target.value), month, year);
  };
  const handleMonthSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleDateUpdate(day, Number(e.target.value), year);
  };
  const handleYearSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleDateUpdate(day, month, Number(e.target.value));
  };
  
  const handlePrevMonth = () => {
    const prevMonthDate = new Date(year, month - 1, 1);
    handleDateUpdate(day, prevMonthDate.getMonth(), prevMonthDate.getFullYear());
  };

  const handleNextMonth = () => {
    const nextMonthDate = new Date(year, month + 1, 1);
    handleDateUpdate(day, nextMonthDate.getMonth(), nextMonthDate.getFullYear());
  };

  const handleCalendarDayClick = (clickedDay: number) => {
    handleDateUpdate(clickedDay, month, year);
    setIsOpen(false);
  };

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 bg-white/80 dark:bg-black/20 rounded-lg text-text-heading dark:text-dark-text-body placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent flex justify-between items-center"
      >
        <span>{selectedDate || 'Select Date of Birth'}</span>
        <CalendarIcon className="w-5 h-5 text-text-muted" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-card-bg dark:bg-dark-card-bg backdrop-blur-xl rounded-2xl shadow-lg border border-card-border dark:border-dark-card-border p-4 animate-fade-in">
          {/* Header with dropdowns */}
          <div className="flex justify-center items-center mb-4 gap-2">
            <select value={day} onChange={handleDaySelect} className="bg-transparent font-semibold text-text-heading dark:text-dark-text-heading focus:outline-none p-1 border border-transparent hover:border-white/50 rounded">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={month} onChange={handleMonthSelect} className="bg-transparent font-semibold text-text-heading dark:text-dark-text-heading focus:outline-none p-1 border border-transparent hover:border-white/50 rounded">
                {months.map((m, index) => <option key={m} value={index}>{m}</option>)}
            </select>
            <select value={year} onChange={handleYearSelect} className="bg-transparent font-semibold text-text-heading dark:text-dark-text-heading focus:outline-none p-1 border border-transparent hover:border-white/50 rounded">
                {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          
          <div className="flex justify-between items-center mb-2">
              <button type="button" onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-white/50 dark:hover:bg-black/20">&lt;</button>
              <span className="font-bold text-sm text-text-body dark:text-dark-text-body">{months[month]} {year}</span>
              <button type="button" onClick={handleNextMonth} className="p-1 rounded-full hover:bg-white/50 dark:hover:bg-black/20">&gt;</button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => <div key={d} className="font-bold text-xs text-text-muted dark:text-dark-text-muted">{d}</div>)}
            {Array(firstDayOfMonth).fill(null).map((_, i) => <div key={`empty-cal-${i}`}></div>)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(calDay => {
              const isSelected = calDay === day;
              
              return (
                <button
                  type="button"
                  key={calDay}
                  onClick={() => handleCalendarDayClick(calDay)}
                  className={`w-8 h-8 rounded-full transition-colors text-sm ${
                    isSelected
                      ? 'bg-accent text-white font-bold'
                      : 'text-text-body dark:text-dark-text-body hover:bg-accent-light dark:hover:bg-accent/20'
                  }`}
                >
                  {calDay}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
