import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT, URL_MARKER_ACTIVE } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../mocks/offers.js';

type MapProps = {
    offers: Offer[];
    selectedOffer: Offer;
    hoveredOfferId?: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const activeCustomIcon = new Icon({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ offers, selectedOffer, hoveredOfferId }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedOffer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });

        const isHovered = hoveredOfferId === offer.id;
        marker.setIcon(isHovered ? activeCustomIcon : defaultCustomIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer, hoveredOfferId]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
