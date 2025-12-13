# Examples

This directory contains example implementations demonstrating how to use the `@awakentax/crypto-tax` SDK in different environments.

## Prerequisites

1. **Get an API Key**: Contact **andrew@awaken.tax** to obtain your API key
2. **Set up environment variables**: Copy `.env.example` to `.env` and add your API key:
   ```bash
   cp .env.example .env
   # Then edit .env and add your API key
   ```

## Examples

### 1. Node.js CLI Example

A simple command-line example that creates a tax calculation link.

**Location**: `node-cli/example.ts`

**Run it**:
```bash
# Set your API key
export AWAKEN_API_KEY="your-api-key-here"

# Run with ts-node (if installed globally)
ts-node examples/node-cli/example.ts

# Or build and run
npm run build
node dist/cjs/examples/node-cli/example.js
```

**What it does**:
- Initializes the SDK with your API key
- Creates a link with example wallet addresses
- Displays the generated link URL and code

### 2. Simple Web Example

A standalone HTML file that demonstrates SDK usage in a browser environment.

**Location**: `web-simple/index.html`

**Run it**:
```bash
# Simply open the HTML file in your browser
open examples/web-simple/index.html

# Or serve it with a simple HTTP server
cd examples/web-simple
python3 -m http.server 8000
# Then visit http://localhost:8000
```

**What it does**:
- Provides a user-friendly form to input wallet addresses
- Allows adding multiple wallets dynamically
- Creates tax links via the API
- Displays the result with a link to open the tax calculation page

**Note**: This example calls the API directly since importing npm packages in a simple HTML file requires a bundler. For production, consider using a bundler like Webpack or Vite.

### 3. Express.js Server Example

A complete Express.js server that provides a REST API for creating tax links.

**Location**: `express-server/`

**Run it**:
```bash
# Install dependencies (if not already installed)
npm install express
npm install --save-dev @types/express

# Set your API key
export AWAKEN_API_KEY="your-api-key-here"

# Run with ts-node
ts-node examples/express-server/server.ts

# Or build and run
npm run build
node dist/cjs/examples/express-server/server.js
```

**What it does**:
- Creates an Express.js server with REST endpoints
- Provides `/api/create-link` endpoint for creating tax links
- Includes a simple web interface at the root URL
- Demonstrates server-side SDK integration

**Endpoints**:
- `GET /health` - Health check endpoint
- `POST /api/create-link` - Create a new tax calculation link
- `GET /api/link/:code` - Lookup link by code (placeholder)

**Example API call**:
```bash
curl -X POST http://localhost:3000/api/create-link \
  -H "Content-Type: application/json" \
  -d '{
    "wallets": [
      {
        "address": "0x1234567890123456789012345678901234567890",
        "name": "My Main Wallet"
      }
    ]
  }'
```

## Common Patterns

### Error Handling

All examples include error handling. The SDK throws errors when:
- API key is invalid
- Network requests fail
- Invalid wallet addresses are provided
- API returns an error response

### Wallet Address Validation

Wallet addresses should be valid Ethereum addresses (42 characters starting with `0x`). The SDK will validate addresses on the server side.

### Storing Link Codes

In production applications, you'll likely want to:
- Store link codes in your database
- Associate them with user accounts
- Track usage and analytics
- Implement link expiration if needed

## Next Steps

1. **Integrate into your application**: Use these examples as a starting point for your own integration
2. **Add authentication**: Secure your API endpoints with proper authentication
3. **Add database storage**: Store link codes and associate them with users
4. **Add error handling**: Implement comprehensive error handling and user feedback
5. **Add analytics**: Track link creation and usage

## Support

For questions or issues:
- Email: andrew@awaken.tax
- Check the main [README.md](../README.md) for API documentation

