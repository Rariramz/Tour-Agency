import React, { useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
import earthMap from './earthmap.png';
import earthBump from './earthbump.png';
import { Color, MeshPhongMaterial } from 'three';
import { getTourMarkers } from '../../model/selectors/getTourMarkers';
import { TourMarkerType } from '../../model/types/tourMarker';
import { markerIcon } from './mapPin';

export const ReactGlobe = () => {
    const globeRef = useRef<GlobeMethods>();
    // custom globe material
    const globeMaterial = new MeshPhongMaterial();
    globeMaterial.bumpScale = 10;
    globeMaterial.specular = new Color('grey');
    globeMaterial.shininess = 15;

    const tourMarkers = getTourMarkers();
    const arcsData = [
        {
            startLat: tourMarkers[0].lat,
            startLng: tourMarkers[0].lng,
            endLat: tourMarkers[1].lat,
            endLng: tourMarkers[1].lng,
            color: 'red'
        },
    ];

    return (
        <Globe
            ref={globeRef}
            backgroundColor={'rgba(0,0,0,0)'}
            globeImageUrl={earthMap}
            bumpImageUrl={earthBump}
            globeMaterial={globeMaterial}
            htmlElementsData={tourMarkers}
            htmlElement={(d: TourMarkerType) => {
                const el = document.createElement('div');
                el.innerHTML = markerIcon;
                el.style.color = d.color;
                el.style.width = `${d.size}px`;
                console.log(d.size)
        
                el.style.cursor = 'pointer';
                el.onclick = () => console.info(d);
                return el;
            }}
            // arcsData={arcsData}
            // arcColor={'color'}
            // arcDashLength={() => Math.random()}
            // arcDashGap={() => Math.random()}
            // arcDashAnimateTime={() => Math.random() * 4000 + 500}
        />
    );
};
