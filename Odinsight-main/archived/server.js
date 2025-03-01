const express = require("express");
const { resolve } = require("path");
const { ping } = require("./db.js");

const port = process.env.PORT || 3010;
const app = express();

// Allows for PUT and DELETE requests, useful if we want to send data from the client to server
// like the admin's login details, or like if the client-side Google Maps API doesn't do what we
// want it to do, the server-side one probably will
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets the client folder as the client-side
app.use(express.static("archived-client"));

// Log all requests received by the web server (this can be deleted)
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

/*
How to use the database:

(async function() {
  const listOfAdmins = await getAdmin();
  console.log(listOfAdmins.map((admin) => 'Hello, ' + admin.admin_username + '.').join('\n'));
})();
*/

/*
Example for other pages
When user goes to: https://odinsight.com/admin, show the imaginary admin.html page:

app.get("/admin", async (req, res) => {
    res.sendFile(resolve(__dirname, "client/admin.html"));
*/

app.get("/", async (req, res) => {
  const response = await ping();

  if (response.isReady) {
    res.sendFile(resolve(__dirname, "examples-client/example.html"));
  } else {
    res.sendStatus(500);
    console.log(response.error);
  }
});

// Go to the homepage (but only if DB is running) temporarily, example page
app.get("/shehab", async (req, res) => {
  const response = await ping();

  if (response.isReady) {
    res.sendFile(resolve(__dirname, "examples-client/shehab.html"));
  } else {
    res.sendStatus(500);
    console.log(response.error);
  }
});

// Links to: fetch('/example-content')
app.get("/example-content", async (req, res) => {
  // We send data from the server side to the client side like so:
  res.status(200).json({ body: { msg: "test" } });

  /*
    (I think) there are somethings you can't do on the client-side
    that you have to do on the server-side, so we need to do this
    (this meaning, sending this from server side to client side)

    We'll need to do this when getting stuff from the API like "Nearby Places" 
    to find out if restaurants are nearby and stuff (I think)

    https://developers.google.com/maps/documentation/javascript/overview

    Read the documentation ^^, we need to figure out how to use this API
  */
  
  const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyD28CPtqQLacC0AmZpzQwDtw4Zj86tYPPg',
    Promise: Promise
  });

  // The following is useless code that logs all (ig some) the mcdonalds in malaysia:
  const place = await googleMapsClient.places({
    query: 'McDonalds in Malaysia'
  }).asPromise();

  // Check if there are any results
  if (place.json.results.length === 0) {
    console.log('No McDonald\'s found in Malaysia.');
  }

  // Output McDonald's locations
  console.log('McDonald\'s locations in Malaysia:');
  place.json.results.forEach(place => {
    console.log(`${place.name}: ${place.geometry.location.lat}, ${place.geometry.location.lng}`);
  });
});

/* For all unknown pages, show a 404 */
app.get("*", (req, res) => {
  res.status(404).sendFile(resolve(__dirname, "client/404.html"));
});

// Starts the web server
app.listen(port, () => {
  console.log(`Listening on port :${port}`);
});
