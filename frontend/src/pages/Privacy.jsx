import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-page" data-testid="privacy-page">
      <header className="landing-header">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }} data-testid="privacy-logo-home-link">
            <h1>pome</h1>
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-meta">
            Effective Date: 04/19/2026 &nbsp;·&nbsp; Last Updated: 04/19/2026
          </p>

          <nav className="legal-toc" aria-label="Table of contents">
            <h3>Contents</h3>
            <ol>
              <li><a href="#p-overview">Overview</a></li>
              <li><a href="#p-info-we-collect">Information We Collect</a></li>
              <li><a href="#p-how-we-use">How We Use Your Information</a></li>
              <li><a href="#p-sensitive">Sensitive &amp; Wellness Data</a></li>
              <li><a href="#p-sharing">Sharing of Information</a></li>
              <li><a href="#p-analytics">Analytics, Tracking &amp; Third-Party Tools</a></li>
              <li><a href="#p-retention">Data Retention</a></li>
              <li><a href="#p-rights">Your Privacy Rights</a></li>
              <li><a href="#p-security">Data Security</a></li>
              <li><a href="#p-children">Children's Privacy</a></li>
              <li><a href="#p-third-party-links">Third-Party Links &amp; Services</a></li>
              <li><a href="#p-changes">Changes to This Policy</a></li>
              <li><a href="#p-contact">Contact Us</a></li>
            </ol>
          </nav>

          <section id="p-overview" className="legal-section">
            <h2>1. Overview</h2>
            <p>
              Pome ("we," "our," or "us") is an iOS wellness application focused on emotional intelligence and well-being. We are operated by DataArtistry, LLC, a company formed under the laws of Florida.
            </p>
            <p>
              This Privacy Policy explains what personal information we collect when you use the Pome app and website at pomeapp.com ("Services"), how we use and protect it, and your rights regarding that information.
            </p>
            <p>
              By using Pome, you agree to the practices described in this policy. If you do not agree, please do not use the Services.
            </p>
          </section>

          <section id="p-info-we-collect" className="legal-section">
            <h2>2. Information We Collect</h2>

            <h3>Account Information</h3>
            <ul>
              <li>Name (optional)</li>
              <li>Email address</li>
              <li>Login credentials (password stored in hashed form; we never store plaintext passwords)</li>
            </ul>

            <h3>Wellness &amp; Emotional Content</h3>
            <p>Pome is designed for emotional exploration. In the course of using the app, you may provide:</p>
            <ul>
              <li>Mood check-ins, emotional state selections, and session responses</li>
              <li>Reflections, journal entries, and personal notes you choose to record</li>
              <li>Goal-setting inputs and well-being preferences</li>
            </ul>
            <p>This content may be sensitive in nature. Please see Section 4 for how we handle it.</p>

            <h3>Device &amp; Usage Information</h3>
            <ul>
              <li>Device type, operating system version, and app version</li>
              <li>IP address and approximate location (country/region level only; we do not track precise geolocation)</li>
              <li>App usage activity, feature interactions, and crash reports</li>
              <li>Push notification preferences</li>
            </ul>

            <h3>Payment Information</h3>
            <p>
              Any in-app purchases (including optional support/donation features) are processed entirely through Apple's App Store and governed by Apple's privacy policy. We do not receive, store, or process your credit card or payment details.
            </p>

            <h3>Information We Do Not Collect</h3>
            <ul>
              <li>We do not collect Social Security numbers, government IDs, or financial account data.</li>
              <li>We do not collect biometric data (facial recognition, fingerprints, etc.).</li>
              <li>We do not collect precise GPS location.</li>
            </ul>
          </section>

          <section id="p-how-we-use" className="legal-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, operate, and maintain the Pome app and its features</li>
              <li>Personalize your in-app experience based on your check-ins and preferences</li>
              <li>Analyze usage patterns to improve performance, fix bugs, and develop new features</li>
              <li>Send transactional communications (account verification, important service updates)</li>
              <li>Send optional marketing communications, with your consent, where required by law</li>
              <li>Detect fraud, abuse, and security incidents and protect the safety of our users</li>
              <li>Comply with our legal obligations</li>
            </ul>
            <p>
              We do not use your emotional or wellness content to serve you targeted advertisements, and we do not sell your personal data to third parties.
            </p>
          </section>

          <section id="p-sensitive" className="legal-section">
            <h2>4. Sensitive &amp; Wellness Data</h2>
            <div className="legal-callout">
              <strong>Important Health Disclaimer</strong>
              <p>
                Pome is a self-guided wellness and emotional intelligence tool. It is not a healthcare provider, medical device, or mental health treatment service. Your data is not protected health information ("PHI") under the Health Insurance Portability and Accountability Act (HIPAA) because Pome is not a HIPAA-covered entity. However, we treat all wellness content you share with a high standard of care.
              </p>
            </div>
            <p>
              We recognize that emotional content — including mood entries, reflections, and journal notes — is among the most personal information a person can share. We apply the following practices to protect it:
            </p>
            <ul>
              <li>Wellness content is encrypted in transit and at rest.</li>
              <li>Access to individual wellness content is strictly limited internally and is not shared with advertisers.</li>
              <li>We do not use your wellness content to train third-party AI/ML models without your explicit, separate consent.</li>
              <li>We may use aggregated, de-identified data derived from wellness inputs (stripped of all identifying information) to improve the app's effectiveness.</li>
            </ul>
          </section>

          <section id="p-sharing" className="legal-section">
            <h2>5. Sharing of Information</h2>
            <p>We do not sell your personal data. We may share information only in the following limited circumstances:</p>

            <h3>Service Providers</h3>
            <p>
              We work with third-party vendors who assist in operating Pome, including cloud hosting providers, analytics services, email delivery platforms, and crash-reporting tools. These providers access your data only to perform services on our behalf and are bound by confidentiality and data protection obligations.
            </p>

            <h3>Legal Requirements</h3>
            <p>
              We may disclose information if required to do so by law, regulation, legal process, or governmental request — such as a court order or subpoena — or when we believe disclosure is necessary to protect the rights, property, or safety of Pome, our users, or others.
            </p>

            <h3>Business Transfers</h3>
            <p>
              If Pome is involved in a merger, acquisition, financing, asset sale, or similar transaction, your information may be transferred as part of that transaction. We will notify you of any such change via email or a prominent in-app notice, and your information will remain subject to any privacy policy in effect at the time of transfer or a comparable one.
            </p>

            <h3>With Your Consent</h3>
            <p>We may share your information for other purposes with your explicit consent at the time of collection.</p>
          </section>

          <section id="p-analytics" className="legal-section">
            <h2>6. Analytics, Tracking &amp; Third-Party Tools</h2>
            <p>
              Pome uses third-party analytics, behavior analysis, and crash-reporting tools to understand how users interact with the app and website, diagnose technical issues, and improve the overall experience. These tools may collect device identifiers and usage data. They do not receive your wellness content, mood entries, or journal entries.
            </p>
            <p>The tools we currently use include:</p>
            <ul>
              <li>Firebase Analytics &amp; Crashlytics &mdash; app usage events, session data, and crash reporting</li>
              <li>Google Analytics (GA4) &mdash; website traffic and usage patterns</li>
              <li>Google Tag Manager &mdash; manages when and how analytics tools load on our website. It does not collect personal data directly.</li>
              <li>Email communications &mdash; If you opt in to email updates, your email address is shared with our email delivery provider solely for the purpose of sending those communications.</li>
            </ul>
            <p>
              Pome does not use advertising SDKs or allow behavioral advertising within the app. Pome is ad-free.
            </p>
            <p>Push notifications are opt-in and can be disabled at any time in your iOS device settings.</p>
          </section>

          <section id="p-retention" className="legal-section">
            <h2>7. Data Retention</h2>
            <p>
              We retain your account information and wellness content for as long as your account is active or as needed to provide our Services. If you delete your account, we will delete or anonymize your personal information within 30 days, except where retention is required by law or for legitimate business purposes (such as resolving disputes or complying with legal obligations).
            </p>
            <p>
              Aggregated, de-identified data that can no longer identify you may be retained indefinitely for product improvement purposes.
            </p>
            <p>
              To request deletion of your data, see Section 8 or contact us at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a>.
            </p>
          </section>

          <section id="p-rights" className="legal-section">
            <h2>8. Your Privacy Rights</h2>
            <p>Depending on where you live, you may have certain rights regarding your personal information.</p>

            <h3>Rights Available to All Users</h3>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Deletion:</strong> Request that we delete your personal information, subject to certain exceptions.</li>
              <li><strong>Correction:</strong> Request that we correct inaccurate information about you.</li>
              <li><strong>Portability:</strong> Receive a copy of your data in a structured, machine-readable format (where technically feasible).</li>
              <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from marketing emails at any time using the link in any email we send.</li>
            </ul>

            <h3>California Residents (CCPA / CPRA)</h3>
            <p>
              If you are a California resident, you have the right to know what personal information we collect, the right to delete, the right to correct, the right to opt-out of the sale or sharing of personal information (we do not sell or share your data), and the right not to be discriminated against for exercising these rights. To submit a verifiable consumer request, contact us at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a>.
            </p>

            <h3>Other U.S. State Privacy Laws</h3>
            <p>
              Residents of Virginia, Colorado, Connecticut, Texas, and other states with comprehensive privacy legislation may have similar rights, including the right to access, delete, correct, and opt out of certain processing. We honor applicable requests from residents of all U.S. states. Contact us to exercise any such rights.
            </p>

            <h3>Consumer Health Data</h3>
            <p>
              To the extent any state law (such as Washington's My Health MY Data Act or Nevada's consumer health data law) applies to wellness or emotional data you share with us, you may have additional rights, including the right to withdraw consent, the right to deletion of consumer health data, and the right to not be discriminated against. Contact us at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a> to exercise these rights.
            </p>
            <p>We will respond to verifiable requests within 45 days, with a possible 45-day extension when reasonably necessary.</p>
          </section>

          <section id="p-security" className="legal-section">
            <h2>9. Data Security</h2>
            <p>
              We implement reasonable administrative, technical, and physical safeguards to protect your information, including encryption of data in transit (TLS) and encryption of data at rest. Access to personal data internally is limited to personnel who need it to operate and improve the Services.
            </p>
            <p>
              No method of transmission over the internet or method of electronic storage is completely secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security. In the event of a data breach that affects your rights, we will notify you as required by applicable law.
            </p>
          </section>

          <section id="p-children" className="legal-section">
            <h2>10. Children's Privacy</h2>
            <p>
              Pome is intended for users 18 years of age and older. We do not knowingly collect personal information from anyone under 18. If we learn that we have inadvertently collected such information, we will delete it promptly. If you believe a minor has provided us with personal information, please contact us at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a>.
            </p>
            <p>The App is designed exclusively for adult users.</p>
          </section>

          <section id="p-third-party-links" className="legal-section">
            <h2>11. Third-Party Links &amp; Services</h2>
            <p>
              The app or website may contain links to third-party websites, resources, or services. This Privacy Policy applies only to Pome. We are not responsible for the privacy practices of any third party, and we encourage you to review their privacy policies before providing them with any personal information.
            </p>
          </section>

          <section id="p-changes" className="legal-section">
            <h2>12. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email (if we have your email address) or through a prominent in-app notice at least 14 days before the changes take effect. The "Last Updated" date at the top of this policy reflects the most recent revision. Your continued use of the Services after changes become effective constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section id="p-contact" className="legal-section">
            <h2>13. Contact Us</h2>
            <p>
              If you have questions, concerns, or requests related to this Privacy Policy or your personal information, please contact us:
            </p>
            <p>
              Email: <a href="mailto:care@pomeapp.com">care@pomeapp.com</a>
              <br />
              DataArtistry, LLC
            </p>
            <p>We take privacy inquiries seriously and will respond within a reasonable timeframe.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
