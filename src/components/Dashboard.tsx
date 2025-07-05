import React, { useEffect, useReducer, useState } from 'react';
import SimulateRealTimeData from '../utils/SimulateRealTimeData';
import { SensorData } from '../types/SensorData';
import { DashboardState } from '../types/DashboardState';
import Card from './Card';
import FilterControls from './FilterControls';

const initialState: DashboardState = {
  data: []
};

type DashboardAction = {
  type: 'ADD_DATA';
  payload: SensorData[];
};

const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
  const combined = [...action.payload, ...state.data];
  combined.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return { ...state, data: combined.slice(0, 500) }; // Keep only latest 500 for performance
};

const Dashboard = () => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const [filters, setFilters] = useState({
    temp: { min: 10, max: 40 },
    humidity: { min: 30, max: 90 },
    aqi: { min: 0, max: 200 }
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;

  useEffect(() => {
    const stopSimulation = SimulateRealTimeData(100, 1000, (updates) => {
      dispatch({ type: 'ADD_DATA', payload: updates });
    });

    return () => stopSimulation();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // reset to first page on filter change
  }, [filters]);

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

  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Eco-Monitor Dashboard</h1>
      <FilterControls filters={filters} setFilters={setFilters} />

      {paginatedData.length === 0 ? (
        <p>No sensor data matches the current filters.</p>
      ) : (
        paginatedData.map((item) => (
          <Card key={`${item.sensorId}-${item.timestamp}`} data={item} />
        ))
      )}

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(p => (p < totalPages ? p + 1 : p))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
