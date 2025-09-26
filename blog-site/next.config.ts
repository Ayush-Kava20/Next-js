import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

export default nextConfig;

module.exports = (phase: string) => {
  if(phase === PHASE_DEVELOPMENT_SERVER) {
    return{
       env: {
        MONGODB_URI: "mongodb+srv://nextjs-user:Next@cluster0.4umgihu.mongodb.net/nextjs?retryWrites=true&w=majority&appName=Cluster0",
        MONGODB_COLLECTION: "messages-dev"
       }
    }
  }

  return {
    env: {
      MONGODB_URI: "mongodb+srv://nextjs-user:Next@cluster0.4umgihu.mongodb.net/nextjs?retryWrites=true&w=majority&appName=Cluster0",
      MONGODB_COLLECTION: "messages"
    }
  }
}