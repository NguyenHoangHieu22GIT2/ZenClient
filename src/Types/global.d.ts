declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SERVER_AUTH_VALIDATE_REGISTER: string;
      NEXT_PUBLIC_SERVER_AUTH_LOGIN: string;
      NEXT_PUBLIC_SERVER_AUTH_REGISTER: string;
      NEXT_PUBLIC_SERVER_AUTH_VALIDATE_ACCOUNT: string;
      NEXT_PUBLIC_SERVER_URL: string;
      NEXT_PUBLIC_SERVER_URL_UPLOADS: string;
    }
  }
}

export {};
