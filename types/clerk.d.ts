// types/clerk.d.ts
import { UserResource } from "@clerk/nextjs";

declare module "@clerk/nextjs" {
  // Extend the UserResource type to include privateMetadata
  interface UserResource {
    privateMetadata?: {
      role?: string;
      hasPurchased?: boolean;
    };
  }
}

// types/clerk.d.ts
export interface ClerkUser {
  id: string;
  email_addresses: { email_address: string }[];
  image_url: string;
  private_metadata: {
    hasPurchased?: string[];
  };
}
