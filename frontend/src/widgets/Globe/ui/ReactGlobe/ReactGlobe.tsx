import { useEffect, useMemo, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useNavigate } from 'react-router-dom';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';
import earthMap from './earthmap.png';
import earthBump from './earthbump.png';
import cls from './ReactGlobe.module.scss';

type Marker = { id: number; name: string; lat: number; lng: number };

export const ReactGlobe = () => {
  const container = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeMethods>();
  const [width, setWidth] = useState(600);
  const { data: tours = [] } = useGetToursQuery();
  // The globe attaches Three.js objects to its data; never pass frozen Redux records.
  const markers = useMemo(
    () =>
      tours.flatMap((tour) =>
        tour.destination
          ? [
              {
                id: tour.id,
                name: tour.cityArrival,
                lat: tour.destination.lat,
                lng: tour.destination.lng
              }
            ]
          : []
      ),
    [tours]
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={container}
      className={cls.GlobeContainer}
    >
      <Globe
        ref={globe}
        width={width}
        height={600}
        backgroundColor='rgba(0,0,0,0)'
        globeImageUrl={earthMap}
        bumpImageUrl={earthBump}
        onGlobeReady={() =>
          requestAnimationFrame(() =>
            globe.current?.pointOfView({ lat: 40, lng: 5, altitude: 1.8 }, 0)
          )
        }
        htmlElementsData={markers}
        htmlElement={(object: object) => {
          const tour = object as Marker;
          const marker = document.createElement('button');
          marker.textContent = '●';
          marker.title = tour.name;
          marker.setAttribute('aria-label', `View tour to ${tour.name}`);
          marker.style.cssText =
            'background:#ffd910;color:#151515;border:2px solid white;border-radius:50%;width:20px;height:20px;padding:0;cursor:pointer';
          marker.onclick = () => navigate(`/explore/${tour.id}`);
          return marker;
        }}
      />
    </div>
  );
};
