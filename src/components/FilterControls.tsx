import React from 'react';
// import './FilterControls.css';

interface Filters {
  temp: { min: number; max: number };
  humidity: { min: number; max: number };
  aqi: { min: number; max: number };
}

interface FilterControlsProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const FilterControls = ({ filters, setFilters }: FilterControlsProps) => {
  const handleSliderChange = (
    category: 'temp' | 'humidity' | 'aqi',
    bound: 'min' | 'max',
    value: number
  ) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [bound]: value
      }
    }));
  };

  const setCriticalAQI = () => {
    setFilters(prev => ({
      ...prev,
      aqi: { ...prev.aqi, min: 100 }
    }));
  };

  const resetFilters = () => {
    setFilters({
      temp: { min: 10, max: 40 },
      humidity: { min: 30, max: 90 },
      aqi: { min: 0, max: 200 }
    });
  };

  return (
    <div className="filter-controls">
      <h2>Filters</h2>

      <div>
        <label>Temp Min: {filters.temp.min}</label>
        <input
          type="range"
          min="10"
          max="40"
          value={filters.temp.min}
          onChange={e => handleSliderChange('temp', 'min', Number(e.target.value))}
        />

        <label>Temp Max: {filters.temp.max}</label>
        <input
          type="range"
          min="10"
          max="40"
          value={filters.temp.max}
          onChange={e => handleSliderChange('temp', 'max', Number(e.target.value))}
        />
      </div>

      <div>
        <label>Humidity Min: {filters.humidity.min}</label>
        <input
          type="range"
          min="30"
          max="90"
          value={filters.humidity.min}
          onChange={e => handleSliderChange('humidity', 'min', Number(e.target.value))}
        />

        <label>Humidity Max: {filters.humidity.max}</label>
        <input
          type="range"
          min="30"
          max="90"
          value={filters.humidity.max}
          onChange={e => handleSliderChange('humidity', 'max', Number(e.target.value))}
        />
      </div>

      <div>
        <label>AQI Min: {filters.aqi.min}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.aqi.min}
          onChange={e => handleSliderChange('aqi', 'min', Number(e.target.value))}
        />

        <label>AQI Max: {filters.aqi.max}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.aqi.max}
          onChange={e => handleSliderChange('aqi', 'max', Number(e.target.value))}
        />
      </div>

      <div>
        <button onClick={setCriticalAQI}>Show Critical AQI</button>
        <button onClick={resetFilters}>Reset</button>
      </div>
    </div>
  );
};

export default FilterControls;
