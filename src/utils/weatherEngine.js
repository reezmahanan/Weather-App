// Weather Engine: Handles Live API fetching, Weather Simulation, and Code Mapping

// Simple seeded pseudo-random number generator (LCG)
export const getSeededRandom = (seedString) => {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  hash = Math.abs(hash); // Ensure base hash is positive
  return () => {
    hash = (hash * 9301 + 49297) % 233280;
    return Math.abs(hash) / 233280; // Ensure returned random number is positive in [0, 1)
  };
};

// Map WMO codes to descriptions, emojis, background images, and particle types
export const mapWMOCode = (code, isDay = 1) => {
  // WMO Weather interpretation codes (https://open-meteo.com/en/docs)
  if (code === 0) {
    return {
      description: isDay ? 'Sunny' : 'Clear Sky',
      emoji: '☀️',
      particle: 'sunny',
      background: isDay 
        ? 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80' // sunny day
        : 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1920&q=80', // starry night
      themeClass: 'theme-clear'
    };
  }
  if (code === 1 || code === 2 || code === 3) {
    const desc = code === 1 ? 'Mainly Clear' : code === 2 ? 'Partly Cloudy' : 'Overcast';
    return {
      description: desc,
      emoji: '☁️',
      particle: 'cloudy',
      background: isDay 
        ? 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80' // cloudy day
        : 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1920&q=80', // cloudy night
      themeClass: 'theme-cloudy'
    };
  }
  if (code === 45 || code === 48) {
    return {
      description: 'Foggy / Mist',
      emoji: '🌫️',
      particle: 'mist',
      background: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80',
      themeClass: 'theme-mist'
    };
  }
  if (code === 51 || code === 53 || code === 55 || code === 56 || code === 57) {
    return {
      description: 'Light Drizzle',
      emoji: '🌦️',
      particle: 'drizzle',
      background: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&q=80',
      themeClass: 'theme-rainy'
    };
  }
  if (code === 61 || code === 63 || code === 65 || code === 66 || code === 67) {
    return {
      description: code === 65 ? 'Heavy Rain' : 'Rainy',
      emoji: '🌧️',
      particle: 'rain',
      background: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1920&q=80',
      themeClass: 'theme-rainy'
    };
  }
  if (code === 80 || code === 81 || code === 82) {
    return {
      description: 'Rain Showers',
      emoji: '🌧️',
      particle: 'rain',
      background: 'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=1920&q=80',
      themeClass: 'theme-rainy'
    };
  }
  if (code === 95 || code === 96 || code === 99) {
    return {
      description: 'Thunderstorm',
      emoji: '⛈️',
      particle: 'storm',
      background: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&q=80',
      themeClass: 'theme-storm'
    };
  }
  
  // Fallback
  return {
    description: 'Partly Cloudy',
    emoji: '🌤️',
    particle: 'cloudy',
    background: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80',
    themeClass: 'theme-cloudy'
  };
};

// Weather Alert Generator
export const generateAlerts = (temp, humidity, windSpeed, weatherCode) => {
  const alerts = [];
  if (temp > 35) {
    alerts.push({ type: 'heat', message: 'Extreme Heat Warning (>35°C)', icon: '🔥' });
  } else if (temp < 15) {
    alerts.push({ type: 'cold', message: 'Cold Weather Advisory (<15°C)', icon: '❄️' });
  }
  if (humidity > 90) {
    alerts.push({ type: 'humidity', message: 'High Humidity Alert (>90%)', icon: '💧' });
  }
  if (windSpeed > 7.0) {
    alerts.push({ type: 'wind', message: 'Strong Wind Warning (>7.0 m/s)', icon: '💨' });
  }
  if ([95, 96, 99].includes(weatherCode)) {
    alerts.push({ type: 'storm', message: 'Severe Thunderstorm Advisory', icon: '⛈️' });
  }
  return alerts;
};

// Deterministic Simulator (Offline Fallback)
export const getSimulatedWeather = (location, dateString = '') => {
  const date = dateString ? new Date(dateString) : new Date();
  const dateStr = date.toISOString().split('T')[0];
  const hour = date.getHours();
  
  // Seed string incorporating city, date, and hour
  const currentSeed = `${location.name}-${dateStr}-${hour}`;
  const rand = getSeededRandom(currentSeed);
  
  // Base climate pattern based on province
  let minTemp = 24;
  let maxTemp = 33;
  let weatherDistribution = [0, 1, 2, 3, 51, 61, 80, 95]; // clear, cloudy, rainy, storm
  
  const hillProvinces = ['Central', 'Uva', 'Sabaragamuwa'];
  const dryProvinces = ['Northern', 'North Central', 'Eastern', 'North Western'];
  
  if (hillProvinces.includes(location.province)) {
    minTemp = 13;
    maxTemp = 24;
    // Nuwara Eliya is exceptionally cold
    if (location.name === 'Nuwara Eliya') {
      minTemp = 9;
      maxTemp = 18;
    }
    // High probability of mist/rain
    weatherDistribution = [1, 2, 3, 45, 51, 61];
  } else if (dryProvinces.includes(location.province)) {
    minTemp = 26;
    maxTemp = 36;
    // Low probability of rain
    weatherDistribution = [0, 0, 1, 2, 3, 51, 61];
  }
  
  // Current temperature (sine wave over diurnal cycle + noise)
  const range = maxTemp - minTemp;
  const cycleVal = Math.sin(((hour - 6) / 24) * 2 * Math.PI); // Peak at 12-14, low at 4-6
  const diurnalTemp = minTemp + (range / 2) + (cycleVal * (range / 2));
  const tempNoise = (rand() * 4) - 2; // +/- 2 degrees noise
  const temp = Math.round(diurnalTemp + tempNoise);
  
  // Weather Code
  const codeIdx = Math.floor(rand() * weatherDistribution.length);
  const weatherCode = weatherDistribution[codeIdx];
  
  // Humidity
  let humidity = 60;
  if ([51, 61, 80, 95].includes(weatherCode)) {
    humidity = Math.floor(80 + rand() * 15);
  } else if ([45, 48].includes(weatherCode)) {
    humidity = Math.floor(85 + rand() * 12);
  } else {
    humidity = Math.floor(50 + rand() * 25);
  }
  
  // Wind Speed (m/s)
  let windSpeed = parseFloat((1.5 + rand() * 4.5).toFixed(1));
  if (weatherCode === 95) {
    windSpeed = parseFloat((6.5 + rand() * 5.0).toFixed(1));
  } else if (location.province === 'Southern' || location.province === 'Eastern') {
    windSpeed = parseFloat((2.5 + rand() * 5.0).toFixed(1)); // Windier coast
  }
  
  const weatherInfo = mapWMOCode(weatherCode);
  const alerts = generateAlerts(temp, humidity, windSpeed, weatherCode);
  
  // Generate 7-day forecast
  const forecast = [];
  for (let i = 1; i <= 7; i++) {
    const fDate = new Date(date);
    fDate.setDate(date.getDate() + i);
    const fDateStr = fDate.toISOString().split('T')[0];
    const fSeed = `${location.name}-${fDateStr}`;
    const fRand = getSeededRandom(fSeed);
    
    // Gradual temp shift
    const fTempChange = Math.round((fRand() * 6) - 3);
    let fAvgTemp = Math.round((minTemp + maxTemp) / 2 + fTempChange);
    let fMin = fAvgTemp - Math.round(2 + fRand() * 2);
    let fMax = fAvgTemp + Math.round(2 + fRand() * 2);
    
    const fCodeIdx = Math.floor(fRand() * weatherDistribution.length);
    const fCode = weatherDistribution[fCodeIdx];
    const fInfo = mapWMOCode(fCode);
    
    forecast.push({
      date: fDateStr,
      day: fDate.toLocaleDateString('en-US', { weekday: 'short' }),
      temp: fAvgTemp,
      minTemp: fMin,
      maxTemp: fMax,
      weatherCode: fCode,
      description: fInfo.description,
      emoji: fInfo.emoji,
      humidity: Math.floor(55 + fRand() * 30),
      windSpeed: parseFloat((1.5 + fRand() * 4.0).toFixed(1))
    });
  }

  return {
    temp,
    feelsLike: Math.round(temp + (humidity > 70 ? (humidity - 70) * 0.1 : 0) - (windSpeed > 5 ? (windSpeed - 5) * 0.2 : 0)),
    humidity,
    windSpeed,
    weatherCode,
    description: weatherInfo.description,
    emoji: weatherInfo.emoji,
    background: weatherInfo.background,
    themeClass: weatherInfo.themeClass,
    particle: weatherInfo.particle,
    population: location.population,
    area: location.area,
    alerts,
    forecast,
    isSimulated: true,
    lastUpdated: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
  };
};

// Main Fetcher: Tries API first, falls back to simulation
export const getWeatherData = async (location) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,uv_index_max,wind_speed_10m_max&timezone=auto`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API fetch failed');
    }
    
    const data = await response.json();
    
    // Map current parameters
    const current = data.current;
    const weatherInfo = mapWMOCode(current.weather_code, current.is_day);
    const temp = Math.round(current.temperature_2m);
    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m; // in km/h or m/s? default is km/h, let's convert km/h to m/s: windSpeed / 3.6
    const windSpeedMs = parseFloat((windSpeed / 3.6).toFixed(1));
    const feelsLike = Math.round(current.apparent_temperature);
    
    const alerts = generateAlerts(temp, humidity, windSpeedMs, current.weather_code);
    
    // Map forecast parameters (first 7 days)
    const forecast = [];
    const daily = data.daily;
    if (daily && daily.time) {
      for (let i = 1; i <= 7; i++) {
        if (daily.time[i]) {
          const fDate = new Date(daily.time[i]);
          const fCode = daily.weather_code[i];
          const fInfo = mapWMOCode(fCode, 1);
          forecast.push({
            date: daily.time[i],
            day: fDate.toLocaleDateString('en-US', { weekday: 'short' }),
            temp: Math.round((daily.temperature_2m_max[i] + daily.temperature_2m_min[i]) / 2),
            minTemp: Math.round(daily.temperature_2m_min[i]),
            maxTemp: Math.round(daily.temperature_2m_max[i]),
            weatherCode: fCode,
            description: fInfo.description,
            emoji: fInfo.emoji,
            humidity: 65, // approximation for daily avg
            windSpeed: parseFloat((daily.wind_speed_10m_max[i] / 3.6).toFixed(1))
          });
        }
      }
    }
    
    return {
      temp,
      feelsLike,
      humidity,
      windSpeed: windSpeedMs,
      weatherCode: current.weather_code,
      description: weatherInfo.description,
      emoji: weatherInfo.emoji,
      background: weatherInfo.background,
      themeClass: weatherInfo.themeClass,
      particle: weatherInfo.particle,
      population: location.population,
      area: location.area,
      alerts,
      forecast,
      isSimulated: false,
      lastUpdated: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
    };
  } catch (error) {
    console.warn(`Failed to fetch live weather for ${location.name}, falling back to simulator:`, error);
    return getSimulatedWeather(location);
  }
};
