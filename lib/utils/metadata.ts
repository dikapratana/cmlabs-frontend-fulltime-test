export function buildPageUrl(pathname = "/") {
  const baseUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");

  return new URL(pathname, baseUrl).toString();
}
