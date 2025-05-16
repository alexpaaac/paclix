/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false, // Activer l'optimisation des images
    formats: ["image/webp"], // Utiliser WebP quand c'est possible
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048], // Tailles d'appareils pour les images responsive
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // Tailles d'images pour les images responsive
  },
  // Optimisation de la compilation
  //swcMinify: true, // Utiliser SWC pour la minification
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Supprimer les console.log en production
  },
  // Optimisation du chargement
  experimental: {
    optimizeCss: true, // Optimiser le CSS
    optimizePackageImports: ["framer-motion", "lucide-react"], // Optimiser les imports de packages
  },
  async redirects() {
    return [
      {
        source: "/tarifs",
        destination: "/",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
