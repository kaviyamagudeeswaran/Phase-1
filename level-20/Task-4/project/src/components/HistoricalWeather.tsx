import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Calendar, Thermometer, Droplets, Wind } from 'lucide-react';
import '../styles/HistoricalWeather.css';

const HistoricalWeather: React.FC = () => {
  const { historical, tempUnit } = useWeather();
  const [dataType, setDataType] = useState<'temp' | 'humidity' | 'wind'>('temp');

  // Format date for chart
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  // Format temperature based on selected unit
  const formatTemp = (temp: number) => {
    return tempUnit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };

  // Prepare chart data
  const prepareChartData = () => {
    if (!historical || historical.length === 0) return [];
    
    return historical.map((day: any) => ({
      date: formatDate(day.date),
      avgTemp: formatTemp(day.avg_temp),
      minTemp: formatTemp(day.min_temp),
      maxTemp: formatTemp(day.max_temp),
      humidity: day.humidity,
      windSpeed: day.wind_speed
    }));
  };

  // Get chart color based on data type
  const getChartColor = () => {
    switch (dataType) {
      case 'temp':
        return {
          avg: '#3b82f6',
          min: '#93c5fd',
          max: '#1d4ed8'
        };
      case 'humidity':
        return {
          main: '#06b6d4'
        };
      case 'wind':
        return {
          main: '#10b981'
        };
      default:
        return {
          avg: '#3b82f6'
        };
    }
  };

  // Render empty state
  if (!historical || historical.length === 0) {
    return (
      <div className="no-data-message">
        <Calendar size={32} />
        <p>No historical data available</p>
      </div>
    );
  }

  const chartData = prepareChartData();
  const colors = getChartColor();

  return (
    <div className="historical-weather">
      <h3 className="section-title">Historical Weather (Last 7 Days)</h3>
      
      <div className="chart-controls">
        <button 
          className={`chart-control-btn ${dataType === 'temp' ? 'active' : ''}`}
          onClick={() => setDataType('temp')}
        >
          <Thermometer size={18} />
          <span>Temperature</span>
        </button>
        <button 
          className={`chart-control-btn ${dataType === 'humidity' ? 'active' : ''}`}
          onClick={() => setDataType('humidity')}
        >
          <Droplets size={18} />
          <span>Humidity</span>
        </button>
        <button 
          className={`chart-control-btn ${dataType === 'wind' ? 'active' : ''}`}
          onClick={() => setDataType('wind')}
        >
          <Wind size={18} />
          <span>Wind</span>
        </button>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.8)' }}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: 'rgba(255,255,255,0.8)' }}
              unit={dataType === 'temp' ? `°${tempUnit}` : dataType === 'humidity' ? '%' : ' km/h'}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(15, 23, 42, 0.8)',
                borderRadius: '0.375rem',
                border: 'none',
                color: '#f8fafc',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: '#f8fafc' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '0.5rem' }}
            />
            <Legend />
            
            {dataType === 'temp' && (
              <>
                <Line 
                  type="monotone" 
                  dataKey="minTemp" 
                  name={`Min Temp (°${tempUnit})`}
                  stroke={colors.min} 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgTemp" 
                  name={`Avg Temp (°${tempUnit})`}
                  stroke={colors.avg} 
                  strokeWidth={3}
                  dot={{ r: 5, strokeWidth: 2 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="maxTemp" 
                  name={`Max Temp (°${tempUnit})`}
                  stroke={colors.max} 
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 1 }}
                  activeDot={{ r: 6 }}
                />
              </>
            )}
            
            {dataType === 'humidity' && (
              <Line 
                type="monotone" 
                dataKey="humidity" 
                name="Humidity (%)"
                stroke={colors.main} 
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            )}
            
            {dataType === 'wind' && (
              <Line 
                type="monotone" 
                dataKey="windSpeed" 
                name="Wind Speed (km/h)"
                stroke={colors.main} 
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2 }}
                activeDot={{ r: 7 }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HistoricalWeather;