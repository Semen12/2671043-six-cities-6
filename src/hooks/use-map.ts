import { useEffect, useRef, useState } from 'react';
import { City } from '../types/offer';
import { Map, TileLayer } from 'leaflet';
import { MAP_ATTRIBUTION, MAP_URL_TEMPLATE } from '../const';
type MapProps = {
  renderRef: React.RefObject<HTMLDivElement>;
  city: City;
};

export const useMap = ({ renderRef, city }: MapProps) => {
  const [map, setMap] = useState<Map | null>(null);
  const mapRef = useRef(false);
  useEffect(() => {
    if (renderRef.current && !mapRef.current) {
      const instance = new Map(renderRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const layer = new TileLayer(MAP_URL_TEMPLATE, {
        attribution: MAP_ATTRIBUTION,
      });
      instance.addLayer(layer);
      setMap(instance);
      mapRef.current = true;
    }
  }, [city, renderRef]);
  return map;
};
