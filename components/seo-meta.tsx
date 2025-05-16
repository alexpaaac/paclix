import Head from "next/head"

interface SeoMetaProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
}

export function SeoMeta({
  title = "Paclix Agency | IA pour Experts-Comptables",
  description = "Réinventez la relation client grâce à l'intelligence artificielle. Paclix optimise la gestion des mails pour les experts-comptables.",
  canonical = "",
  ogImage = "/images/og-image.jpg",
}: SeoMetaProps) {
  // Utiliser une URL relative pour l'image OG
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : ogImage

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
    </Head>
  )
}
