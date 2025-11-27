# Sri Lanka Weather Hub

A beautiful and responsive weather application built with PHP, JavaScript, and CSS specifically for Sri Lankan districts.

## ✨ Features

- **Complete Sri Lankan Coverage**: All 25 districts with real-time weather data
- **Modern UI/UX**: Gradient backgrounds, smooth animations, and responsive design
- **Realistic Weather Simulation**: Weather changes gradually throughout the day based on regional patterns
- **Dynamic Data**: Weather data updates realistically on each request with gradual changes
- **XAMPP Ready**: Configured for XAMPP with port 3307
- **Weather Emojis**: Visual weather representations with emojis
- **District Information**: Population and area data for each district
- **Mobile Responsive**: Works perfectly on all device sizes

## 🛠️ Setup Instructions

### XAMPP Configuration (Port 3307)

1. **Start XAMPP Control Panel**
2. **Configure MySQL Port:**
   - Click "Config" next to MySQL
   - Select "my.ini"
   - Find `port = 3306` and change to `port = 3307`
   - Save and restart MySQL

3. **Start Services:**
   - Start Apache and MySQL from XAMPP Control Panel

4. **Place Files:**
   - Copy all files to `htdocs/weather app/` folder (note the space)

5. **Access Application:**
   - Open browser and go to `http://localhost/weather%20app/`

6. **Database Setup:**
   - The app automatically creates the 'weather_app' database and 'districts' table
   - If root password is set in XAMPP, update `$pass` in `index.php`

## 📁 File Structure
weather app/
├── index.php # Main application file
├── style.css # Modern CSS styles
├── script.js # Enhanced JavaScript
└── README.md # Documentation

## 🎨 Design Features

- **Modern Gradient Backgrounds**
- **Glass Morphism Effects**
- **Smooth Animations & Transitions**
- **Responsive Grid Layouts**
- **Interactive Hover Effects**
- **Professional Color Scheme**

## 🔧 Technical Details

- **PHP 7.4+** with MySQLi extension
- **MariaDB/MySQL** database
- **Vanilla JavaScript** with modern ES6+ features
- **CSS3** with Flexbox and Grid
- **Google Fonts** (Poppins)

## 🌐 Database Schema

The application automatically creates:
- Database: `weather_app`
- Table: `districts`
- Fields: id, name, temp, description, humidity, wind_speed, population, area

## 🚀 Usage

1. Select a district from the dropdown or choose "All Sri Lankan Districts"
2. Click "Get Weather" to view current conditions
3. View individual district cards or comprehensive table view
4. Data refreshes with random values on each request

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🐛 Troubleshooting

**Connection Issues:**
- Ensure XAMPP MySQL is running on port 3307
- Check if MySQL service is started in XAMPP Control Panel
- Verify database credentials in `index.php`

**Display Issues:**
- Clear browser cache
- Check browser console for errors
- Ensure all files are in the same directory

## 📄 License

Open source - Feel free to modify and distribute.