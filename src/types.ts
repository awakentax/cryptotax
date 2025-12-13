/**
 * Type definitions for the Tax SDK
 */

export interface Wallet {
  address: string;
  name?: string;
}

export interface CreateLinkRequest {
  wallets: Wallet[];
}

export interface CreateLinkResponse {
  code: string;
  url: string;
}
