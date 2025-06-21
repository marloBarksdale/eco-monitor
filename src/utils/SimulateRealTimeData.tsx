export const SimulateRealTimeData = (
  sensorCount: number,
  interval: number,
  onUpdate: (updates: any[]) => void
) => {
  const generateMetrics = (sensorId: string) => ({
    sensorId,
    timestamp: new Date().toISOString(),
    airQuality: +(Math.random() * 200).toFixed(2),
    temperature: +(10 + Math.random() * 30).toFixed(2),
    humidity: +(30 + Math.random() * 60).toFixed(2),
  });

  const intervalId = setInterval(() => {
    const updates = Array.from({ length: sensorCount }, (_, i) =>
      generateMetrics(`Sensor-${i + 1}`)
    );
    onUpdate(updates);
  }, interval);

  return () => clearInterval(intervalId);
};

export default SimulateRealTimeData;
