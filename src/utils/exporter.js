// Export utilities: CSV and PDF generation

import { jsPDF } from 'jspdf';

// Helper to sanitize text for PDF (strips emoji and non-ASCII characters to avoid encoding bugs)
const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[^\x00-\x7F]/g, '').trim();
};

// Export single location details and forecast to PDF
export const exportSingleToPDF = (locationName, data) => {
  const doc = new jsPDF();
  
  // Title Header
  doc.setFillColor(0, 184, 212); // teal
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('SRI LANKA WEATHER TRACKER', 15, 18);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Station Report: ${sanitizeText(locationName)}`, 15, 28);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 120, 28);
  
  // Card section (Current Weather)
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Current Weather Conditions', 15, 52);
  
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 55, 195, 55);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  // Left Column
  doc.text(`Temperature: ${data.temp} C (Feels like ${data.feelsLike} C)`, 20, 65);
  doc.text(`Condition: ${sanitizeText(data.description)}`, 20, 73);
  doc.text(`Humidity: ${data.humidity}%`, 20, 81);
  doc.text(`Wind Speed: ${data.windSpeed} m/s`, 20, 89);
  
  // Right Column
  doc.text(`Station Latitude: ${data.lat || 'N/A'}`, 120, 65);
  doc.text(`Station Longitude: ${data.lon || 'N/A'}`, 120, 73);
  doc.text(`District Population: ${data.population?.toLocaleString() || 'N/A'}`, 120, 81);
  doc.text(`Land Area: ${data.area || 'N/A'} km2`, 120, 89);
  
  // Alerts Section
  if (data.alerts && data.alerts.length > 0) {
    doc.setFillColor(255, 235, 235); // light red
    doc.setDrawColor(255, 100, 100);
    doc.rect(15, 98, 180, 8 + (data.alerts.length * 6), 'FD');
    
    doc.setTextColor(200, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('WEATHER WARNINGS:', 20, 104);
    
    doc.setFont('helvetica', 'normal');
    data.alerts.forEach((alert, idx) => {
      doc.text(`- ${sanitizeText(alert.message)}`, 25, 110 + (idx * 6));
    });
  }
  
  // Forecast Section
  const forecastYStart = data.alerts && data.alerts.length > 0 ? 115 + (data.alerts.length * 6) : 105;
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('7-Day Temperature & Weather Forecast', 15, forecastYStart);
  doc.line(15, forecastYStart + 3, 195, forecastYStart + 3);
  
  let currentY = forecastYStart + 12;
  
  // Draw forecast table header
  doc.setFillColor(240, 240, 240);
  doc.rect(15, currentY - 5, 180, 8, 'F');
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Date / Day', 20, currentY);
  doc.text('Condition', 60, currentY);
  doc.text('Temp (Min/Max)', 110, currentY);
  doc.text('Humidity', 150, currentY);
  doc.text('Wind Speed', 175, currentY);
  
  doc.setFont('helvetica', 'normal');
  currentY += 8;
  
  data.forecast.forEach((dayData) => {
    doc.text(`${dayData.date} (${dayData.day})`, 20, currentY);
    doc.text(sanitizeText(dayData.description), 60, currentY);
    doc.text(`${dayData.temp} C (${dayData.minTemp}/${dayData.maxTemp} C)`, 110, currentY);
    doc.text(`${dayData.humidity}%`, 150, currentY);
    doc.text(`${dayData.windSpeed} m/s`, 175, currentY);
    
    doc.line(15, currentY + 2, 195, currentY + 2);
    currentY += 8;
  });
  
  // Footer note
  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.text('Data sourced from Open-Meteo API. Sri Lanka Weather Tracker. All rights reserved.', 15, 280);
  
  doc.save(`weather-${locationName.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`);
};

// Export all weather data table to PDF
export const exportAllToPDF = (weatherDataMap) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(156, 39, 176); // purple
  doc.rect(0, 0, 210, 35, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('SRI LANKA WEATHER TRACKER', 15, 16);
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Consolidated Weather Report (All Locations)', 15, 26);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 125, 26);
  
  let currentY = 50;
  
  // Draw table header
  doc.setFillColor(230, 230, 230);
  doc.rect(15, currentY - 5, 180, 8, 'F');
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('Location', 18, currentY);
  doc.text('Temp (C)', 65, currentY);
  doc.text('Condition', 90, currentY);
  doc.text('Humidity', 140, currentY);
  doc.text('Wind (m/s)', 160, currentY);
  doc.text('Area (km2)', 180, currentY);
  
  doc.setFont('helvetica', 'normal');
  currentY += 6;
  
  const entries = Object.entries(weatherDataMap);
  
  entries.forEach(([locationName, data], index) => {
    // Check page boundaries
    if (currentY > 275) {
      doc.addPage();
      currentY = 25;
      
      // Draw sub-header on new page
      doc.setFillColor(230, 230, 230);
      doc.rect(15, currentY - 5, 180, 8, 'F');
      doc.setFont('helvetica', 'bold');
      doc.text('Location', 18, currentY);
      doc.text('Temp (C)', 65, currentY);
      doc.text('Condition', 90, currentY);
      doc.text('Humidity', 140, currentY);
      doc.text('Wind (m/s)', 160, currentY);
      doc.text('Area (km2)', 180, currentY);
      doc.setFont('helvetica', 'normal');
      currentY += 6;
    }
    
    doc.text(sanitizeText(locationName), 18, currentY);
    doc.text(`${data.temp} C`, 65, currentY);
    doc.text(sanitizeText(data.description), 90, currentY);
    doc.text(`${data.humidity}%`, 140, currentY);
    doc.text(`${data.windSpeed} m/s`, 160, currentY);
    doc.text(String(data.area || 'N/A'), 180, currentY);
    
    doc.setDrawColor(245, 245, 245);
    doc.line(15, currentY + 2, 195, currentY + 2);
    
    currentY += 7;
  });
  
  doc.setFontSize(8);
  doc.setTextColor(120, 120, 120);
  doc.text('Sri Lanka Weather Tracker Consolidated Report. Data courtesy of Open-Meteo.', 15, 285);
  
  doc.save(`weather-consolidated-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
