# Data Verification Extension App Reference Implementation
## Introduction
This reference implementation models seven data verification use cases:
* [Bank account owner verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/bank-account-owner-verification/)
* [Bank account verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/bank-account-verification/)
* [Business FEIN verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/business-fein-verification/)
* [Email address verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/email-address-verification/)
* [Phone verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/phone-verification/)
* [SSN verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/ssn-verification/)
* [Postal address verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/postal-address-verification/)

Each use case corresponds to a separate extension app manifest located in the [manifests](/manifests/) folder of this repository.

## Video Walkthrough
[![Reference implementation videos](https://img.youtube.com/vi/_4p7GWK5aoA/0.jpg)](https://youtube.com/playlist?list=PLXpRTgmbu4or5pJIFg6h1bg1Gt4wZTYbT&feature=shared)

## Setup instructions
### 1. Clone the repository
Run the following command to clone the repository:
```bash
git clone https://github.com/docusign/extension-app-data-verification-reference-implementation.git
```

### 2. [Install and configure Node.js and npm on your machine.](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

### 3. Generate secret values
- If you already have values for `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE`, you may skip this step.

The easiest way to generate a secret value is to run the following command:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'));"
```

You will need values for `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE`.

### 4. Set the environment variables for the cloned repository
- If you're running this in a development environment, create a copy of `example.development.env` and save it as `development.env`.
- If you're running this in a production environment, create a copy of `example.production.env` and save it as `production.env`.
- Replace `JWT_SECRET_KEY`, `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, and `AUTHORIZATION_CODE` in `development.env` or `production.env` with your generated values. These values will be used to configure the sample proxy's mock authentication server.

### 5. Install dependencies
Run the following command to install the necessary dependencies:
```bash
npm install
```
### 6. Running the proxy server
#### Development mode:
Start the proxy server in development mode by running the command:
```bash
npm run dev
```

This will create a local server on the port in the `development.env` file (port 3000 by default) that listens for local changes that trigger a rebuild.

#### Production mode:
Start the proxy server in production mode by running
npm run build
npm run start

This will start a production build on the port in the `production.env` file (port 3000 by default).

## Setting up ngrok
### 1. [Install and configure ngrok for your machine.](https://ngrok.com/docs/getting-started/)
### 2. Start ngrok
Run the following command to create a public accessible tunnel to your localhost:

```bash
ngrok http <PORT>
```

Replace `<PORT>` with the port number in the `development.env` or `production.env` file.

### 3. Save the forwarding address
Copy the `Forwarding` address from the response. You’ll need this address in your `manifest.json` file.

```bash
ngrok

Send your ngrok traffic logs to Datadog: https://ngrok.com/blog-post/datadog-log

Session Status                online
Account                       email@domain.com (Plan: Free)
Update                        update available (version 3.3.1, Ctrl-U to update)
Version                       3.3.0
Region                        United States (us)
Latency                       60ms
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://bbd7-12-202-171-35.ngrok-free.app -> http:

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

In this example, the `Forwarding` address to copy is `https://bbd7-12-202-171-35.ngrok-free.app`.

## Create an extension app
### 1. Prepare your app manifest
Choose a manifest from the [manifests](/manifests/) folder based on the appropriate data verification use case. Replace `<PROXY_BASE_URL>` in your .manifest.json file with the ngrok forwarding address in the following sections:
- `connections.params.customConfig.tokenUrl`
- `connections.params.customConfig.authorizationUrl`
- `actions.params.uri`

Update the following variables in your .manifest.json file with the corresponding environment variables:
- Set the `clientId` value in your .manifest.json file to the same value as `OAUTH_CLIENT_ID`.
- Set the `clientSecret` value in your .manifest.json file to the same value as `OAUTH_CLIENT_SECRET`.
### 2. Navigate to the Docusign [Developer Console](https://devconsole.docusign.com/)
Log in with your Docusign developer credentials and create a new app.
### 3. Upload your manifest and create the data verification app
[Create your extension app](https://developers.docusign.com/extension-apps/build-an-extension-app/create/)

## Test the extension app
This reference implementation uses mock data to simulate how data can be verified against a database. [Test your extension](https://developers.docusign.com/extension-apps/build-an-extension-app/test/) using the sample data in [sampleData.ts](src/constants/sampleData.ts).

Request bodies much match the appropriate [action contract](https://developers.docusign.com/extension-apps/extension-app-reference/app-manifest-reference/action/):
* [Bank account owner verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/bank-account-owner-verification/#request) example JSON request body:
  ```
  {
    "firstName": "Eliza",
    "lastName": "Monroe",
    "accountNumber": "123456789",
    "accountType": "checking",
    "routingNumber": "987654321"
  }
  ```
* [Bank account verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/bank-account-verification/#request) example JSON request body:
  ```
  {
    "accountNumber": "123456789",
    "accountType": "checking",
    "routingNumber": "987654321"
  }
  ```
* [Business FEIN verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/business-fein-verification/#request) example JSON request body:
  ```
  {
    "businessName": "VistaPeak Ventures",
    "fein": "11-1111111"
  }
  ```
* [Email address verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/email-address-verification/#request) example JSON request body:
  ```
  {
    "email": "theo.clarkson@gmail.com"
  }
  ```
* [Phone verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/phone-verification/#request) example JSON request body:
  ```
  {
    "phoneNumber": "1234567890",
    "region": "1"
  }
  ```
* [SSN verification](https://developers.docusign.com/extension-apps/extension-app-reference/action-contracts/ssn-verification/#request) example JSON request body:
  ```
  {
    "socialSecurityNumber": "111-11-1111",
    "firstName": "Nora",
    "lastName": "Bentley",
    "dateOfBirth": "1975-09-08"
  }
  ```

* [Postal address verification](https://developers.docusign.com/extension-apps/extension-app-reference/extension-contracts/postal-address-verification#request/) There are two actions required by the postal address data verification extension contract.
  * Verify.Version1.PostalAddress: This action will return the verified address with a successful response if the request body exactly matches an entry in the sample database.

    Example JSON request body:

    **Note:** "street2" is an optional parameter.
    ```
    {
      "street1": "123 Main St",
      "street2": "Apt 4B",
      "locality": "Springfield",
      "subdivision": "IL",
      "countryOrRegion": "US",
      "postalCode": "62701-1234"
    }

    ```

  * Typeahead.Version1.PostalAddress: This action will return a list of suggested addresses based on if the sample database contains one or more partial matches to the request body.

    Example JSON request body:

    **Note:** "street2" is an optional parameter.

    ```
    {
      "street1": "123 Main St",
      "street2": "Apt 4B",
      "locality": "Springfield",
      "subdivision": "IL",
      "countryOrRegion": "US",
      "postalCode": "62701"
    }

    ```
    Example JSON response:
    ```
    {
      "suggestions": [{
        "street1": "123 Main St",
        "street2": "Apt 4B",
        "locality": "Springfield",
        "subdivision": "IL",
        "countryOrRegion": "US",
        "postalCode": "62701-1234"
      }]
    }
    ```
