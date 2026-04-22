/* eslint-disable @typescript-eslint/no-explicit-any */
/** @format */


export function serviceToSlug(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "-").toLowerCase();
}

export function slugToCategory(slug: string): string {
  return slug.replace(/-/g, "_").toUpperCase();
}

export function serviceToCategoryFormat(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "_").toUpperCase();
}


export function findServiceBySlug(services: any[], slug: string) {
  if (!services || !Array.isArray(services)) return null;

  return services.find(
    (service) => serviceToSlug(service.service_name) === slug
  );
}

export function servicesToNavFormat(services: any[]) {
  if (!services || !Array.isArray(services)) return [];

  return services.map((service) => ({
    name: service.service_name,
    slug: serviceToSlug(service.service_name),
  }));
}

export const formatDate = (date?: string | Date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const cleanExcerpt = (text?: string) => {
  if (!text) return "-";

  const withoutHtml = text.replace(/<[^>]*>/g, " ");
  return withoutHtml
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
};

export const formatDeadline = (date?: string) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Open until filled";

export const isExpired = (date?: string) =>
  date ? new Date(date) < new Date() : false;

export const toList = (value?: string[]) =>
  Array.isArray(value) ? value.filter(Boolean) : [];