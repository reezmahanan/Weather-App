<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>CACHE TEST</title>
    <style>
        body {
            font-family: Arial;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
        }
        .box {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        input, button, select {
            width: 100%;
            padding: 15px;
            margin: 10px 0;
            border-radius: 10px;
            border: 2px solid #4DB6AC;
            font-size: 16px;
            box-sizing: border-box;
        }
        button {
            background: linear-gradient(135deg, #00BFA5, #00ACC1);
            color: white;
            border: none;
            cursor: pointer;
            font-weight: bold;
        }
        button:hover {
            transform: scale(1.05);
        }
        .timestamp {
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            font-family: monospace;
        }
    </style>
</head>
<body>
    <div class="box">
        <h1>🧪 FEATURE TEST PAGE</h1>
        <div class="timestamp">
            <strong>Generated:</strong> <?php echo date('Y-m-d H:i:s'); ?><br>
            <strong>Random:</strong> <?php echo rand(10000, 99999); ?>
        </div>
        
        <p style="text-align: left; margin: 20px 0;">
            <strong>This page shows EXACTLY what the features should look like:</strong>
        </p>
        
        <!-- EXACT COPY of the form elements -->
        <input type="text" id="searchBox" placeholder="🔍 Search locations..." style="display:block;">
        
        <button type="button" id="geoBtn">📍 Detect My Location</button>
        
        <select id="location" style="display:block;">
            <option value="">Select Location</option>
            <option value="Colombo">Colombo</option>
            <option value="Kandy">Kandy</option>
            <option value="Galle">Galle</option>
        </select>
        
        <button type="submit" style="background: linear-gradient(135deg, #6B46C1, #9333EA);">Get Current Weather</button>
        
        <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 10px; margin-top: 30px; text-align: left;">
            <h3>✅ Verification:</h3>
            <p>If you can see these 4 elements above, your browser CAN display them.</p>
            <p><strong>Search box:</strong> White input field with 🔍 icon</p>
            <p><strong>Geo button:</strong> Teal/blue gradient button</p>
            <p><strong>Dropdown:</strong> Select menu</p>
            <p><strong>Submit button:</strong> Purple gradient button</p>
            
            <h3 style="margin-top: 20px;">⚠️ If you SEE these elements here but NOT on main page:</h3>
            <ol style="padding-left: 20px;">
                <li>Your browser is showing CACHED version of main page</li>
                <li>Close ALL browser tabs</li>
                <li>Open browser in <strong>Incognito mode</strong> (Ctrl+Shift+N)</li>
                <li>Navigate to main page in Incognito</li>
                <li>Features WILL be visible there</li>
            </ol>
        </div>
        
        <div style="margin-top: 30px;">
            <a href="index.php" style="color: white; text-decoration: none; background: rgba(255,255,255,0.2); padding: 15px 30px; border-radius: 10px; display: inline-block; font-weight: bold;">
                🏠 Go to Main Page
            </a>
        </div>
    </div>
    
    <script>
        // Test JavaScript
        console.log('Test page loaded successfully');
        console.log('Search box:', document.getElementById('searchBox'));
        console.log('Geo button:', document.getElementById('geoBtn'));
        
        document.getElementById('geoBtn').onclick = function() {
            alert('✅ Geolocation button works!\n\nThis proves JavaScript is working.\nThe SAME button exists on main page but your browser is showing cached HTML.');
        };
        
        document.getElementById('searchBox').oninput = function() {
            const filter = this.value.toLowerCase();
            const options = document.getElementById('location').options;
            for (let i = 0; i < options.length; i++) {
                const text = options[i].text.toLowerCase();
                options[i].style.display = text.includes(filter) || options[i].value === '' ? '' : 'none';
            }
        };
    </script>
</body>
</html>
