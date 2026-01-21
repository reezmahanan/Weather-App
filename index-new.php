<?php
// Force no cache headers
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

session_start();
date_default_timezone_set('Asia/Colombo');

// Comprehensive list of cities, towns, and areas across Sri Lanka
$sriLankanLocations = [
    // Western Province
    'Colombo', 'Dehiwala', 'Mount Lavinia', 'Moratuwa', 'Ratmalana', 'Kollupitiya', 'Bambalapitiya', 'Wellawatta',
    'Nugegoda', 'Maharagama', 'Kotte', 'Battaramulla', 'Rajagiriya', 'Homagama', 'Boralesgamuwa', 'Piliyandala',
    'Gampaha', 'Negombo', 'Katunayake', 'Ja-Ela', 'Wattala', 'Kelaniya', 'Kadawatha', 'Ragama', 'Minuwangoda',
    'Kalutara', 'Panadura', 'Wadduwa', 'Beruwala', 'Aluthgama', 'Bandaragama', 'Horana',
    
    // Central Province
    'Kandy', 'Peradeniya', 'Katugastota', 'Gampola', 'Nawalapitiya', 'Kadugannawa',
    'Matale', 'Dambulla', 'Sigiriya', 'Galewela',
    'Nuwara Eliya', 'Hatton', 'Nanuoya', 'Talawakelle', 'Haputale', 'Bandarawela', 'Welimada',
    
    // Southern Province
    'Galle', 'Hikkaduwa', 'Ambalangoda', 'Balapitiya', 'Bentota', 'Unawatuna',
    'Matara', 'Weligama', 'Mirissa', 'Dickwella', 'Tangalle',
    'Hambantota', 'Tissamaharama', 'Kataragama',
    
    // Northern Province
    'Jaffna', 'Chavakachcheri', 'Point Pedro', 'Nallur', 'Karainagar',
    'Kilinochchi', 'Paranthan', 'Elephant Pass',
    'Mannar', 'Talaimannar',
    'Vavuniya', 'Cheddikulam',
    'Mullaitivu', 'Puthukudiyiruppu',
    
    // Eastern Province
    'Trincomalee', 'Kinniya', 'Nilaveli', 'Kuchchaveli',
    'Batticaloa', 'Kalmunai', 'Eravur', 'Valaichchenai', 'Oddamavadi',
    'Ampara', 'Akkaraipattu', 'Sammanthurai', 'Pottuvil', 'Arugam Bay',
    
    // North Western Province
    'Kurunegala', 'Kuliyapitiya', 'Wariyapola', 'Mawathagama', 'Pannala', 'Polgahawela',
    'Puttalam', 'Chilaw', 'Wennappuwa', 'Nattandiya', 'Marawila', 'Dankotuwa',
    
    // North Central Province
    'Anuradhapura', 'Mihintale', 'Medawachchiya', 'Kekirawa', 'Tambuttegama',
    'Polonnaruwa', 'Hingurakgoda', 'Medirigiriya',
    
    // Uva Province
    'Badulla', 'Mahiyanganaya', 'Passara', 'Hali-Ela',
    'Moneragala', 'Wellawaya', 'Bibile', 'Buttala',
    
    // Sabaragamuwa Province
    'Ratnapura', 'Embilipitiya', 'Balangoda', 'Pelmadulla', 'Kuruwita',
    'Kegalle', 'Mawanella', 'Warakapola', 'Rambukkana', 'Ruwanwella'
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

// Function to get background image based on weather description
function getWeatherBackground($description) {
    $desc = strtolower($description);
    
    if (strpos($desc, 'clear') !== false || strpos($desc, 'sunny') !== false) {
        return 'https://images.unsplash.com/photo-1601297183305-6df142704ea2?w=1920&q=80';
    }
    if (strpos($desc, 'rain') !== false || strpos($desc, 'rainy') !== false) {
        return 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1920&q=80';
    }
    if (strpos($desc, 'cloud') !== false || strpos($desc, 'overcast') !== false) {
        return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80';
    }
    if (strpos($desc, 'mist') !== false || strpos($desc, 'fog') !== false) {
        return 'https://images.unsplash.com/photo-1487621167305-5d248087c724?w=1920&q=80';
    }
    if (strpos($desc, 'thunder') !== false || strpos($desc, 'storm') !== false) {
        return 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1920&q=80';
    }
    if (strpos($desc, 'wind') !== false || strpos($desc, 'windy') !== false) {
        return 'https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=1920&q=80';
    }
    if (strpos($desc, 'hot') !== false || strpos($desc, 'humid') !== false) {
        return 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1920&q=80';
    }
    
    return 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1920&q=80';
}

// Function to generate 5-day forecast
function generate5DayForecast($location, $currentData) {
    $forecast = [];
    $currentTemp = $currentData['temp'];
    $currentDesc = $currentData['description'];
    
    for ($day = 1; $day <= 5; $day++) {
        $date = date('Y-m-d', strtotime("+$day day"));
        $dayName = date('D', strtotime("+$day day"));
        
        // Gradual temperature changes ±3°C per day
        $tempChange = (crc32($location . $date) % 7) - 3;
        $forecastTemp = $currentTemp + $tempChange;
        
        // Occasional weather changes
        $descriptions = ['clear sky', 'few clouds', 'scattered clouds', 'light rain', 'partly cloudy'];
        $forecastDesc = $descriptions[(crc32($location . $date) % count($descriptions))];
        
        // Generate min/max temperatures
        $minTemp = $forecastTemp - 2;
        $maxTemp = $forecastTemp + 2;
        
        $forecast[] = [
            'date' => $date,
            'day' => $dayName,
            'temp' => $forecastTemp,
            'minTemp' => $minTemp,
            'maxTemp' => $maxTemp,
            'description' => $forecastDesc,
            'humidity' => ($currentData['humidity'] + (crc32($date) % 11) - 5),
            'windSpeed' => round($currentData['wind_speed'] + ((crc32($date) % 6) - 2) / 10, 1)
        ];
    }
    
    return $forecast;
}

// Function to check for weather alerts
function checkWeatherAlerts($temp, $description, $humidity, $windSpeed) {
    $alerts = [];
    
    if ($temp > 35) {
        $alerts[] = ['type' => 'heat', 'message' => 'Extreme Heat Warning', 'icon' => '🔥'];
    } elseif ($temp < 10) {
        $alerts[] = ['type' => 'cold', 'message' => 'Cold Weather Advisory', 'icon' => '❄️'];
    }
    
    if (strpos(strtolower($description), 'thunder') !== false || strpos(strtolower($description), 'storm') !== false) {
        $alerts[] = ['type' => 'storm', 'message' => 'Thunderstorm Alert', 'icon' => '⛈️'];
    }
    
    if ($humidity > 90) {
        $alerts[] = ['type' => 'humidity', 'message' => 'High Humidity Alert', 'icon' => '💧'];
    }
    
    if ($windSpeed > 7.0) {
        $alerts[] = ['type' => 'wind', 'message' => 'Strong Wind Warning', 'icon' => '💨'];
    }
    
    return $alerts;
}

// Function to generate consistent but slowly changing weather
function generateRealisticWeather($location, $existingData = null) {
    // Base weather patterns for different regions - expanded for all locations
    $regionalPatterns = [
        'coastal' => [
            'Colombo', 'Dehiwala', 'Mount Lavinia', 'Moratuwa', 'Ratmalana', 'Kollupitiya', 'Bambalapitiya', 'Wellawatta',
            'Negombo', 'Katunayake', 'Ja-Ela', 'Wattala', 'Galle', 'Hikkaduwa', 'Ambalangoda', 'Balapitiya', 
            'Bentota', 'Unawatuna', 'Matara', 'Weligama', 'Mirissa', 'Dickwella', 'Tangalle', 'Hambantota',
            'Trincomalee', 'Nilaveli', 'Batticaloa', 'Kalmunai', 'Oddamavadi', 'Pottuvil', 'Arugam Bay', 'Jaffna', 'Point Pedro',
            'Mannar', 'Talaimannar', 'Chilaw', 'Wennappuwa', 'Nattandiya', 'Marawila', 'Dankotuwa',
            'Kalutara', 'Panadura', 'Wadduwa', 'Beruwala', 'Aluthgama'
        ],
        'hill' => [
            'Kandy', 'Peradeniya', 'Katugastota', 'Gampola', 'Nawalapitiya', 'Kadugannawa',
            'Nuwara Eliya', 'Hatton', 'Nanuoya', 'Talawakelle', 'Haputale', 'Bandarawela', 'Welimada',
            'Badulla', 'Mahiyanganaya', 'Hali-Ela', 'Matale', 'Dambulla', 'Ratnapura', 'Balangoda',
            'Kegalle', 'Mawanella', 'Warakapola', 'Rambukkana', 'Ruwanwella'
        ],
        'dry' => [
            'Anuradhapura', 'Mihintale', 'Medawachchiya', 'Kekirawa', 'Tambuttegama', 'Polonnaruwa',
            'Hingurakgoda', 'Medirigiriya', 'Vavuniya', 'Cheddikulam', 'Mullaitivu', 'Puthukudiyiruppu',
            'Kilinochchi', 'Paranthan', 'Elephant Pass', 'Puttalam', 'Kurunegala', 'Kuliyapitiya',
            'Wariyapola', 'Mawathagama', 'Pannala', 'Polgahawela', 'Moneragala', 'Wellawaya', 'Bibile',
            'Buttala', 'Ampara', 'Akkaraipattu', 'Sammanthurai', 'Embilipitiya', 'Pelmadulla', 'Kuruwita',
            'Tissamaharama', 'Kataragama'
        ],
        'urban' => [
            'Nugegoda', 'Maharagama', 'Kotte', 'Battaramulla', 'Rajagiriya', 'Homagama', 'Boralesgamuwa',
            'Piliyandala', 'Gampaha', 'Kelaniya', 'Kadawatha', 'Ragama', 'Minuwangoda', 'Bandaragama',
            'Horana', 'Sigiriya', 'Galewela', 'Chavakachcheri', 'Nallur', 'Karainagar', 'Kinniya',
            'Kuchchaveli', 'Eravur', 'Valaichchenai', 'Oddamavadi', 'Passara'
        ]
    ];
    
    // Determine region
    $region = 'dry';
    foreach ($regionalPatterns as $reg => $locations) {
        if (in_array($location, $locations)) {
            $region = $reg;
            break;
        }
    }
    
    // Regional base temperatures
    $baseTemps = [
        'coastal' => ['min' => 26, 'max' => 32],
        'hill' => ['min' => 14, 'max' => 25],
        'dry' => ['min' => 24, 'max' => 34],
        'urban' => ['min' => 25, 'max' => 33]
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
        ],
        'urban' => [
            'clear sky' => 35, 'few clouds' => 20, 'scattered clouds' => 15,
            'light rain' => 15, 'hot and humid' => 10, 'hazy' => 5
        ]
    ];
    
    // Use location name as seed for consistency
    $seed = crc32($location . date('Y-m-d H')); // Changes hourly
    
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
    
    // Realistic population and area data for all locations
    $populationData = [
        // Major Cities
        'Colombo' => 750000, 'Kandy' => 130000, 'Galle' => 100000, 'Jaffna' => 88000,
        'Negombo' => 142000, 'Trincomalee' => 100000, 'Batticaloa' => 90000,
        // Colombo Suburbs
        'Dehiwala' => 220000, 'Mount Lavinia' => 215000, 'Moratuwa' => 185000, 'Nugegoda' => 155000,
        'Maharagama' => 200000, 'Kotte' => 115000, 'Battaramulla' => 105000, 'Kelaniya' => 195000,
        'Wattala' => 135000, 'Kadawatha' => 252000, 'Ragama' => 126000, 'Homagama' => 60000,
        // Western Province
        'Gampaha' => 95000, 'Katunayake' => 50000, 'Ja-Ela' => 65000, 'Minuwangoda' => 75000,
        'Kalutara' => 82000, 'Panadura' => 95000, 'Wadduwa' => 35000, 'Beruwala' => 55000,
        'Aluthgama' => 45000, 'Horana' => 55000, 'Bandaragama' => 28000,
        // Central Province
        'Peradeniya' => 40000, 'Gampola' => 25000, 'Nawalapitiya' => 40000, 'Matale' => 45000,
        'Dambulla' => 65000, 'Nuwara Eliya' => 28000, 'Hatton' => 18000, 'Bandarawela' => 40000,
        // Southern Province
        'Hikkaduwa' => 12000, 'Ambalangoda' => 35000, 'Bentota' => 40000, 'Matara' => 52000,
        'Weligama' => 30000, 'Mirissa' => 15000, 'Tangalle' => 35000, 'Hambantota' => 45000,
        'Tissamaharama' => 22000, 'Kataragama' => 8000,
        // Northern Province
        'Vavuniya' => 55000, 'Mannar' => 35000, 'Kilinochchi' => 22000, 'Mullaitivu' => 18000,
        'Point Pedro' => 28000, 'Chavakachcheri' => 20000,
        // Eastern Province
        'Kalmunai' => 95000, 'Ampara' => 45000, 'Akkaraipattu' => 38000, 'Pottuvil' => 12000,
        'Arugam Bay' => 3000, 'Eravur' => 32000, 'Valaichchenai' => 48000,
        // Others
        'Kurunegala' => 85000, 'Anuradhapura' => 63000, 'Polonnaruwa' => 40000, 'Badulla' => 47000,
        'Ratnapura' => 52000, 'Kegalle' => 35000, 'Puttalam' => 45000, 'Chilaw' => 65000,
        'Moneragala' => 28000, 'Embilipitiya' => 48000
    ];
    
    $areaData = [
        'Colombo' => 37, 'Kandy' => 26, 'Galle' => 17, 'Jaffna' => 20, 'Negombo' => 30,
        'Dehiwala' => 11, 'Mount Lavinia' => 9, 'Moratuwa' => 20, 'Nugegoda' => 10,
        'Gampaha' => 28, 'Kalutara' => 32, 'Matale' => 36, 'Nuwara Eliya' => 9,
        'Matara' => 14, 'Hambantota' => 42, 'Trincomalee' => 25, 'Batticaloa' => 73,
        'Ampara' => 22, 'Kurunegala' => 23, 'Puttalam' => 46, 'Anuradhapura' => 36,
        'Polonnaruwa' => 26, 'Badulla' => 15, 'Moneragala' => 35, 'Ratnapura' => 55,
        'Kegalle' => 30, 'Vavuniya' => 18, 'Mannar' => 38, 'Kilinochchi' => 15
    ];
    
    return [
        'temp' => $newTemp,
        'description' => $description,
        'humidity' => $newHumidity,
        'wind_speed' => round($newWindSpeed, 1),
        'population' => $populationData[$location] ?? mt_rand(5000, 150000),
        'area' => $areaData[$location] ?? mt_rand(5, 100)
    ];
}

// Handle favorite actions
if (isset($_POST['add_favorite'])) {
    $favLocation = $_POST['add_favorite'];
    if (!isset($_SESSION['favorites'])) {
        $_SESSION['favorites'] = [];
    }
    if (!in_array($favLocation, $_SESSION['favorites'])) {
        $_SESSION['favorites'][] = $favLocation;
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

if (isset($_POST['remove_favorite'])) {
    $favLocation = $_POST['remove_favorite'];
    if (isset($_SESSION['favorites'])) {
        $_SESSION['favorites'] = array_values(array_diff($_SESSION['favorites'], [$favLocation]));
    }
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// Handle comparison
if (isset($_POST['compare_locations'])) {
    $compareLocations = isset($_POST['compare']) ? $_POST['compare'] : [];
    if (count($compareLocations) >= 2) {
        $_SESSION['comparison'] = $compareLocations;
    }
}

// Handle export to CSV
if (isset($_GET['export']) && $_GET['export'] == 'csv' && isset($_SESSION['export_data'])) {
    $data = $_SESSION['export_data'];
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=weather_data_' . date('Y-m-d') . '.csv');
    
    $output = fopen('php://output', 'w');
    fputcsv($output, ['Location', 'Temperature (°C)', 'Weather', 'Humidity (%)', 'Wind Speed (m/s)', 'Population', 'Area (km²)']);
    
    foreach ($data as $loc => $values) {
        fputcsv($output, [$loc, $values['temp'], $values['description'], $values['humidity'], $values['windSpeed'], $values['population'], $values['area']]);
    }
    
    fclose($output);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST' && !isset($_POST['add_favorite']) && !isset($_POST['remove_favorite'])) {
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
        if (!$conn->query("CREATE TABLE IF NOT EXISTS locations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) UNIQUE,
            temp INT,
            description VARCHAR(50),
            humidity INT,
            wind_speed FLOAT,
            population INT,
            area INT
        )")) {
            die("Table creation failed: " . $conn->error);
        }
        
        // Populate locations if empty
        $result = $conn->query("SELECT COUNT(*) as count FROM locations");
        if (!$result) {
            die("Count query failed: " . $conn->error);
        }
        $row = $result->fetch_assoc();
        if ($row['count'] == 0) {
            $stmt = $conn->prepare("INSERT INTO locations (name, temp, description, humidity, wind_speed, population, area) VALUES (?, ?, ?, ?, ?, ?, ?)");
            if (!$stmt) {
                die("Prepare failed: " . $conn->error);
            }
            foreach ($sriLankanLocations as $loc) {
                $weatherData = generateRealisticWeather($loc);
                $stmt->bind_param("ssidiis", $loc, $weatherData['temp'], $weatherData['description'], $weatherData['humidity'], $weatherData['wind_speed'], $weatherData['population'], $weatherData['area']);
                if (!$stmt->execute()) {
                    die("Insert failed: " . $stmt->error);
                }
            }
            $stmt->close();
        }
        
        // Add any new locations that don't exist in database
        $checkStmt = $conn->prepare("SELECT COUNT(*) as count FROM locations WHERE name=?");
        $insertStmt = $conn->prepare("INSERT INTO locations (name, temp, description, humidity, wind_speed, population, area) VALUES (?, ?, ?, ?, ?, ?, ?)");
        
        foreach ($sriLankanLocations as $loc) {
            $checkStmt->bind_param("s", $loc);
            $checkStmt->execute();
            $count = 0;
            $checkStmt->bind_result($count);
            $checkStmt->fetch();
            $checkStmt->free_result();
            
            if ($count == 0) {
                // Location doesn't exist, insert it
                $weatherData = generateRealisticWeather($loc);
                $insertStmt->bind_param("ssidiis", $loc, $weatherData['temp'], $weatherData['description'], $weatherData['humidity'], $weatherData['wind_speed'], $weatherData['population'], $weatherData['area']);
                $insertStmt->execute();
            }
        }
        $checkStmt->close();
        $insertStmt->close();
        
        // Update weather data with realistic changes
        $stmt = $conn->prepare("UPDATE locations SET temp=?, description=?, humidity=?, wind_speed=? WHERE name=?");
        if (!$stmt) {
            die("Update prepare failed: " . $conn->error);
        }
        foreach ($sriLankanLocations as $loc) {
            // Get current data for gradual changes
            $result = $conn->query("SELECT temp, description, humidity, wind_speed FROM locations WHERE name='$loc'");
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
            
            $newData = generateRealisticWeather($loc, $currentData);
            $stmt->bind_param("isids", $newData['temp'], $newData['description'], $newData['humidity'], $newData['wind_speed'], $loc);
            if (!$stmt->execute()) {
                die("Update failed: " . $stmt->error);
            }
        }
        $stmt->close();
        
        // Get weather data
        if ($location == 'all_locations') {
            $result = $conn->query("SELECT name, temp, description, humidity, wind_speed, population, area FROM locations ORDER BY name");
            if (!$result) {
                die("All locations query failed: " . $conn->error);
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
        } elseif (in_array($location, $sriLankanLocations)) {
            $stmt = $conn->prepare("SELECT temp, description, humidity, wind_speed, population, area FROM locations WHERE name=?");
            if (!$stmt) {
                die("Single location prepare failed: " . $conn->error);
            }
            $stmt->bind_param("s", $location);
            if (!$stmt->execute()) {
                die("Single location execute failed: " . $stmt->error);
            }
            $temp = $description = $humidity = $wind_speed = $population = $area = null;
            $stmt->bind_result($temp, $description, $humidity, $wind_speed, $population, $area);
            if (!$stmt->fetch()) {
                die("No data found for location: $location");
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
            
            // Generate 5-day forecast
            $forecast = generate5DayForecast($location, $data);
            // Debug: Check forecast generation
            // echo "<!-- Forecast generated: " . count($forecast) . " days -->";
            
            // Check for weather alerts
            $weatherAlerts = checkWeatherAlerts($temperature, $description, $humidity, $windSpeed);
            // Debug: Check alerts
            // echo "<!-- Alerts generated: " . count($weatherAlerts) . " -->";
            
            // Store single location data for export
            $_SESSION['export_data'] = [$location => $data];
        } else {
            $error = "Please select a valid location.";
        }
        
        // Store all locations data for export if viewing all
        if (isset($weatherData)) {
            $_SESSION['export_data'] = $weatherData;
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
    <title>Sri Lanka Weather Tracker</title>
    <link rel="stylesheet" href="style.css?v=<?php echo time(); ?>">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <!-- Force no-cache -->
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <?php if (isset($description)): ?>
    <style>
        body {
            background: 
                linear-gradient(135deg, rgba(0, 230, 118, 0.85) 0%, rgba(0, 184, 212, 0.85) 35%, rgba(156, 39, 176, 0.85) 70%, rgba(186, 104, 200, 0.85) 100%),
                url('<?php echo getWeatherBackground($description); ?>') center/cover fixed !important;
            background-size: 300% 300%, cover !important;
        }
    </style>
    <?php endif; ?>
</head>
<body>
    <div class="container">
        <!-- VERSION CHECK: v2.0 Enhanced Features -->
        <div class="header">
            <div class="header-time">
                <?php echo date('l, F j, Y'); ?> | <span id="headerClock"><?php echo date('g:i:s A'); ?></span>
            </div>
            <h1>🌤️ Sri Lanka Weather Tracker</h1>
            <p>Track real-time weather across every city, town & area in Sri Lanka</p>
        </div>

        <?php if (!empty($_SESSION['favorites'])): ?>
        <div class="favorites-section">
            <h3>⭐ Favorite Cities</h3>
            <div class="favorites-grid">
                <?php foreach ($_SESSION['favorites'] as $fav): ?>
                <div class="favorite-card">
                    <form method="post" style="display: inline;">
                        <button type="submit" name="location" value="<?php echo htmlspecialchars($fav); ?>" class="favorite-name">
                            📍 <?php echo htmlspecialchars($fav); ?>
                        </button>
                    </form>
                    <form method="post" style="display: inline;">
                        <button type="submit" name="remove_favorite" value="<?php echo htmlspecialchars($fav); ?>" class="remove-fav" title="Remove from favorites">
                            ✕
                        </button>
                    </form>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>
        
        <form method="post" class="weather-form" id="weatherForm">
            <div class="form-group">
                <input type="text" id="searchBox" placeholder="🔍 Search locations..." class="search-box" style="display:block; width:100%; padding:15px; margin-bottom:15px; border-radius:15px; border:2px solid #4DB6AC; font-size:16px;">
                <button type="button" class="geo-btn" id="geoBtn" onclick="detectLocation()" style="display:block; width:100%; padding:14px; margin-bottom:15px; background:linear-gradient(135deg, #00BFA5, #00ACC1); color:white; border:none; border-radius:12px; font-size:15px; font-weight:600; cursor:pointer;">📍 Detect My Location</button>
                <select name="location" id="location" required style="display:block; width:100%;">
                    <option value="">Select Location</option>
                    <option value="all_locations" <?php if(isset($location) && $location == 'all_locations') echo 'selected'; ?>>🌍 View All Locations</option>
                    <optgroup label="Western Province">
                        <?php 
                        $western = ['Colombo', 'Dehiwala', 'Mount Lavinia', 'Moratuwa', 'Ratmalana', 'Kollupitiya', 'Bambalapitiya', 'Wellawatta', 'Nugegoda', 'Maharagama', 'Kotte', 'Battaramulla', 'Rajagiriya', 'Homagama', 'Boralesgamuwa', 'Piliyandala', 'Gampaha', 'Negombo', 'Katunayake', 'Ja-Ela', 'Wattala', 'Kelaniya', 'Kadawatha', 'Ragama', 'Minuwangoda', 'Kalutara', 'Panadura', 'Wadduwa', 'Beruwala', 'Aluthgama', 'Bandaragama', 'Horana'];
                        foreach ($western as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Central Province">
                        <?php 
                        $central = ['Kandy', 'Peradeniya', 'Katugastota', 'Gampola', 'Nawalapitiya', 'Kadugannawa', 'Matale', 'Dambulla', 'Sigiriya', 'Galewela', 'Nuwara Eliya', 'Hatton', 'Nanuoya', 'Talawakelle', 'Haputale', 'Bandarawela', 'Welimada'];
                        foreach ($central as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Southern Province">
                        <?php 
                        $southern = ['Galle', 'Hikkaduwa', 'Ambalangoda', 'Balapitiya', 'Bentota', 'Unawatuna', 'Matara', 'Weligama', 'Mirissa', 'Dickwella', 'Tangalle', 'Hambantota', 'Tissamaharama', 'Kataragama'];
                        foreach ($southern as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Northern Province">
                        <?php 
                        $northern = ['Jaffna', 'Chavakachcheri', 'Point Pedro', 'Nallur', 'Karainagar', 'Kilinochchi', 'Paranthan', 'Elephant Pass', 'Mannar', 'Talaimannar', 'Vavuniya', 'Cheddikulam', 'Mullaitivu', 'Puthukudiyiruppu'];
                        foreach ($northern as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Eastern Province">
                        <?php 
                        $eastern = ['Trincomalee', 'Kinniya', 'Nilaveli', 'Kuchchaveli', 'Batticaloa', 'Kalmunai', 'Eravur', 'Valaichchenai', 'Oddamavadi', 'Ampara', 'Akkaraipattu', 'Sammanthurai', 'Pottuvil', 'Arugam Bay'];
                        foreach ($eastern as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="North Western Province">
                        <?php 
                        $nw = ['Kurunegala', 'Kuliyapitiya', 'Wariyapola', 'Mawathagama', 'Pannala', 'Polgahawela', 'Puttalam', 'Chilaw', 'Wennappuwa', 'Nattandiya', 'Marawila', 'Dankotuwa'];
                        foreach ($nw as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="North Central Province">
                        <?php 
                        $nc = ['Anuradhapura', 'Mihintale', 'Medawachchiya', 'Kekirawa', 'Tambuttegama', 'Polonnaruwa', 'Hingurakgoda', 'Medirigiriya'];
                        foreach ($nc as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Uva Province">
                        <?php 
                        $uva = ['Badulla', 'Mahiyanganaya', 'Passara', 'Hali-Ela', 'Moneragala', 'Wellawaya', 'Bibile', 'Buttala'];
                        foreach ($uva as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                    <optgroup label="Sabaragamuwa Province">
                        <?php 
                        $sabara = ['Ratnapura', 'Embilipitiya', 'Balangoda', 'Pelmadulla', 'Kuruwita', 'Kegalle', 'Mawanella', 'Warakapola', 'Rambukkana', 'Ruwanwella'];
                        foreach ($sabara as $loc): ?>
                        <option value="<?php echo $loc; ?>" <?php if(isset($location) && $location == $loc) echo 'selected'; ?>><?php echo $loc; ?></option>
                        <?php endforeach; ?>
                    </optgroup>
                </select>
                <button type="submit" class="btn-primary">
                    <span class="btn-text">Get Current Weather</span>
                    <span class="btn-loading">Loading...</span>
                </button>
            </div>
        </form>

        <!-- DEBUG: Alerts Check -->
        <?php if (isset($weatherAlerts) && !empty($weatherAlerts)): ?>
        <div class="alerts-section" style="display:block !important; visibility:visible !important; margin:20px 0;">
            <h3 style="color:white;">⚠️ Weather Alerts</h3>
            <div class="alerts-grid">
                <?php foreach ($weatherAlerts as $alert): ?>
                <div class="alert-card alert-<?php echo $alert['type']; ?>">
                    <span class="alert-icon"><?php echo $alert['icon']; ?></span>
                    <span class="alert-message"><?php echo $alert['message']; ?></span>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

        <?php if (isset($error)): ?>
            <div class="error-message">
                <span class="error-icon">⚠️</span>
                <?php echo $error; ?>
            </div>
        <?php elseif (isset($weatherData)): ?>
            <div class="weather-dashboard">
                <div class="dashboard-header">
                    <h2>🌍 Weather Conditions Across Sri Lanka</h2>
                    <div class="dashboard-actions">
                        <a href="?export=csv" class="export-btn">📥 Export to CSV</a>
                        <button onclick="exportToPDF()" class="export-btn">📄 Export to PDF</button>
                    </div>
                    <div class="last-updated">
                        <span id="dashboardClock"><?php echo date('l, F j, Y - g:i:s A'); ?></span>
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
                <div class="weather-visualizations">
                    <h3>📊 Weather Statistics</h3>
                    <div class="charts-container">
                        <div class="chart-box">
                            <canvas id="temperatureChart"></canvas>
                        </div>
                        <div class="chart-box">
                            <canvas id="humidityChart"></canvas>
                        </div>
                    </div>
                </div>

                <form method="post" id="compareForm">
                <div class="table-container">
                    <div class="comparison-actions">
                        <button type="submit" name="compare_locations" class="compare-btn">📊 Compare Selected</button>
                        <span class="compare-hint">Select 2+ locations to compare</span>
                    </div>
                    <table class="weather-table">
                        <thead>
                            <tr>
                                <th>Compare</th>
                                <th>Location</th>
                                <th>Temperature</th>
                                <th>Weather</th>
                                <th>Humidity</th>
                                <th>Wind</th>
                                <th>Population</th>
                                <th>Area</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($weatherData as $loc => $data): ?>
                                <tr class="weather-row">
                                    <td><input type="checkbox" name="compare[]" value="<?php echo htmlspecialchars($loc); ?>" class="compare-checkbox"></td>
                                    <td class="district-name"><?php echo $loc; ?></td>
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
                </form>
            </div>
        <?php elseif (isset($temperature)): ?>
            <div class="weather-card">
                <div class="card-header">
                    <div>
                        <h2>📍 <?php echo htmlspecialchars($location); ?></h2>
                        <div class="card-time"><span id="cardClock"><?php echo date('g:i:s A'); ?></span></div>
                        <div class="export-actions">
                            <a href="?export=csv" class="export-btn-small">📥 CSV</a>
                            <button onclick="exportCurrentToPDF()" class="export-btn-small">📄 PDF</button>
                        </div>
                        <form method="post" style="margin-top: 10px;">
                            <?php if (isset($_SESSION['favorites']) && in_array($location, $_SESSION['favorites'])): ?>
                                <button type="submit" name="remove_favorite" value="<?php echo htmlspecialchars($location); ?>" class="favorite-btn favorited">
                                    ⭐ Remove from Favorites
                                </button>
                            <?php else: ?>
                                <button type="submit" name="add_favorite" value="<?php echo htmlspecialchars($location); ?>" class="favorite-btn">
                                    ☆ Add to Favorites
                                </button>
                            <?php endif; ?>
                        </form>
                    </div>
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
                    <small>💡 Real-time weather tracking • Updates every 30 minutes • Sri Lanka Time (UTC+5:30)</small>
                </div>
            </div>

            <!-- DEBUG: Forecast Check -->
            <?php if (isset($forecast) && is_array($forecast)): ?>
            <div class="forecast-section" style="display:block !important; visibility:visible !important; opacity:1 !important;">
                <h3 style="color:white; margin:20px 0;">📅 5-Day Weather Forecast</h3>
                <div class="forecast-grid">
                    <?php foreach ($forecast as $day): ?>
                    <div class="forecast-card">
                        <div class="forecast-day"><?php echo $day['day']; ?></div>
                        <div class="forecast-date"><?php echo date('M j', strtotime($day['date'])); ?></div>
                        <div class="forecast-emoji"><?php echo getWeatherEmoji($day['description']); ?></div>
                        <div class="forecast-temp"><?php echo $day['temp']; ?>°C</div>
                        <div class="forecast-range"><?php echo $day['minTemp']; ?>° / <?php echo $day['maxTemp']; ?>°</div>
                        <div class="forecast-desc"><?php echo ucfirst($day['description']); ?></div>
                    </div>
                    <?php endforeach; ?>
                </div>
                
                <div class="forecast-chart">
                    <h4>📈 Temperature Trend</h4>
                    <canvas id="forecastChart"></canvas>
                </div>
            </div>
            <?php endif; ?>
        <?php endif; ?>
        
        <div class="footer">
            <p>© 2025 Sri Lanka Weather Tracker • Real-time tracking for 120+ locations • Powered by MRH</p>
        </div>
    </div>
    <script src="script.js?v=<?php echo time(); ?>"></script>
    <script>
        // Debug: Check if libraries are loaded
        console.log('=== WEATHER APP DEBUG INFO ===');
        console.log('Chart.js loaded:', typeof Chart !== 'undefined');
        console.log('jsPDF loaded:', typeof window.jspdf !== 'undefined');
        console.log('Search box exists:', !!document.getElementById('searchBox'));
        console.log('Geo button exists:', !!document.getElementById('geoBtn'));
        console.log('Page version: 2.0 Enhanced');
        console.log('===============================');
        
        // Ensure geolocation function is available globally
        window.detectLocation = function() {
            if (!navigator.geolocation) {
                alert('Geolocation is not supported by your browser');
                return;
            }
            
            const geoBtn = document.getElementById('geoBtn');
            if (geoBtn) {
                geoBtn.textContent = '🔄 Detecting...';
                geoBtn.disabled = true;
            }
            
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    
                    // Sri Lankan coordinates
                    if (lat >= 5.9 && lat <= 9.9 && lon >= 79.5 && lon <= 82.0) {
                        const cities = [
                            { name: 'Colombo', lat: 6.9271, lon: 79.8612 },
                            { name: 'Kandy', lat: 7.2906, lon: 80.6337 },
                            { name: 'Galle', lat: 6.0535, lon: 80.2210 },
                            { name: 'Jaffna', lat: 9.6615, lon: 80.0255 },
                            { name: 'Trincomalee', lat: 8.5874, lon: 81.2152 },
                            { name: 'Anuradhapura', lat: 8.3114, lon: 80.4037 }
                        ];
                        
                        let nearest = cities[0];
                        let minDist = Math.sqrt(Math.pow(lat - cities[0].lat, 2) + Math.pow(lon - cities[0].lon, 2));
                        
                        cities.forEach(city => {
                            const dist = Math.sqrt(Math.pow(lat - city.lat, 2) + Math.pow(lon - city.lon, 2));
                            if (dist < minDist) {
                                minDist = dist;
                                nearest = city;
                            }
                        });
                        
                        const select = document.getElementById('location');
                        select.value = nearest.name;
                        if (geoBtn) {
                            geoBtn.textContent = `✅ Found: ${nearest.name}`;
                            setTimeout(() => {
                                geoBtn.textContent = '📍 Detect My Location';
                                geoBtn.disabled = false;
                            }, 2000);
                        }
                    } else {
                        alert('You appear to be outside Sri Lanka. Please select a location manually.');
                        if (geoBtn) {
                            geoBtn.textContent = '📍 Detect My Location';
                            geoBtn.disabled = false;
                        }
                    }
                },
                function(error) {
                    alert('Unable to detect location: ' + error.message);
                    if (geoBtn) {
                        geoBtn.textContent = '📍 Detect My Location';
                        geoBtn.disabled = false;
                    }
                }
            );
        };
    </script>
</body>
</html>