import React from 'react';
import { SensorData } from '../types/SensorData';
import './Card.css';

// Props for the Card component
interface CardProps {
  data: SensorData;
}

// Helper function to determine temperature class for styling
const getTempClass = (temp: number) => {
  if (temp < 20) return 'good';   // Good if temp is below 20°C
  if (temp <= 30) return 'warn';  // Warn if temp is between 20°C and 30°C
  return 'bad';                   // Bad if temp is above 30°C
};

// Helper function to determine humidity class for styling
const getHumidityClass = (humidity: number) => {
  if (humidity >= 30 && humidity <= 60) return 'good'; // Good if humidity is in range
  return 'warn';                                       // Warn otherwise
};

// Helper function to determine AQI class for styling
const getAqiClass = (aqi: number) => {
  if (aqi < 50) return 'good';     // Good if AQI is below 50
  if (aqi <= 100) return 'warn';   // Warn if AQI is between 50 and 100
  return 'bad';                    // Bad if AQI is above 100
};

// Card component to display sensor data
const Card = ({ data }: CardProps) => {
  return (
    <div className="sensor-card">
      {/* Temperature display with color class */}
      <div className={`sensor-temp ${getTempClass(data.temperature)}`}>
        <strong>Temperature:</strong> {data.temperature} °C
      </div>
      {/* Humidity display with color class */}
      <div className={`sensor-humidity ${getHumidityClass(data.humidity)}`}>
        <strong>Humidity:</strong> {data.humidity} %
      </div>
      {/* Air Quality display with color class */}
      <div className={`sensor-aqi ${getAqiClass(data.airQuality)}`}>
        <strong>Air Quality:</strong> {data.airQuality} AQI
      </div>
      {/* Timestamp display */}
      <div className="sensor-timestamp">
        <small>
          {new Date(data.timestamp).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
          })}
        </small>
      </div>
    </div>
  );
};

export default Card;
