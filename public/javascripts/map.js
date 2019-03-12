'use strict';

const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibmNvZGVyOTIiLCJhIjoiY2pkbmRmdno4MGQ2ODJ4bWtxcG02dnk1ciJ9.DehQETKEOyrOha4hqclYvg';
  const mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [2.1577406, 41.387982],
    zoom: 15
  };

  const map = new mapboxgl.Map(mapOptions);

  if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
  } else {
    navigator.geolocation.getCurrentPosition(hasLocation, error);
  }

  function hasLocation (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setLocationMarker([longitude, latitude]);
  }

  function error (error) {
    console.log(error);
  }

  function setLocationMarker (locationArray) {
    map.setCenter(locationArray);
    const marker = new mapboxgl.Marker({
      color: 'red',
      offset: {
        x: -20,
        y: -20
      }
    })
      .setLngLat(locationArray)
      .addTo(map);

    map.setZoom(17);
  } 
/* 
  function setProfesorMarker () {
    const latLngElement = document.querySelector('p.coordinates');
    const coordinatesArray = latLngElement.innerText.split(',');
    const marker = new mapboxgl.Marker({
      color: 'black'
    })
      .setLngLat(coordinatesArray)
      .addTo(map);
  }

  setProfesoraMarker(); */
};

window.addEventListener('load', main);