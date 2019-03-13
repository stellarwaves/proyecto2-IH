'use strict'

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiamVkdWFyZCIsImEiOiJjanQ0OTcyd2kwMTVqM3lueWVsMXA3aXY3In0.JU7e-t92-A5EM-wY0yFKBQ';
  let positionString = document.querySelector('p.coordinates');
  let stringCoordenate = positionString.innerHTML;

  let stringPosition = stringCoordenate.split(',');
  const mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [stringPosition[0], stringPosition[1]],
    zoom: 13
  };


const map = new mapboxgl.Map(mapOptions);
const marker = new mapboxgl.Marker().setLngLat(mapOptions.center).addTo(map);


// map.addControl(new MapboxGeocoder({
//     accessToken: mapboxgl.accessToken
// }));
// map.addControl(new mapboxgl.NavigationControl());
// map.addControl(new mapboxgl.FullscreenControl());

// map.addControl(new mapboxgl.GeolocateControl({
//     positionOptions: {
//         enableHighAccuracy: true
//     },
//     trackUserLocation: true
// }));
// map.on('mousemove', function (e) {
//     document.getElementById('coordenadas').innerHTML =
//         JSON.stringify(e.lngLat);
// });
};

window.addEventListener('load', main);