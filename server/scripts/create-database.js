require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  database: "postgres",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
    return;
  }
  console.log("Connected successfully");

  const dbName = process.env.DB_NAME;
  client.query(
    `SELECT 1 FROM pg_database WHERE datname='${dbName}'`,
    (err, result) => {
      if (err) {
        console.error("Error checking database existence", err);
        client.end();
        return;
      }

      if (result.rows.length === 0) {
        client.query(`CREATE DATABASE "${dbName}"`, (err, result) => {
          if (err) {
            console.error("Error creating database", err);
          } else {
            console.log(`Database ${dbName} created successfully`);
          }
          client.end();
        });
      } else {
        console.log(`Database ${dbName} already exists`);
        client.end();
      }
    }
  );
});
