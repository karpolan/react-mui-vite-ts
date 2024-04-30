import { envRequired, getCurrentEnvironment } from "@/utils/environment";

export const IS_DEBUG = import.meta.env.VITE_DEBUG === "true"; // Enables logging, etc.

export const IS_PRODUCTION = getCurrentEnvironment() === "production"; // Enables analytics, etc.

export const PUBLIC_URL = envRequired(import.meta.env.VITE_PUBLIC_URL);

export const FAKE_LOGIN = import.meta.env.VITE_FAKE_LOGIN === "true"; // Enables fake login for development

IS_DEBUG &&
  console.log("@/config", {
    IS_DEBUG,
    IS_PRODUCTION,
    PUBLIC_URL,
    FAKE_LOGIN,
  });
