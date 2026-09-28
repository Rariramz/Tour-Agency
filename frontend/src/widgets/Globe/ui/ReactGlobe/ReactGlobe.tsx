import { useEffect, useMemo, useRef, useState } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import { useGetToursQuery } from '../../../../entities/tour/api/toursApi';
import earthMap from './earthmap.png';
import earthBump from './earthbump.png';
import { markerIcon } from './mapPin';
import cls from './ReactGlobe.module.scss';

type Marker = { id: number; name: string; lat: number; lng: number };

export const ReactGlobe = ({
  onTourSelect
}: {
  onTourSelect: (tourId: number) => void;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const globe = useRef<GlobeMethods>();
  const [size, setSize] = useState({ width: 600, height: 600 });
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
  useEffect(() => {
    if (!container.current) return;
    const observer = new ResizeObserver(([entry]) =>
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height
      })
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
        width={size.width}
        height={size.height}
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
          marker.type = 'button';
          marker.innerHTML = markerIcon;
          marker.title = `Show ${tour.name} in the tour list`;
          marker.setAttribute(
            'aria-label',
            `Show ${tour.name} in the tour list`
          );
          marker.style.cssText =
            'pointer-events:auto;position:relative;background:transparent;color:var(--black-color);border:0;width:28px;height:0;padding:0;cursor:pointer;overflow:visible';
          const icon = marker.querySelector('svg');
          const path = marker.querySelector('path');
          if (icon) {
            icon.setAttribute('aria-hidden', 'true');
            icon.style.width = '100%';
            icon.style.height = '34px';
            icon.style.display = 'block';
            icon.style.position = 'absolute';
            icon.style.bottom = '0';
            icon.style.left = '0';
          }
          if (path) {
            path.style.stroke = 'white';
            path.style.strokeWidth = '12px';
            path.style.paintOrder = 'stroke fill';
          }
          marker.onpointerdown = (event) => event.stopPropagation();
          marker.onclick = (event) => {
            event.stopPropagation();
            onTourSelect(tour.id);
          };
          return marker;
        }}
      />
    </div>
  );
};
