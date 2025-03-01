let origin = null;
let destination = null;
const icons = {
  hotel: {
    url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  },
  restaurant: {
    url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
  },
};
let mapDirections = null;

const currentState = getParameterByName("state");
//gets the data from the serverside
fetch("/getHotels")
  .then((res) => res.json())
  //adds the hotels data to the 'data' parameter
  .then((data) => {
    //moves the contents of the 'data' parameter to the constant 'hotels'
    const hotels = data.hotels;

    //foreach hotel in the constant hotels, the marker function will be executed
    for (const hotel of hotels) {
      let hotelMarker = HotelMarkers(hotel);
    }
   
  });

let currentInfoWindow = null;

//function to make markers for the hotels (paramater is the hotel object)
function HotelMarkers(hotel) {
  //sets the latlng value from the hotel object to be used in the creation of the marker
  let lat = hotel.hotel_latitude;
  let long = hotel.hotel_longitude;
  const latlng = new google.maps.LatLng(lat, long);

  //creates the marker using the latlng value from the hotels database and stores information in the marker from the database also
  var marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    title: hotel.hotel_name,
    // address: hotel.hotel_address,
    // dateAdded: hotel.hotel_date,
    icon: "styles/hotel icon.png",
  });

  // Creating an info window with the hotel details
  const infoWindow = new google.maps.InfoWindow({
    content: createHotelInfoWindowContent(hotel), // Using the new     function for content
  });

  // creating the marker
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(
      hotel.hotel_latitude,
      hotel.hotel_longitude,
    ),
    map: this.map,
    title: hotel.hotel_name,
    icon: "styles/hotel icon.png", // Make sure you have the correct path for your hotel icon
  });

  // Purple / Hotel
  marker.addListener("click", function () {
    // If there's an open info window, close it
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }

    infoWindow.open(map, marker); // This will open the info window for the hotel marker
    // Additional code for setting origin or other click-related functionality
    origin = latlng;

    currentInfoWindow = infoWindow;
  });
}

//gets the homestay data from the serverside
fetch("/getHomestays")
  .then((res) => res.json())
  //adds homestay data to the 'data' parameter
  .then((data) => {
    //moves the homestay data from the 'data' parameter to the constant 'homestays'
    const homestays = data.homestays;
    //loops through each homestay object in the constant 'homestays' and runs the create marker function for each
    for (const homestay of homestays) {
      HomestayMarkers(homestay);
    }
  });

//function to create homestay markers
function HomestayMarkers(homestay) {
  //sets the latlng value from the homestay object to be used in the creation of the marker
  let lat = homestay.homestay_latitude;
  let long = homestay.homestay_longitude;
  const latlng = new google.maps.LatLng(lat, long);

  //creates the marker using the latlng value from homestay object and stores more data in the marker to be used in the dropdown menu
  var marker = new google.maps.Marker({
    position: latlng,
    map: this.map,
    icon: "styles/homestay icon.png",
    title: homestay.homestay_name,
    address: homestay.homestay_address,
    organiserEmail: homestay.organiser_email,
    organiserName: homestay.organiser_name,
    organiserPhone: homestay.organiser_phone,
    organiserWebsite: homestay.organiser_website,
  });

  
  const infoWindow = new google.maps.InfoWindow({
    content: createHomestayInfoWindowContent(homestay),
  });

  // Blue / Homestays
  // binding the info window to the marker
  marker.addListener("click", function () {
    if (currentInfoWindow) {
      currentInfoWindow.close();
    }

    infoWindow.open(map, marker);

    currentInfoWindow = infoWindow;

    origin = latlng; // Store the origin
    checkRoute(); // Check if both origin and destination are set
  });
}

let map,
  mapInitialised = false;
let searchBox;
let attractions = [];
let markers = [];
let restaurants = [];

const locations = {
  Malaysia: { lat: 4.1340084, lng: 109.6181485 },
  Sabah: { lat: 5.7399686, lng: 116.9804458 },
  Johor: { lat: 2.0822114, lng: 103.3616531 },
  Sarawak: { lat: 2.9177475, lng: 112.6082108 },
  Selangor: { lat: 3.2157697, lng: 101.4716046 },
  Pahang: { lat: 3.6906028, lng: 102.3988487 },
  "Pulau Pinang": { lat: 5.354004, lng: 100.3581956 },
  Melaka: { lat: 2.2373789, lng: 102.2515037 },
  Perak: { lat: 4.7737054, lng: 101.0844592 },
  Kedah: { lat: 5.827176, lng: 100.4959738 },
  "Negeri Sembilan": { lat: 2.8192486, lng: 102.1966158 },
  Terengganu: { lat: 4.8924073, lng: 102.9524515 },
  Kelantan: { lat: 5.3718646, lng: 102.0081867 },
  Perlis: { lat: 6.4851167, lng: 100.2478335 },
  "WP Kuala Lumpur": { lat: 3.1340365, lng: 101.6986474 },
  "WP Labuan": { lat: 5.318989, lng: 115.221076 },
  "WP Putrajaya": { lat: 2.9258443, lng: 101.6936946 },
};

const aubergineTheme = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70",
      },
    ],
  },
];

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  this.map = new google.maps.Map(document.getElementById("map"), {
    center: locations["Malaysia"],
    styles: aubergineTheme,
    zoom: 6,
    disableDoubleClickZoom: false, // allow zooming with double click
    fullscreenControl: true, //  allow fullscreen control
    gestureHandling: "auto", //  panning and zooming gestures
    mapTypeControl: true, //  map type control (map/satellite)
    rotateControl: true, //  allow rotation controls
    scaleControl: true, // scale control
    scrollwheel: true, //  zooming with the scroll wheel
    streetViewControl: true, // street view control
    zoomControl: true, //  allow zoom controls
  });

  mapInitialised = true;

  headTo(locations[currentState]);

  //Search Functionality Using Google Places API (Shehab)
  const input = document.getElementById("searchInput");
  //Retrieves the DOM element where users input their search queries, identified by the ID searchInput.
  const searchBox = new google.maps.places.SearchBox(input); //searchBox: Creates a new SearchBox object associated with the specified input element.
  //This SearchBox is linked to Google Places API and facilitates the search of places within the map.

  this.map.addListener("bounds_changed", () => {
    searchBox.setBounds(this.map.getBounds());
  }); //This sets up an event listener. Whenever the map's boundaries change due to zooming.
  //The searchBox's search area is updated to the current viewable area of the map...

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // When the user types and selects a place from the searchBox, the places_changed event is triggered.
    // Contains an array of place objects returned by the searchBox.     If no places are found, it then exits.

    // Clearing out the old markers.
    markers.forEach((marker) => marker.setMap(null));
    markers = [];
    //When displaying the new search results, existing markers are removed   from the map and the markers array is reset.

    // For each place, getting the icon, name, and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      //bounds: A LatLngBounds object that will fit all the places returned

      // Creating a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: this.map,
          title: place.name,
          position: place.geometry.location,
        }),
      );

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    this.map.fitBounds(bounds); //After all places are processed, this.map.fitBounds(bounds) adjusts the   map view to include all markers fittingly.
  });

  let pHandler = null;
  let attractionHandler = null;

  //this holds boolean values used to clear the attractions and restaurants markers every time a new marker is created
  google.maps.event.addListener(this.map, "click", (event) => {
    //creates the marker when the user clicks on the map
    this.addMarker(event.latLng);
    //gets the latlng value for the position the user clicked on the map
    const latlng = event.latLng;

    //gets the value of the attraction button being pressed
    const restaurantButton = document.getElementById("restaurantButton");
    const attractionButton = document.getElementById("attractionButton");

    //if the attraction button has already been pressed it removes all attraction markers
    if (attractionHandler) {
      attractionButton.removeEventListener("click", attractionHandler);
    }
    //if the restaurant button has already been pressed it removes all restaurant markers
    if (pHandler) {
      restaurantButton.removeEventListener("click", pHandler);
    }

    //if the user clicks on the find restaurant button this is the function that will run
    const searchHandler = (event) => {
      //creates a request for the search that finds results with the tag attractions with a radius of 1000 around the created marker
      const request = {
        location: latlng,
        radius: "1000",
        type: ["restaurant"],
      };
      service = new google.maps.places.PlacesService(this.map);
      //performs the nearbySearch function using the premade request
      service.nearbySearch(request, callback);
    };

    //if the user clicks on the find attraction button this is the function that will run
    const attractionSearch = (event) => {
      //creates a request for the search that finds results with the tag restaurants with a radius of 1000 around the created marker
      const request = {
        location: latlng,
        radius: "1000",
        type: ["attraction"],
      };
      service = new google.maps.places.PlacesService(this.map);
      //performs the nearbySearch function using the premade request
      service.nearbySearch(request, callback);
    };

    //if the user clicks on the find attraction button the function to find nearby attractions will be initiated
    attractionButton.addEventListener("click", attractionSearch);
    attractionHandler = attractionSearch;

    //if the user clicks on the find restaurant button the function to find nearby restaurants will be initiated
    restaurantButton.addEventListener("click", searchHandler);
    pHandler = searchHandler;
  });

  document
    .getElementById("searchButton")
    .addEventListener("click", function () {
      searchBox.getPlaces(); // Trigger the search
    });

  let directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(this.map);
  mapDirections = directionsRenderer;
}

async function headTo(location, jump) {
  const prevLocation = this.map.getCenter();

  if (this.map.getZoom() != 6) {
    this.map.setCenter(locations["Malaysia"]);
    this.map.setZoom(6);
  }

  await wait(2.5);

  this.map.setCenter(location || prevLocation);
  this.map.setZoom(9);
}

function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " ")); // "Perak"
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function removeRestaurants(map) {
  for (let i = 0; i < restaurants.length; i++) {
    restaurants[i].setMap(map);
  }
}

//creates markers for each field specified (not nescasserily restaurants this was made in early development)
function createMarker(restaurant) {
  //the marker is made with the position returned from the nearbysearch function

  var restaurantMarker = new google.maps.Marker({
    icon: "/styles/attraction icon.png",
    map: this.map,
    position: restaurant.geometry.location,
  });

  //adds the marker created to the restaurants array (again not nescesserily restaurants it could be a different location)
  restaurants.push(restaurantMarker);
}

//this function adds a marker to the map when the map is clicked
function addMarker(location) {
  //removes all markers from the map then clears the array
  setMapOnAll(null);
  markers = [];
  //removes all previously found attraction markers from the map and clears the array
  removeRestaurants(null);
  restaurants = [];
  //creates a marker for the location where the user clicked
  var marker = new google.maps.Marker({
    position: location,
    map: this.map,
  });
  destination = location;

  // Passing origin and destination to the directions function
  checkRoute(origin, destination);

  //adds the newly created marker to the marker array
  markers.push(marker);
}

function callback(results, status) {
  let that = this;
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      that.createMarker(results[i]);
    }
  }
}

function checkRoute(origin, destination) {
  //Init direction Service from google

  let directionsService = new google.maps.DirectionsService();
  // Calc the distance between the origin and destination
  directionsService.route(
    {
      origin,
      destination,
      travelMode: "DRIVING",
    },
    (response, status) => {
      if (status === "OK") {
        mapDirections.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    },
  );
}

function createHomestayInfoWindowContent(homestay) {
  // Adding buttons for searching nearby restaurants and attractions
  return `
    <div class="info-window-content">
      <h3>${homestay.homestay_name}</h3>
      <p><b>Address:</b> ${homestay.homestay_address}</p>
      <p><b>Email:</b> ${homestay.organiser_email}</p>
      <p><b>Contact:</b> ${homestay.organiser_name}, ${homestay.organiser_phone}</p>
      <p><b>Website:</b> <a href="${homestay.organiser_website}" target="_blank">Visit Website</a></p>
      <button onclick="searchNearby('restaurant', ${homestay.homestay_latitude}, ${homestay.homestay_longitude})">Look for nearby restaurants</button>

      <button onclick="searchNearby('tourist_attraction', ${homestay.homestay_latitude}, ${homestay.homestay_longitude})">Look for Nearby Activities</button>
    </div>
  `;
}

function searchNearby(PoI, lat, long) {
  removeRestaurants(null);
  restaurants = [];
  const latlng = new google.maps.LatLng(lat, long);

  const request = {
    location: latlng,
    radius: "1000",
    type: [PoI],
  };
  service = new google.maps.places.PlacesService(this.map);
  service.nearbySearch(request, callback);
}

function createHotelInfoWindowContent(hotel) {
  return `
    <div class="info-window-content">
      <h3>${hotel.hotel_name}</h3>
      <p><b>Address:</b> ${hotel.hotel_address}</p>
      <p><b>Phone:</b> ${hotel.hotel_phone}</p>
      <p><b>Email:</b> ${hotel.hotel_email}</p>
      <p><b>Website:</b> <a href="${hotel.hotel_website}" target="_blank">Visit Website</a></p>
      <p><b>Rating:</b> ${hotel.hotel_rating}</p>
      <button onclick="searchNearby('restaurant', {lat: ${hotel.hotel_latitude}, lng: ${hotel.hotel_longitude}})">Look for nearby restaurants</button>
      <button onclick="searchNearby('point_of_interest', {lat: ${hotel.hotel_latitude}, lng: ${hotel.hotel_longitude}})">Look for Nearby Activities</button>
    </div>
  `;
}

// map.js
function showHomestayDetails(homestayId) {
  fetch(`/getHomestayDetails?id=${homestayId}`) // Make sure this matches the server route
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((homestay) => {
      // Now 'homestay' contains the details of the homestay
      // Proceed to show these details in your side nav
    })
    .catch((error) => {
      console.error("Error fetching homestay details:", error);
      // Handle the error (e.g., show an error message)
    });
}

function showHotelDetails(hotelId) {
  // Placeholder for the function. Implement AJAX call or a modal popup display logic here.
  alert("Show details for hotel ID: " + hotelId);
}

/* This function calculates and displays the route between the origin and destination using the DirectionsService and DirectionsRenderer but it makes the map not to render.

function calculateAndDisplayRoute(directionsService, directionsRenderer, origin, destination) {
directionsService.route({
  origin: origin,
  destination: destination,
  travelMode: 'DRIVING'
}, function(response, status) {
  if (status === 'OK') {
    directionsRenderer.setDirections(response);
  } else {
    window.alert('Directions request failed due to ' + status);
  }
}); */

// Remove the click listener to prevent creating multiple listeners
// google.maps.event.clearListeners(this.map, 'click');

const wait = (seconds) => new Promise((res) => setTimeout(res, seconds * 1000));
