import React, { useState, useEffect } from 'react';
import './FilterControls.css';

interface Filters {
  temp: { min: number; max: number };
  humidity: { min: number; max: number };
  aqi: { min: number; max: number };
}

interface FilterControlsProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}

const DEFAULT_RANGES = {
  temp: { min: 10, max: 40 },
  humidity: { min: 30, max: 90 },
  aqi: { min: 0, max: 200 }
};

const FilterControls = ({ filters, setFilters }: FilterControlsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isCollapsed) {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  const [tempMode, setTempMode] = useState<'all' | 'normal' | 'warm' | 'hot' | 'custom'>('normal');
  const [humidityMode, setHumidityMode] = useState<'all' | 'normal' | 'dry' | 'humid' | 'custom'>('normal');
  const [aqiMode, setAqiMode] = useState<'all' | 'good' | 'moderate' | 'unhealthy' | 'custom'>('good');

  const applyPreset = (type: 'temp' | 'humidity' | 'aqi', mode: string) => {
    const newFilters = { ...filters };

    switch (type) {
      case 'temp':
        setTempMode(mode as any);
        if (mode === 'all') newFilters.temp = { ...DEFAULT_RANGES.temp };
        else if (mode === 'normal') newFilters.temp = { min: 18, max: 28 };
        else if (mode === 'warm') newFilters.temp = { min: 28, max: 35 };
        else if (mode === 'hot') newFilters.temp = { min: 35, max: 40 };
        break;
      case 'humidity':
        setHumidityMode(mode as any);
        if (mode === 'all') newFilters.humidity = { ...DEFAULT_RANGES.humidity };
        else if (mode === 'normal') newFilters.humidity = { min: 40, max: 60 };
        else if (mode === 'dry') newFilters.humidity = { min: 30, max: 40 };
        else if (mode === 'humid') newFilters.humidity = { min: 60, max: 90 };
        break;
      case 'aqi':
        setAqiMode(mode as any);
        if (mode === 'all') newFilters.aqi = { ...DEFAULT_RANGES.aqi };
        else if (mode === 'good') newFilters.aqi = { min: 0, max: 50 };
        else if (mode === 'moderate') newFilters.aqi = { min: 51, max: 100 };
        else if (mode === 'unhealthy') newFilters.aqi = { min: 101, max: 200 };
        break;
    }

    setFilters(newFilters);
  };

  const handleCustomSlider = (
    type: 'temp' | 'humidity' | 'aqi',
    bound: 'min' | 'max',
    value: number
  ) => {
    setFilters(prev => {
      const otherBound = bound === 'min' ? 'max' : 'min';
      const otherValue = prev[type][otherBound];

      const newValue =
        bound === 'min'
          ? Math.min(value, otherValue)
          : Math.max(value, otherValue);

      return {
        ...prev,
        [type]: {
          ...prev[type],
          [bound]: newValue
        }
      };
    });
  };

  return (
    <div className="filter-controls">
      <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Show Filters ⬇' : 'Hide Filters ⬆'}
      </button>

      {!isCollapsed && (
        <div className="filter-content">
          <h2>Sensor Filters</h2>

          {/* Temperature */}
          <div className="filter-group">
            <label>Temperature ({filters.temp.min}°C – {filters.temp.max}°C)</label>
            <div className="preset-buttons">
              <button onClick={() => applyPreset('temp', 'all')} className={tempMode === 'all' ? 'active' : ''}>🌍 All</button>
              <button onClick={() => applyPreset('temp', 'normal')} className={tempMode === 'normal' ? 'active' : ''}>🟢 Normal (18–28)</button>
              <button onClick={() => applyPreset('temp', 'warm')} className={tempMode === 'warm' ? 'active' : ''}>🔶 Warm (28–35)</button>
              <button onClick={() => applyPreset('temp', 'hot')} className={tempMode === 'hot' ? 'active' : ''}>🔴 Hot (&gt;35)</button>
              <button onClick={() => setTempMode('custom')} className={tempMode === 'custom' ? 'active' : ''}>⚙️ Custom</button>
            </div>
            {tempMode === 'custom' && (
              <div className="slider-pair">
                <input type="range" min="10" max="40" value={filters.temp.min}
                  onChange={e => handleCustomSlider('temp', 'min', Number(e.target.value))} />
                <input type="range" min="10" max="40" value={filters.temp.max}
                  onChange={e => handleCustomSlider('temp', 'max', Number(e.target.value))} />
              </div>
            )}
          </div>

          {/* Humidity */}
          <div className="filter-group">
            <label>Humidity ({filters.humidity.min}% – {filters.humidity.max}%)</label>
            <div className="preset-buttons">
              <button onClick={() => applyPreset('humidity', 'all')} className={humidityMode === 'all' ? 'active' : ''}>🌍 All</button>
              <button onClick={() => applyPreset('humidity', 'normal')} className={humidityMode === 'normal' ? 'active' : ''}>🟢 Normal (40–60)</button>
              <button onClick={() => applyPreset('humidity', 'dry')} className={humidityMode === 'dry' ? 'active' : ''}>🔵 Dry (&lt;40)</button>
              <button onClick={() => applyPreset('humidity', 'humid')} className={humidityMode === 'humid' ? 'active' : ''}>🔴 Humid (&gt;60)</button>
              <button onClick={() => setHumidityMode('custom')} className={humidityMode === 'custom' ? 'active' : ''}>⚙️ Custom</button>
            </div>
            {humidityMode === 'custom' && (
              <div className="slider-pair">
                <input type="range" min="30" max="90" value={filters.humidity.min}
                  onChange={e => handleCustomSlider('humidity', 'min', Number(e.target.value))} />
                <input type="range" min="30" max="90" value={filters.humidity.max}
                  onChange={e => handleCustomSlider('humidity', 'max', Number(e.target.value))} />
              </div>
            )}
          </div>

          {/* AQI */}
          <div className="filter-group">
            <label>Air Quality Index (AQI) ({filters.aqi.min} – {filters.aqi.max})</label>
            <div className="preset-buttons">
              <button onClick={() => applyPreset('aqi', 'all')} className={aqiMode === 'all' ? 'active' : ''}>🌍 All</button>
              <button onClick={() => applyPreset('aqi', 'good')} className={aqiMode === 'good' ? 'active' : ''}>🟢 Good (0–50)</button>
              <button onClick={() => applyPreset('aqi', 'moderate')} className={aqiMode === 'moderate' ? 'active' : ''}>🟡 Moderate (51–100)</button>
              <button onClick={() => applyPreset('aqi', 'unhealthy')} className={aqiMode === 'unhealthy' ? 'active' : ''}>🔴 Unhealthy (&gt;100)</button>
              <button onClick={() => setAqiMode('custom')} className={aqiMode === 'custom' ? 'active' : ''}>⚙️ Custom</button>
            </div>
            {aqiMode === 'custom' && (
              <div className="slider-pair">
                <input type="range" min="0" max="200" value={filters.aqi.min}
                  onChange={e => handleCustomSlider('aqi', 'min', Number(e.target.value))} />
                <input type="range" min="0" max="200" value={filters.aqi.max}
                  onChange={e => handleCustomSlider('aqi', 'max', Number(e.target.value))} />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;
