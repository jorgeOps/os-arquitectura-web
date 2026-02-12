import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-02-11";

// Validate required environment variables
if (!projectId) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable. " +
    "Please add it to your .env.local file or configure it in your deployment platform (Vercel)."
  );
}

if (!dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_DATASET environment variable. " +
    "Please add it to your .env.local file or configure it in your deployment platform (Vercel)."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production", // Use CDN in production for better performance
});

// Helper function to generate image URLs from Sanity image assets
const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
