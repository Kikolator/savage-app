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

#### Things to do:

- [ ] Add a db changed service to record db changes
- [ ] Update Readme function structure, code principals, and key folder
      descriptions.

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

To test the API you can send a `GET` request to
`localhost:5001/savage-coworking/europe-west3/api` and you should get a success
message with the API call counter.

To test the API authentication you can send a `GET` request with a key:value
pair in the header `x-api-key:{SAVAGE_API_KEY}` to `/api/test-key`. If the API
key is incorrect you should get an error message. I use the Postman App to test
API's.

## Project Structure

When structuring TypeScript functions in a Firebase project, maintaining
clarity, scalability, and ease of maintenance is key. Here’s how we further
organize our Firebase functions project to keep it well-structured and scalable
as our project grows:

### **1. Directory Structure**

The way I set up the folder structure is like this:

- The `api` folder contains an Express app, with all controllers and middleware
  for HTTP API calls.
- Event-triggers, like database writes or updates, are stored in the
  `event-triggers` folder
- Shared resources like services, utils and data models are stored in the `core`
  folder.

> - 📂 **functions**
>   - 📂 **lib**
>   - 📂 **src**
>     - 📂 **api**
>       - 📄 [index.ts](src/api/index.ts)
>       - 📂 **@types**
>         - 📄 [express.d.ts](src/api/@types/express.d.ts)
>       - 📂 **controllers**
>         - 📄 [controllers.ts](src/api/controllers/controllers.ts)
>         - 📄 [index.ts](src/api/controllers/index.ts)
>         - 📂 **root\-controllers**
>           - 📄
>             [root\-api\-controller.ts](src/api/controllers/root-controllers/root-api-controller.ts)
>           - 📄
>             [root\-controller.ts](src/api/controllers/root-controllers/root-controller.ts)
>       - 📂 **middleware**
>         - 📄 [index.ts](src/api/middleware/index.ts)
>         - 📄 [verify\-api\-key.ts](src/api/middleware/verify-api-key.ts)
>         - 📄 [verify\-idtoken.ts](src/api/middleware/verify-idtoken.ts)
>     - 📂 **core**
>       - 📂 **models**
>       - 📂 **services**
>       - 📂 **utils**
>         - 📄 [http\-response\-error.ts](src/core/utils/http-response-error.ts)
>     - 📄 [index.ts](src/index.ts)
> - 📄 [package.json](package.json)
> - 📄 [tsconfig.json](tsconfig.json)

### **Explanation of Key Folders:**
