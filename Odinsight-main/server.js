const express = require("express");
const { resolve, dirname } = require("path");
//sets up the functions from db.js so they can be used in the server.js file
const {
  ping,
  getAdmin,
  getAllHotels,
  getAllHomestays,
  getHomestayById,
} = require("./db.js");

const port = process.env.PORT || 3010;
const app = express();

// Allows for PUT and DELETE requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sets the client folder as the client-side
app.use(express.static("client"));

// Log all requests received by the web server (this can be deleted)
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

app.get("/", async (req, res) => {
  const database = await ping();

  if (database.isReady) {
    res.sendFile(resolve(__dirname, "client/home.html"));
  } else {
    res.sendStatus(500);
    console.log(res.error);
  }
});

app.get("/map", async (req, res) => {
  const query = req.body.search;
  res.sendFile(resolve(__dirname, "client/map.html" + (query ? query : "")));
});

//creates a path for the hotels data to be sent to the client side
app.get("/getHotels", async (req, res) => {
  //activates the gethotels funciton in db.js and stores the return value in a constant 'hotels'
  const hotels = await getAllHotels();
  //sends the data to the client side in json format
  res.json({ hotels });
});

//creates a path for the homestays data to be sent to the client side
app.get("/getHomestays", async (req, res) => {
  //activates the gethomestays funciton in db.js and stores the return value in a constant 'homestays'
  const homestays = await getAllHomestays();
  //sends the data to the client side in json format
  res.json({ homestays });
});

app.get("/getHomestayDetails", async (req, res) => {
  // Extract the homestay ID from the query parameters
  const homestayId = req.query.id;

  try {
    // Fetch details for the specified homestay ID from the database
    const details = await getHomestayById(homestayId);
    // Send back the details as JSON
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching homestay details");
  }
});

// For all unknown pages (a.k.a. "all paths"... not listed above), show a 404
app.get("*", (req, res) => {
  res.status(404).sendFile(resolve(__dirname, "client/404.html"));
});

// Starts the web server
app.listen(port, () => {
  console.log(`Listening on port :${port}`);
});
