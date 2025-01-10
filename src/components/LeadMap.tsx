import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';

interface LeadMapProps {
  location: {
    lat: number;
    lng: number;
    address: string;
  };
}

const LeadMap = ({ location }: LeadMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.your_token_here'; // Replace with your actual token
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [location.lng, location.lat],
        zoom: 14,
      });

      // Add marker
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map.current);

      // Add error handling for map load
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      map.current?.remove();
    };
  }, [location]);

  const handleSchedule = () => {
    // TODO: Implement scheduling functionality
    console.log('Schedule appointment clicked');
  };

  return (
    <div className="space-y-4">
      <div className="relative h-[200px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{location.address}</p>
        <Button onClick={handleSchedule} className="gap-2">
          <Calendar className="w-4 h-4" />
          Schedule Visit
        </Button>
      </div>
    </div>
  );
};

export default LeadMap;