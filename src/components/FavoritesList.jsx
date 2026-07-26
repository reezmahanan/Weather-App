import React from 'react';

export default function FavoritesList({ 
  favorites, 
  weatherCache, 
  onSelectLocation, 
  onRemoveFavorite 
}) {
  if (!favorites || favorites.length === 0) return null;

  return (
    <div className="favorites-list-native animate-slide-in">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        {favorites.map((fav) => {
          const w = weatherCache ? weatherCache[fav.name] : null;

          return (
            <div 
              key={fav.name} 
              className="station-row"
              onClick={() => onSelectLocation(fav)}
              style={{ padding: '16px', minHeight: '80px' }}
            >
              <div className="station-info">
                <span className="station-name" style={{ fontSize: '1.05rem' }}>📍 {fav.name}</span>
                <span className="station-province" style={{ fontSize: '0.75rem' }}>{fav.province} Province</span>
                {w && (
                  <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', marginTop: '4px', textTransform: 'capitalize' }}>
                    {w.description}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }} onClick={e => e.stopPropagation()}>
                {w && (
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                    <span className="station-temp" style={{ fontSize: '1.4rem' }}>{w.temp}°C</span>
                    <span className="station-emoji" style={{ fontSize: '1.6rem', marginTop: '-2px' }}>{w.emoji}</span>
                  </div>
                )}
                
                <button 
                  type="button" 
                  onClick={() => onRemoveFavorite(fav.name)} 
                  className="remove-fav" 
                  style={{ width: '26px', height: '26px', fontSize: '12px' }}
                  title="Remove bookmark"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
