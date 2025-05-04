# IAWIA Node Backend

## Table of Contents

- [About](#about)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## About

IAWIA Node Backend is a Node.js-based API service that provides passport reading and verification functionality. It uses ML Kit for OCR processing of passport MRZ (Machine Readable Zone) and integrates with country-specific Certificate Signing Certificate Authority (CSCA) for passport verification. The service features secure endpoints for passport data extraction and verification.

## Prerequisites

- Node.js v22.x
- npm or yarn
- Redis (for caching)
- Firebase Admin SDK credentials
- ML Kit API credentials
- CSCA certificates

## Project Structure

```
src/
├── config/                # Configuration files
├── controllers/          # Request handlers
├── middlewares/         # Custom middleware functions
├── models/              # Database models and schemas
├── routes/              # API route definitions
├── services/            # Business logic layer
│   ├── ocr/            # ML Kit OCR processing
│   ├── mrz/            # MRZ parsing and validation
│   └── verification/   # CSCA verification
├── utils/               # Utility functions and helpers
└── index.ts            # Application entry point
```

### Key Directories

1. **config/**

   - Environment configurations
   - ML Kit configurations
   - CSCA certificate configurations
   - Firebase configurations
   - Redis configurations

2. **controllers/**

   - Passport reading endpoints
   - MRZ processing endpoints
   - Verification endpoints
   - Input validation
   - Response formatting

3. **middlewares/**

   - Authentication middleware
   - Request validation
   - Error handling
   - Rate limiting

4. **models/**

   - Passport data models
   - MRZ data structures
   - Verification results

5. **routes/**

   - API route definitions
   - Endpoint mappings
   - Route grouping

6. **services/**

   - OCR processing with ML Kit
   - MRZ parsing and validation
   - CSCA verification
   - Complex operations and workflows

7. **utils/**
   - Helper functions
   - Common utilities
   - Shared tools

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-org/iawia-node-backend.git
   cd iawia-node-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

   Update the following variables in your `.env` file:

   ```
   PORT=3000
   NODE_ENV=development

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=

   # ML Kit Configuration
   ML_KIT_API_KEY=your-api-key
   ML_KIT_PROJECT_ID=your-project-id

   # CSCA Configuration
   CSCA_CERTIFICATE_URL=https://your-country-csca-url
   CSCA_CERTIFICATE_PATH=/path/to/certificates

   # Firebase Configuration
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_PRIVATE_KEY=your-private-key
   FIREBASE_CLIENT_EMAIL=your-client-email
   ```

4. Set up Redis:

   - macOS (using Homebrew):
     ```bash
     brew install redis
     brew services start redis
     ```
   - Linux:
     ```bash
     sudo apt-get install redis-server
     sudo systemctl start redis-server
     ```
   - Windows: Download from [Redis Windows](https://github.com/microsoftarchive/redis/releases)

5. Set up ML Kit:

   a. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project
   - Enable ML Kit API
   - Generate API credentials

   b. Configure ML Kit:
   - Add the API key to your `.env` file
   - Set up the project ID
   - Configure OCR settings

6. Set up CSCA Certificates:

   a. Download CSCA Certificates:
   - Visit your country's CSCA certificate repository
   - Download the latest certificates
   - Place them in the configured certificate path

   b. Configure Certificate Path:
   - Update `CSCA_CERTIFICATE_PATH` in `.env`
   - Ensure proper file permissions

7. Build or run the project:

   ```bash
   npm run build

   # Run in development mode
   npm run dev
   ```

## API Documentation

The API documentation is available through Swagger UI at `/api-docs` endpoint. The API is organized into the following sections:

### 1. Passport Reading Endpoints (`/api/v1/passport/`)

#### OCR Processing

- `POST /api/v1/passport/ocr` - Process passport image using ML Kit OCR
- `POST /api/v1/passport/mrz` - Extract and validate MRZ data

#### Verification

- `POST /api/v1/passport/verify` - Verify passport using CSCA certificates
- `GET /api/v1/passport/status/{id}` - Get verification status

### Authentication

The API uses Firebase Authentication:

- Required for all endpoints
- Add `Authorization` header with Bearer token
- Example: `Authorization: Bearer your-firebase-token`

### Error Responses

All endpoints may return the following error responses:

```json
{
  "code": "ERROR_CODE",
  "message": "Error message"
}
```

Common error codes:

- `401` - Unauthorized (Invalid token)
- `400` - Bad Request (Invalid input)
- `422` - Unprocessable Entity (Invalid MRZ)
- `429` - Too Many Requests

## License

Licensed to the Apache Software Foundation (ASF) under one or more contributor license agreements. See the NOTICE file distributed with this work for additional information regarding copyright ownership. The ASF licenses this file to you under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
