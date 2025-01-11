/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
  "/",
  "/verify-email",
  "verify-password",
  "/api/transcripts",
  "/api/twilio/voice",
  "/api/twilio/transcription-callback",
  "/api/twilio/initiate-call",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /dashboard
 * @type {string[]}
 */

export const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/error",
  "/forgot-password",
  "/reset-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
