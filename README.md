# 🛰️ Live Satellite Tracker

A beautiful, real-time satellite tracking application with stunning 3D visualization and interactive telemetry data. Track popular satellites like the ISS, Hubble Space Telescope, and Starlink constellation as they orbit Earth.

![Satellite Tracker](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## ✨ Features

### 🎨 Stunning Visualization
- **3D Orbital View**: Watch satellites orbit Earth in real-time on an animated canvas
- **Atmospheric Effects**: Beautiful Earth rendering with glow effects and grid lines
- **Signal Animations**: Visual radio wave indicators from selected satellites
- **Star Field**: Immersive space environment with twinkling stars

### 📡 Real-Time Tracking
- Tracks multiple satellites simultaneously
- Updates position data every 5 seconds
- Live UTC timestamp display
- Smooth orbital animations

### 📊 Telemetry Dashboard
- **Latitude & Longitude**: Precise geographic coordinates
- **Altitude**: Distance from Earth's surface in kilometers
- **Velocity**: Current orbital speed in km/s
- **Satellite ID**: NORAD catalog identification

### 🎯 Interactive Features
- Click any satellite to view detailed information
- Visual selection with highlighted orbits
- Responsive design for all screen sizes
- Glassmorphism UI with backdrop blur effects

## 🚀 Getting Started

### Prerequisites
- Node.js 16.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/satellite-tracker.git
cd satellite-tracker
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Start the development server**
```bash
npm start
# or
yarn start
```

4. **Open your browser**
Navigate to `http://localhost:3000`

## 📦 Dependencies

```json
{
  "react": "^18.0.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.0.0"
}
```

## 🔧 Configuration

### Using Real Satellite Data

To connect to live satellite tracking APIs (like N2YO), you'll need to:

1. **Get an API Key**
   - Sign up at [N2YO.com](https://www.n2yo.com/api/)
   - Get your free API key

2. **Update the API endpoint**
```javascript
const API_KEY = 'your-api-key-here';
const API_URL = `https://api.n2yo.com/rest/v1/satellite/positions`;

const fetchSatellites = async () => {
  const response = await fetch(
    `${API_URL}/${satelliteId}/observer-lat/observer-lng/0/2/&apiKey=${API_KEY}`
  );
  const data = await response.json();
  // Process data...
};
```

3. **Add your coordinates**
Replace `observer-lat` and `observer-lng` with your location coordinates

## 🛰️ Tracked Satellites

Currently tracking:
- **ISS (ZARYA)** - International Space Station (ID: 25544)
- **Hubble Space Telescope** (ID: 20580)
- **Starlink-1007** (ID: 43226)
- **GPS BIIR-13** (ID: 28654)

### Adding More Satellites

To track additional satellites, add them to the `popularSatellites` array:

```javascript
const popularSatellites = [
  { id: 25544, name: 'ISS (ZARYA)' },
  { id: 20580, name: 'HUBBLE SPACE TELESCOPE' },
  // Add more satellites here
  { id: YOUR_SATELLITE_ID, name: 'SATELLITE NAME' }
];
```

Find satellite IDs at [Celestrak](https://celestrak.org/satcat/search.php)

## 🎨 Customization

### Changing Colors

Edit the color scheme in the component:

```javascript
// Earth colors
earthGradient.addColorStop(0, '#4facfe');
earthGradient.addColorStop(1, '#1e40af');

// Satellite colors
const satelliteColor = '#3b82f6'; // Blue
const selectedColor = '#22c55e';  // Green
```

### Adjusting Update Frequency

Change the refresh interval (default: 5 seconds):

```javascript
const interval = setInterval(fetchSatellites, 5000); // milliseconds
```

### Canvas Size

Modify canvas dimensions:

```javascript
<canvas
  width={800}  // Change width
  height={600} // Change height
/>
```

## 📱 Responsive Design

The application is fully responsive with:
- Desktop: 3-column layout with full visualization
- Tablet: Stacked layout with optimized spacing
- Mobile: Single column with touch-friendly controls

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔒 Privacy & Data

- No personal data is collected
- All satellite data is publicly available
- No tracking cookies or analytics by default

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions
- Add ground station tracking
- Implement pass predictions
- Add satellite photography mode
- Create 3D globe view with Three.js
- Add notification system for satellite passes
- Implement satellite collision detection

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
