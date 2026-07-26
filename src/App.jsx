import React, { useState, useEffect } from 'react';
import { locationsList, getLocationsByProvince } from './data/locations';
import { getWeatherData, getSimulatedWeather } from './utils/weatherEngine';
import { getUserLocation, findNearestLocation, isWithinSriLanka } from './utils/geo';
import { exportSingleToPDF, exportAllToPDF } from './utils/exporter';

import FavoritesList from './components/FavoritesList';
import ComparisonTable from './components/ComparisonTable';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ForecastSection from './components/ForecastSection';

const backgroundsList = [
  { id: 'sunny', label: '☀️ Sunny', url: 'https://images.unsplash.com/photo-1504253163759-c23fcca5ee8d?w=1920&q=80' },
  { id: 'rainy', label: '🌧️ Rainy', url: 'https://images.unsplash.com/photo-1438449805896-28a666819a20?w=1920&q=80' },
  { id: 'cloudy', label: '☁️ Cloudy', url: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80' },
  { id: 'storm', label: '⛈️ Storm', url: 'https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=1920&q=80' },
  { id: 'mist', label: '🌫️ Foggy', url: 'https://images.unsplash.com/photo-1494005612480-90f50fd9376f?w=1920&q=80' },
  { id: 'slate', label: '🌌 Slate', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80' }
];

export default function App() {
  // --- States ---
  const [selectedLocation, setSelectedLocation] = useState(null); // Active city object for detail hero
  const [showComparison, setShowComparison] = useState(false); // Controls comparison deck view
  const [weatherCache, setWeatherCache] = useState({}); // { name: weatherData }
  const [favorites, setFavorites] = useState([]); // List of location objects
  const [selectedForComparison, setSelectedForComparison] = useState([]); // Selected names
  const [isLoading, setIsLoading] = useState(false);
  const [geoStatus, setGeoStatus] = useState('idle'); // 'idle', 'detecting', 'success', 'error'
  const [systemTime, setSystemTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [bgId, setBgId] = useState(localStorage.getItem('weather_app_bg_id') || 'sunny');

  // --- Effects ---

  // Clock Update
  useEffect(() => {
    const timer = setInterval(() => setSystemTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Initialize Cache (Simulated Offline Averages) & Favorites on Mount
  useEffect(() => {
    const initialCache = {};
    locationsList.forEach(loc => {
      initialCache[loc.name] = getSimulatedWeather(loc);
    });
    setWeatherCache(initialCache);

    // Load Favorites from LocalStorage
    const stored = localStorage.getItem('weather_app_favorites');
    if (stored) {
      try {
        const names = JSON.parse(stored);
        const resolved = names
          .map(name => locationsList.find(l => l.name === name))
          .filter(Boolean);
        setFavorites(resolved);
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Sync background wallpaper dynamically when changed by user
  useEffect(() => {
    const selectedBg = backgroundsList.find(b => b.id === bgId) || backgroundsList[0];
    const bgImage = selectedBg.url;

    const styleId = 'dynamic-body-bg';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.innerHTML = `body::before { background-image: url('${bgImage}') !important; }`;
  }, [bgId]);

  // --- Handlers ---

  // Select location to load its live weather details in Hero block
  const handleSelectLocation = async (location) => {
    if (!location) {
      setSelectedLocation(null);
      return;
    }

    setSelectedLocation(location);
    setIsLoading(true);

    // Fetch live weather data
    const liveData = await getWeatherData(location);
    
    // Update cache
    setWeatherCache(prev => ({
      ...prev,
      [location.name]: {
        ...liveData,
        lat: location.lat,
        lon: location.lon
      }
    }));
    setIsLoading(false);
  };

  // Toggle Favorite bookmark
  const handleToggleFavorite = (location) => {
    let updated;
    const isAlreadyFav = favorites.some(f => f.name === location.name);
    
    if (isAlreadyFav) {
      updated = favorites.filter(f => f.name !== location.name);
    } else {
      updated = [...favorites, location];
    }
    
    setFavorites(updated);
    localStorage.setItem('weather_app_favorites', JSON.stringify(updated.map(f => f.name)));
  };

  // Toggle selection for comparison checklist
  const handleToggleCompareSelect = (name) => {
    setSelectedForComparison(prev => {
      if (prev.includes(name)) {
        return prev.filter(n => n !== name);
      } else {
        return [...prev, name];
      }
    });
  };

  // Geolocation detector
  const handleDetectLocation = async () => {
    setGeoStatus('detecting');
    try {
      const coords = await getUserLocation();
      const { lat, lon } = coords;

      if (isWithinSriLanka(lat, lon)) {
        const nearestResult = findNearestLocation(lat, lon, locationsList);
        if (nearestResult) {
          const { location, distanceKm } = nearestResult;
          setGeoStatus('success');
          alert(`📍 Location Detected!\nStation: ${location.name}\nDistance: ${distanceKm} km`);
          handleSelectLocation(location);
        } else {
          throw new Error('No coordinates matched.');
        }
      } else {
        setGeoStatus('error');
        alert(`🌐 Location detected outside boundaries: ${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E.\nPlease select a station manually.`);
      }
    } catch (e) {
      setGeoStatus('error');
      alert(`⚠️ Geolocation Failed: ${e.message}`);
    } finally {
      setTimeout(() => setGeoStatus('idle'), 3000);
    }
  };

  // Exports
  const handleExportAllPDF = () => {
    exportAllToPDF(weatherCache);
  };

  const handleExportSinglePDF = (name) => {
    const data = weatherCache[name];
    if (data) {
      exportSingleToPDF(name, {
        ...data,
        lat: locationsList.find(l => l.name === name)?.lat,
        lon: locationsList.find(l => l.name === name)?.lon
      });
    }
  };

  // Filtered station rows for Sidebar Search List
  const filteredStations = locationsList.filter(loc => {
    const q = searchQuery.toLowerCase();
    return loc.name.toLowerCase().includes(q) || loc.province.toLowerCase().includes(q);
  });

  const handleBgChange = (id) => {
    setBgId(id);
    localStorage.setItem('weather_app_bg_id', id);
  };

  return (
    <div className="container">
      {/* Main Header Row */}
      <div className="header">
        <div>
          <h1>🌤️ Sri Lanka Weather Tracker</h1>
          <p>Real-time telemetry and forecast summaries across 120+ weather stations</p>
        </div>

        {/* Wallpaper Customization widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600' }}>🎨 Custom Wallpaper</span>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.06)', padding: '4px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
            {backgroundsList.map(bg => (
              <button
                key={bg.id}
                onClick={() => handleBgChange(bg.id)}
                className={`export-btn ${bgId === bg.id ? 'active-bg' : ''}`}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.72rem',
                  border: '1px solid transparent',
                  background: bgId === bg.id ? 'rgba(0, 229, 255, 0.15)' : 'transparent',
                  borderColor: bgId === bg.id ? 'var(--accent-cyan)' : 'transparent',
                  borderRadius: '6px',
                  color: bgId === bg.id ? 'white' : 'rgba(255,255,255,0.7)',
                  cursor: 'pointer',
                  fontWeight: bgId === bg.id ? 'bold' : 'normal',
                  transition: 'all 0.2s ease'
                }}
              >
                {bg.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="header-time">
          {systemTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          <div style={{ marginTop: '4px' }}>
            Time: <span>{systemTime.toLocaleTimeString([], { hour12: true })}</span>
          </div>
        </div>
      </div>

      {/* Dashboard Two-Column Grid (Sidebar + Main panel) */}
      <div className="dashboard-grid">
        
        {/* Left Column: Sidebar Widgets */}
        <div className="sidebar">
          
          {/* Widget 1: Search Stations */}
          <div className="glass-card">
            <h3>🔍 Search Stations</h3>
            <div className="search-group">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search station or province..." 
                className="search-box-dashboard"
              />
              <button 
                type="button" 
                onClick={handleDetectLocation} 
                disabled={geoStatus === 'detecting'}
                className="geo-btn-dashboard"
              >
                {geoStatus === 'detecting' ? '🔄 Detecting Station...' : '📍 Detect Nearest Location'}
              </button>
            </div>
            
            <div style={{ padding: '8px 0 0', fontSize: '0.72rem', color: 'var(--text-muted)', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '8px', marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
              <span>Weather Stations</span>
              <span>{filteredStations.length} available</span>
            </div>

            <div className="sidebar-list-container" style={{ marginTop: '10px' }}>
              {filteredStations.map(loc => {
                const w = weatherCache[loc.name];
                const isSelected = selectedLocation && selectedLocation.name === loc.name;
                const isChecked = selectedForComparison.includes(loc.name);

                return (
                  <div 
                    key={loc.name} 
                    className={`station-row ${isSelected ? 'active' : ''}`}
                    onClick={() => handleSelectLocation(loc)}
                  >
                    <div className="station-checkbox-col" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={isChecked}
                        onChange={() => handleToggleCompareSelect(loc.name)}
                        style={{ cursor: 'pointer', width: '15px', height: '15px' }}
                      />
                    </div>
                    
                    <div className="station-info">
                      <span className="station-name">{loc.name}</span>
                      <span className="station-province">{loc.province}</span>
                    </div>

                    <div className="station-weather">
                      <span className="station-temp">{w ? `${w.temp}°` : '--'}</span>
                      <span className="station-emoji">{w ? w.emoji : '🌤️'}</span>
                    </div>
                  </div>
                );
              })}

              {filteredStations.length === 0 && (
                <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '15px', fontSize: '0.8rem' }}>
                  No stations matched.
                </p>
              )}
            </div>
          </div>

          {/* Widget 2: Bookmarked favorites list */}
          {favorites.length > 0 && (
            <div className="glass-card">
              <h3>⭐ Bookmarked Stations</h3>
              <FavoritesList 
                favorites={favorites} 
                weatherCache={weatherCache}
                onSelectLocation={handleSelectLocation}
                onRemoveFavorite={(name) => handleToggleFavorite({ name })}
              />
            </div>
          )}
        </div>

        {/* Right Column: Main panel content */}
        <div className="main-panel">
          
          {/* Loader Overlay */}
          {isLoading && (
            <div className="glass-card" style={{ textAlign: 'center', padding: '30px', fontWeight: 'bold' }}>
              🔄 Connecting live telemetry from weather station...
            </div>
          )}

          {/* Block 1: Active Station Hero Forecast (renders at top when selected) */}
          {!isLoading && selectedLocation && weatherCache[selectedLocation.name] && (
            <div className="hero-weather-card">
              <div style={{ position: 'absolute', top: '15px', right: '15px', zIndex: 10 }}>
                <button 
                  onClick={() => setSelectedLocation(null)}
                  className="export-btn"
                  style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  ✕ Close View
                </button>
              </div>
              <ForecastSection
                location={selectedLocation}
                weatherData={weatherCache[selectedLocation.name]}
                onExportPDF={() => handleExportSinglePDF(selectedLocation.name)}
                isFavorite={favorites.some(f => f.name === selectedLocation.name)}
                onToggleFavorite={() => handleToggleFavorite(selectedLocation)}
              />
            </div>
          )}

          {/* Block 2: Selected Cities Comparisons (toggles on/off in viewport) */}
          {showComparison && (
            <div className="glass-card">
              <ComparisonTable
                selectedNames={selectedForComparison}
                weatherCache={weatherCache}
                onClose={() => setShowComparison(false)}
              />
            </div>
          )}

          {/* Block 3: Consolidated Telemetry Dashboard (national averages & graphs) */}
          <AnalyticsDashboard
            locationsList={locationsList}
            weatherCache={weatherCache}
            onSelectLocation={handleSelectLocation}
            selectedForComparison={selectedForComparison}
            onToggleCompareSelect={handleToggleCompareSelect}
            onCompareTrigger={() => setShowComparison(true)}
            onExportPDF={handleExportAllPDF}
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <p>© 2026 Sri Lanka Weather Tracker • Consolidated Station Network • Powered by React & Open-Meteo API</p>
      </div>
    </div>
  );
}
