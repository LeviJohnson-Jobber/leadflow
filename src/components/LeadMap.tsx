import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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

    mapboxgl.accessToken = 'pk.eyJ1IjoibGV2aWpvaG5zb24iLCJhIjoiY201cXozNmp2MDVodzJscHgwdnkzZWFzayJ9.zhehg9-VUDjSNhqiCCRmqQ';
    
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

  return (
    <div className="space-y-4">
      <div className="relative h-[200px] rounded-lg overflow-hidden">
        <div ref={mapContainer} className="absolute inset-0" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{location.address}</p>
      </div>
    </div>
  );
};

export default LeadMap;