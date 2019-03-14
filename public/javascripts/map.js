
const main = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiamVkdWFyZCIsImEiOiJjanQ0OTcyd2kwMTVqM3lueWVsMXA3aXY3In0.JU7e-t92-A5EM-wY0yFKBQ';
  let positionString = document.querySelector('p.coordinates');
  let stringCoordenate = positionString.innerHTML;

  let stringPosition = stringCoordenate.split(',');
  const mapOptions = {
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [stringPosition[0], stringPosition[1]],
    zoom: 10
  };

  const map = new mapboxgl.Map(mapOptions);
  const marker = new mapboxgl.Marker().setLngLat(mapOptions.center).addTo(map);

  


  // const updateLocation = () => {
  //   if (!navigator.geolocation) {  
  //     console.log('Geolocation is not supported by your browser');
  //   } else {
  //     navigator.geolocation.getCurrentPosition(hasLocation, error);
  //   }

  //   function hasLocation (position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;

  //     const latitudeInputElement = document.getElementById('latitude');
  //     const longitudeInputElement = document.getElementById('longitude');

  //     latitudeInputElement.value = latitude;
  //     longitudeInputElement.value = longitude;

  //     mapboxgl.accessToken = 'pk.eyJ1IjoiamVkdWFyZCIsImEiOiJjanQ0OTcyd2kwMTVqM3lueWVsMXA3aXY3In0.JU7e-t92-A5EM-wY0yFKBQ';
  //     const mapOptionsUdated = {
  //       container: 'map',
  //       style: 'mapbox://styles/mapbox/streets-v11',
  //       center: [longitude, latitude],
  //       zoom: 10
  //     };

  //   const map = new mapboxgl.Map(mapOptions);
  //   let marker = new mapboxgl.Marker({
  //     draggable: true
  //   })
  //       .setLngLat(longitude, latitude)
  //       .addTo(map);

  //   function onDragEnd () {
  //     let lngLat = marker.getLngLat();
  //     latitudeInputElement.value = lngLat.lat;
  //     longitudeInputElement.value = lngLat.lng;
  //     // coordinates.style.display = 'block',
  //     // coordinates.innerHTML    
  //   }
  //   marker.on('dragend', onDragEnd);
  //   }
  // }
  // document.querySelector('#btnlocation').addEventListener('click', updateLocation)
    //API quitar esto, no se utilizara 
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