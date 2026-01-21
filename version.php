<?php
// Force no cache
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("Content-Type: text/html; charset=utf-8");
?>
<!DOCTYPE html>
<html>
<head>
    <title>Version Check</title>
    <style>
        body { font-family: Arial; padding: 40px; background: #f0f0f0; }
        .box { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
        .success { color: green; font-size: 24px; font-weight: bold; }
        .error { color: red; font-size: 24px; font-weight: bold; }
        pre { background: #263238; color: #aed581; padding: 15px; border-radius: 5px; overflow: auto; }
        .btn { background: #4CAF50; color: white; padding: 12px 24px; border: none; border-radius: 5px; 
               font-size: 16px; cursor: pointer; text-decoration: none; display: inline-block; margin: 10px 5px; }
        .btn:hover { background: #45a049; }
    </style>
</head>
<body>
    <div class="box">
        <h1>🔍 Version Check</h1>
        <p><strong>Current Time:</strong> <?php echo date('Y-m-d H:i:s'); ?></p>
        
        <h2>File Status:</h2>
        <?php
        $indexFile = __DIR__ . '/index.php';
        if (file_exists($indexFile)) {
            $content = file_get_contents($indexFile);
            
            echo "<p class='success'>✅ index.php exists</p>";
            echo "<p><strong>File Size:</strong> " . number_format(strlen($content)) . " bytes</p>";
            echo "<p><strong>Last Modified:</strong> " . date('Y-m-d H:i:s', filemtime($indexFile)) . "</p>";
            
            // Check for key features
            $checks = [
                'Search Box' => 'id="searchBox"',
                'Geo Button' => 'id="geoBtn"',
                'Forecast Section' => 'forecast-section',
                'Weather Alerts' => 'alerts-section',
                'Charts' => 'temperatureChart',
                'Export Buttons' => 'exportToPDF',
                'Version Check' => 'VERSION CHECK: v2.0'
            ];
            
            echo "<h3>Feature Detection:</h3>";
            echo "<ul style='list-style: none; padding: 0;'>";
            foreach ($checks as $feature => $code) {
                $exists = strpos($content, $code) !== false;
                $icon = $exists ? '✅' : '❌';
                $class = $exists ? 'success' : 'error';
                echo "<li class='$class'>$icon <strong>$feature:</strong> " . ($exists ? 'Found' : 'NOT FOUND') . "</li>";
            }
            echo "</ul>";
            
            // Check for HTML encoding issues
            if (strpos($content, '&gt;') !== false || strpos($content, '&lt;') !== false) {
                echo "<p class='error'>⚠️ WARNING: HTML encoding issues detected!</p>";
            } else {
                echo "<p class='success'>✅ No HTML encoding issues</p>";
            }
            
        } else {
            echo "<p class='error'>❌ index.php not found!</p>";
        }
        ?>
        
        <h3>Browser Cache Test:</h3>
        <p>Random number (changes each refresh): <strong><?php echo rand(1000, 9999); ?></strong></p>
        <p>If this number doesn't change when you refresh, your browser is caching!</p>
        
        <h3>Solutions:</h3>
        <ol>
            <li><strong>Hard Refresh:</strong> Press <kbd>Ctrl + Shift + R</kbd> or <kbd>Ctrl + F5</kbd></li>
            <li><strong>Clear Cache:</strong> Press <kbd>Ctrl + Shift + Delete</kbd></li>
            <li><strong>Use Incognito:</strong> Press <kbd>Ctrl + Shift + N</kbd></li>
        </ol>
        
        <div style="text-align: center; margin-top: 20px;">
            <a href="index.php?nocache=<?php echo time(); ?>" class="btn">🏠 Go to Weather App</a>
            <a href="version.php?t=<?php echo time(); ?>" class="btn">🔄 Refresh This Page</a>
        </div>
        
        <h3>Quick Test:</h3>
        <p>Open index.php and press F12, then run this in console:</p>
        <pre>console.log('Search:', !!document.getElementById('searchBox'));
console.log('Geo:', !!document.getElementById('geoBtn'));</pre>
    </div>
</body>
</html>
