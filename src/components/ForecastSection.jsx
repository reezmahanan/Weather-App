import React from 'react';

export default function ForecastSection({ 
  location, 
  weatherData, 
  onExportPDF, 
  isFavorite, 
  onToggleFavorite 
}) {
  if (!weatherData) return null;

  const { temp, feelsLike, description, emoji, humidity, windSpeed, alerts, forecast, lastUpdated, isSimulated } = weatherData;

  // Custom SVG Line Chart Calculation
  const drawTempChart = () => {
    if (!forecast || forecast.length === 0) return null;

    const width = 500;
    const height = 190;
    const paddingX = 40;
    const paddingY = 25;

    // Find min and max values to scale the Y-axis
    let allTemps = forecast.flatMap(day => [day.minTemp, day.maxTemp, day.temp]);
    let minT = Math.min(...allTemps) - 2;
    let maxT = Math.max(...allTemps) + 2;
    
    if (minT === maxT) {
      minT -= 2;
      maxT += 2;
    }

    const tempRange = maxT - minT;
    const chartW = width - paddingX * 2;
    const chartH = height - paddingY * 2;

    const points = forecast.map((day, i) => {
      const x = paddingX + (i * chartW) / (forecast.length - 1);
      
      const yAvg = height - paddingY - ((day.temp - minT) / tempRange) * chartH;
      const yMax = height - paddingY - ((day.maxTemp - minT) / tempRange) * chartH;
      const yMin = height - paddingY - ((day.minTemp - minT) / tempRange) * chartH;
      
      return { x, yAvg, yMax, yMin, day: day.day, ...day };
    });

    const avgPath = `M ${points.map(p => `${p.x} ${p.yAvg}`).join(' L ')}`;
    const maxPath = `M ${points.map(p => `${p.x} ${p.yMax}`).join(' L ')}`;
    const minPath = `M ${points.map(p => `${p.x} ${p.yMin}`).join(' L ')}`;

    const yBottom = height - paddingY;
    const fillPath = `M ${points[0].x} ${yBottom} L ${points.map(p => `${p.x} ${p.yAvg}`).join(' L ')} L ${points[points.length - 1].x} ${yBottom} Z`;

    const gridLines = [];
    for (let i = 0; i <= 4; i++) {
      const val = minT + (tempRange * i) / 4;
      const y = height - paddingY - (i / 4) * chartH;
      gridLines.push({ y, label: `${Math.round(val)}°` });
    }

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="forecast-svg-chart" style={{ width: '100%', height: 'auto', display: 'block' }}>
        <defs>
          <linearGradient id="avgAreaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 153, 0, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 153, 0, 0.0)" />
          </linearGradient>
          <linearGradient id="lineAvgGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb037" />
            <stop offset="100%" stopColor="#ff8c00" />
          </linearGradient>
        </defs>

        {/* Gridlines & Y-Axis Labels */}
        {gridLines.map((line, idx) => (
          <g key={idx}>
            <line 
              x1={paddingX} 
              y1={line.y} 
              x2={width - paddingX} 
              y2={line.y} 
              stroke="rgba(255, 255, 255, 0.08)" 
              strokeWidth="1" 
              strokeDasharray="3 3" 
            />
            <text 
              x={paddingX - 8} 
              y={line.y + 3} 
              fill="rgba(255, 255, 255, 0.5)" 
              fontSize="9" 
              textAnchor="end"
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* X-Axis labels */}
        {points.map((p, idx) => (
          <text 
            key={idx} 
            x={p.x} 
            y={height - 6} 
            fill="rgba(255, 255, 255, 0.7)" 
            fontSize="10" 
            textAnchor="middle"
          >
            {p.day}
          </text>
        ))}

        {/* Gradient Fill Under Avg */}
        <path d={fillPath} fill="url(#avgAreaGradient)" />

        {/* Line Paths */}
        <path d={maxPath} fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d={minPath} fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 3" />
        <path d={avgPath} fill="none" stroke="url(#lineAvgGrad)" strokeWidth="2.5" />

        {/* Markers */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.yAvg} r="3.5" fill="#ffffff" stroke="#ff8c00" strokeWidth="2" />
            <text x={p.x} y={p.yAvg - 8} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">{p.temp}°</text>
            <circle cx={p.x} cy={p.yMin} r="2.5" fill="#ffffff" stroke="#3b82f6" strokeWidth="1.5" />
            <circle cx={p.x} cy={p.yMax} r="2.5" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="forecast-detail-native">
      {/* Header Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', paddingRight: '100px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white' }}>
            📍 {location.name}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {location.province} Province • Coords: {location.lat}°N, {location.lon}°E
          </span>
        </div>
        <div className="hero-emoji">
          {emoji}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', maxWidth: '300px' }}>
        <button 
          onClick={onToggleFavorite} 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px' }}
        >
          {isFavorite ? '⭐ Favorited' : '☆ Add Favorite'}
        </button>
        <button 
          onClick={onExportPDF} 
          className="export-btn"
          style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '8px 12px' }}
        >
          📄 PDF Report
        </button>
      </div>

      {/* Warnings alerts panel */}
      {alerts && alerts.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          <div className="alerts-grid">
            {alerts.map((alert, idx) => (
              <div key={idx} className={`alert-card alert-${alert.type}`} style={{ padding: '8px 12px' }}>
                <span className="alert-icon" style={{ fontSize: '1.1rem' }}>{alert.icon}</span>
                <span className="alert-message" style={{ fontSize: '0.78rem' }}>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Telemetry Stats */}
      <div className="telemetry-grid">
        <div className="telemetry-item">
          <span className="telemetry-lbl">Temperature</span>
          <span className="telemetry-val temperature" style={{ fontSize: '1.3rem' }}>{temp}°C</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-lbl">Feels Like</span>
          <span className="telemetry-val" style={{ fontSize: '1.3rem' }}>{feelsLike}°C</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-lbl">Condition</span>
          <span className="telemetry-val" style={{ textTransform: 'capitalize', fontSize: '0.95rem' }}>{description}</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-lbl">Humidity</span>
          <span className="telemetry-val humidity">{humidity}%</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-lbl">Wind Speed</span>
          <span className="telemetry-val wind">{windSpeed} m/s</span>
        </div>
        <div className="telemetry-item">
          <span className="telemetry-lbl">Population</span>
          <span className="telemetry-val" style={{ color: '#bae6fd', fontSize: '0.95rem' }}>{location.population?.toLocaleString()}</span>
        </div>
      </div>

      {/* 7-Day Horizontal swipe forecast */}
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '8px', color: 'rgba(255,255,255,0.85)' }}>
          7-Day Temperature Forecast
        </h3>
        
        <div className="forecast-deck">
          {forecast.map((day) => (
            <div key={day.date} className="forecast-deck-card">
              <div className="fd-day">{day.day}</div>
              <div className="fd-date">{day.date.split('-').slice(1).join('/')}</div>
              <span className="fd-emoji">{day.emoji}</span>
              <div className="fd-temp">{day.temp}°C</div>
              <div className="fd-range">{day.minTemp}°/{day.maxTemp}°</div>
            </div>
          ))}
        </div>
      </div>

      {/* SVG line trend chart */}
      <div className="chart-box" style={{ marginTop: '10px', padding: '14px' }}>
        <div className="chart-title" style={{ fontSize: '0.85rem', marginBottom: '8px' }}>
          <span>📈 Temperature Analytics Trend</span>
        </div>
        {drawTempChart()}
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', marginTop: '15px' }}>
        {isSimulated ? '📡 Seeded Simulation Data' : '📡 Live Station Telemetry'} • Updated: {lastUpdated}
      </div>
    </div>
  );
}
