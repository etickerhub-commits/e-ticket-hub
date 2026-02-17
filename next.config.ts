import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  env: {
    NEXT_PUBLIC_FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
    NEXT_PUBLIC_FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
    NEXT_PUBLIC_FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
    NEXT_PUBLIC_FIREBASE_APPID: process.env.FIREBASE_APPID,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
