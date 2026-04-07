import type { NextConfig } from "next";

const mealDbHostname =
  process.env.MEAL_DB_API_HOST &&
  URL.canParse(process.env.MEAL_DB_API_HOST)
    ? new URL(process.env.MEAL_DB_API_HOST).hostname
    : "www.themealdb.com";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: mealDbHostname,
      },
    ],
  },
};

export default nextConfig;
