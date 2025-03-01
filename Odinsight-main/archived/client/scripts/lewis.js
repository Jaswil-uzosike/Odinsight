let markers = [];
let restaurants = [];

function createMap() {
  this.map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: { lat: 5.377705, lng: 100.264254 },
  });
  google.maps.event.addListener(this.map, "click", (event) => {
    this.addMarker(event.latLng);

    var request = {
      location: event.latLng,
      radius: "500",
      query: "restaurant",
    };

    service = new google.maps.places.PlacesService(this.map);
    service.textSearch(request, callback);
  });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function removeRestaurants(map) {
  for (let i = 0; i < restaurants.length; i++) {
    restaurants[i].setMap(map);
  }
}

function createMarker(restaurant) {
  var restaurantMarker = new google.maps.Marker({
    map: this.map,
    position: restaurant.geometry.location,
  });

  restaurants.push(restaurantMarker);
}

function addMarker(location) {
  setMapOnAll(null);
  removeRestaurants(null);
  markers = [];
  restaurants = [];
  var marker = new google.maps.Marker({
    position: location,
    map: this.map,
  });

  markers.push(marker);
}

function callback(results, status) {
  let that = this;
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      console.log(place.geometry.location);
      that.createMarker(results[i]);
    }
  }
}

createMap();
