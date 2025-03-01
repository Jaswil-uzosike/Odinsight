// Links to: app.get("/example-content"
fetch('/example-content').then(res => res.json()).then(data => {
  // Get what we sent from the server and log it to the console (ctrl+shift+i)
  console.log(data);
});

async function initMap() {
  const { PlacesService } = await google.maps.importLibrary("places");

  // Initialize the map
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 51.5074, lng: -0.1278 }, // London coordinates
    zoom: 12,
  });

  // Create a PlacesService instance
  const placesService = new PlacesService(map);

  // Listen for map events (e.g., user scrolls or moves)
  map.addListener("idle", () => {
    // Get the visible bounds of the map
    const bounds = map.getBounds();

    // Search for places within the visible area
    placesService.nearbySearch(
      {
        bounds,
        type: ["establishment"], // You can customize the type of places you want (e.g., restaurants, hotels, etc.)
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Process the results (e.g., extract place names)
          for (const place of results) {
            console.log(place.name); // Log the name of each place
          }
        }
      }
    );
  });
}

initMap();