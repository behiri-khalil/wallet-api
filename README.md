# Wallet API

Backend REST API for a personal finance / wallet application, powering the [Pocket Ledger](https://github.com/behiri-khalil/pocket-ledger) mobile app. Handles authentication, transactions, and wallet data with a serverless Postgres database and Redis-based rate limiting.

## Features
- RESTful API built with Express
- Serverless PostgreSQL via Neon (`@neondatabase/serverless`)
- Rate limiting with Upstash Redis (`@upstash/ratelimit`)
- Encrypted sensitive fields with `crypto-js`
- Environment-based configuration with `dotenv`
- CORS-enabled for cross-origin requests from the mobile client

## Tech Stack
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | PostgreSQL (Neon serverless) |
| Rate Limiting | Upstash Redis |
| Dev Tooling | Nodemon |

## API Endpoints
<!-- Fill in with your actual routes -->
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Authenticate and receive a session/token |
| GET | `/api/transactions` | List a user's transactions |
| POST | `/api/transactions` | Create a new transaction |

## Getting Started

### Prerequisites
- Node.js
- A Neon PostgreSQL database URL
- An Upstash Redis instance (for rate limiting)

### Installation
```bash
git clone https://github.com/behiri-khalil/wallet-api.git
cd wallet-api
npm install
```

### Environment Variables
Create a `.env` file in the root:
```
DATABASE_URL=your_neon_postgres_url
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
PORT=3000
```

### Run
```bash
npm run dev      # with nodemon (auto-reload)
# or
npm start
```

## License
MIT
