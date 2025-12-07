/** @format */

/**
 * Transform service name to URL slug format
 * Example: "IT Service" -> "it-service"
 * Example: "Web Development" -> "web-development"
 */
export function serviceToSlug(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "-").toLowerCase();
}

/**
 * Transform slug back to category format for API
 * Example: "it-service" -> "IT_SERVICE"
 */
export function slugToCategory(slug: string): string {
  return slug.replace(/-/g, "_").toUpperCase();
}

/**
 * Transform service name to category format
 * Example: "IT Service" -> "IT_SERVICE"
 */
export function serviceToCategoryFormat(serviceName: string): string {
  return serviceName.trim().replace(/\s+/g, "_").toUpperCase();
}

/**
 * Find service by slug from services array
 */
export function findServiceBySlug(services: any[], slug: string) {
  if (!services || !Array.isArray(services)) return null;

  return services.find(
    (service) => serviceToSlug(service.service_name) === slug
  );
}

/**
 * Transform services to navigation format
 */
export function servicesToNavFormat(services: any[]) {
  if (!services || !Array.isArray(services)) return [];

  return services.map((service) => ({
    name: service.service_name,
    slug: serviceToSlug(service.service_name),
  }));
}
