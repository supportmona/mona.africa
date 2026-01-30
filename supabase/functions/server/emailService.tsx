import { Resend } from "npm:resend@6.9.1";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

/**
 * Envoie un email de bienvenue à un expert approuvé
 */
export async function sendApprovalEmail(
  expertEmail: string,
  firstName: string,
  lastName: string
): Promise<{ success: boolean; error?: string }> {
  const expertName = `${firstName} ${lastName}`;
  
  try {
    await resend.emails.send({
      from: "M.O.N.A <noreply@monafrica.net>",
      to: expertEmail,
      subject: "🎉 Bienvenue dans la communauté M.O.N.A !",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #F9F7F4;
              }
              .container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 4px 12px rgba(199, 122, 90, 0.08);
              }
              .header {
                text-align: center;
                margin-bottom: 32px;
                padding-bottom: 24px;
                border-bottom: 2px solid #D4C4B0;
              }
              .logo {
                font-size: 32px;
                font-weight: 600;
                color: #C77A5A;
                margin-bottom: 8px;
              }
              .tagline {
                font-size: 14px;
                color: #B8A079;
                font-style: italic;
              }
              h1 {
                color: #C77A5A;
                font-size: 28px;
                margin: 24px 0 16px 0;
              }
              p {
                margin: 16px 0;
                color: #333333;
              }
              .highlight {
                background: linear-gradient(120deg, #F3E8DC 0%, transparent 100%);
                padding: 20px;
                border-left: 4px solid #C77A5A;
                margin: 24px 0;
                border-radius: 4px;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #C77A5A 0%, #B8A079 100%);
                color: white !important;
                text-decoration: none;
                padding: 14px 32px;
                border-radius: 8px;
                margin: 24px 0;
                font-weight: 600;
              }
              .footer {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #D4C4B0;
                text-align: center;
                font-size: 12px;
                color: #999;
              }
              .signature {
                margin-top: 32px;
                font-style: italic;
                color: #B8A079;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">M.O.N.A</div>
                <div class="tagline">Mieux-être • Optimisation • Neuro-Apaisement</div>
              </div>
              
              <h1>Félicitations ${expertName} ! 🎊</h1>
              
              <p>Nous sommes ravis de vous annoncer que votre candidature pour rejoindre la communauté M.O.N.A a été <strong>approuvée avec succès</strong>.</p>
              
              <div class="highlight">
                <p style="margin: 0;"><strong>Vous faites désormais partie d'une communauté d'excellence</strong> qui combine innovation technologique canadienne et ancrage stratégique en Afrique francophone.</p>
              </div>
              
              <p>En tant qu'expert M.O.N.A, vous aurez accès à :</p>
              <ul>
                <li>📱 Un portail expert dédié avec tableau de bord personnalisé</li>
                <li>👥 Un système de matching intelligent avec nos membres</li>
                <li>🔒 Des outils de téléconsultation sécurisés et FHIR-compatibles</li>
                <li>🌍 Une plateforme "Africa-Ready" avec mode offline-first</li>
                <li>💼 Des opportunités B2B avec nos partenaires entreprises</li>
              </ul>
              
              <p>Votre expertise en <strong>${expertName.split(" ")[2] || "santé mentale"}</strong> contribuera à offrir un accompagnement de qualité à nos membres dans nos trois hubs : Kinshasa, Dakar et Abidjan.</p>
              
              <p style="text-align: center;">
                <a href="https://monafrica.net/expert/login" class="cta-button">
                  Accéder à mon espace Expert
                </a>
              </p>
              
              <p>Notre équipe vous contactera prochainement pour finaliser votre onboarding et vous présenter nos outils de travail.</p>
              
              <p class="signature">
                Bienvenue dans la famille M.O.N.A ! 🌟<br>
                L'équipe M.O.N.A
              </p>
              
              <div class="footer">
                <p>M.O.N.A - Plateforme de santé mentale premium<br>
                Kinshasa • Dakar • Abidjan</p>
                <p style="margin-top: 8px;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`✅ Email d'approbation envoyé à ${expertEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Erreur envoi email d'approbation:`, error);
    return { success: false, error: error.message };
  }
}

/**
 * Envoie un email de refus bienveillant à un candidat
 */
export async function sendRejectionEmail(
  candidateEmail: string,
  firstName: string,
  lastName: string
): Promise<{ success: boolean; error?: string }> {
  const candidateName = `${firstName} ${lastName}`;
  
  try {
    await resend.emails.send({
      from: "M.O.N.A <noreply@monafrica.net>",
      to: candidateEmail,
      subject: "Votre candidature M.O.N.A",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                line-height: 1.6;
                color: #333333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #F9F7F4;
              }
              .container {
                background: white;
                border-radius: 16px;
                padding: 40px;
                box-shadow: 0 4px 12px rgba(199, 122, 90, 0.08);
              }
              .header {
                text-align: center;
                margin-bottom: 32px;
                padding-bottom: 24px;
                border-bottom: 2px solid #D4C4B0;
              }
              .logo {
                font-size: 32px;
                font-weight: 600;
                color: #C77A5A;
                margin-bottom: 8px;
              }
              .tagline {
                font-size: 14px;
                color: #B8A079;
                font-style: italic;
              }
              h1 {
                color: #C77A5A;
                font-size: 28px;
                margin: 24px 0 16px 0;
              }
              p {
                margin: 16px 0;
                color: #333333;
              }
              .highlight {
                background: linear-gradient(120deg, #F3E8DC 0%, transparent 100%);
                padding: 20px;
                border-left: 4px solid #B8A079;
                margin: 24px 0;
                border-radius: 4px;
              }
              .footer {
                margin-top: 40px;
                padding-top: 24px;
                border-top: 1px solid #D4C4B0;
                text-align: center;
                font-size: 12px;
                color: #999;
              }
              .signature {
                margin-top: 32px;
                font-style: italic;
                color: #B8A079;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">M.O.N.A</div>
                <div class="tagline">Mieux-être • Optimisation • Neuro-Apaisement</div>
              </div>
              
              <h1>Cher(e) ${candidateName},</h1>
              
              <p>Nous tenions tout d'abord à vous remercier sincèrement pour l'intérêt que vous portez à M.O.N.A et pour le temps consacré à votre candidature.</p>
              
              <p>Après un examen attentif de votre profil, nous avons le regret de vous informer que nous ne pourrons malheureusement pas donner suite à votre candidature à ce stade.</p>
              
              <div class="highlight">
                <p style="margin: 0;">Cette décision ne reflète en aucun cas vos compétences ou votre valeur professionnelle. Notre sélection répond à des critères spécifiques liés à notre positionnement actuel et à la composition de notre équipe d'experts.</p>
              </div>
              
              <p>Nous vous encourageons vivement à :</p>
              <ul>
                <li>🔄 Soumettre une nouvelle candidature dans quelques mois, car nos besoins évoluent constamment</li>
                <li>🌟 Continuer à développer votre expertise dans votre domaine</li>
                <li>📬 Rester en contact avec nous pour de futures opportunités</li>
              </ul>
              
              <p>Nous conservons votre dossier dans notre base de données et n'hésiterons pas à vous recontacter si une opportunité correspondant à votre profil se présente.</p>
              
              <p>Nous vous souhaitons beaucoup de succès dans vos projets professionnels et espérons sincèrement avoir l'opportunité de collaborer avec vous à l'avenir.</p>
              
              <p class="signature">
                Avec toute notre considération,<br>
                L'équipe M.O.N.A
              </p>
              
              <div class="footer">
                <p>M.O.N.A - Plateforme de santé mentale premium<br>
                Kinshasa • Dakar • Abidjan</p>
                <p style="margin-top: 8px;">Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    console.log(`✅ Email de refus envoyé à ${candidateEmail}`);
    return { success: true };
  } catch (error) {
    console.error(`❌ Erreur envoi email de refus:`, error);
    return { success: false, error: error.message };
  }
}