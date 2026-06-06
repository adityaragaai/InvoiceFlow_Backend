<div align="center">

# ⚡ InvoiceFlow Backend

### A Production-Grade REST API for Invoice Management

[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.x-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Jest](https://img.shields.io/badge/Tested_with-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)

<br/>

**[🖥️ Frontend Repo](https://github.com/adityaragaai/InvoiceFlow_Frontend) · [🚀 Live Demo](https://invoice-flow-frontend.vercel.app/invoices) · [🐛 Report Bug](https://github.com/adityaragaai/InvoiceFlow_Backend/issues) · [✨ Request Feature](https://github.com/adityaragaai/InvoiceFlow_Backend/issues)**

<br/>

> A fully-featured Node.js/Express REST API powering the InvoiceFlow dashboard.  
> Supports paginated querying, multi-field filtering, full-text search, aggregation analytics, and Docker deployment — backed by MongoDB.

</div>

---

## 📋 Table of Contents

- [📖 Overview](#-overview)
- [🖼️ Screenshots](#️-screenshots)
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Installation & Setup](#️-installation--setup)
- [🔑 Environment Variables](#-environment-variables)
- [📜 Available Scripts](#-available-scripts)
- [🌱 Database Seeding](#-database-seeding)
- [📡 API Reference](#-api-reference)
- [🗂️ Data Models](#️-data-models)
- [❌ Error Handling](#-error-handling)
- [🐳 Docker](#-docker)
- [🧪 Testing](#-testing)
- [🔮 Future Improvements](#-future-improvements)
- [👤 Author](#-author)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 📖 Overview

**InvoiceFlow Backend** is the REST API layer for the InvoiceFlow invoice management system. Built with Express and MongoDB, it exposes a clean, consistent JSON API consumed by the React frontend.

The API was designed with production standards in mind — structured error handling, MongoDB indexes for query performance, automatic tax calculation, server-side pagination, and a full test suite using Jest and Supertest.

> 🏗️ **Project Type:** Full-Stack Internship Assignment  
> 🔗 **Frontend:** Separately deployed — see [InvoiceFlow Frontend](https://github.com/adityaragaai/InvoiceFlow_Frontend)

---

## 🖼️ Screenshots

<div align="center">

<table>
  <tr>
    <td align="center" width="50%">
      <b>📊 Invoice Dashboard</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/02a83d0d-d6c3-40cd-8643-a9aec537acc4" width="420" alt="Invoice Dashboard"/>
    </td>
    <td align="center" width="50%">
      <b>📈 Analytics — Top 5 Customers</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/e274ea90-0242-479a-aae5-86b5cbd1e6b2" width="420" alt="Analytics Top 5 Customers"/>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <b>👤 Customer Profile Page</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/de32d25f-1ab7-40b8-a921-4c0699929c30" width="420" alt="Customer Profile Page"/>
    </td>
    <td align="center" width="50%">
      <b>📝 Invoice Creation Form</b><br/><br/>
      <img src="https://github.com/user-attachments/assets/b2123ef1-fac6-4dde-a514-850bf986dff6" width="420" alt="Invoice Creation Form"/>
    </td>
  </tr>
</table>

</div>

---

## ✨ Features

### 📋 Invoice Management
- 📄 **Paginated Listing** — Server-side pagination with configurable page size (max 100 per page)
- ✏️ **Full CRUD** — Create, read, update, and delete invoices via RESTful endpoints
- 🔢 **Auto Tax Calculation** — `tax` and `total` are computed server-side from `amount` and `taxRate` on every create/update

### 🔍 Filtering & Sorting
- 🏷️ **Filter by Status** — `Draft`, `Sent`, `Unpaid`, `Overdue`, `Paid`, `Void`
- 💸 **Filter by Tax Rate** — Supports GST slabs: `0`, `3`, `5`, `18`, `28`
- 👤 **Filter by Customer** — Narrow invoices to a specific customer ID
- 📅 **Issue Date Range** — `issueDateFrom` / `issueDateTo` query params
- 📅 **Due Date Range** — `dueDateFrom` / `dueDateTo` query params
- 🔎 **Full-Text Search** — Searches across invoice ID and customer name simultaneously
- ↕️ **Multi-Field Sort** — Sort by `amount`, `dueDate`, `issueDate`, `total`, or `createdAt` in `asc`/`desc` order

### 📊 Analytics
- 🏆 **Top 5 Customers** — Aggregation pipeline ranking customers by total billed value
- 📉 **Dashboard Summary** — At-a-glance totals: revenue, tax collected, invoice counts broken down by status, and total customers

### 🧑‍💼 Customer Profiles
- 👤 **Customer Detail** — Returns a customer's full invoice history plus aggregated metrics (total billed, outstanding amount, counts per status)

### 🔧 Infrastructure
- 🗂️ **MongoDB Indexes** — Indexes on `status`, `dueDate`, `amount`, `issueDate`, and `customer` for fast filtered queries
- 🐳 **Docker Support** — Alpine-based production image with `npm ci --only=production`
- ✅ **Health Check** — `GET /api/health` for uptime monitoring and load balancer probes

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| 🟢 Runtime | [Node.js 20](https://nodejs.org/) | JavaScript runtime |
| 🚂 Framework | [Express 4](https://expressjs.com/) | HTTP routing & middleware |
| 🍃 ODM | [Mongoose 8](https://mongoosejs.com/) | MongoDB schema modeling & queries |
| 🗄️ Database | [MongoDB](https://www.mongodb.com/) | Document store |
| 🌐 CORS | [cors](https://www.npmjs.com/package/cors) | Cross-origin request handling |
| 📋 Logging | [morgan](https://www.npmjs.com/package/morgan) | HTTP request logger |
| 🔧 Dev Server | [nodemon](https://nodemon.io/) | Auto-restart on file changes |
| 🧪 Testing | [Jest](https://jestjs.io/) + [Supertest](https://github.com/ladjs/supertest) | Integration test suite |
| 🐳 Container | [Docker](https://www.docker.com/) | Production containerization |

---

## 📁 Folder Structure

```
InvoiceFlow_Backend/
├── src/
│   ├── config/
│   │   └── db.js                   # MongoDB connection setup
│   ├── controllers/
│   │   ├── invoiceController.js    # Invoice CRUD + list logic
│   │   ├── customerController.js   # Customer list + profile logic
│   │   └── dashboardController.js  # Summary & top customers aggregations
│   ├── middleware/
│   │   └── errorHandler.js         # Centralised error response middleware
│   ├── models/
│   │   ├── Invoice.js              # Invoice schema + indexes
│   │   └── Customer.js             # Customer schema + index
│   ├── routes/
│   │   ├── invoiceRoutes.js        # /api/invoices route definitions
│   │   ├── customerRoutes.js       # /api/customers route definitions
│   │   └── dashboardRoutes.js      # /api/dashboard route definitions
│   ├── seed/
│   │   ├── seed-data.json          # Sample invoice & customer data
│   │   └── seed.js                 # DB seeding script (batched upsert)
│   ├── tests/
│   │   └── invoice.test.js         # Jest + Supertest integration tests
│   └── utils/
│       └── apiFeatures.js          # Shared query-building utilities
├── .dockerignore
├── .env.example                    # Environment variable template
├── .gitignore
├── Dockerfile                      # Production Docker image
├── package.json
├── package-lock.json
└── server.js                       # App entry point
```

---

## ⚙️ Installation & Setup

### Prerequisites

- **Node.js** `>= 20.x` — [Download](https://nodejs.org/)
- **npm** `>= 9.x`
- **MongoDB** `>= 6.x` running locally, or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

### 1. Clone the Repository

```bash
git clone https://github.com/adityaragaai/InvoiceFlow_Backend.git
cd InvoiceFlow_Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env
```

Open `.env` and update the values (see [Environment Variables](#-environment-variables)).

### 4. Seed the Database (Optional)

Populate MongoDB with sample customers and invoices:

```bash
npm run seed
```

### 5. Start the Development Server

```bash
npm run dev
```

The API will be available at **[http://localhost:5001/api](http://localhost:5001/api)**.

---

## 🔑 Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# .env

PORT=5001
MONGODB_URI=mongodb://localhost:27017/invoice_management
NODE_ENV=development
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5001` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/invoice_management` |
| `NODE_ENV` | Runtime environment | `development` / `production` |

> 🔒 Never commit your `.env` file — it is listed in `.gitignore`.

---

## 📜 Available Scripts

Run these from the project root:

| Script | Command | Description |
|---|---|---|
| 🚀 Production | `npm start` | Starts the server with `node` |
| 🔥 Dev Server | `npm run dev` | Starts with `nodemon` for auto-reload |
| 🌱 Seed DB | `npm run seed` | Loads sample data into MongoDB |
| 🧪 Tests | `npm test` | Runs Jest integration tests |

---

## 🌱 Database Seeding

The seed script (`src/seed/seed.js`) reads `src/seed/seed-data.json` and:

1. **Upserts customers** — extracts unique customers from the dataset and creates or updates them
2. **Clears existing invoices** — drops all current invoice documents
3. **Inserts invoices in batches of 200** — efficient bulk insert with progress logging

```bash
npm run seed
```

> ⚠️ The seed script **deletes all existing invoices** before inserting. Safe to re-run against a development database; do not run against production data.

---

## 📡 API Reference

All endpoints are prefixed with `/api`. Responses follow a consistent envelope:

```json
{ "success": true, "data": { ... } }
{ "success": false, "message": "Error description" }
```

### 🩺 Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Returns `{ "status": "ok" }` |

---

### 📄 Invoices — `/api/invoices`

#### `GET /api/invoices`

Returns a paginated list of invoices. Supports filtering, sorting, and full-text search.

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `page` | number | `1` | Page number |
| `limit` | number | `20` | Results per page (max `100`) |
| `sortBy` | string | `createdAt` | Field to sort by: `amount`, `dueDate`, `issueDate`, `total`, `createdAt` |
| `order` | string | `desc` | Sort direction: `asc` or `desc` |
| `status` | string | — | Filter by status: `Draft`, `Sent`, `Unpaid`, `Overdue`, `Paid`, `Void` |
| `customer` | ObjectId | — | Filter by customer `_id` |
| `taxRate` | number | — | Filter by tax rate: `0`, `3`, `5`, `18`, `28` |
| `search` | string | — | Search by invoice ID or customer name (case-insensitive) |
| `issueDateFrom` | date | — | Issue date range start (ISO 8601) |
| `issueDateTo` | date | — | Issue date range end (ISO 8601) |
| `dueDateFrom` | date | — | Due date range start (ISO 8601) |
| `dueDateTo` | date | — | Due date range end (ISO 8601) |

**Response**
```json
{
  "success": true,
  "data": [ { "invoiceId": "INV-001", "customer": { "name": "...", "company": "..." }, ... } ],
  "pagination": { "total": 250, "page": 1, "limit": 20, "pages": 13 }
}
```

---

#### `POST /api/invoices`

Creates a new invoice. `tax` and `total` are computed automatically.

**Request Body**

```json
{
  "customer": "<ObjectId>",
  "amount": 1000,
  "taxRate": 18,
  "status": "Draft",
  "issueDate": "2025-01-01",
  "dueDate": "2025-02-01",
  "invoiceId": "INV-001"
}
```

> `invoiceId` is optional — defaults to `INV-<timestamp>` if omitted.

**Response** — `201 Created`
```json
{
  "success": true,
  "data": { "invoiceId": "INV-001", "amount": 1000, "taxRate": 18, "tax": 180, "total": 1180, ... }
}
```

---

#### `GET /api/invoices/:id`

Returns a single invoice by MongoDB `_id`, with customer name and company populated.

---

#### `PUT /api/invoices/:id`

Updates an invoice. If `amount` or `taxRate` is included, `tax` and `total` are recalculated automatically.

**Request Body** — any subset of invoice fields:
```json
{ "status": "Paid", "amount": 2000, "taxRate": 5 }
```

---

#### `DELETE /api/invoices/:id`

Deletes an invoice. Returns `{ "success": true, "message": "Invoice deleted successfully" }`.

---

### 👤 Customers — `/api/customers`

#### `GET /api/customers`

Returns a paginated, searchable list of customers sorted alphabetically by name.

**Query Parameters**

| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | string | — | Filter by customer name (case-insensitive) |
| `page` | number | `1` | Page number |
| `limit` | number | `50` | Results per page |

---

#### `GET /api/customers/:id`

Returns a customer's full profile including all their invoices and aggregated billing metrics.

**Response**
```json
{
  "success": true,
  "data": {
    "customer": { "name": "Acme Corp", "company": "Acme Ltd" },
    "invoices": [ ... ],
    "metrics": {
      "totalInvoices": 12,
      "totalAmount": 50000,
      "totalTax": 9000,
      "totalBilled": 59000,
      "outstanding": 15000,
      "paidCount": 8,
      "overdueCount": 2,
      "unpaidCount": 1,
      "sentCount": 1,
      "draftCount": 0,
      "voidCount": 0
    }
  }
}
```

---

### 📊 Dashboard — `/api/dashboard`

#### `GET /api/dashboard/summary`

Returns global invoice statistics and total customer count.

**Response**
```json
{
  "success": true,
  "data": {
    "totalInvoices": 500,
    "totalRevenue": 2500000,
    "totalTax": 450000,
    "totalBilled": 2950000,
    "totalCustomers": 40,
    "paidInvoices": 210,
    "overdueInvoices": 35,
    "unpaidInvoices": 80,
    "sentInvoices": 95,
    "draftInvoices": 60,
    "voidInvoices": 20
  }
}
```

---

#### `GET /api/dashboard/top-customers`

Returns the top 5 customers ranked by total billed value, computed via MongoDB aggregation.

**Response**
```json
{
  "success": true,
  "data": [
    { "name": "Acme Corp", "company": "Acme Ltd", "totalValue": 320000, "totalAmount": 280000, "invoiceCount": 18 },
    ...
  ]
}
```

---

## 🗂️ Data Models

### Invoice

| Field | Type | Constraints |
|---|---|---|
| `invoiceId` | String | Required, unique |
| `customer` | ObjectId | Ref: `Customer`, required |
| `amount` | Number | Required, min 0 |
| `taxRate` | Number | Enum: `0`, `3`, `5`, `18`, `28` |
| `tax` | Number | Auto-computed |
| `total` | Number | Auto-computed (`amount + tax`) |
| `status` | String | Enum: `Draft`, `Sent`, `Unpaid`, `Overdue`, `Paid`, `Void` |
| `issueDate` | Date | Required |
| `dueDate` | Date | Required |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

Indexes: `status`, `dueDate`, `amount`, `issueDate`, `customer`

### Customer

| Field | Type | Constraints |
|---|---|---|
| `name` | String | Required, unique |
| `company` | String | Required |
| `createdAt` | Date | Auto (timestamps) |
| `updatedAt` | Date | Auto (timestamps) |

Indexes: `company`

---

## ❌ Error Handling

All errors are caught by the centralised `errorHandler` middleware and returned in a consistent format:

| Scenario | Status | Response |
|---|---|---|
| Mongoose `ValidationError` | `400` | `{ "success": false, "message": "Validation Error", "errors": [...] }` |
| Duplicate key (`code 11000`) | `400` | `{ "success": false, "message": "Duplicate value for field: <field>" }` |
| Invalid ObjectId (`CastError`) | `400` | `{ "success": false, "message": "Invalid ID format" }` |
| Resource not found | `404` | `{ "success": false, "message": "Invoice not found" }` |
| Unhandled server error | `500` | `{ "success": false, "message": "Internal Server Error" }` |

---

## 🐳 Docker

A production-ready `Dockerfile` is included, using the lightweight `node:20-alpine` image.

### Build & Run

```bash
# Build the image
docker build -t invoiceflow-backend .

# Run the container
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://<host>:27017/invoice_management \
  -e NODE_ENV=production \
  invoiceflow-backend
```

The container exposes port **5000** and installs only production dependencies via `npm ci --only=production`.

---

## 🧪 Testing

The test suite uses **Jest** and **Supertest** to run integration tests against a real MongoDB test database.

```bash
npm test
```

Tests run **in-band** (`--runInBand`) to avoid parallel connection conflicts, and the database connection is closed cleanly after all suites complete.

### Test Coverage

| Test | Endpoint | What it checks |
|---|---|---|
| List invoices | `GET /api/invoices` | `200`, pagination shape |
| Create invoice | `POST /api/invoices` | `201`, auto tax & total calculation |
| Get single invoice | `GET /api/invoices/:id` | `200`, correct `_id` |
| Update invoice | `PUT /api/invoices/:id` | `200`, recalculated tax on amount/taxRate change |
| Delete invoice | `DELETE /api/invoices/:id` | `200`, success flag |
| Dashboard summary | `GET /api/dashboard/summary` | `200`, `totalInvoices` present |
| Top customers | `GET /api/dashboard/top-customers` | `200`, array response |

> ⚠️ Tests connect to `invoice_test` database and clean up all created documents on teardown.

---

## 🔮 Future Improvements

- [ ] 🔐 **Authentication** — JWT middleware with protected routes and role-based access
- [ ] 📊 **Revenue Trends** — Monthly/quarterly aggregation endpoint for chart data
- [ ] 📤 **PDF Generation** — Server-side invoice PDF rendering with a library like Puppeteer
- [ ] 📧 **Email Delivery** — Send invoices to customers via Nodemailer or a transactional email API
- [ ] 🔔 **Overdue Alerts** — Scheduled job to flag and notify on past-due invoices
- [ ] ♻️ **Soft Delete** — Archive invoices instead of hard deleting
- [ ] 🌍 **Multi-Currency** — Currency field on invoices with exchange rate support
- [ ] 🧪 **Coverage Reports** — Jest `--coverage` with minimum thresholds in CI
- [ ] 🚦 **Rate Limiting** — `express-rate-limit` to protect public endpoints

---

## 👤 Author

<div align="center">

**Aditya Gupta**

[![GitHub](https://img.shields.io/badge/GitHub-adityaragaai-181717?style=for-the-badge&logo=github)](https://github.com/adityaragaai)
[![Email](https://img.shields.io/badge/Email-aditya.gupta%40raga.ai-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:aditya.gupta@raga.ai)

*Built with ☕ and a surprisingly large number of `console.log` statements.*

</div>

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** your feature branch
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit** your changes
   ```bash
   git commit -m "feat: add amazing feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open** a Pull Request

Please follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages and ensure tests pass before submitting.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Aditya Gupta](https://github.com/adityaragaai)

⭐ **Star this repo if you found it useful!** ⭐

</div>
