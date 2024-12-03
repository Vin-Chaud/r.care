[Handover notes from Tar](./HANDOVER.md)

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

### Stripe/RevenueCat Configuration

| Variable                                   | Example        |
| ------------------------------------------ | -------------- |
| RCARE__STRIPE__API_SECRET                  | sk_test_xxxxxx |
| RCARE__STRIPE__CATALOG__ANNUAL_PRICE_ID    | price_xxxxxx   |
| RCARE__STRIPE__CATALOG__QUARTERLY_PRICE_ID | price_xxxxxx   |

### Stripe/RevenueCat Integration Configuration

RevenueCat must be set up to [integrate with Stripe](https://www.revenuecat.com/docs/web/stripe). Once this is properly connected, there is an
"integration API" key for Stripe that can be found on RevenueCat.
(Important: this is not a Stripe API key, nor is it the generic RevenueCat API key, it is the Stripe-specific app API key for this integration, which
is found in RevenueCat's integration UI.)

A [Stripe webhook](https://docs.stripe.com/webhooks)
must then be set up for `<server_url>/api/stripe_webhook`
and it must listen for the
[`customer.subscription.created`](https://docs.stripe.com/api/events/types#event_types-customer.subscription.created) event.
This is needed for the correct forwarding of Stripe checkouts to customer
creation on RevenueCat. See [here](https://www.revenuecat.com/docs/web/stripe#5-send-stripe-tokens-to-revenuecat)
for details.

Note down Stripe webhook's secret (in Stripe) and the Stripe-RevenueCat
integration API key (in RevenueCat) and add to the configuration:

| Variable                          | Example     |
| --------------------------------- | ----------- |
| RCARE__STRIPE__WEBHOOK_SECRET     | whsec_xxxxx |
| RCARE__REVENUECAT__STRIPE_API_KEY | strp_xxxxx  |


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

### Tracking Configuration

These variables are optional. Supplying them activates respective analytic tracking.


| Variable                       | Example            | Comment                     |
| ------------------------------ | ------------------ | --------------------------- |
| RCARE__TRACKING__GOOGLE_TAG_ID | `G-1ABC2DEFGH3`    | Enables Google Tag Tracking |
| RCARE__TRACKING__META_PIXEL_ID | `1234567890123456` | Enables Meta Pixel Tracking |

### Development-only Configuration

These variables are intended for development use only. They can be set locally
or on non-production Vercel branches. They should not be used in production.

| Variable       | Example                            | Comment                                                                                                                                                                                                                                   |
| -------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DEV_SESSION_ID | `k1xwsax8xe9jm9p3tlz1hxwppaq3kv21` | Overrides the onboarding session ID. This lets you fix or "hijack" one of the sessions that's already on Firestore database. Setting this causes the server to ignore the session ID cookie ignore any attempt to initiate a new session. |
