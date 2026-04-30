import { createContext, useContext } from 'react';

const ApiContext = createContext(null);

/**
 * Provides both API endpoint URLs to the entire app.
 * Base URL is read from .env → VITE_API_URL (or falls back to localhost).
 */
export function ApiProvider({ children }) {
  const base = process.env.REACT_APP_API_URL;

  const api = {
    upload: `${base}/chat/upload`, // POST – multipart/form-data, field: "file"
    ask:    `${base}/chat/ask`,    // POST – { question: string } → { question, answer }
  };

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}

/** Hook to access API endpoints anywhere in the tree */
export function useApi() {
  return useContext(ApiContext);
}
