# Bookstore Full-Stack Application

This repository contains a full-stack application for managing a bookstore. The project is divided into two main folders: `server` for the backend and `client` for the frontend.

## Prerequisites

- Node.js (v14.x or later)
- PostgreSQL
- A Linux-based operating system is recommended, as the project was developed and tested in such an environment.

## Setup Instructions

### 1. Setting Up the Server

1. **Navigate to the Server Directory:**
   ```bash
   cd server

2. **Configure Environment Variables:**

Open the .env file and update the following values:
  - DB_USER: Your PostgreSQL username
  - DB_PASSWORD: Your PostgreSQL password
  - DB_NAME: The name of the database you want to use

3. **Install Server Dependencies:**
   ```bash
   npm install

4. **Create the Database:**
- Run the following command to create the database:
   ```bash
   npm run create-db

5. **Run the Server:**
  - Start the server in development mode:
    ```bash
    npm run dev
  - The server will start on port 3000.

6. **Populate the Database with CSV Data:**
  - The route /api/stores/upload-csv will populate the database with data from a CSV file included in the repository.

### 2. Setting Up the Client

1. **Navigate to the Client Directory:**

  ```bash
  cd client

2. **Install Client Dependencies:**
  ```bash
  npm install

3. **Run the Client:**
  - Start the client in development mode:
  ```bash
  npm run dev
  - The client will start on port `8000`.

### 3. Application Overview

  - Base URL:
    - When opening the base URL (http://localhost:8000), you'll see a left panel with two tabs: Books and Stores.
  - Books Page:
    - The "Sell" button on the books page is currently non-functional.
  - Stores Page:
    - The "Create Store" button is fully functional, allowing you to add new stores.
    - The "Store ID" column supports sorting in ascending, descending, and default orders.

#### Notes

  - Ensure that PostgreSQL is running and accessible with the credentials you provide in the .env file.
  - The project was developed on a Linux-based operating system.


