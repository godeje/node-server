# Node.js Server with PostgreSQL

## Overview
A Node.js Express server with PostgreSQL integration running on port 5000. Provides API endpoints for managing alerts stored in a PostgreSQL database.

## Recent Changes
- **2025-10-18**: PostgreSQL integration with pg package
  - Added pg package for database connectivity
  - Configured PostgreSQL connection pool with SSL
  - Auto-creation of 'alertas' table on startup
  - Created endpoints for saving and retrieving alerts
  - Updated server to bind to 0.0.0.0:5000

## Project Structure
- `server.js`: Main server file with Express routes and PostgreSQL integration
- `package.json`: Node.js dependencies (express, pg)

## Database
- **Connection**: Uses `DATABASE_URL` environment variable
- **SSL**: Configured with `rejectUnauthorized: false`
- **Table**: `alertas` (id, usuario, mensaje, hora)

## Endpoints
- `GET /`: Returns server status message
- `POST /alerta`: Saves an alert to the database
  - Body: `{ usuario: string, mensaje: string }`
- `GET /historial`: Returns all alerts ordered by newest first
