import React, { useCallback } from 'react';

interface PriceRangeSliderProps {
  min: number;
  max: number;
  values: [number, number];
  onChange: (newValues: [number, number]) => void;
  disabled?: boolean;
}

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({ min, max, values, onChange, disabled }) => {
  const [minVal, maxVal] = values;

  const handleMinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent min slider from crossing max slider
    const value = Math.min(Number(e.target.value), maxVal - 1);
    onChange([value, maxVal]);
  }, [maxVal, onChange]);

  const handleMaxChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // Prevent max slider from crossing min slider
    const value = Math.max(Number(e.target.value), minVal + 1);
    onChange([minVal, value]);
  }, [minVal, onChange]);

  // Calculate positions for the highlighted range div
  const minPos = ((minVal - min) / (max - min)) * 100;
  const maxPos = ((maxVal - min) / (max - min)) * 100;

  return (
    <div>
      <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
        <span>BDT {minVal.toLocaleString()}</span>
        <span>BDT {maxVal.toLocaleString()}</span>
      </div>
      <div className="relative h-2 flex items-center">
        <div className="absolute w-full h-1.5 bg-gray-200 rounded-full" />
        <div 
          className="absolute h-1.5 bg-black rounded-full"
          style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={minVal}
          onChange={handleMinChange}
          className="thumb z-10"
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minVal}
          aria-label="Minimum price"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={maxVal}
          onChange={handleMaxChange}
          className="thumb z-20" // Higher z-index to ensure max handle is on top
          disabled={disabled}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maxVal}
          aria-label="Maximum price"
        />
      </div>
    </div>
  );
};

export default PriceRangeSlider;