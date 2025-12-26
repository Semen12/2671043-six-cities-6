import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useMap } from './use-map';
import { City } from '../types/offer';

const mockCity: City = {
  name: 'Paris',
  location: { latitude: 48.85, longitude: 2.35, zoom: 10 }
};

describe('Hook: useMap', () => {
  it('should return map instance', () => {
    const { result } = renderHook(() => {
      const mapRef = useRef<HTMLDivElement | null>(document.createElement('div'));
      return useMap({ renderRef: mapRef, city: mockCity });
    });

    expect(result.current).toBeDefined();
  });
});
