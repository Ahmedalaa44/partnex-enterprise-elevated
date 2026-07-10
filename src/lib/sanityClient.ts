import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "",
  dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2026-07-01",
  useCdn: import.meta.env.VITE_SANITY_USE_CDN !== "false",
  ignoreBrowserTokenWarning: true,
};

export const sanityClient = createClient(sanityConfig);
export const imageBuilder = createImageUrlBuilder(sanityConfig);

export function urlFor(source: unknown) {
  return source ? imageBuilder.image(source).auto("format").url() : "";
}

export function isSanityConfigured() {
  return Boolean(sanityConfig.projectId && sanityConfig.dataset);
}

export async function sanityFetch<T>(query: string) {
  return sanityClient.fetch<T>(query);
}
