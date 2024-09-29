# Savage Coworking Functions

The Node.js server functions for the Savage Coworking application. Built with
Typescript, Express, Firebase Authentication, Firebase Admin SDK, Firestore,
Mailgrid API, Holded API.

The main aspects of this project are

- an `API HTTP trigger` (2nd Gen):

  - A well organised `API` folder
  - Access Control:
    - Firebase authentication claims
    - API key
  - Rejects requests anywhere by throwing a `HttpResponseError(status, message)`

- Firebase `Events Triggers` (2nd gen):

Shared components are in the `core` folder:

- Models
- Services
- Utils

[API authentication](#api-authentication)  
[Claim authentication](#claim-authentication)  
[Project structure](#project-structure)

## Run Server

Make sure to use node version as specified in [package.json](./package.json)

```bash
nvm use node 22
```

Run npm serve from functions directory to run server.

```bash
npm run serve
```

## API Authentication

To secure your Firebase Functions API with an **API key authentication** layer,
you can follow these steps to ensure that every public API request includes a
valid key. This API key can be passed in request headers, and Firebase Functions
can verify the key before allowing the request to proceed.

### **Steps to Implement API Key Authentication:**

1. **Set up environment variables for the API key.**
2. **Create a middleware function to authenticate the API key.**
3. **Use the middleware in your API routes.**
4. **Deploy and test the API key-protected functions.**

### **1. Store the API Key in Environment Variables**

First, store the API key securely in your Firebase project’s environment
variables. You can manage environment variables with Firebase using the
`functions:config` command.

#### **Set up environment variables for API key:**

Add function secret parameter. see docs:
https://firebase.google.com/docs/functions/config-env?gen=2nd

### **2. Create a Middleware Function for API Key Authentication**

Create a middleware function that checks the incoming request for a valid API
key.

#### **src/middleware/authenticateApiKey.ts**:

```typescript
import { Request, Response, NextFunction } from 'firebase-functions';

/**
 * Middleware to authenticate API requests using an API key.
 */
export const authenticateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Get the API key from the request headers
  const apiKey = req.headers['x-api-key'];

  // Check if the API key is present
  if (!apiKey) {
    return res.status(401).json({ error: 'Unauthorized: API key is missing' });
  }

  // Get the expected API key from Firebase environment config
  const validApiKey = process.env.FIREBASE_CONFIG
    ? JSON.parse(process.env.FIREBASE_CONFIG).api.key
    : null;

  // Validate the API key
  if (apiKey !== validApiKey) {
    return res.status(403).json({ error: 'Forbidden: Invalid API key' });
  }

  // If the API key is valid, allow the request to proceed
  next();
};
```

### **3. Use the Middleware in Your API Routes**

Now, use the `authenticateApiKey` middleware in the routes where you want to
enforce API key authentication.

#### **src/routes/leadRoutes.ts**:

```typescript
import * as functions from 'firebase-functions';
import { LeadController } from '../controllers/leadController';
import { authenticateApiKey } from '../middleware/authenticateApiKey'; // Import the middleware

// Secure routes with the API key middleware
export const createLead = functions.https.onRequest((req, res) => {
  authenticateApiKey(req, res, () => LeadController.createLead(req, res));
});

export const getLeads = functions.https.onRequest((req, res) => {
  authenticateApiKey(req, res, () => LeadController.getLeads(req, res));
});
```

In this code, the `authenticateApiKey` middleware is used to ensure that every
request to the `createLead` and `getLeads` functions is authenticated using the
API key. If the API key is missing or invalid, the middleware will block the
request.

### **4. Deploy and Test the API Key-Protected Functions**

After adding the middleware, deploy your functions:

```bash
firebase deploy --only functions
```

### **5. Client-side API Requests**

When calling your Firebase Functions API from the client or a third-party
service, make sure to include the API key in the request headers:

#### **Example Request using Fetch (JavaScript)**:

```javascript
fetch('https://your-firebase-function-url/leads', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your_api_key_value', // Include the API key here
  },
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Error:', error));
```

### **6. Advanced: Rotate API Keys**

If you need to rotate or manage multiple API keys (e.g., for different clients),
you can modify the approach slightly:

- Store multiple API keys in the Firebase environment (e.g., `api.keys` as a
  JSON object).
- Update the middleware to check the incoming API key against a list of valid
  keys.

#### **Handling Multiple API Keys**:

```typescript
const validApiKeys = process.env.FIREBASE_CONFIG
  ? JSON.parse(process.env.FIREBASE_CONFIG).api.keys
  : [];
if (!validApiKeys.includes(apiKey)) {
  return res.status(403).json({ error: 'Forbidden: Invalid API key' });
}
```

You can then manage multiple API keys and rotate them by updating the
environment variables without needing to change your code.

---

### **Summary:**

- **API Key Authentication**: Use API key authentication as an additional
  security layer for your Firebase Functions, ensuring only authorized clients
  can access your API.
- **Middleware**: Use a middleware function to check the validity of the API key
  for each incoming request.
- **Environment Variables**: Store API keys securely in Firebase environment
  variables, which can be managed via the Firebase CLI.
- **Scalability**: The solution can be extended to manage multiple API keys or
  rotate keys by using environment configuration.

This approach helps secure your Firebase backend while keeping your code modular
and manageable.

## Project Structure

When structuring TypeScript functions in a Firebase project, maintaining
clarity, scalability, and ease of maintenance is key. Here’s how we further
organize our Firebase functions project to keep it well-structured and scalable
as our project grows:

### **1. Directory Structure**

A typical folder structure for a Firebase project using TypeScript might look
like this:

```bash
functions/
│
├── src/
│   ├── controllers/
│   │   ├── leadController.ts        # Functions that handle logic for leads
│   │   ├── userController.ts        # Functions that handle logic for users
│   │
│   ├── services/
│   │   ├── leadService.ts           # Lead business logic (DB interactions, validation)
│   │   ├── userService.ts           # User business logic
│   │
│   ├── models/
│   │   ├── lead.ts                  # TypeScript interfaces/models
│   │   ├── user.ts                  # Other data models
│   │
│   ├── routes/
│   │   ├── leadRoutes.ts            # Firebase function routes for leads
│   │   ├── userRoutes.ts            # Routes for user-related functions
│   │
│   ├── utils/
│   │   ├── db.ts                    # Utility to initialize and manage DB connection
│   │   ├── validation.ts            # Helper functions for input validation
│   │   ├── logger.ts                # Logging utility
│   │
│   ├── index.ts                     # Main entry point for Firebase functions
│
├── package.json                     # NPM dependencies
├── tsconfig.json                    # TypeScript configuration
├── firebase.json                    # Firebase configuration
└── .firebaserc                      # Firebase project settings
```

### **Explanation of Key Folders:**

- **`src/models/`**:

  - You've already started with this, where you store your TypeScript models and
    interfaces. This folder should contain all data models, such as `Lead`,
    `User`, etc.

- **`src/controllers/`**:
  - This folder handles the logic for specific functions. For example, if you're
    handling incoming leads, you would put the core logic (e.g., how to process
    the lead, validation checks) here.
  - These controllers orchestrate the logic by calling services or utilities and
    interacting with the database.
- **`src/services/`**:

  - Services are responsible for handling specific business logic and managing
    interaction with the database. For example, `leadService.ts` could handle
    all operations related to creating, updating, or retrieving leads from a
    database.
  - The controllers call these services to keep the separation of concerns
    intact.

- **`src/routes/`**:

  - Define your Firebase functions here. Each file handles different sets of
    routes for various features, like `leadRoutes.ts` for lead-related
    functions, `userRoutes.ts` for user-related routes, etc.
  - This structure helps keep your `index.ts` file clean by separating the
    actual Firebase HTTP/Callable routes into dedicated files.

- **`src/utils/`**:
  - Place reusable utilities here, such as database connection management, input
    validation, and logging.
  - `db.ts` could manage initializing and configuring connections to services
    like Cloud SQL (PostgreSQL), Firestore, etc.

### **2. Code Structure for Firebase Functions**

#### **Example `src/controllers/leadController.ts`:**

```typescript
import { Request, Response } from 'firebase-functions';
import { LeadService } from '../services/leadService';

export class LeadController {
  static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const newLead = await LeadService.createLead(req.body);
      res.status(201).json(newLead);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async getLeads(req: Request, res: Response): Promise<void> {
    try {
      const leads = await LeadService.getLeads();
      res.status(200).json(leads);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
```

#### **Example `src/services/leadService.ts`:**

```typescript
import { Lead } from '../models/lead';

export class LeadService {
  static async createLead(leadData: Lead): Promise<Lead> {
    // Add database logic here to save leadData to PostgreSQL
    // Example:
    const newLead = { ...leadData, id: Date.now().toString() }; // Placeholder logic
    // Save newLead to the database
    return newLead;
  }

  static async getLeads(): Promise<Lead[]> {
    // Fetch all leads from the database
    return [];
  }
}
```

#### **Example `src/routes/leadRoutes.ts`:**

```typescript
import * as functions from 'firebase-functions';
import { LeadController } from '../controllers/leadController';

export const createLead = functions.https.onRequest(LeadController.createLead);
export const getLeads = functions.https.onRequest(LeadController.getLeads);
```

#### **Example `src/models/lead.ts`:**

```typescript
export interface Lead {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  startDate: Date;
  why: string;
}
```

#### **Example `src/index.ts`:**

```typescript
import * as functions from 'firebase-functions';
import { createLead, getLeads } from './routes/leadRoutes';

// Export all functions
exports.api = functions.https.onRequest((app) => {
  app.use('/leads', createLead);
  app.use('/leads', getLeads);
});
```

### **3. Key Principles for Structuring Firebase Functions:**

1. **Separation of Concerns**:

   - **Controllers** handle the HTTP/Callable request and response logic.
   - **Services** handle business logic and database interactions.
   - **Models** define the structure of your data.
   - **Routes** define Firebase function routes in a modular way.

2. **Scalability**:

   - As your project grows, this structure makes it easy to add new features or
     routes without bloating any single file.
   - Adding a new feature (e.g., `userController.ts`) would be as simple as
     creating new controllers, services, and models in their respective folders.

3. **Modularity**:

   - Breaking down the functionality into smaller, modular parts makes it easier
     to maintain the codebase and manage dependencies.
   - Each feature or domain (e.g., leads, users) gets its own controller,
     service, and model files.

4. **Clean Index File**:
   - Keep the `index.ts` file clean by importing routes from `routes/` rather
     than defining all Firebase functions in the `index.ts` itself.

### **4. Testing and Validation:**

- **Unit Tests**: Add unit tests for your services and controllers. Each
  function can be tested independently for easier debugging.
- **Validation**: Use libraries like `class-validator` or write your own utility
  to validate incoming data in controllers or services.

---

### **Summary:**

By organizing your Firebase Functions with this structure, you:

- Keep your code modular, maintainable, and scalable.
- Separate responsibilities between controllers, services, and models.
- Make it easier to introduce new features or refactor existing ones.
- Ensure that your project can scale easily as the complexity of your business
  logic increases.
