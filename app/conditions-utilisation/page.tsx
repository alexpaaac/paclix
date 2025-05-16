import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Paclix",
  description: "Conditions générales de vente et d'utilisation des services Paclix",
}

export default function ConditionsUtilisationPage() {
  return (
    <main className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Conditions Générales de Vente et d'Utilisation
          </h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Dernière mise à jour :{" "}
              {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
            </p>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="objet">
                1. Objet et champ d'application
              </h2>
              <p className="mb-4">
                Les présentes Conditions Générales de Vente et d'Utilisation (ci-après "CGVU") ont pour objet de définir
                les conditions dans lesquelles la société Paclix (ci-après "Paclix") fournit ses services de gestion
                intelligente des emails (ci-après les "Services") à ses clients professionnels (ci-après le "Client").
              </p>
              <p>
                Ces CGVU s'appliquent, sans restriction ni réserve, à l'ensemble des Services proposés par Paclix sur sa
                plateforme accessible à l'adresse www.paclix.com (ci-après la "Plateforme").
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="description">
                2. Description des services
              </h2>
              <p className="mb-4">
                Paclix propose une solution d'intelligence artificielle permettant d'automatiser la gestion des emails
                professionnels. Les Services comprennent notamment :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>L'analyse automatique du contenu des emails</li>
                <li>La catégorisation et le tri intelligent des messages</li>
                <li>La génération de réponses automatiques personnalisées</li>
                <li>La priorisation des messages selon leur importance</li>
                <li>L'extraction et la synthèse d'informations clés</li>
                <li>Des tableaux de bord analytiques sur la gestion des emails</li>
              </ul>
              <p>
                Les fonctionnalités précises des Services sont décrites sur la Plateforme et peuvent être adaptées selon
                les offres souscrites par le Client.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="acces">
                3. Accès aux services et autorisations
              </h2>
              <p className="mb-4">
                Pour accéder aux Services, le Client doit créer un compte sur la Plateforme et autoriser Paclix à
                accéder à sa messagerie électronique. Cette autorisation est nécessaire au fonctionnement des Services
                et s'effectue via des protocoles sécurisés (OAuth 2.0 ou équivalent).
              </p>
              <p className="mb-4">
                Le Client s'engage à fournir des informations exactes lors de la création de son compte et à maintenir
                ces informations à jour. Il est seul responsable de la préservation de la confidentialité de ses
                identifiants de connexion.
              </p>
              <p>
                Paclix se réserve le droit de refuser l'accès aux Services, unilatéralement et sans préavis, en cas
                d'utilisation non conforme aux présentes CGVU.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="conditions-financieres">
                4. Conditions financières
              </h2>
              <p className="mb-4">
                Les tarifs des différentes offres de Services sont indiqués sur la Plateforme. Sauf mention contraire,
                ces tarifs sont exprimés en euros et hors taxes.
              </p>
              <p className="mb-4">
                Le paiement s'effectue selon les modalités choisies par le Client parmi celles proposées sur la
                Plateforme (abonnement mensuel ou annuel, prélèvement automatique, etc.).
              </p>
              <p className="mb-4">
                Paclix se réserve le droit de modifier ses tarifs à tout moment. Toute modification tarifaire sera
                notifiée au Client au moins 30 jours avant son entrée en vigueur et s'appliquera aux renouvellements
                d'abonnement postérieurs à cette date.
              </p>
              <p>
                En cas de retard de paiement, Paclix pourra suspendre l'accès aux Services jusqu'à régularisation, sans
                préjudice de toute action en recouvrement.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="duree">
                5. Durée, suspension et résiliation
              </h2>
              <p className="mb-4">
                L'abonnement aux Services est conclu pour la durée choisie par le Client lors de la souscription
                (mensuelle ou annuelle) et se renouvelle automatiquement pour une durée identique, sauf résiliation par
                l'une des parties.
              </p>
              <p className="mb-4">
                Le Client peut résilier son abonnement à tout moment depuis son espace client sur la Plateforme. La
                résiliation prendra effet à l'échéance de la période d'abonnement en cours, sans remboursement prorata
                temporis.
              </p>
              <p className="mb-4">
                Paclix peut suspendre ou résilier l'accès aux Services en cas de violation des présentes CGVU, notamment
                en cas de :
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Utilisation frauduleuse ou abusive des Services</li>
                <li>Non-paiement des sommes dues</li>
                <li>Fourniture d'informations erronées</li>
                <li>Atteinte aux droits de tiers</li>
              </ul>
              <p>
                En cas de résiliation, quelle qu'en soit la cause, le Client reste tenu des obligations nées pendant la
                durée du contrat.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="responsabilites">
                6. Responsabilités et garanties
              </h2>
              <p className="mb-4">
                Paclix s'engage à fournir les Services avec diligence et selon les règles de l'art, étant précisé qu'il
                pèse sur elle une obligation de moyens, à l'exclusion de toute obligation de résultat.
              </p>
              <p className="mb-4">
                Paclix ne saurait être tenue responsable des dommages indirects subis par le Client, tels que perte de
                données, perte de chance, perte de chiffre d'affaires ou atteinte à l'image.
              </p>
              <p className="mb-4">
                Le Client est seul responsable de l'utilisation qu'il fait des Services et des contenus qu'il traite via
                la Plateforme. Il garantit Paclix contre toute réclamation de tiers liée à cette utilisation.
              </p>
              <p>
                La responsabilité de Paclix ne pourra être engagée qu'en cas de faute prouvée et sera limitée aux
                préjudices directs subis par le Client, dans la limite du montant total payé par ce dernier au cours des
                12 mois précédant le fait générateur de responsabilité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="propriete">
                7. Propriété intellectuelle
              </h2>
              <p className="mb-4">
                Tous les éléments de la Plateforme et des Services (textes, logos, images, éléments graphiques,
                logiciels, etc.) sont protégés par le droit de la propriété intellectuelle et demeurent la propriété
                exclusive de Paclix ou de ses partenaires.
              </p>
              <p className="mb-4">
                Le Client bénéficie d'un droit d'usage personnel, non exclusif et non transférable sur les Services,
                limité à la durée de son abonnement.
              </p>
              <p>
                Toute reproduction, représentation, modification ou exploitation non expressément autorisée de tout ou
                partie de la Plateforme ou des Services est interdite et pourra faire l'objet de poursuites.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="donnees">
                8. Protection des données personnelles
              </h2>
              <p className="mb-4">
                Paclix s'engage à respecter la réglementation applicable en matière de protection des données
                personnelles, notamment le Règlement Général sur la Protection des Données (RGPD) et la Loi Informatique
                et Libertés.
              </p>
              <p className="mb-4">
                Les modalités de traitement des données personnelles sont détaillées dans la Politique de
                Confidentialité accessible sur la Plateforme.
              </p>
              <p className="mb-4">
                En utilisant les Services, le Client accepte que Paclix traite les données personnelles contenues dans
                ses emails aux fins de fourniture des Services. Le Client garantit avoir obtenu le consentement des
                personnes concernées lorsque celui-ci est requis.
              </p>
              <p>
                Paclix agit en qualité de sous-traitant au sens du RGPD pour les données personnelles contenues dans les
                emails du Client. Un contrat de sous-traitance précisant les obligations respectives des parties peut
                être conclu sur demande du Client.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="confidentialite">
                9. Confidentialité
              </h2>
              <p className="mb-4">
                Chaque partie s'engage à maintenir confidentielles les informations de l'autre partie auxquelles elle
                pourrait avoir accès dans le cadre de l'exécution des Services, notamment les informations commerciales,
                financières ou techniques.
              </p>
              <p className="mb-4">
                Paclix met en œuvre des mesures techniques et organisationnelles appropriées pour garantir la sécurité
                et la confidentialité des données traitées via les Services.
              </p>
              <p>
                Cette obligation de confidentialité survivra à la fin de la relation contractuelle pour une durée de 5
                ans.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="force-majeure">
                10. Force majeure
              </h2>
              <p className="mb-4">
                Aucune des parties ne pourra être tenue responsable d'un manquement à ses obligations contractuelles dû
                à un cas de force majeure tel que défini par l'article 1218 du Code civil et la jurisprudence des
                tribunaux français.
              </p>
              <p className="mb-4">
                La partie invoquant un cas de force majeure devra en informer l'autre partie dans les plus brefs délais
                et mettre en œuvre tous les efforts raisonnables pour limiter les conséquences de cet événement.
              </p>
              <p>
                Si le cas de force majeure persiste au-delà de 30 jours, chaque partie pourra résilier le contrat sans
                indemnité.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="droit-applicable">
                11. Droit applicable et juridiction compétente
              </h2>
              <p className="mb-4">Les présentes CGVU sont régies par le droit français.</p>
              <p className="mb-4">
                En cas de litige relatif à la formation, l'interprétation, l'exécution ou la résiliation des présentes
                CGVU, les parties s'efforceront de trouver une solution amiable.
              </p>
              <p>
                À défaut d'accord amiable, tout litige sera soumis à la compétence exclusive des tribunaux de Paris,
                nonobstant pluralité de défendeurs ou appel en garantie.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="api-google">
                12. Dispositions spécifiques pour l'API Google
              </h2>
              <p className="mb-4">
                L'utilisation des Services implique l'accès à l'API Google pour les Clients utilisant Gmail. Cette
                utilisation est soumise aux Conditions d'Utilisation des API Google disponibles à l'adresse :
                https://developers.google.com/terms/.
              </p>
              <p className="mb-4">Conformément aux exigences de Google, Paclix s'engage à :</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Limiter l'utilisation des données à la fourniture des Services</li>
                <li>Ne pas vendre les données obtenues via l'API Google</li>
                <li>Ne pas utiliser ces données à des fins publicitaires</li>
                <li>Permettre aux utilisateurs de révoquer l'accès à leurs données</li>
              </ul>
              <p>
                Le Client reconnaît que Google peut suspendre l'accès à ses API en cas de violation de ses conditions
                d'utilisation, ce qui pourrait affecter certaines fonctionnalités des Services.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="modification">
                13. Modification des CGVU
              </h2>
              <p className="mb-4">
                Paclix se réserve le droit de modifier les présentes CGVU à tout moment. Toute modification sera
                notifiée au Client par email et/ou par affichage sur la Plateforme au moins 30 jours avant son entrée en
                vigueur.
              </p>
              <p className="mb-4">
                En cas de désaccord avec les nouvelles CGVU, le Client peut résilier son abonnement avant leur entrée en
                vigueur. À défaut, les nouvelles CGVU seront réputées acceptées.
              </p>
              <p>La version des CGVU applicable est celle en vigueur à la date d'utilisation des Services.</p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4" id="acceptation">
                14. Acceptation du Client
              </h2>
              <p className="mb-4">
                En souscrivant aux Services, le Client reconnaît avoir pris connaissance des présentes CGVU et les
                accepter sans réserve.
              </p>
              <p className="mb-4">
                Le Client reconnaît également que les présentes CGVU prévalent sur tout autre document, notamment ses
                propres conditions générales d'achat.
              </p>
              <p>
                Pour toute question relative aux présentes CGVU, le Client peut contacter Paclix à l'adresse suivante :
                contact@paclix.com.
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
