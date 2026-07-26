import React from 'react';

export default function ComparisonTable({ selectedNames, weatherCache, onClose }) {
  const compareData = selectedNames
    .map(name => ({ name, data: weatherCache[name] }))
    .filter(item => item.data !== undefined);

  if (compareData.length < 2) {
    return (
      <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
        <p style={{ color: 'white', fontSize: '0.9rem' }}>Select 2+ locations from the stations grid to compare.</p>
        <button type="button" onClick={onClose} className="btn-primary" style={{ marginTop: '12px', fontSize: '0.8rem', padding: '10px 20px' }}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  // Find the warmest location
  let warmestTemp = -Infinity;
  let warmestName = '';
  compareData.forEach(item => {
    if (item.data.temp > warmestTemp) {
      warmestTemp = item.data.temp;
      warmestName = item.name;
    }
  });

  return (
    <div className="comparison-native-view animate-slide-in">
      <div style={{ display: 'flex', justifycontent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
        <h3 style={{ color: 'white', fontSize: '1.15rem', fontWeight: '600' }}>📊 Multi-City Comparison Deck</h3>
        <button 
          type="button" 
          onClick={onClose} 
          className="export-btn" 
          style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.15)' }}
        >
          ✕ Close Comparison
        </button>
      </div>

      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '8px', textAlign: 'right' }}>
        Swipe horizontal to browse comparisons ➔
      </div>

      <div className="compare-container">
        {compareData.map(({ name, data }) => {
          const isWarmest = name === warmestName;
          return (
            <div 
              key={name} 
              className={`compare-col ${isWarmest ? 'highlight' : ''}`}
            >
              <div className="comparison-title-box">
                <h4 style={{ fontSize: '1.05rem', color: 'white' }}>{name}</h4>
                <span style={{ fontSize: '0.65rem' }}>{data.isSimulated ? 'Simulation Data' : 'Live Station'}</span>
                {isWarmest && (
                  <div style={{ 
                    fontSize: '0.65rem', 
                    background: 'rgba(255, 215, 0, 0.25)', 
                    color: '#ffd700', 
                    borderRadius: '6px', 
                    padding: '2px 6px', 
                    display: 'inline-block',
                    marginTop: '4px',
                    fontWeight: 'bold',
                    border: '1px solid rgba(255, 215, 0, 0.3)'
                  }}>
                    ☀️ Warmest
                  </div>
                )}
              </div>

              <div className="comparison-stat-row">
                <span className="lbl">Temperature</span>
                <span className="val temperature">{data.temp}°C</span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Feels Like</span>
                <span className="val">{data.feelsLike}°C</span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Condition</span>
                <span className="val" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <span>{data.emoji}</span>
                  <span style={{ fontSize: '0.72rem' }}>{data.description}</span>
                </span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Humidity</span>
                <span className="val humidity">{data.humidity}%</span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Wind Speed</span>
                <span className="val wind">{data.windSpeed} m/s</span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Population</span>
                <span className="val">{data.population?.toLocaleString() || 'N/A'}</span>
              </div>
              <div className="comparison-stat-row">
                <span className="lbl">Land Area</span>
                <span className="val">{data.area || 'N/A'} km²</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
