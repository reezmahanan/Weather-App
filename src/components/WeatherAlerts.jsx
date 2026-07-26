import React from 'react';

export default function WeatherAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alerts-section">
      <h3 style={{ color: 'white', marginBottom: '12px', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        ⚠️ Weather Warnings & Advisories
      </h3>
      <div className="alerts-grid">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`alert-card alert-${alert.type}`}>
            <span className="alert-icon">{alert.icon}</span>
            <span className="alert-message">{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
