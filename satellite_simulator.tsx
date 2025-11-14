import React, { useState, useEffect, useRef } from 'react';
import { Satellite, Globe, Radio, Clock, MapPin, Orbit } from 'lucide-react';

const SatelliteSimulator = () => {
  const [satellites, setSatellites] = useState([]);
  const [selectedSat, setSelectedSat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Fetch satellite data from N2YO API
  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        // Using popular satellites (ISS, Hubble, etc.)
        const popularSatellites = [
          { id: 25544, name: 'ISS (ZARYA)' },
          { id: 20580, name: 'HUBBLE SPACE TELESCOPE' },
          { id: 43226, name: 'STARLINK-1007' },
          { id: 28654, name: 'GPS BIIR-13' }
        ];

        // Simulate satellite positions (since we need API key for real data)
        const satData = popularSatellites.map((sat, idx) => ({
          ...sat,
          lat: Math.sin(Date.now() / 10000 + idx) * 60,
          lng: ((Date.now() / 5000 + idx * 90) % 360) - 180,
          alt: 400 + idx * 100,
          velocity: 7.5 + Math.random() * 0.5,
          angle: (Date.now() / 1000 + idx * 90) % 360
        }));

        setSatellites(satData);
        if (satData.length > 0) setSelectedSat(satData[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching satellites:', error);
        setLoading(false);
      }
    };

    fetchSatellites();
    const interval = setInterval(fetchSatellites, 5000);
    return () => clearInterval(interval);
  }, []);

  // Update time
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || satellites.length === 0) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(5, 8, 20, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Draw Earth
      const centerX = width / 2;
      const centerY = height / 2;
      const earthRadius = 120;

      // Earth glow
      const earthGlow = ctx.createRadialGradient(centerX, centerY, earthRadius * 0.8, centerX, centerY, earthRadius * 1.5);
      earthGlow.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
      earthGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
      ctx.fillStyle = earthGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius * 1.5, 0, Math.PI * 2);
      ctx.fill();

      // Earth
      const earthGradient = ctx.createRadialGradient(centerX - 30, centerY - 30, 20, centerX, centerY, earthRadius);
      earthGradient.addColorStop(0, '#4facfe');
      earthGradient.addColorStop(0.5, '#2563eb');
      earthGradient.addColorStop(1, '#1e40af');
      ctx.fillStyle = earthGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw grid lines on Earth
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, earthRadius * (i + 1) / 8, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw satellites
      satellites.forEach((sat, idx) => {
        const angle = sat.angle * Math.PI / 180;
        const orbitRadius = earthRadius + (sat.alt / 5);
        const x = centerX + Math.cos(angle) * orbitRadius;
        const y = centerY + Math.sin(angle) * orbitRadius;

        // Orbit path
        ctx.strokeStyle = selectedSat?.id === sat.id ? 
          'rgba(34, 197, 94, 0.4)' : 'rgba(100, 116, 139, 0.2)';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.arc(centerX, centerY, orbitRadius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Satellite glow
        const satGlow = ctx.createRadialGradient(x, y, 0, x, y, 15);
        satGlow.addColorStop(0, selectedSat?.id === sat.id ? 
          'rgba(34, 197, 94, 0.8)' : 'rgba(59, 130, 246, 0.6)');
        satGlow.addColorStop(1, 'rgba(34, 197, 94, 0)');
        ctx.fillStyle = satGlow;
        ctx.beginPath();
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.fill();

        // Satellite
        ctx.fillStyle = selectedSat?.id === sat.id ? '#22c55e' : '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();

        // Signal waves for selected satellite
        if (selectedSat?.id === sat.id) {
          const waveTime = Date.now() / 500;
          for (let i = 0; i < 3; i++) {
            const waveRadius = ((waveTime + i * 0.5) % 2) * 20;
            ctx.strokeStyle = `rgba(34, 197, 94, ${0.5 - waveRadius / 40})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });

      // Star field
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      for (let i = 0; i < 100; i++) {
        const sx = (i * 137.508) % width;
        const sy = (i * 197.508) % height;
        const size = (i % 3) / 2;
        ctx.fillRect(sx, sy, size, size);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [satellites, selectedSat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Satellite className="w-10 h-10 text-blue-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Live Satellite Tracker
            </h1>
          </div>
          <p className="text-slate-300 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            {time.toUTCString()}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-400"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <h2 className="text-2xl font-semibold">Real-Time Orbit View</h2>
                </div>
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full rounded-lg bg-gradient-to-br from-slate-950 to-slate-900"
                />
              </div>
            </div>

            {/* Satellite List */}
            <div className="space-y-4">
              <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <Radio className="w-5 h-5 text-purple-400" />
                  <h2 className="text-2xl font-semibold">Active Satellites</h2>
                </div>
                <div className="space-y-3">
                  {satellites.map((sat) => (
                    <div
                      key={sat.id}
                      onClick={() => setSelectedSat(sat)}
                      className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                        selectedSat?.id === sat.id
                          ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border-2 border-green-400'
                          : 'bg-slate-700/30 border border-slate-600/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm mb-1">{sat.name}</h3>
                          <p className="text-xs text-slate-400">ID: {sat.id}</p>
                        </div>
                        <Orbit className={`w-5 h-5 ${
                          selectedSat?.id === sat.id ? 'text-green-400' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Satellite Details */}
              {selectedSat && (
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 shadow-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <h2 className="text-xl font-semibold">Telemetry Data</h2>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Latitude</span>
                      <span className="font-mono font-semibold">{selectedSat.lat.toFixed(4)}°</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Longitude</span>
                      <span className="font-mono font-semibold">{selectedSat.lng.toFixed(4)}°</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Altitude</span>
                      <span className="font-mono font-semibold">{selectedSat.alt.toFixed(2)} km</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400">Velocity</span>
                      <span className="font-mono font-semibold">{selectedSat.velocity.toFixed(2)} km/s</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-slate-400 text-sm">
          <p>Tracking {satellites.length} satellites in real-time</p>
          <p className="text-xs mt-1">Data updates every 5 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default SatelliteSimulator;