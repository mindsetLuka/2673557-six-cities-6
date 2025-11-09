import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/useMap';
import { URL_MARKER_DEFAULT } from '../../const';
import 'leaflet/dist/leaflet.css';
import { Offer } from '../../mocks/offers.js';

type MapProps = {
    offers: Offer[];
    selectedOffer: Offer;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ offers, selectedOffer }: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedOffer);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude
        });

        marker.setIcon(defaultCustomIcon).addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOffer]);

  return <div style={{ height: '100%' }} ref={mapRef}></div>;
}

export default Map;
