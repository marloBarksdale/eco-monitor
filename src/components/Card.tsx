import React from 'react';
import { SensorData } from '../types/SensorData';
import './Card.css';

interface CardProps {
  data: SensorData;
}



const getTempClass = (temp: number) => {
  if (temp < 20) return 'good';
  if (temp <= 30) return 'warn';
  return 'bad';
};

const getHumidityClass = (humidity: number) => {
  if (humidity >= 30 && humidity <= 60) return 'good';
  return 'warn';
};

const getAqiClass = (aqi: number) => {
  if (aqi < 50) return 'good';
  if (aqi <= 100) return 'warn';
  return 'bad';
};



const Card = ({ data }: CardProps) => {
  return (
    <div className="sensor-card">
    <div className={`sensor-temp ${getTempClass(data.temperature)}`}>
  <strong>Temperature:</strong> {data.temperature} °C
</div>
<div className={`sensor-humidity ${getHumidityClass(data.humidity)}`}>
  <strong>Humidity:</strong> {data.humidity} %
</div>
<div className={`sensor-aqi ${getAqiClass(data.airQuality)}`}>
  <strong>Air Quality:</strong> {data.airQuality} AQI
</div>
      <div className="sensor-timestamp"><small>{data.timestamp}</small></div>
    </div>
  );
};

export default Card;
