import Link from "next/link"
import ScrollReveal from "@/components/scroll-reveal"
import EnhancedGradientHero from "@/components/enhanced-gradient-hero"

export default function MentionsLegales() {
  return (
    <>
      {/* Hero Section with Texture */}
      <EnhancedGradientHero
        title="Mentions Légales"
        subtitle="Informations légales, RGPD et conditions générales"
        pattern={false}
      />

      {/* Legal Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <ScrollReveal>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Informations légales</h2>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Éditeur du site</h3>
                <p className="text-gray-700">
                  Le site Paclix Agency est édité par la société Paclix Agency, SAS au capital de 100 000 euros,
                  immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 123 456 789, dont le
                  siège social est situé au 123 Avenue de l'Innovation, 75008 Paris, France.
                </p>
                <p className="text-gray-700">
                  N° de TVA intracommunautaire : FR 12 345 678 901
                  <br />
                  Directeur de la publication : Sophie Martin, Présidente
                </p>
              </ScrollReveal>

              <ScrollReveal delay={2}>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Hébergement</h3>
                <p className="text-gray-700">
                  Le site est hébergé par la société Vercel Inc., dont le siège social est situé au 340 S Lemon Ave
                  #4133, Walnut, CA 91789, États-Unis.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Propriété intellectuelle</h3>
                <p className="text-gray-700">
                  L'ensemble du contenu du site Paclix Agency (structure, textes, logos, images, vidéos, etc.) est la
                  propriété exclusive de Paclix Agency ou de ses partenaires. Toute reproduction, représentation,
                  modification, publication, adaptation ou exploitation de tout ou partie des éléments du site, quel que
                  soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Paclix
                  Agency.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={3}>
                <h2 id="rgpd" className="text-2xl font-bold mt-12 mb-6 text-gray-900">
                  Politique de confidentialité (RGPD)
                </h2>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">
                  Collecte et traitement des données personnelles
                </h3>
                <p className="text-gray-700">
                  Conformément au Règlement Général sur la Protection des Données (RGPD), Paclix Agency s'engage à
                  protéger la confidentialité, la sécurité et l'exactitude des données personnelles collectées sur son
                  site.
                </p>
                <p className="text-gray-700">
                  Les données personnelles collectées sur ce site sont destinées à Paclix Agency et sont utilisées pour
                  les finalités suivantes :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2 mb-4">
                  <li>Gestion des demandes de contact et de démonstration</li>
                  <li>Envoi d'informations commerciales (avec consentement préalable)</li>
                  <li>Amélioration de nos services et de votre expérience utilisateur</li>
                  <li>Réalisation de statistiques anonymes sur l'utilisation du site</li>
                </ul>
              </ScrollReveal>

              <ScrollReveal delay={4}>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Durée de conservation des données</h3>
                <p className="text-gray-700">
                  Les données personnelles sont conservées pour une durée limitée en fonction des finalités du
                  traitement et conformément aux obligations légales.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Droits des utilisateurs</h3>
                <p className="text-gray-700">
                  Conformément à la réglementation en vigueur, vous disposez des droits suivants concernant vos données
                  personnelles :
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2 mb-4 hover-card p-2 rounded-lg">
                  <li>Droit d'accès</li>
                  <li>Droit de rectification</li>
                  <li>Droit à l'effacement (droit à l'oubli)</li>
                  <li>Droit à la limitation du traitement</li>
                  <li>Droit à la portabilité des données</li>
                  <li>Droit d'opposition</li>
                </ul>
                <p className="text-gray-700">
                  Pour exercer ces droits, vous pouvez nous contacter par email à l'adresse : rgpd@paclix-agency.com ou
                  par courrier à l'adresse du siège social.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={5}>
                <h2 id="cgu" className="text-2xl font-bold mt-12 mb-6 text-gray-900">
                  Conditions Générales d'Utilisation
                </h2>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Acceptation des conditions</h3>
                <p className="text-gray-700">
                  L'utilisation du site Paclix Agency implique l'acceptation pleine et entière des conditions générales
                  d'utilisation décrites ci-après. Ces conditions d'utilisation sont susceptibles d'être modifiées ou
                  complétées à tout moment.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Utilisation du site</h3>
                <p className="text-gray-700">
                  Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Tous les frais
                  nécessaires pour l'accès aux services (matériel informatique, logiciels, connexion Internet, etc.)
                  sont à la charge de l'utilisateur.
                </p>
                <p className="text-gray-700">
                  L'utilisateur est responsable de l'utilisation qu'il fait du site et s'engage à ne pas l'utiliser à
                  des fins illégales ou interdites par les présentes conditions générales.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={6}>
                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Limitation de responsabilité</h3>
                <p className="text-gray-700">
                  Paclix Agency s'efforce de fournir des informations aussi précises que possible. Toutefois, elle ne
                  pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour,
                  qu'elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
                <p className="text-gray-700">
                  Paclix Agency ne pourra être tenue responsable des dommages directs et indirects causés au matériel de
                  l'utilisateur, lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant
                  pas aux spécifications techniques requises, soit de l'apparition d'un bug ou d'une incompatibilité.
                </p>

                <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900">Contact</h3>
                <p className="text-gray-700">
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse email
                  suivante : legal@paclix-agency.com
                </p>

                <div className="mt-12 pt-8 border-t border-gray-200 hover-card p-4 rounded-lg">
                  <p className="text-gray-700">
                    Dernière mise à jour :{" "}
                    {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <p className="mt-4">
                    <Link href="/contact" className="text-primary-700 hover:underline shine-effect">
                      Contactez-nous
                    </Link>{" "}
                    pour toute question concernant ces mentions légales.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
