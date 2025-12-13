# @awakentax/crypto-tax

Tax SDK for Awaken - Easily integrate crypto tax calculation links into your application.

## Step 1: Get an API Key

To use this SDK, you'll need an API key. Please contact **andrew@awaken.tax** to obtain your API key.

## Installation

```bash
npm install @awakentax/crypto-tax
```

or with yarn:

```bash
yarn add @awakentax/crypto-tax
```

## Usage

### Initialize the SDK

First, import and initialize the SDK with your API key:

```typescript
import { CryptoTaxSDK } from '@awakentax/crypto-tax';

const cryptotax = new CryptoTaxSDK({
  apiKey: 'your-api-key-here'
});
```

### Get the Link URL

Create a link by providing wallet addresses:

```typescript
import type { CreateLinkRequest } from '@awakentax/crypto-tax';

const request: CreateLinkRequest = {
  wallets: [
    {
      address: '0x1234567890123456789012345678901234567890',
      name: 'My Main Wallet' // Optional
    },
    {
      address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'
    }
  ]
};

const response = await cryptotax.createLink(request);
console.log('Link URL:', response.url);
console.log('Link Code:', response.code);
```

### Open the Link

Once you have the URL, you can open it in a browser or redirect your users:

```typescript
// In a browser environment
window.location.href = response.url;

// Or open in a new tab/window
window.open(response.url, '_blank');

// In a Node.js environment, you can log it or use a library like 'open'
console.log('Open this URL:', response.url);
```

### Complete Example

```typescript
import { CryptoTaxSDK } from '@awakentax/crypto-tax';
import type { CreateLinkRequest } from '@awakentax/crypto-tax';

async function createTaxLink() {
  // Initialize SDK
  const cryptotax = new CryptoTaxSDK({
    apiKey: process.env.AWAKEN_API_KEY!,
  });

  // Prepare wallet data
  const request: CreateLinkRequest = {
    wallets: [
      {
        address: '0x1234567890123456789012345678901234567890',
        name: 'My Main Wallet'
      }
    ]
  };

  try {
    // Create the link
    const { url, code } = await cryptotax.createLink(request);
    
    // Open the link (browser example)
    window.location.href = url;
    
    // Or redirect users to the tax calculation page
    // window.open(url, '_blank');
  } catch (error) {
    console.error('Failed to create link:', error);
  }
}
```

## What It Looks Like

<img width="1076" height="809" alt="Screenshot 2025-12-13 at 12 58 43 AM" src="https://github.com/user-attachments/assets/b7d09c69-0076-4753-bbd2-4b49eb533629" />

When you open up the URL we generate for you, it will look something like this. If the user doesn't have an Awaken account, it will prompt them to create one and then automatically add the wallets for them. If they already have an account, it'll be a one click add for them to link these wallets to their existing Awaken account.

## Alternative: Using cURL (Without SDK)

If you prefer not to use the SDK, you can make direct API calls using cURL:

### Create Partner Account Link

```bash
curl -X POST https://api.link.awaken.tax/api/links \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key-here" \
  -d '{
    "wallets": [
      {
        "address": "0x1234567890123456789012345678901234567890",
        "name": "My Wallet"
      },
      {
        "address": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd"
      }
    ]
  }'
```

**Request Body:**
- `wallets` (array, required): Array of wallet objects
  - `address` (string, required): Wallet address
  - `name` (string, optional): Wallet name

**Response:**
- Success (201): Returns `code` and `url` for the created link
- Success (200): Returns existing link if wallet hash already exists
- Error (400): Validation error with details
- Error (404): Partnership not found
- Error (500): Internal server error

**Example Response:**
```json
{
  "code": "abc123xyz",
  "url": "https://link.awaken.tax/abc123xyz"
}
```

## API Reference

### `CryptoTaxSDK`

#### Constructor

```typescript
new CryptoTaxSDK(options: SDKOptions)
```

**Options:**
- `apiKey` (string, required): Your API key
- `baseUrl` (string, optional): Base URL for the API. Defaults to `https://api.link.awaken.tax`

#### Methods

##### `createLink(request: CreateLinkRequest): Promise<CreateLinkResponse>`

Creates a new tax calculation link.

**Parameters:**
- `request.wallets`: Array of wallet objects with `address` (required) and optional `name`

**Returns:**
- `code`: Unique code for the link
- `url`: Full URL to access the tax calculation interface
