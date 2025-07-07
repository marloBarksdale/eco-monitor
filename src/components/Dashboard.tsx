import React, { useEffect, useReducer, useState } from 'react';
import SimulateRealTimeData from '../utils/SimulateRealTimeData';
import { SensorData } from '../types/SensorData';
import { DashboardState } from '../types/DashboardState';
import Card from './Card';
import FilterControls from './FilterControls';
import './Dashboard.css';

const initialState: DashboardState = {
  data: []
};

type DashboardAction = {
  type: 'ADD_DATA';
  payload: SensorData[];
};

const Dashboard = () => {
  const [filters, setFilters] = useState({
    temp: { min: 10, max: 40 },
    humidity: { min: 30, max: 90 },
    aqi: { min: 0, max: 200 }
  });

  const [timeWindow, setTimeWindow] = useState(60 * 1000); // 1 minute default
  const [isPaused, setIsPaused] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
    const now = Date.now();
    const validData = [...action.payload, ...state.data].filter(
      d => new Date(d.timestamp).getTime() >= now - timeWindow
    );
    validData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return { data: validData };
  };

  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  useEffect(() => {
    const stopSimulation = SimulateRealTimeData(100, 1000, (updates) => {
      if (!isPaused) {
        dispatch({ type: 'ADD_DATA', payload: updates });
      }
    });

    return () => stopSimulation();
  }, [isPaused, timeWindow]);

  useEffect(() => {
    setCurrentPage(1); // Reset pagination on filter change
  }, [filters, timeWindow]);

  const filteredData = state.data.filter((item) => {
    return (
      item.temperature >= filters.temp.min &&
      item.temperature <= filters.temp.max &&
      item.humidity >= filters.humidity.min &&
      item.humidity <= filters.humidity.max &&
      item.airQuality >= filters.aqi.min &&
      item.airQuality <= filters.aqi.max
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  const isMobile = window.innerWidth <= 768;

  return (
    <div className='dashboard-container'>
   <h1 className="dashboard-title">Eco-Monitor Dashboard</h1>
<p className="dashboard-subtitle">Live environmental data from active sensors</p>

      <FilterControls filters={filters} setFilters={setFilters} />

      <div className="control-bar">
        <button onClick={() => setIsPaused(p => !p)}>
          {isPaused ? '▶ Resume Updates' : '⏸ Pause Updates'}
        </button>

        <select
          value={timeWindow}
          onChange={(e) => setTimeWindow(parseInt(e.target.value))}
        >
          <option value={30000}>Last 30 seconds</option>
          <option value={60000}>Last 1 minute</option>
          <option value={300000}>Last 5 minutes</option>
          <option value={600000}>Last 10 minutes</option>
        </select>
      </div>

      <div className="card-section" style={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
        {totalPages > 1 && (
          <div className="pagination sticky-top">
            <div className={`pagination-controls ${isMobile ? 'mobile' : ''}`}>
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>⏮ First</button>
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>◀ Prev</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>Next ▶</button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}>Last ⏭</button>
            </div>
          </div>
        )}

        <div className="card-grid">
          {paginatedData.length === 0 ? (
            <p>No sensor data matches the current filters.</p>
          ) : (
            paginatedData.map((item) => (
              <Card key={`${item.sensorId}-${item.timestamp}`} data={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;