declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string
      MONGODB_URI: string
      JWT_SECRET: string
      OPEN_AI_KEY: string
      OPEN_AI_MODEL: string
      FRONT_URL: string
    }
  }
}

export {}
