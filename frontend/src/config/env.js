function getEnv(key, fallback) {
  const value = import.meta.env[key] ?? fallback;

  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const env = {
  VITE_API_BASE_URL: getEnv("VITE_API_BASE_URL"),
  VITE_GOOGLE_CLIENT_ID: getEnv("VITE_GOOGLE_CLIENT_ID"),
};