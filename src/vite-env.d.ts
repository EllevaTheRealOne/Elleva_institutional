/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_ELLEVA_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Build stamp injected by vite.config.ts (`define`); busts the locale JSON cache. */
declare const __BUILD_ID__: string;
