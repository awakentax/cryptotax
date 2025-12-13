# Next.js Example

This is a Next.js example application demonstrating how to use the `@awakentax/crypto-tax` SDK.

## Features

- **Modern UI**: Built with Next.js 16, React 19, and Tailwind CSS
- **SDK Integration**: Demonstrates client-side usage of the `@awakentax/crypto-tax` package
- **Dynamic Wallet Management**: Add and remove multiple wallet addresses
- **Error Handling**: Comprehensive error handling and user feedback
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

1. **Get an API Key**: Contact **andrew@awaken.tax** to obtain your API key

### Installation

1. Navigate to the example directory:
   ```bash
   cd examples/nextjs
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

3. Enter your API key and wallet addresses to create tax calculation links

## Usage

1. **Enter API Key**: Input your API key in the form (contact andrew@awaken.tax if you need one)

2. **Add Wallet Addresses**: 
   - Click "Add Wallet" to add multiple wallets
   - Enter Ethereum wallet addresses (0x...)
   - Optionally add a name for each wallet

3. **Create Link**: Click "Create Tax Link" to generate a tax calculation link

4. **View Results**: The generated link code and URL will be displayed, and you can click the URL to open the tax calculation page

## Project Structure

```
nextjs/
├── app/
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page with SDK integration
│   └── globals.css     # Global styles
├── public/             # Static assets
├── package.json        # Dependencies and scripts
└── README.md          # This file
```

## SDK Usage

The example demonstrates client-side usage of the SDK:

```typescript
import { CryptoTaxSDK, type Wallet } from "@awakentax/crypto-tax";

// Initialize the SDK
const sdk = new CryptoTaxSDK({ apiKey: "your-api-key" });

// Create a link
const response = await sdk.createLink({
  wallets: [
    { address: "0x...", name: "My Wallet" }
  ]
});

// Use the response
console.log(response.code); // Link code
console.log(response.url);  // Link URL
```

## Production Considerations

For production applications, consider:

1. **Server-Side Usage**: Move SDK calls to API routes for better security
2. **Environment Variables**: Store API keys in environment variables (`.env.local`)
3. **Error Handling**: Implement comprehensive error handling and user feedback
4. **Validation**: Add client-side and server-side validation for wallet addresses
5. **Loading States**: Implement proper loading states and user feedback
6. **Authentication**: Add user authentication if needed

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [@awakentax/crypto-tax SDK](../README.md)
- [Main Project README](../../README.md)

## Support

For questions or issues:
- Email: andrew@awaken.tax
- Check the main [README.md](../../README.md) for API documentation
