import React, { useMemo } from 'react';

export default function AnalyticsDashboard({ 
  locationsList, 
  weatherCache, 
  onSelectLocation, 
  selectedForComparison, 
  onToggleCompareSelect, 
  onCompareTrigger, 
  onExportPDF 
}) {

  // 1. Calculate average statistics across all loaded locations
  const stats = useMemo(() => {
    const loadedData = Object.values(weatherCache);
    if (loadedData.length === 0) return { avgTemp: 0, avgHumidity: 0, avgWind: 0 };

    const sumTemp = loadedData.reduce((sum, d) => sum + d.temp, 0);
    const sumHum = loadedData.reduce((sum, d) => sum + d.humidity, 0);
    const sumWind = loadedData.reduce((sum, d) => sum + d.windSpeed, 0);

    return {
      avgTemp: (sumTemp / loadedData.length).toFixed(1),
      avgHumidity: (sumHum / loadedData.length).toFixed(1),
      avgWind: (sumWind / loadedData.length).toFixed(1)
    };
  }, [weatherCache]);

  // 2. Extract top 15 locations for charts
  const chartData = useMemo(() => {
    return locationsList
      .slice(0, 15)
      .map(loc => ({
        name: loc.name,
        temp: weatherCache[loc.name]?.temp || 0,
        humidity: weatherCache[loc.name]?.humidity || 0
      }));
  }, [locationsList, weatherCache]);

  // Custom SVG Bar Chart Components
  const renderTempBarChart = () => {
    const width = 500;
    const height = 180;
    const padL = 35;
    const padR = 15;
    const padT = 15;
    const padB = 30;

    const chartW = width - padL - padR;
    const chartH = height - padT - padB;
    const barWidth = Math.floor(chartW / chartData.length) - 6;

    const maxVal = 40; // max temp limit for scale

    return (
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="tempBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#ff9900" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {[0, 10, 20, 30, 40].map((val) => {
          const y = height - padB - (val / maxVal) * chartH;
          return (
            <g key={val}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255, 255, 255, 0.08)" />
              <text x={padL - 8} y={y + 3} fill="rgba(255, 255, 255, 0.5)" fontSize="9" textAnchor="end">{val}°</text>
            </g>
          );
        })}

        {/* Bars */}
        {chartData.map((d, i) => {
          const x = padL + i * (chartW / chartData.length) + 3;
          const barHeight = (d.temp / maxVal) * chartH;
          const y = height - padB - barHeight;

          return (
            <g key={d.name}>
              <rect 
                x={x} 
                y={y} 
                width={barWidth} 
                height={barHeight} 
                fill="url(#tempBarGrad)" 
                rx="3"
                style={{ transition: 'all 0.5s ease' }}
              />
              <text 
                x={x + barWidth / 2} 
                y={y - 4} 
                fill="#ffffff" 
                fontSize="8" 
                fontWeight="600" 
                textAnchor="middle"
              >
                {d.temp}°
              </text>
              <text 
                x={x + barWidth / 2} 
                y={height - 12} 
                fill="rgba(255, 255, 255, 0.8)" 
                fontSize="7" 
                textAnchor="middle"
                transform={`rotate(-25, ${x + barWidth / 2}, ${height - 12})`}
              >
                {d.name.slice(0, 5)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  const renderHumidityBarChart = () => {
    const width = 500;
    const height = 180;
    const padL = 35;
    const padR = 15;
    const padT = 15;
    const padB = 30;

    const chartW = width - padL - padR;
    const chartH = height - padT - padB;
    const barWidth = Math.floor(chartW / chartData.length) - 6;

    const maxVal = 100;

    return (
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto' }}>
        <defs>
          <linearGradient id="humBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#2979ff" />
          </linearGradient>
        </defs>

        {/* Gridlines */}
        {[0, 25, 50, 75, 100].map((val) => {
          const y = height - padB - (val / maxVal) * chartH;
          return (
            <g key={val}>
              <line x1={padL} y1={y} x2={width - padR} y2={y} stroke="rgba(255, 255, 255, 0.08)" />
              <text x={padL - 8} y={y + 3} fill="rgba(255, 255, 255, 0.5)" fontSize="9" textAnchor="end">{val}%</text>
            </g>
          );
        })}

        {/* Bars */}
        {chartData.map((d, i) => {
          const x = padL + i * (chartW / chartData.length) + 3;
          const barHeight = (d.humidity / maxVal) * chartH;
          const y = height - padB - barHeight;

          return (
            <g key={d.name}>
              <rect 
                x={x} 
                y={y} 
                width={barWidth} 
                height={barHeight} 
                fill="url(#humBarGrad)" 
                rx="3"
                style={{ transition: 'all 0.5s ease' }}
              />
              <text 
                x={x + barWidth / 2} 
                y={y - 4} 
                fill="#ffffff" 
                fontSize="8" 
                fontWeight="600" 
                textAnchor="middle"
              >
                {d.humidity}%
              </text>
              <text 
                x={x + barWidth / 2} 
                y={height - 12} 
                fill="rgba(255, 255, 255, 0.8)" 
                fontSize="7" 
                textAnchor="middle"
                transform={`rotate(-25, ${x + barWidth / 2}, ${height - 12})`}
              >
                {d.name.slice(0, 5)}
              </text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="weather-dashboard animate-slide-in">
      <div className="mobile-stats-row">
        <div className="mobile-stat-card">
          <div className="m-stat-val" style={{ color: '#ffd700' }}>{stats.avgTemp}°C</div>
          <div className="m-stat-lbl">Avg Temp</div>
        </div>
        <div className="mobile-stat-card">
          <div className="m-stat-val" style={{ color: '#64ffda' }}>{stats.avgHumidity}%</div>
          <div className="m-stat-lbl">Avg Humidity</div>
        </div>
        <div className="mobile-stat-card">
          <div className="m-stat-val" style={{ color: '#00e5ff' }}>{stats.avgWind}m/s</div>
          <div className="m-stat-lbl">Avg Wind</div>
        </div>
      </div>

      <div className="native-card" style={{ padding: '14px' }}>
        <h3 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>🌡️ Temperature Telemetry</h3>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '12px', marginBottom: '15px' }}>
          {renderTempBarChart()}
        </div>

        <h3 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>💧 Humidity Telemetry</h3>
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '8px', borderRadius: '12px' }}>
          {renderHumidityBarChart()}
        </div>
      </div>

      {selectedForComparison.length > 0 && (
        <div className="native-card" style={{ padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>📊 Comparison Deck</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              {selectedForComparison.length} cities selected to compare.
            </div>
          </div>
          <button 
            type="button" 
            onClick={onCompareTrigger} 
            disabled={selectedForComparison.length < 2}
            className="compare-btn"
            style={{ padding: '6px 12px', fontSize: '0.75rem' }}
          >
            Compare View
          </button>
        </div>
      )}

      <div className="native-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'rgba(255,255,255,0.8)' }}>
          📥 Data Administration
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
          <button type="button" onClick={onExportPDF} className="export-btn" style={{ justifyContent: 'center', fontSize: '0.75rem', padding: '10px' }}>
            📄 PDF Consolidated Report
          </button>
        </div>
      </div>
    </div>
  );
}
