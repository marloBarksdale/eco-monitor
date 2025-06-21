import React, { useEffect } from 'react';
import SimulateRealTimeData from '../utils/SimulateRealTimeData';
import { SensorData } from '../types/types';

const Dashboard= () => {
  useEffect(() => {
    const stopSimulation = SimulateRealTimeData(100, 1000, (updates) => {
      console.log(updates);
    });

    return () => stopSimulation();
  }, []);

  return (
    <div>
      <h1>Eco-Monitor Dashboard</h1>
    </div>
  );
};

export default Dashboard;
