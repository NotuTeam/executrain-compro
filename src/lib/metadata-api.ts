const API_URL = process.env.NEXT_PUBLIC_API || 'https://excelearn-api.vercel.app/api/v1';

export interface PageMetadata {
  _id: string;
  page: string;
  title: string;
  description: string;
  keywords: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  og_type?: string;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  author?: string;
  language?: string;
  viewport?: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
  json_ld?: Record<string, any>;
  status: string;
}

export async function getPageMetadata(page: string): Promise<PageMetadata | null> {
  try {
    const response = await fetch(`${API_URL}/metadata/public/${page}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Metadata not found for page: ${page}`);
      return null;
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error(`Failed to fetch metadata for page ${page}:`, error);
    return null;
  }
}

export function generateMetadataObject(pageMetadata: PageMetadata | null, baseUrl: string) {
  if (!pageMetadata) {
    return null;
  }

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    keywords: pageMetadata.keywords?.join(', '),
    canonical: pageMetadata.canonical_url,
    robots: {
      index: pageMetadata.robots?.index ?? true,
      follow: pageMetadata.robots?.follow ?? true,
    },
    openGraph: {
      title: pageMetadata.og_title || pageMetadata.title,
      description: pageMetadata.og_description || pageMetadata.description,
      url: pageMetadata.canonical_url || baseUrl,
      type: pageMetadata.og_type || 'website',
      images: pageMetadata.og_image ? [{ url: pageMetadata.og_image }] : undefined,
      locale: pageMetadata.language || 'id_ID',
    },
    twitter: {
      card: pageMetadata.twitter_card || 'summary_large_image',
      title: pageMetadata.twitter_title || pageMetadata.title,
      description: pageMetadata.twitter_description || pageMetadata.description,
      images: pageMetadata.twitter_image ? [pageMetadata.twitter_image] : undefined,
    },
    authors: pageMetadata.author ? [{ name: pageMetadata.author }] : undefined,
    viewport: pageMetadata.viewport || 'width=device-width, initial-scale=1.0',
  };
}
