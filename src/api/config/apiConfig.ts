export const API_CONFIG = {
  currency: {
    baseUrl: "https://economia.awesomeapi.com.br/json/last",
    timeout: 8000,
  },
  // The Elleva api. Public endpoints only: the site never sends credentials.
  elleva: {
    baseUrl: import.meta.env.VITE_ELLEVA_API_URL || "https://api.elleva.me/api",
    timeout: 8000,
  },
} as const;
