# 🌤️ Sri Lanka Weather Tracker

<div align="center">

*A stunning glassmorphism weather application built with PHP, MySQL, and modern CSS featuring real-time weather tracking for **120+ locations** across Sri Lanka with dynamic weather-based backgrounds*

**Built with ❤️ by Reezma Hanan**

[![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://php.net/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://javascript.com/)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://css3.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![XAMPP](https://img.shields.io/badge/XAMPP-FB7A24?style=for-the-badge&logo=xampp&logoColor=white)](https://apachefriends.org/)


[![GitHub stars](https://img.shields.io/github/stars/reezmahanan/Weather-App?style=social)](https://github.com/reezmahanan/Weather-App/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/reezmahanan/Weather-App?style=social)](https://github.com/reezmahanan/Weather-App/network/members)
[![GitHub issues](https://img.shields.io/github/issues/reezmahanan/Weather-App)](https://github.com/reezmahanan/Weather-App/issues)

</div>

---

## 📸 Screenshots

![Weather App Screenshot](https://github.com/reezmahanan/Weather-App/blob/main/screenshots/dashboard.png)
*Main dashboard with glassmorphism design and dynamic backgrounds*

![Favorites Feature](https://github.com/reezmahanan/Weather-App/blob/main/screenshots/Weather%20Forcast.png)
*Quick access to favorite cities weather Forecasts*

![Weather Details](https://github.com/reezmahanan/Weather-App/blob/main/screenshots/Temperature%20trend.png)
*Detailed weather information Trends*

![Weather Alerts](https://github.com/reezmahanan/Weather-App/blob/main/screenshots/Weather%20Aleart.png)
*Real-time weather alerts and warnings*



---

## 🌍 Comprehensive Coverage

- **120+ Locations**: Every city, town, and area across Sri Lanka
- **9 Provinces**: Organized by Western, Central, Southern, Northern, Eastern, North Western, North Central, Uva, and Sabaragamuwa
- **Regional Weather Patterns**: Coastal, hill country, dry zone, and urban patterns
- **Real-Time Tracking**: Weather updates every 30 minutes with gradual changes

## ✨ Enhanced Features

### 🔍 Smart Search & Filter
- **Live Location Search**: Instantly filter through 120+ locations as you type
- **Quick Access**: Keyboard shortcuts for faster navigation
- **Auto-suggestions**: Smart dropdown filtering

### 🌐 Geolocation
- **Auto-Detection**: Automatically detect your location in Sri Lanka
- **Nearest City**: Find the closest weather station to your coordinates
- **One-Click Access**: Instant weather for your area

### 📊 Weather Forecast
- **5-Day Forecast**: Complete temperature trends for the next 5 days
- **Min/Max Temperatures**: Daily temperature ranges
- **Interactive Charts**: Visual temperature trends with Chart.js
- **Daily Conditions**: Weather description for each forecast day

### 🚨 Weather Alerts
- **Extreme Heat Warnings**: Alerts when temperature exceeds 35°C
- **Cold Weather Advisories**: Notifications for temperatures below 10°C
- **Storm Alerts**: Thunderstorm and severe weather warnings
- **High Humidity Warnings**: Alerts when humidity exceeds 90%
- **Strong Wind Notifications**: Warnings for wind speeds over 7 m/s

### 📈 Data Visualization
- **Temperature Charts**: Bar charts comparing temperatures across locations
- **Humidity Charts**: Visual humidity comparisons
- **Forecast Trends**: Line graphs showing 5-day temperature trends
- **Interactive Graphs**: Responsive Chart.js visualizations

### 📤 Export Capabilities
- **CSV Export**: Download weather data in spreadsheet format
- **PDF Reports**: Generate professional PDF weather reports
- **Bulk Export**: Export all locations or selected data
- **Formatted Output**: Clean, organized data exports

### ⚖️ Location Comparison
- **Multi-Select**: Compare weather between 2+ locations simultaneously
- **Side-by-Side View**: Easy comparison of all weather metrics
- **Checkbox Selection**: Simple interface for choosing locations
- **Instant Comparison**: One-click weather comparison

### ⭐ Favorites Management
- **Save Favorites**: Quick access to your most-viewed locations
- **One-Click Weather**: Instant weather for favorite cities
- **Persistent Storage**: Favorites saved across sessions
- **Easy Management**: Add/remove favorites with one click

## 🎨 Stunning Design

- **Glassmorphism UI**: Modern frosted glass design with blur effects
- **Unique Color Theme**: Green-Blue-Purple gradient animation
- **Dynamic Backgrounds**: Weather-based background images that change per location
- **Responsive Design**: Mobile-first approach, works on all devices
- **Real-Time Clocks**: Multiple clocks showing Sri Lanka time (UTC+5:30)

## ⭐ Smart Features

- **Favorite Cities**: Save and quick-access your favorite locations
- **Auto-Refresh**: Automatically updates every 30 minutes
- **Weather Emojis**: Visual weather representations
- **Comprehensive Data**: Temperature, humidity, wind speed, population, and area
- **Session Storage**: Favorites persist during your session
- **Regional Patterns**: Coastal (warmer, humid), Hill Country (cooler, misty), Dry Zone (hotter, drier)
- **No External API Dependencies**: Self-contained realistic weather simulation

---

## 💻 Technology Stack

- **PHP** 7.4+
- **MySQL / MariaDB**
- **JavaScript** (ES6+)
- **CSS3** (Grid, Flexbox, Animations, Glassmorphism)
- **HTML5**
- **XAMPP** (recommended for local development)

---

## 🚀 Quick Start

### Prerequisites

- XAMPP (with PHP 7.4+ and MariaDB/MySQL)
- Modern web browser

### Installation Steps

1. **Configure MySQL Port (Port 3307)**
   ```
   - Open XAMPP Control Panel
   - Click "Config" next to MySQL → "my.ini"
   - Find: port = 3306
   - Change to: port = 3307
   - Save and restart MySQL service
   ```

2. **Start XAMPP Services**
   ```
   - Start Apache
   - Start MySQL (on port 3307)
   ```

3. **Deploy Files**
   ```
   - Copy all files to: C:\xampp\htdocs\Weather App\
   - Ensure folder name is exactly "Weather App"
   ```

4. **Access Application**
   ```
   Open browser: http://localhost/Weather%20App/
   ```

5. **Automatic Setup**
   - Database `weather_app` auto-creates on first run
   - Table `locations` auto-populates with 120+ locations
   - New locations automatically added when accessed

**Notes:**
- On first run, the app will automatically create the database, tables and populate with initial realistic weather data
- If your MySQL uses a different port or credentials, update the database configuration in the project config file

---

## 📖 Usage

### Single District
- Select a district from the dropdown to view detailed weather, population and area data

### All Districts
- Choose "All Sri Lankan Districts" to view a table comparison of current weather and stats across districts

### Regional Patterns
- **Coastal**: Warmer, more humid (e.g., Colombo, Galle)
- **Hill Country**: Cooler, misty (e.g., Kandy, Nuwara Eliya)
- **Dry Zone**: Hotter, drier (e.g., Anuradhapura)

---

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in your stylesheet (e.g., `style.css`):
```css
:root {
  --primary-blue: #4FC3F7;
  --primary-green: #4DB6AC;
  /* change these values to modify the theme */
}
```

### Add / Modify Districts

Edit the district seed array in `index.php` (or the dedicated seeder file) to add or update district entries.

### Database Configuration

Update DB host, port, user and password in the project's DB config file if your environment differs from the defaults.

---

## 🐛 Troubleshooting

**Display Issues:**
- Clear browser cache (Ctrl + Shift + Delete)
- Check browser console for errors (F12)
- Ensure all files are in the same directory
- Try hard refresh (Ctrl + F5)

**Favorites Not Saving:**
- Favorites use session storage (clear on browser close)
- Check if cookies/storage is enabled
- Try different browser

---

## 🚀 Future Enhancements

- [ ] Integration with real weather API (OpenWeatherMap, WeatherAPI)
- [ ] Persistent favorites using database storage
- [ ] User authentication and personalized dashboards
- [ ] Weather alerts and notifications
- [ ] 7-day weather forecast
- [ ] Hourly weather breakdown
- [ ] Weather maps with radar and satellite imagery
- [ ] Mobile app version (React Native/Flutter)
- [ ] Dark/Light theme toggle
- [ ] Multi-language support (Sinhala, Tamil, English)
- [ ] Export weather data to PDF/CSV
- [ ] Historical weather data charts
- [ ] Weather comparison between cities
- [ ] Accessibility improvements (ARIA labels)
- [ ] Docker compose setup for easier local development
- [ ] Automated tests and CI pipeline (GitHub Actions)
- [ ] Admin panel to edit districts and simulation parameters

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/reezmahanan/Weather-App.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Your Changes**
   - Write clean, commented code
   - Follow existing code style
   - Test thoroughly

4. **Commit Your Changes**
   ```bash
   git commit -m "Add amazing feature"
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Describe your changes clearly
   - Reference any related issues

### Contribution Ideas

- Add more Sri Lankan locations
- Improve glassmorphism effects
- Optimize database queries
- Add unit tests
- Enhance mobile responsiveness
- Improve accessibility
- Fix bugs and issues

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

Report bugs or request features by opening issues on the repository.

---

## 📄 License

MIT License - This project is provided for educational purposes.

---

## 👤 Author

**Reezma Hanan**  
- GitHub: [@reezmahanan](https://github.com/reezmahanan)  
- Project: [Weather-App](https://github.com/reezmahanan/Weather-App)

---

## ⭐ Show Your Support

If you find this project useful, please consider:

- ⭐ **Starring this repository** - It helps others discover the project!
- 🍴 **Forking and contributing** - Your ideas make it better!
- 🐛 **Reporting bugs** - Help us improve!
- 💡 **Suggesting features** - We love new ideas!
- 📢 **Sharing with others** - Spread the word!

### Give it a Star! ⭐

**Made with ❤️ for Sri Lanka** 🇱🇰

---

*Last Updated: December 4, 2025*
