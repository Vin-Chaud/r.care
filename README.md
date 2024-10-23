## About this project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Installation

```
pnpm i
```

## Starting the server locally

Make sure to [configure the server](#configuration) before starting.

```
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Configuration

Before starting the application, the following environment variables must be
provided. This can be done by supplying the `.env` file at the root
of the project in development, or by configuring environment variables in
Vercel in a deployment environment.

### Server Configuration

These variables allow the app to know about itself

| Variable                            | Example               | Notes        |
| ----------------------------------- | --------------------- | ------------ |
| RCARE__SERVER__BASE_URL             | http://localhost:3000 | (1)          |
| RCARE__SERVER__BASIC_AUTH__USERNAME |                       | Optional (2) |
| RCARE__SERVER__BASIC_AUTH__PASSWORD |                       | Optional (2) |


#### Notes
- (1) In Vercel, use the string `VERCEL` -- this will be correctly resolved
      to Vercel deployment's base URL.
- (2) These are optional. When both are specified, HTTP Basic Auth will be
      enabled. This can be used to hide a non-production deployment behind
      a password wall.

### Stripe Configuration

These variables allow the app to integrate with Stripe correctly.

| Variable                                   | Example        |
| ------------------------------------------ | -------------- |
| RCARE__STRIPE__API_SECRET                  | sk_test_xxxxxx |
| RCARE__STRIPE__CATALOG__ANNUAL_PRICE_ID    | price_xxxxxx   |
| RCARE__STRIPE__CATALOG__QUARTERLY_PRICE_ID | price_xxxxxx   |

### Firebase Configuration

| Variable                         | Example               | Comment                                                             |
| -------------------------------- | --------------------- | ------------------------------------------------------------------- |
| RCARE__FIREBASE__CREDENTIAL      | (see below)           | Firebase service account credential                                 |
| RCARE__FIREBASE__COLLECTION_PATH | rcare-onboarding-quiz | The name of the collection where the quiz results will be deposited |

A Firebase service account credential is a JSON (which typically needs to be flattened into one line when provided in an `.env` file.) It looks something like this:

```json
{
  "type":"service_account",
  "project_id":"xxxxx",
  "private_key_id":"xxxx",
  "private_key":"-----BEGIN PRIVATE KEY-----\nxxxxx\n+xxxxx\n+xxxxx\n-----END PRIVATE KEY-----\n",
  "client_email":"xxxp@yyyy.iam.gserviceaccount.com",
  "client_id":"11111",
  "auth_uri":"https://accounts.google.com/o/oauth2/auth",
  "token_uri":"https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url":"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-6b7yp%40xxxxx.iam.gserviceaccount.com",
  "universe_domain":"googleapis.com"
}
```

### App Configuration


| Variable       | Example                                             | Comment |
| -------------- | --------------------------------------------------- | ------- |
| RCARE__APP_URL | https://apps.apple.com/us/app/app-name/id1234567890 |
| The app URL.   |
