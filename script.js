// Enhanced JavaScript for the Weather App with particle effects

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.weather-form');
    const button = form.querySelector('.btn-primary');
    const select = document.getElementById('location');
    const searchBox = document.getElementById('searchBox');
    
    // Search/Filter functionality
    if (searchBox && select) {
        searchBox.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const options = select.querySelectorAll('option');
            
            options.forEach(option => {
                const text = option.textContent.toLowerCase();
                if (text.includes(filter) || option.value === '') {
                    option.style.display = '';
                } else {
                    option.style.display = 'none';
                }
            });
        });
        
        // Focus select when search has results and Enter is pressed
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                select.focus();
                select.size = 10; // Show dropdown
            }
        });
    }
    
    // Create particle background
    createParticleBackground();
    
    // Add loading state to button
    form.addEventListener('submit', function() {
        button.classList.add('loading');
        button.disabled = true;
        
        // Re-enable button after 5 seconds (safety)
        setTimeout(() => {
            button.classList.remove('loading');
            button.disabled = false;
        }, 5000);
    });
    
    // Add smooth interactions
    select.addEventListener('focus', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 6px 25px rgba(38, 166, 154, 0.3)';
    });
    
    select.addEventListener('blur', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(77, 182, 172, 0.1)';
    });
    
    // Add keyboard shortcut (Enter key to submit)
    select.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            form.dispatchEvent(new Event('submit'));
        }
    });
    
    // Auto-focus on select element
    if (searchBox) {
        searchBox.focus();
    } else if (select) {
        select.focus();
    }
    
    // Comparison checkbox logic
    const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
    const compareBtn = document.querySelector('.compare-btn');
    
    if (compareCheckboxes.length > 0 && compareBtn) {
        compareCheckboxes.forEach(cb => {
            cb.addEventListener('change', function() {
                const checkedCount = document.querySelectorAll('.compare-checkbox:checked').length;
                compareBtn.disabled = checkedCount < 2;
                compareBtn.textContent = checkedCount >= 2 ? `📊 Compare ${checkedCount} Locations` : '📊 Compare Selected';
            });
        });
    }
    
    // Initialize charts when page loads
    setTimeout(() => {
        initializeCharts();
        initializeForecastChart();
    }, 500);
    
    // Also try when window fully loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            initializeCharts();
            initializeForecastChart();
        }, 800);
    });
    
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.weather-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px) scale(1.01)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 5px 20px rgba(79, 195, 247, 0.2)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.animation = 'float 1.5s ease-in-out infinite';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.animation = 'float 3s ease-in-out infinite';
        });
    });
    
    // Add scroll to results after form submission
    if (window.location.hash === '#results') {
        setTimeout(() => {
            const results = document.querySelector('.weather-dashboard, .weather-card');
            if (results) {
                results.scrollIntoView({ behavior: 'smooth' });
            }
        }, 500);
    }
});

function createParticleBackground() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particle-background';
    document.body.appendChild(particlesContainer);
    
    const colors = ['#4FC3F7', '#81D4FA', '#4DB6AC', '#80CBC4', '#26A69A'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 60 + 10;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            opacity: ${Math.random() * 0.1 + 0.05};
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
            animation-duration: ${Math.random() * 10 + 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Add real-time clock update
function updateClock() {
    const clockElements = document.querySelectorAll('.last-updated, .last-updated-card');
    if (clockElements.length > 0) {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        clockElements.forEach(element => {
            if (element.classList.contains('last-updated')) {
                element.textContent = `Last updated: ${timeString}`;
            } else if (element.classList.contains('last-updated-card')) {
                element.textContent = `Last checked: ${timeString}`;
            }
        });
    }
}

// Update clock every minute
setInterval(updateClock, 60000);

// Add smooth scrolling for better UX
function smoothScrollTo(element, duration = 1000) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add this to form submission to scroll to results
document.querySelector('.weather-form')?.addEventListener('submit', function(e) {
    setTimeout(() => {
        const results = document.querySelector('.weather-dashboard, .weather-card');
        if (results) {
            smoothScrollTo(results, 800);
        }
    }, 100);
});

// Temperature and Humidity Charts for All Locations view
function initializeCharts() {
    const tempCanvas = document.getElementById('temperatureChart');
    const humidityCanvas = document.getElementById('humidityChart');
    
    console.log('Initializing charts...', 'tempCanvas:', !!tempCanvas, 'humidityCanvas:', !!humidityCanvas);
    
    if (!tempCanvas || !humidityCanvas) {
        console.log('Chart canvases not found');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded!');
        return;
    }
    
    const table = document.querySelector('.weather-table');
    if (!table) {
        console.log('Weather table not found');
        return;
    }
    
    const locations = [];
    const temperatures = [];
    const humidities = [];
    
    table.querySelectorAll('tbody tr').forEach(row => {
        const tds = row.querySelectorAll('td');
        if (tds.length >= 7) {
            locations.push(tds[1].textContent.trim());
            temperatures.push(parseFloat(tds[2].textContent));
            humidities.push(parseFloat(tds[4].textContent));
        }
    });
    
    console.log('Chart data:', locations.length, 'locations found');
    
    // Limit to top 15 for readability
    const topCount = Math.min(15, locations.length);
    
    try {
        new Chart(tempCanvas, {
        type: 'bar',
        data: {
            labels: locations.slice(0, topCount),
            datasets: [{
                label: 'Temperature (°C)',
                data: temperatures.slice(0, topCount),
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Temperature Comparison (Top 15 Locations)'
                },
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Temperature (°C)'
                    }
                }
            }
        }
    });
    
        new Chart(humidityCanvas, {
            type: 'bar',
            data: {
                labels: locations.slice(0, topCount),
                datasets: [{
                    label: 'Humidity (%)',
                    data: humidities.slice(0, topCount),
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Humidity Comparison (Top 15 Locations)'
                    },
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Humidity (%)'
                        }
                    }
                }
            }
        });
        
        console.log('Charts initialized successfully');
    } catch (error) {
        console.error('Error initializing charts:', error);
    }
// Forecast Chart for Single Location view
function initializeForecastChart() {
    const canvas = document.getElementById('forecastChart');
    if (!canvas) {
        console.log('Forecast chart canvas not found');
        return;
    }
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded for forecast!');
        return;
    }
    
    const forecastCards = document.querySelectorAll('.forecast-card');
    if (forecastCards.length === 0) {
        console.log('No forecast cards found');
        return;
    }
    
    const days = [];
    const temps = [];
    const minTemps = [];
    const maxTemps = [];
    
    forecastCards.forEach(card => {
        days.push(card.querySelector('.forecast-day')?.textContent || '');
        const temp = parseFloat(card.querySelector('.forecast-temp')?.textContent || '0');
        temps.push(temp);
        
        const range = card.querySelector('.forecast-range')?.textContent || '0 / 0';
        const [min, max] = range.split('/').map(t => parseFloat(t));
        minTemps.push(min);
        maxTemps.push(max);
    });
    
    console.log('Forecast chart data:', days.length, 'days');
    
    try {
        new Chart(canvas, {
            type: 'line',
            data: {
                labels: days,
                datasets: [
                    {
                        label: 'Average Temp',
                        data: temps,
                        borderColor: 'rgb(255, 159, 64)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Max Temp',
                        data: maxTemps,
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.1)',
                        tension: 0.3,
                        borderDash: [5, 5]
                    },
                    {
                        label: 'Min Temp',
                        data: minTemps,
                        borderColor: 'rgb(54, 162, 235)',
                        backgroundColor: 'rgba(54, 162, 235, 0.1)',
                        tension: 0.3,
                        borderDash: [5, 5]
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: '5-Day Temperature Forecast'
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Temperature (°C)'
                        }
                    }
                }
            }
        });
        
        console.log('Forecast chart initialized successfully');
    } catch (error) {
        console.error('Error initializing forecast chart:', error);
    }
}

// Export to PDF function
function exportToPDF() {
    console.log('exportToPDF called');
    console.log('window.jspdf:', typeof window.jspdf);
    
    // Try multiple ways to access jsPDF
    let jsPDF = null;
    
    if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
        jsPDF = window.jspdf.jsPDF;
    } else if (typeof window.jsPDF !== 'undefined') {
        jsPDF = window.jsPDF;
    } else {
        alert('❌ PDF export library not loaded.\n\nPlease:\n1. Check your internet connection\n2. Refresh the page (Ctrl + F5)\n3. Try again');
        console.error('jsPDF not found. window.jspdf:', window.jspdf, 'window.jsPDF:', window.jsPDF);
        return;
    }
    
    try {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text('Sri Lanka Weather Report', 14, 20);
        doc.setFontSize(11);
        doc.text('Generated: ' + new Date().toLocaleString('en-US'), 14, 28);
        
        const table = document.querySelector('.weather-table');
        if (!table) {
            alert('No weather data to export');
            return;
        }
        
        const rows = [];
        
        table.querySelectorAll('tbody tr').forEach(tr => {
            const row = [];
            tr.querySelectorAll('td').forEach((td, idx) => {
                if (idx > 0) { // Skip checkbox column
                    // Remove emojis and special characters that corrupt PDF
                    const text = td.textContent.trim().replace(/[^\x00-\x7F]/g, '');
                    row.push(text);
                }
            });
            rows.push(row);
        });
        
        let yPos = 35;
        doc.setFontSize(9);
        
        rows.slice(0, 30).forEach(row => {
            if (yPos > 270) {
                doc.addPage();
                yPos = 20;
            }
            doc.text(row.join(' | '), 14, yPos);
            yPos += 7;
        });
        
        doc.save('weather-report-' + new Date().toISOString().split('T')[0] + '.pdf');
        console.log('PDF exported successfully');
    } catch (error) {
        console.error('PDF export error:', error);
        alert('❌ Error creating PDF: ' + error.message);
    }
}

// Export current location to PDF
function exportCurrentToPDF() {
    console.log('exportCurrentToPDF called');
    
    // Try multiple ways to access jsPDF
    let jsPDF = null;
    
    if (typeof window.jspdf !== 'undefined' && window.jspdf.jsPDF) {
        jsPDF = window.jspdf.jsPDF;
    } else if (typeof window.jsPDF !== 'undefined') {
        jsPDF = window.jsPDF;
    } else {
        alert('❌ PDF export library not loaded. Please refresh the page.');
        return;
    }
    
    try {
        const doc = new jsPDF();
        
        const locationRaw = document.querySelector('.card-header h2')?.textContent || 'Unknown';
        // Remove emojis and special characters
        const location = locationRaw.replace(/[^\x00-\x7F]/g, '').trim();
        
        doc.setFontSize(18);
        doc.text('Weather Report', 14, 20);
        doc.setFontSize(14);
        doc.text(location, 14, 30);
        doc.setFontSize(11);
        doc.text('Generated: ' + new Date().toLocaleString(), 14, 38);
        
        let yPos = 50;
        document.querySelectorAll('.detail-item').forEach(item => {
            const label = item.querySelector('.label')?.textContent || '';
            const value = item.querySelector('.value')?.textContent || '';
            doc.text(`${label}: ${value}`, 14, yPos);
            yPos += 8;
        });
        
        doc.save('weather-' + location.replace(/[^a-zA-Z0-9]/g, '-') + '.pdf');
        console.log('Current location PDF exported successfully');
    } catch (error) {
        console.error('PDF export error:', error);
        alert('❌ Error creating PDF: ' + error.message);
    }
}