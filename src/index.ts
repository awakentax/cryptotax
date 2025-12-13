/**
 * Tax SDK for Awaken
 *
 * @packageDocumentation
 */

import type { CreateLinkRequest, CreateLinkResponse } from "./types";

export * from "./types";

export interface SDKOptions {
  apiKey: string;
  baseUrl?: string;
}

export class CryptoTaxSDK {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: SDKOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || "https://api.link.awaken.tax";
  }

  /**
   * Create a partner account link
   * @param request - The request containing wallets to link
   * @returns Promise resolving to the link response with code and url
   */
  async createLink(request: CreateLinkRequest): Promise<CreateLinkResponse> {
    const response = await fetch(`${this.baseUrl}/api/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const json = await response.json() as {data: CreateLinkResponse};
    
    return json.data;
  }
}
