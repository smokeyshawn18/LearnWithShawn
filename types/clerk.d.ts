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
