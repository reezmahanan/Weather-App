<?php
$sriLankanDistricts = [
    'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo', 'Galle', 'Gampaha', 'Hambantota',
    'Jaffna', 'Kalutara', 'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar', 'Matale',
    'Matara', 'Moneragala', 'Mullaitivu', 'Nuwara Eliya', 'Polonnaruwa', 'Puttalam', 'Ratnapura',
    'Trincomalee', 'Vavuniya'
];

// Function to get weather emoji based on description
function getWeatherEmoji($description) {
    $desc = strtolower($description);
    if (strpos($desc, 'clear') !== false || strpos($desc, 'sunny') !== false) return '☀️';
    if (strpos($desc, 'rain') !== false || strpos($desc, 'rainy') !== false) return '🌧️';
    if (strpos($desc, 'cloud') !== false || strpos($desc, 'overcast') !== false) return '☁️';
    if (strpos($desc, 'mist') !== false || strpos($desc, 'fog') !== false) return '🌫️';
    if (strpos($desc, 'wind') !== false || strpos($desc, 'windy') !== false) return '💨';
    if (strpos($desc, 'thunder') !== false || strpos($desc, 'storm') !== false) return '⛈️';
    if (strpos($desc, 'hot') !== false) return '🔥';
    if (strpos($desc, 'cool') !== false) return '❄️';
    return '🌤️'; // default
}

// Function to generate consistent but slowly changing weather
function generateRealisticWeather($district, $existingData = null) {
    // Base weather patterns for different regions
    $regionalPatterns = [
        'coastal' => ['Colombo', 'Galle', 'Gampaha', 'Kalutara', 'Matara', 'Hambantota', 'Batticaloa', 'Trincomalee', 'Jaffna', 'Mannar'],
        'hill' => ['Kandy', 'Nuwara Eliya', 'Badulla', 'Matale', 'Kegalle', 'Ratnapura'],
        'dry' => ['Anuradhapura', 'Polonnaruwa', 'Vavuniya', 'Mullaitivu', 'Kilinochchi', 'Puttalam', 'Moneragala', 'Ampara', 'Kurunegala']
    ];
    
    // Determine region
    $region = 'dry';
    foreach ($regionalPatterns as $reg => $districts) {
        if (in_array($district, $districts)) {
            $region = $reg;
            break;
        }
    }
    
    // Regional base temperatures
    $baseTemps = [
        'coastal' => ['min' => 26, 'max' => 32],
        'hill' => ['min' => 14, 'max' => 25],
        'dry' => ['min' => 24, 'max' => 34]
    ];
    
    // Regional weather probabilities
    $weatherProbabilities = [
        'coastal' => [
            'clear sky' => 30, 'few clouds' => 25, 'scattered clouds' => 15, 
            'light rain' => 20, 'moderate rain' => 8, 'thunderstorm' => 2
        ],
        'hill' => [
            'mist' => 25, 'few clouds' => 20, 'scattered clouds' => 15,
            'light rain' => 25, 'moderate rain' => 10, 'overcast' => 5
        ],
        'dry' => [
            'clear sky' => 40, 'sunny' => 25, 'few clouds' => 15,
            'hot and humid' => 15, 'windy' => 5
        ]
    ];
    
    // Use district name as seed for consistency
    $seed = crc32($district . date('Y-m-d H')); // Changes hourly
    
    // If we have existing data, make gradual changes
    if ($existingData) {
        $temp = $existingData['temp'];
        $description = $existingData['description'];
        $humidity = $existingData['humidity'];
        $windSpeed = $existingData['wind_speed'];
        
        // Small temperature changes (±2°C)
        $tempChange = ($seed % 5) - 2; // -2 to +2
        $newTemp = max($baseTemps[$region]['min'], min($baseTemps[$region]['max'], $temp + $tempChange));
        
        // Occasionally change weather description (20% chance)
        if (($seed % 5) === 0) {
            $weatherOptions = $weatherProbabilities[$region];
            $rand = $seed % 100;
            $cumulative = 0;
            foreach ($weatherOptions as $desc => $prob) {
                $cumulative += $prob;
                if ($rand <= $cumulative) {
                    $description = $desc;
                    break;
                }
            }
        }
        
        // Small humidity changes
        $humidityChange = (($seed * 7) % 7) - 3; // -3 to +3
        $newHumidity = max(40, min(95, $humidity + $humidityChange));
        
        // Small wind speed changes
        $windChange = (($seed * 3) % 6) - 2; // -2 to +3
        $newWindSpeed = max(0.5, min(8.0, $windSpeed + $windChange));
        
    } else {
        // First time generation
        mt_srand($seed);
        
        // Temperature based on region with small variation
        $tempRange = $baseTemps[$region];
        $temp = mt_rand($tempRange['min'], $tempRange['max']);
        
        // Weather description based on regional probabilities
        $weatherOptions = $weatherProbabilities[$region];
        $rand = mt_rand(1, 100);
        $cumulative = 0;
        foreach ($weatherOptions as $desc => $prob) {
            $cumulative += $prob;
            if ($rand <= $cumulative) {
                $description = $desc;
                break;
            }
        }
        
        // Humidity based on weather and region
        if (strpos($description, 'rain') !== false) {
            $humidity = mt_rand(80, 95);
        } elseif (strpos($description, 'cloud') !== false) {
            $humidity = mt_rand(70, 85);
        } else {
            $humidity = mt_rand(50, 75);
        }
        
        // Wind speed
        if (strpos($description, 'wind') !== false) {
            $windSpeed = mt_rand(50, 80) / 10; // 5.0 - 8.0 m/s
        } else {
            $windSpeed = mt_rand(10, 40) / 10; // 1.0 - 4.0 m/s
        }
        
        $newTemp = $temp;
        $newHumidity = $humidity;
        $newWindSpeed = $windSpeed;
    }
    
    // Realistic population and area data (fixed per district)
    $populationData = [
        'Colombo' => 2500000, 'Gampaha' => 2300000, 'Kalutara' => 1200000,
        'Kandy' => 1400000, 'Matale' => 480000, 'Nuwara Eliya' => 700000,
        'Galle' => 1100000, 'Matara' => 810000, 'Hambantota' => 600000,
        'Jaffna' => 580000, 'Kilinochchi' => 110000, 'Mannar' => 150000,
        'Mullaitivu' => 92000, 'Vavuniya' => 170000, 'Batticaloa' => 530000,
        'Ampara' => 650000, 'Trincomalee' => 380000, 'Kurunegala' => 1600000,
        'Puttalam' => 760000, 'Anuradhapura' => 860000, 'Polonnaruwa' => 410000,
        'Badulla' => 820000, 'Moneragala' => 450000, 'Ratnapura' => 1100000,
        'Kegalle' => 840000
    ];
    
    $areaData = [
        'Colombo' => 699, 'Gampaha' => 1387, 'Kalutara' => 1603,
        'Kandy' => 1940, 'Matale' => 1993, 'Nuwara Eliya' => 1741,
        'Galle' => 1652, 'Matara' => 1283, 'Hambantota' => 2609,
        'Jaffna' => 1025, 'Kilinochchi' => 1279, 'Mannar' => 1996,
        'Mullaitivu' => 2617, 'Vavuniya' => 1967, 'Batticaloa' => 2854,
        'Ampara' => 4415, 'Trincomalee' => 2727, 'Kurunegala' => 4816,
        'Puttalam' => 3072, 'Anuradhapura' => 7179, 'Polonnaruwa' => 3293,
        'Badulla' => 2861, 'Moneragala' => 5639, 'Ratnapura' => 3251,
        'Kegalle' => 1690
    ];
    
    return [
        'temp' => $newTemp,
        'description' => $description,
        'humidity' => $newHumidity,
        'wind_speed' => round($newWindSpeed, 1),
        'population' => $populationData[$district] ?? mt_rand(50000, 2500000),
        'area' => $areaData[$district] ?? mt_rand(500, 8000)
    ];
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $location = $_POST['location'] ?? '';
    
    if (empty($location)) {
        $error = "Please select a location.";
    } else {
        // Database connection for XAMPP with port 3307
        $host = 'localhost';
        $port = 3307; // Updated port
        $user = 'root';
        $pass = ''; // XAMPP default password is empty
        $db = 'weather_app';
        
        $conn = new mysqli($host, $user, $pass, '', $port);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        
        // Create database if not exists
        if (!$conn->query("CREATE DATABASE IF NOT EXISTS $db")) {
            die("Database creation failed: " . $conn->error);
        }
        if (!$conn->select_db($db)) {
            die("Database selection failed: " . $conn->error);
        }
        
        // Create table if not exists
        if (!$conn->query("CREATE TABLE IF NOT EXISTS districts (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) UNIQUE,
            temp INT,
            description VARCHAR(50),
            humidity INT,
            wind_speed FLOAT,
            population INT,
            area INT
        )")) {
            die("Table creation failed: " . $conn->error);
        }
        
        // Populate districts if empty
        $result = $conn->query("SELECT COUNT(*) as count FROM districts");
        if (!$result) {
            die("Count query failed: " . $conn->error);
        }
        $row = $result->fetch_assoc();
        if ($row['count'] == 0) {
            $stmt = $conn->prepare("INSERT INTO districts (name, temp, description, humidity, wind_speed, population, area) VALUES (?, ?, ?, ?, ?, ?, ?)");
            if (!$stmt) {
                die("Prepare failed: " . $conn->error);
            }
            foreach ($sriLankanDistricts as $d) {
                $weatherData = generateRealisticWeather($d);
                $stmt->bind_param("ssidiis", $d, $weatherData['temp'], $weatherData['description'], $weatherData['humidity'], $weatherData['wind_speed'], $weatherData['population'], $weatherData['area']);
                if (!$stmt->execute()) {
                    die("Insert failed: " . $stmt->error);
                }
            }
            $stmt->close();
        }
        
        // Update weather data with realistic changes
        $stmt = $conn->prepare("UPDATE districts SET temp=?, description=?, humidity=?, wind_speed=? WHERE name=?");
        if (!$stmt) {
            die("Update prepare failed: " . $conn->error);
        }
        foreach ($sriLankanDistricts as $district) {
            // Get current data for gradual changes
            $result = $conn->query("SELECT temp, description, humidity, wind_speed FROM districts WHERE name='$district'");
            if (!$result) {
                die("Select current data failed: " . $conn->error);
            }
            $currentData = null;
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $currentData = [
                    'temp' => $row['temp'],
                    'description' => $row['description'],
                    'humidity' => $row['humidity'],
                    'wind_speed' => $row['wind_speed']
                ];
            }
            
            $newData = generateRealisticWeather($district, $currentData);
            $stmt->bind_param("isids", $newData['temp'], $newData['description'], $newData['humidity'], $newData['wind_speed'], $district);
            if (!$stmt->execute()) {
                die("Update failed: " . $stmt->error);
            }
        }
        $stmt->close();
        
        // Get weather data
        if ($location == 'all_districts') {
            $result = $conn->query("SELECT name, temp, description, humidity, wind_speed, population, area FROM districts ORDER BY name");
            if (!$result) {
                die("All districts query failed: " . $conn->error);
            }
            $weatherData = [];
            while ($row = $result->fetch_assoc()) {
                $weatherData[$row['name']] = [
                    'temp' => $row['temp'],
                    'description' => $row['description'],
                    'humidity' => $row['humidity'],
                    'windSpeed' => $row['wind_speed'],
                    'population' => $row['population'],
                    'area' => $row['area']
                ];
            }
        } elseif (in_array($location, $sriLankanDistricts)) {
            $stmt = $conn->prepare("SELECT temp, description, humidity, wind_speed, population, area FROM districts WHERE name=?");
            if (!$stmt) {
                die("Single district prepare failed: " . $conn->error);
            }
            $stmt->bind_param("s", $location);
            if (!$stmt->execute()) {
                die("Single district execute failed: " . $stmt->error);
            }
            $temp = $description = $humidity = $wind_speed = $population = $area = null;
            $stmt->bind_result($temp, $description, $humidity, $wind_speed, $population, $area);
            if (!$stmt->fetch()) {
                die("No data found for district: $location");
            }
            $data = [
                'temp' => $temp,
                'description' => $description,
                'humidity' => $humidity,
                'windSpeed' => $wind_speed,
                'population' => $population,
                'area' => $area
            ];
            $stmt->close();
            $temperature = $data['temp'];
            $description = $data['description'];
            $humidity = $data['humidity'];
            $windSpeed = $data['windSpeed'];
            $population = $data['population'];
            $area = $data['area'];
        } else {
            $error = "Please select a valid location.";
        }
        
        $conn->close();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sri Lanka Weather Hub</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌤️ Sri Lanka Weather Hub</h1>
            <p>Realistic weather updates for all districts - Data updates gradually</p>
        </div>
        
        <form method="post" class="weather-form">
            <div class="form-group">
                <select name="location" id="location" required>
                    <option value="">Select Location</option>
                    <option value="all_districts" <?php if(isset($location) && $location == 'all_districts') echo 'selected'; ?>>All Sri Lankan Districts</option>
                    <?php foreach ($sriLankanDistricts as $district): ?>
                        <option value="<?php echo $district; ?>" <?php if(isset($location) && $location == $district) echo 'selected'; ?>>
                            <?php echo $district; ?> District
                        </option>
                    <?php endforeach; ?>
                </select>
                <button type="submit" class="btn-primary">
                    <span class="btn-text">Get Current Weather</span>
                    <span class="btn-loading">Loading...</span>
                </button>
            </div>
        </form>

        <?php if (isset($error)): ?>
            <div class="error-message">
                <span class="error-icon">⚠️</span>
                <?php echo $error; ?>
            </div>
        <?php elseif (isset($weatherData)): ?>
            <div class="weather-dashboard">
                <div class="dashboard-header">
                    <h2>🌍 Current Weather Across Sri Lanka</h2>
                    <div class="last-updated">
                        Last updated: <?php echo date('M j, Y g:i A'); ?>
                    </div>
                </div>
                <div class="weather-stats">
                    <div class="stat-card">
                        <div class="stat-icon">🌡️</div>
                        <div class="stat-value"><?php echo round(array_sum(array_column($weatherData, 'temp')) / count($weatherData), 1); ?>°C</div>
                        <div class="stat-label">Avg Temperature</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💧</div>
                        <div class="stat-value"><?php echo round(array_sum(array_column($weatherData, 'humidity')) / count($weatherData), 1); ?>%</div>
                        <div class="stat-label">Avg Humidity</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">💨</div>
                        <div class="stat-value"><?php echo round(array_sum(array_column($weatherData, 'windSpeed')) / count($weatherData), 1); ?> m/s</div>
                        <div class="stat-label">Avg Wind Speed</div>
                    </div>
                </div>
                <div class="table-container">
                    <table class="weather-table">
                        <thead>
                            <tr>
                                <th>District</th>
                                <th>Temperature</th>
                                <th>Weather</th>
                                <th>Humidity</th>
                                <th>Wind</th>
                                <th>Population</th>
                                <th>Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($weatherData as $district => $data): ?>
                                <tr class="weather-row">
                                    <td class="district-name"><?php echo $district; ?></td>
                                    <td class="temperature"><?php echo $data['temp']; ?>°C</td>
                                    <td class="weather-desc">
                                        <span class="weather-emoji"><?php echo getWeatherEmoji($data['description']); ?></span>
                                        <?php echo ucfirst($data['description']); ?>
                                    </td>
                                    <td class="humidity"><?php echo $data['humidity']; ?>%</td>
                                    <td class="wind"><?php echo $data['windSpeed']; ?> m/s</td>
                                    <td class="population"><?php echo number_format($data['population']); ?></td>
                                    <td class="area"><?php echo number_format($data['area']); ?> km²</td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        <?php elseif (isset($temperature)): ?>
            <div class="weather-card">
                <div class="card-header">
                    <h2>📍 Weather in <?php echo htmlspecialchars($location); ?> District</h2>
                    <div class="weather-emoji-large"><?php echo getWeatherEmoji($description); ?></div>
                </div>
                <div class="weather-details">
                    <div class="detail-item">
                        <span class="label">Temperature</span>
                        <span class="value"><?php echo $temperature; ?>°C</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Weather</span>
                        <span class="value"><?php echo ucfirst($description); ?></span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Humidity</span>
                        <span class="value"><?php echo $humidity; ?>%</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Wind Speed</span>
                        <span class="value"><?php echo $windSpeed; ?> m/s</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Population</span>
                        <span class="value"><?php echo number_format($population); ?></span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Area</span>
                        <span class="value"><?php echo number_format($area); ?> km²</span>
                    </div>
                </div>
                <div class="weather-note">
                    <small>💡 Weather changes gradually throughout the day for realistic simulation</small>
                </div>
            </div>
        <?php endif; ?>
        
        <div class="footer">
            <p>© 2024 Sri Lanka Weather Hub • Realistic Weather Simulation • Powered by MRH</p>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>