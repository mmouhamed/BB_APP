import { Client } from "pg";

const config = {
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST, // Note: In PostgreSQL, use `host` instead of `server`
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432, // Default PostgreSQL port is 5432
  ssl: {
    rejectUnauthorized: false, // Set to false if using self-signed certificates
  },
};

export default async function ExecuteQuery(query, params) {
  const client = new Client(config); // Create a new PostgreSQL client
  try {
    await client.connect(); // Connect to the PostgreSQL database

    // Execute the query with optional parameters
    const result = await client.query(query, params);

    return result.rows; // Return the result rows from PostgreSQL
  } catch (error) {
    console.error("Database query error:", error.message); // Log the error message
    throw new Error("Database query failed: " + error.message);
  } finally {
    await client.end(); // Ensure the connection is closed after the query is executed
  }
}
