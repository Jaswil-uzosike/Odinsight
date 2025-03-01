var map;
var mapInitialized = false;

function initMap() {
  var defaultLocation = { lat: 5.377705, lng: 100.264254 };
  var mapOptions = {
    zoom: 4,
    center: defaultLocation,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.TOP_RIGHT,
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_BOTTOM,
    },
    // The following option disables the scrollwheel zooming on the map
    scrollwheel: false,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // The setPadding function is called here, right after the map is instantiated.
  map.setPadding(0, 0, 0, 200); // top, right, bottom, left padding

  mapInitialized = true;

  console.log("Map has been initialized:", map);

  // Once map is initialized, check if there is a state parameter in the URL
  var state = getParameterByName("state");
  if (state && locations[state]) {
    goToState(state);
  }
}

var locations = {
  Sabah: { lat: 5.9788, lng: 116.0753 },
  Johor: { lat: 1.4854, lng: 103.7618 },
  Sarawak: { lat: 3.139, lng: 113.7633 },
  Selangor: { lat: 3.0738, lng: 101.5183 },
  Pahang: { lat: 3.8126, lng: 103.3256 },
  "Pulau Pinang": { lat: 5.4141, lng: 100.3298 },
  Melaka: { lat: 2.1896, lng: 102.2501 },
  Perak: { lat: 4.5921, lng: 101.0901 },
  Kedah: { lat: 6.1184, lng: 100.3685 },
  "Negeri Sembilan": { lat: 2.7255, lng: 101.9424 },
  Terengganu: { lat: 5.3117, lng: 103.1324 },
  Kelantan: { lat: 6.1254, lng: 102.2386 },
  Perlis: { lat: 6.4449, lng: 100.2048 },
  "Wilayah Persekutuan Kuala Lumpur": { lat: 3.139, lng: 101.6869 },
  "Wilayah Persekutuan Labuan": { lat: 5.2806, lng: 115.2475 },
  "Wilayah Persekutuan Putrajaya": { lat: 2.9264, lng: 101.6964 },
};

function goToState(state) {
  if (!mapInitialized) {
    console.error("Map is not initialized yet.");
    return;
  }

  var location = locations[state];
  map.setCenter(location);
  map.setZoom(7);
}