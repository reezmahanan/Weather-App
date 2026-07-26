// Comprehensive list of cities, towns, and areas across Sri Lanka with metadata
export const locationsList = [
  // Western Province
  { name: 'Colombo', province: 'Western', lat: 6.9271, lon: 79.8612, population: 750000, area: 37 },
  { name: 'Dehiwala', province: 'Western', lat: 6.8511, lon: 79.8660, population: 220000, area: 11 },
  { name: 'Mount Lavinia', province: 'Western', lat: 6.8370, lon: 79.8650, population: 215000, area: 9 },
  { name: 'Moratuwa', province: 'Western', lat: 6.7730, lon: 79.8816, population: 185000, area: 20 },
  { name: 'Ratmalana', province: 'Western', lat: 6.8189, lon: 79.8789, population: 95000, area: 12 },
  { name: 'Kollupitiya', province: 'Western', lat: 6.9150, lon: 79.8500, population: 45000, area: 4 },
  { name: 'Bambalapitiya', province: 'Western', lat: 6.8980, lon: 79.8550, population: 50000, area: 5 },
  { name: 'Wellawatta', province: 'Western', lat: 6.8770, lon: 79.8600, population: 65000, area: 6 },
  { name: 'Nugegoda', province: 'Western', lat: 6.8720, lon: 79.8910, population: 155000, area: 10 },
  { name: 'Maharagama', province: 'Western', lat: 6.8480, lon: 79.9260, population: 200000, area: 15 },
  { name: 'Kotte', province: 'Western', lat: 6.9010, lon: 79.9070, population: 115000, area: 17 },
  { name: 'Battaramulla', province: 'Western', lat: 6.8990, lon: 79.9230, population: 105000, area: 14 },
  { name: 'Rajagiriya', province: 'Western', lat: 6.9090, lon: 79.8970, population: 85000, area: 8 },
  { name: 'Homagama', province: 'Western', lat: 6.8420, lon: 80.0030, population: 60000, area: 25 },
  { name: 'Boralesgamuwa', province: 'Western', lat: 6.8400, lon: 79.9000, population: 72000, area: 9 },
  { name: 'Piliyandala', province: 'Western', lat: 6.8020, lon: 79.9230, population: 84000, area: 13 },
  { name: 'Gampaha', province: 'Western', lat: 7.0897, lon: 80.0098, population: 95000, area: 28 },
  { name: 'Negombo', province: 'Western', lat: 7.2089, lon: 79.8353, population: 142000, area: 30 },
  { name: 'Katunayake', province: 'Western', lat: 7.1720, lon: 79.8850, population: 50000, area: 18 },
  { name: 'Ja-Ela', province: 'Western', lat: 7.0780, lon: 79.8890, population: 65000, area: 15 },
  { name: 'Wattala', province: 'Western', lat: 6.9850, lon: 79.8930, population: 135000, area: 14 },
  { name: 'Kelaniya', province: 'Western', lat: 6.9650, lon: 79.9190, population: 195000, area: 16 },
  { name: 'Kadawatha', province: 'Western', lat: 7.0020, lon: 79.9530, population: 252000, area: 22 },
  { name: 'Ragama', province: 'Western', lat: 7.0280, lon: 79.9250, population: 126000, area: 12 },
  { name: 'Minuwangoda', province: 'Western', lat: 7.1650, lon: 79.9580, population: 75000, area: 21 },
  { name: 'Kalutara', province: 'Western', lat: 6.5854, lon: 79.9607, population: 82000, area: 32 },
  { name: 'Panadura', province: 'Western', lat: 6.7110, lon: 79.9070, population: 95000, area: 18 },
  { name: 'Wadduwa', province: 'Western', lat: 6.6690, lon: 79.9320, population: 35000, area: 14 },
  { name: 'Beruwala', province: 'Western', lat: 6.4790, lon: 79.9830, population: 55000, area: 16 },
  { name: 'Aluthgama', province: 'Western', lat: 6.4420, lon: 79.9990, population: 45000, area: 10 },
  { name: 'Bandaragama', province: 'Western', lat: 6.7020, lon: 79.9830, population: 28000, area: 12 },
  { name: 'Horana', province: 'Western', lat: 6.7200, lon: 80.0620, population: 55000, area: 19 },
  
  // Central Province
  { name: 'Kandy', province: 'Central', lat: 7.2906, lon: 80.6337, population: 130000, area: 26 },
  { name: 'Peradeniya', province: 'Central', lat: 7.2710, lon: 80.5980, population: 40000, area: 12 },
  { name: 'Katugastota', province: 'Central', lat: 7.3220, lon: 80.6270, population: 35000, area: 8 },
  { name: 'Gampola', province: 'Central', lat: 7.1650, lon: 80.5720, population: 25000, area: 15 },
  { name: 'Nawalapitiya', province: 'Central', lat: 7.0200, lon: 80.5330, population: 40000, area: 18 },
  { name: 'Kadugannawa', province: 'Central', lat: 7.2550, lon: 80.5220, population: 15000, area: 7 },
  { name: 'Matale', province: 'Central', lat: 7.4675, lon: 80.6234, population: 45000, area: 36 },
  { name: 'Dambulla', province: 'Central', lat: 7.8602, lon: 80.6515, population: 65000, area: 54 },
  { name: 'Sigiriya', province: 'Central', lat: 7.9572, lon: 80.7600, population: 12000, area: 20 },
  { name: 'Galewela', province: 'Central', lat: 7.7650, lon: 80.5730, population: 22000, area: 14 },
  { name: 'Nuwara Eliya', province: 'Central', lat: 6.9680, lon: 80.7896, population: 28000, area: 9 },
  { name: 'Hatton', province: 'Central', lat: 6.8916, lon: 80.5986, population: 18000, area: 11 },
  { name: 'Nanuoya', province: 'Central', lat: 6.9400, lon: 80.7500, population: 12000, area: 6 },
  { name: 'Talawakelle', province: 'Central', lat: 6.9380, lon: 80.6540, population: 15000, area: 10 },
  { name: 'Haputale', province: 'Central', lat: 6.7680, lon: 80.9570, population: 14000, area: 8 },
  { name: 'Bandarawela', province: 'Central', lat: 6.8259, lon: 80.9982, population: 40000, area: 15 },
  { name: 'Welimada', province: 'Central', lat: 6.9020, lon: 80.9030, population: 18000, area: 13 },
  
  // Southern Province
  { name: 'Galle', province: 'Southern', lat: 6.0535, lon: 80.2210, population: 100000, area: 17 },
  { name: 'Hikkaduwa', province: 'Southern', lat: 6.1390, lon: 80.1030, population: 12000, area: 8 },
  { name: 'Ambalangoda', province: 'Southern', lat: 6.2420, lon: 80.0540, population: 35000, area: 12 },
  { name: 'Balapitiya', province: 'Southern', lat: 6.2710, lon: 80.0380, population: 28000, area: 10 },
  { name: 'Bentota', province: 'Southern', lat: 6.4250, lon: 80.0030, population: 40000, area: 15 },
  { name: 'Unawatuna', province: 'Southern', lat: 6.0150, lon: 80.2500, population: 18000, area: 6 },
  { name: 'Matara', province: 'Southern', lat: 5.9549, lon: 80.5550, population: 52000, area: 14 },
  { name: 'Weligama', province: 'Southern', lat: 5.9720, lon: 80.4280, population: 30000, area: 11 },
  { name: 'Mirissa', province: 'Southern', lat: 5.9480, lon: 80.4580, population: 15000, area: 5 },
  { name: 'Dickwella', province: 'Southern', lat: 5.9700, lon: 80.6900, population: 25000, area: 9 },
  { name: 'Tangalle', province: 'Southern', lat: 6.0240, lon: 80.7990, population: 35000, area: 18 },
  { name: 'Hambantota', province: 'Southern', lat: 6.1246, lon: 81.1244, population: 45000, area: 42 },
  { name: 'Tissamaharama', province: 'Southern', lat: 6.2780, lon: 81.2850, population: 22000, area: 24 },
  { name: 'Kataragama', province: 'Southern', lat: 6.4150, lon: 81.3300, population: 8000, area: 12 },
  
  // Northern Province
  { name: 'Jaffna', province: 'Northern', lat: 9.6615, lon: 80.0255, population: 88000, area: 20 },
  { name: 'Chavakachcheri', province: 'Northern', lat: 9.6520, lon: 80.1580, population: 20000, area: 11 },
  { name: 'Point Pedro', province: 'Northern', lat: 9.8250, lon: 80.2330, population: 28000, area: 14 },
  { name: 'Nallur', province: 'Northern', lat: 9.6740, lon: 80.0330, population: 32000, area: 8 },
  { name: 'Karainagar', province: 'Northern', lat: 9.7420, lon: 79.8830, population: 15000, area: 10 },
  { name: 'Kilinochchi', province: 'Northern', lat: 9.3830, lon: 80.4000, population: 22000, area: 15 },
  { name: 'Paranthan', province: 'Northern', lat: 9.4330, lon: 80.4170, population: 14000, area: 9 },
  { name: 'Elephant Pass', province: 'Northern', lat: 9.5330, lon: 80.4080, population: 5000, area: 18 },
  { name: 'Mannar', province: 'Northern', lat: 8.9810, lon: 79.9040, population: 35000, area: 38 },
  { name: 'Talaimannar', province: 'Northern', lat: 9.0830, lon: 79.7330, population: 12000, area: 15 },
  { name: 'Vavuniya', province: 'Northern', lat: 8.7542, lon: 80.4982, population: 55000, area: 18 },
  { name: 'Cheddikulam', province: 'Northern', lat: 8.6650, lon: 80.3080, population: 18000, area: 22 },
  { name: 'Mullaitivu', province: 'Northern', lat: 9.2670, lon: 80.8170, population: 18000, area: 25 },
  { name: 'Puthukudiyiruppu', province: 'Northern', lat: 9.3170, lon: 80.7000, population: 16000, area: 20 },
  
  // Eastern Province
  { name: 'Trincomalee', province: 'Eastern', lat: 8.5874, lon: 81.2152, population: 100000, area: 25 },
  { name: 'Kinniya', province: 'Eastern', lat: 8.5200, lon: 81.1830, population: 42000, area: 18 },
  { name: 'Nilaveli', province: 'Eastern', lat: 8.6920, lon: 81.1920, population: 15000, area: 12 },
  { name: 'Kuchchaveli', province: 'Eastern', lat: 8.8170, lon: 81.0980, population: 18000, area: 22 },
  { name: 'Batticaloa', province: 'Eastern', lat: 7.7102, lon: 81.6924, population: 90000, area: 73 },
  { name: 'Kalmunai', province: 'Eastern', lat: 7.4167, lon: 81.8333, population: 95000, area: 22 },
  { name: 'Eravur', province: 'Eastern', lat: 7.7650, lon: 81.6030, population: 32000, area: 14 },
  { name: 'Valaichchenai', province: 'Eastern', lat: 7.9170, lon: 81.5330, population: 48000, area: 26 },
  { name: 'Oddamavadi', province: 'Eastern', lat: 7.9250, lon: 81.5170, population: 35000, area: 15 },
  { name: 'Ampara', province: 'Eastern', lat: 7.2925, lon: 81.6747, population: 45000, area: 22 },
  { name: 'Akkaraipattu', province: 'Eastern', lat: 7.2170, lon: 81.8500, population: 38000, area: 18 },
  { name: 'Sammanthurai', province: 'Eastern', lat: 7.3670, lon: 81.8000, population: 40000, area: 20 },
  { name: 'Pottuvil', province: 'Eastern', lat: 6.8720, lon: 81.8260, population: 12000, area: 30 },
  { name: 'Arugam Bay', province: 'Eastern', lat: 6.8400, lon: 81.8330, population: 3000, area: 5 },
  
  // North Western Province
  { name: 'Kurunegala', province: 'North Western', lat: 7.4863, lon: 80.3647, population: 85000, area: 23 },
  { name: 'Kuliyapitiya', province: 'North Western', lat: 7.4670, lon: 80.0500, population: 42000, area: 18 },
  { name: 'Wariyapola', province: 'North Western', lat: 7.6080, lon: 80.2250, population: 28000, area: 14 },
  { name: 'Mawathagama', province: 'North Western', lat: 7.4330, lon: 80.4500, population: 35000, area: 15 },
  { name: 'Pannala', province: 'North Western', lat: 7.3480, lon: 80.0270, population: 24000, area: 12 },
  { name: 'Polgahawela', province: 'North Western', lat: 7.3380, lon: 80.2880, population: 38000, area: 16 },
  { name: 'Puttalam', province: 'North Western', lat: 8.0330, lon: 79.8270, population: 45000, area: 46 },
  { name: 'Chilaw', province: 'North Western', lat: 7.5750, lon: 79.7950, population: 65000, area: 22 },
  { name: 'Wennappuwa', province: 'North Western', lat: 7.3650, lon: 79.8550, population: 52000, area: 18 },
  { name: 'Nattandiya', province: 'North Western', lat: 7.4170, lon: 79.8670, population: 26000, area: 11 },
  { name: 'Marawila', province: 'North Western', lat: 7.4830, lon: 79.8220, population: 32000, area: 13 },
  { name: 'Dankotuwa', province: 'North Western', lat: 7.2830, lon: 79.8830, population: 28000, area: 10 },
  
  // North Central Province
  { name: 'Anuradhapura', province: 'North Central', lat: 8.3114, lon: 80.4037, population: 63000, area: 36 },
  { name: 'Mihintale', province: 'North Central', lat: 8.3540, lon: 80.5030, population: 18000, area: 15 },
  { name: 'Medawachchiya', province: 'North Central', lat: 8.5380, lon: 80.4980, population: 22000, area: 24 },
  { name: 'Kekirawa', province: 'North Central', lat: 8.0120, lon: 80.5830, population: 35000, area: 28 },
  { name: 'Tambuttegama', province: 'North Central', lat: 8.1670, lon: 80.2830, population: 24000, area: 19 },
  { name: 'Polonnaruwa', province: 'North Central', lat: 7.9397, lon: 81.0026, population: 40000, area: 26 },
  { name: 'Hingurakgoda', province: 'North Central', lat: 8.0530, lon: 80.9780, population: 32000, area: 20 },
  { name: 'Medirigiriya', province: 'North Central', lat: 8.1380, lon: 81.0130, population: 28000, area: 22 },
  
  // Uva Province
  { name: 'Badulla', province: 'Uva', lat: 6.9934, lon: 81.0550, population: 47000, area: 15 },
  { name: 'Mahiyanganaya', province: 'Uva', lat: 7.3250, lon: 80.9990, population: 25000, area: 18 },
  { name: 'Passara', province: 'Uva', lat: 6.9330, lon: 81.1500, population: 16000, area: 11 },
  { name: 'Hali-Ela', province: 'Uva', lat: 6.9530, lon: 81.0280, population: 24000, area: 13 },
  { name: 'Moneragala', province: 'Uva', lat: 6.8710, lon: 81.3500, population: 28000, area: 35 },
  { name: 'Wellawaya', province: 'Uva', lat: 6.7380, lon: 81.1030, population: 32000, area: 28 },
  { name: 'Bibile', province: 'Uva', lat: 7.1580, lon: 81.4000, population: 18000, area: 22 },
  { name: 'Buttala', province: 'Uva', lat: 6.7580, lon: 81.2480, population: 22000, area: 25 },
  
  // Sabaragamuwa Province
  { name: 'Ratnapura', province: 'Sabaragamuwa', lat: 6.6828, lon: 80.3992, population: 52000, area: 55 },
  { name: 'Embilipitiya', province: 'Sabaragamuwa', lat: 6.3080, lon: 80.8500, population: 48000, area: 38 },
  { name: 'Balangoda', province: 'Sabaragamuwa', lat: 6.6500, lon: 80.7000, population: 35000, area: 28 },
  { name: 'Pelmadulla', province: 'Sabaragamuwa', lat: 6.6200, lon: 80.5500, population: 28000, area: 18 },
  { name: 'Kuruwita', province: 'Sabaragamuwa', lat: 6.7720, lon: 80.3670, population: 22000, area: 14 },
  { name: 'Kegalle', province: 'Sabaragamuwa', lat: 7.2514, lon: 80.3464, population: 35000, area: 30 },
  { name: 'Mawanella', province: 'Sabaragamuwa', lat: 7.2520, lon: 80.4480, population: 42000, area: 16 },
  { name: 'Warakapola', province: 'Sabaragamuwa', lat: 7.2250, lon: 80.1980, population: 36000, area: 20 },
  { name: 'Rambukkana', province: 'Sabaragamuwa', lat: 7.3170, lon: 80.3980, population: 24000, area: 12 },
  { name: 'Ruwanwella', province: 'Sabaragamuwa', lat: 7.0420, lon: 80.2530, population: 18000, area: 15 }
];

// Helper to get locations grouped by province
export const getLocationsByProvince = () => {
  const grouped = {};
  locationsList.forEach(loc => {
    if (!grouped[loc.province]) {
      grouped[loc.province] = [];
    }
    grouped[loc.province].push(loc);
  });
  return grouped;
};
