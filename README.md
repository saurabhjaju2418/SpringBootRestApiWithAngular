# Car Catalog

A modern full-stack CRUD application built with Angular 22 and Spring Boot 4.

## Technology stack

- Angular 22 standalone components, signals, built-in control flow, and typed HTTP services
- TypeScript 6, RxJS 7, Vitest, and pnpm
- Spring Boot 4.1, Java 17, Jakarta Persistence, Bean Validation, and Maven
- H2 for local development and Spring Boot Actuator health endpoints
- GitHub Actions for frontend and backend validation

## Prerequisites

- Node.js 24
- pnpm 10
- JDK 17 or newer

## Run locally

Start the API:

```bash
cd server
./mvnw spring-boot:run
```

In another terminal, start the client:

```bash
cd client
pnpm install --frozen-lockfile
pnpm start
```

Open `http://localhost:4200`. The Angular development server proxies `/api` requests to the API at `http://localhost:8080`.

## Verify

```bash
cd server && ./mvnw verify
cd ../client && pnpm install --frozen-lockfile && pnpm build && pnpm test -- --watch=false
```

The API exposes CRUD operations at `/api/cars` and health information at `/actuator/health`.

## Migration notes

This release replaces the Angular 5/CLI 1/Karma/Protractor client and Spring Boot 2/Java 8 server. It also removes the obsolete hard-coded Okta development configuration. Authentication should be reintroduced with an environment-specific OpenID Connect setup if the application is deployed beyond this demonstration environment.
