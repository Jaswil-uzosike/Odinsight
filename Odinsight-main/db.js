const postgres = require("postgres");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
  connection: {
    options: `project=${ENDPOINT_ID}`,
  },
});

/*[
  { table_name: 'admins' },
  { table_name: 'states' },
  { table_name: 'hotels' },
  { table_name: 'homestays' }
]*/

module.exports = {
  ping: async () => {
    try {
      await sql`SELECT 1`;

      // If the query executed successfully, the server is reachable
      return { isReady: true };
    } catch (error) {
      // If there was an error executing the query, the server is not reachable
      return { isReady: false, error: error.message };
    }
  },
  getAdmin: async () => {
    try {
      const allAdmins = await sql`SELECT * FROM Admins`;
      return allAdmins;
    } catch (error) {
      console.error(error);
    }
  },
  //handling the sql to retrieve hotels data and giving it a function to call back on in the server side
  getAllHotels: async () => {
    try {
      const allHotels = await sql`SELECT * FROM Hotels`;
      // console.log(allHotels);
      return allHotels;
    } catch (error) {
      console.error(error);
    }
  },

  //handling the sql to retrieve homestays data and giving it a function to call back on in the server side
  getAllHomestays: async () => {
    try {
      const allHomestays = await sql `SELECT * FROM Homestays`;
      return allHomestays;
    } catch (error) {
      console.error(error);
    }
  },

  getHomestayById: async (homestayId) => {
    try {
      /* Tim: Write code to check if we have done "getAllHometays" first.
        If we haven't, then get all homestays, store it somewhere, and get a
        specific homestay from the store (using Id)
      */
      
      const result = await sql`
        SELECT * FROM Homestays WHERE id = ${homestayId}
      `;
      return result[0]; // Assuming 'id' is unique, there should only be one result
    } catch (error) {
      throw new Error("Error fetching homestay by ID from the database.");
    }
  }
};