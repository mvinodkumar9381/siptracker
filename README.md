# SIP Tracker & Portfolio Valuation System
A backend-based mutual fund SIP management and portfolio valuation system built using Node.js, Express.js, and MySQL.

# Features
- Investor Management
- AMC & Mutual Fund Management
- SIP Registration
- SIP Processing
- NAV Tracking
- Holdings Calculation
- Portfolio Net Worth Calculation
- JWT-based Login & Logout
- REST APIs
- MySQL Database Integration

# Tech Stack
- Node.js
- Express.js
- MySQL
- MySQL Workbench
- JWT Authentication

# Project Structure
SIP_TRACKER
│
├── controllers
├── models
├── routes
├── utility
├── server.js
├── package.json

# Database Tables
- investors
- amcs
- mutual_funds
- nav_history
- sips
- transactions
- 
# API Endpoints

## Investor APIs

| Method | Endpoint |
|---|---|
| POST | /api/investors |
| GET | /api/investors/:investorId |
| GET | /api/investors/:investorId/holdings |
| GET | /api/investors/:investorId/networth |
| POST | /api/investors/login |
| POST | /api/investors/logout |

## Fund APIs

| Method | Endpoint |
|---|---|
| POST | /api/funds |
| GET | /api/funds |
| PUT | /api/funds/:fundId/nav |

## SIP APIs

| Method | Endpoint |
|---|---|
| POST | /api/sips |
| GET | /api/sips/:sipId |
| POST | /api/sips/:sipId/process |
| GET | /api/sips/:sipId/transactions |

# SIP Processing Logic

When a SIP is processed:

1. Latest NAV is fetched
2. Units are calculated

Units = Transaction Amount / NAV

3. Transaction is stored
4. Holdings are updated

# Holdings Calculation
Current Value = Total Units × Latest NAV

# Database Normalization
The database is normalized up to 3NF.
Benefits :
- Reduced redundancy
- Better consistency
- Referential integrity
- Scalable structure
- 
# Setup Instructions :

## Install Dependencies

bash :
npm install


## Start Server

bash
nodemon server.js


# MySQL Configuration

Update database credentials inside:

utility/dbManager.js

Example:

js
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'siptracker'
})

# Example API :

## Create Investor :
POST /api/investors

Body:

json sample data
{
  "investor_id": "INV001",
  "first_name": "Vinod",
  "last_name": "Kumar",
  "email": "vinod@gmail.com",
  "phone": "9876543210",
  "pan_number": "ABCDE1234F"
}
