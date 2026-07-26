// Geolocation utility functions for the Weather App

// Haversine formula to calculate the distance between two coordinates in km
export const getDistanceKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Check if latitude/longitude is within Sri Lankan boundaries
export const isWithinSriLanka = (lat, lon) => {
  // Approximate boundaries for Sri Lanka main island
  return lat >= 5.8 && lat <= 9.9 && lon >= 79.4 && lon <= 82.2;
};

// Find the closest weather station from our locations list
export const findNearestLocation = (userLat, userLon, locations) => {
  if (!locations || locations.length === 0) return null;
  
  let nearest = locations[0];
  let minDistance = getDistanceKm(userLat, userLon, locations[0].lat, locations[0].lon);
  
  for (let i = 1; i < locations.length; i++) {
    const dist = getDistanceKm(userLat, userLon, locations[i].lat, locations[i].lon);
    if (dist < minDistance) {
      minDistance = dist;
      nearest = locations[i];
    }
  }
  
  return {
    location: nearest,
    distanceKm: parseFloat(minDistance.toFixed(1))
  };
};

// Request user's geolocation browser-side
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      },
      (error) => {
        let msg = 'Unable to retrieve location.';
        switch(error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Permission denied by user.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location position unavailable.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out.';
            break;
        }
        reject(new Error(msg));
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  });
};
