import { useState, useEffect, useCallback } from 'react';

interface TimelineSliderProps {
  startYear: number;
  endYear: number;
  currentDate: string;
  onDateChange: (date: string) => void;
}

// Convert a date string to a numeric value for the slider
function dateToValue(dateStr: string, startYear: number): number {
  const date = new Date(dateStr);
  const startDate = new Date(`${startYear}-01-01`);
  const diffTime = date.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.floor(diffDays);
}

// Convert a slider value back to a date string
function valueToDate(value: number, startYear: number): string {
  const startDate = new Date(`${startYear}-01-01`);
  const resultDate = new Date(startDate.getTime() + value * 24 * 60 * 60 * 1000);
  return resultDate.toISOString().split('T')[0];
}

export default function TimelineSlider({
  startYear,
  endYear,
  currentDate,
  onDateChange,
}: TimelineSliderProps) {
  // Calculate slider range
  const minValue = 0;
  const maxValue = dateToValue(`${endYear}-12-31`, startYear);
  const currentValue = dateToValue(currentDate, startYear);

  // Handle slider change
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(e.target.value);
      const newDate = valueToDate(newValue, startYear);
      onDateChange(newDate);
    },
    [onDateChange, startYear]
  );

  // Calculate percentage for gradient background
  const percentage = ((currentValue - minValue) / (maxValue - minValue)) * 100;

  // Year tick marks
  const yearTicks = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  );

  return (
    <div className="relative">
      {/* Slider track */}
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={currentValue}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
        }}
      />

      {/* Year tick marks */}
      <div className="relative h-4 mt-1">
        {yearTicks.map((year, index) => {
          const tickPosition = (index / (yearTicks.length - 1)) * 100;
          return (
            <div
              key={year}
              className="absolute transform -translate-x-1/2"
              style={{ left: `${tickPosition}%` }}
            >
              <div className="w-0.5 h-2 bg-gray-400" />
              <span className="text-xs text-gray-500 absolute -translate-x-1/2 left-1/2 mt-1">
                {year}
              </span>
            </div>
          );
        })}
      </div>

      <style>{`
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #3b82f6;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}
