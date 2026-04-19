import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-page" data-testid="terms-page">
      <header className="landing-header">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }} data-testid="terms-logo-home-link">
            <h1>pome</h1>
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">Terms &amp; Conditions</h1>
          <p className="legal-meta">
            Effective Date: 04/19/2026 &nbsp;·&nbsp; Last Updated: 04/19/2026
          </p>

          <div className="legal-callout legal-callout-important">
            <strong>Please Read Carefully.</strong>
            <p>
              These Terms contain a binding arbitration agreement and class action waiver in Section 15. By using Pome, you agree to resolve disputes through individual arbitration rather than court proceedings or class actions. Please review Section 15 before agreeing to these Terms.
            </p>
          </div>

          <nav className="legal-toc" aria-label="Table of contents">
            <h3>Contents</h3>
            <ol>
              <li><a href="#t-acceptance">Acceptance of Terms</a></li>
              <li><a href="#t-nature">Nature of the Service</a></li>
              <li><a href="#t-not-medical">Not Medical or Healthcare Services</a></li>
              <li><a href="#t-crisis">Crisis &amp; Emergency Disclaimer</a></li>
              <li><a href="#t-accounts">User Accounts</a></li>
              <li><a href="#t-purchases">In-App Purchases &amp; Subscriptions</a></li>
              <li><a href="#t-user-content">User Content</a></li>
              <li><a href="#t-acceptable-use">Acceptable Use</a></li>
              <li><a href="#t-ip">Intellectual Property</a></li>
              <li><a href="#t-disclaimers">Disclaimers</a></li>
              <li><a href="#t-liability">Limitation of Liability</a></li>
              <li><a href="#t-indemnification">Indemnification</a></li>
              <li><a href="#t-termination">Termination</a></li>
              <li><a href="#t-governing-law">Governing Law</a></li>
              <li><a href="#t-arbitration">Binding Arbitration &amp; Class Action Waiver</a></li>
              <li><a href="#t-changes">Changes to These Terms</a></li>
              <li><a href="#t-contact">Contact Us</a></li>
            </ol>
          </nav>

          <section id="t-acceptance" className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              These Terms &amp; Conditions ("Terms") govern your access to and use of the Pome application, website at pomeapp.com, and all related services (collectively, the "Services"), operated by DataArtistry, LLC ("Pome," "we," "our," or "us").
            </p>
            <p>
              By downloading, accessing, or using Pome, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference. If you do not agree, please do not use the Services.
            </p>
            <p>You must be at least 18 years old to use Pome. By using the Services, you represent that you are 18 years of age or older.</p>
          </section>

          <section id="t-nature" className="legal-section">
            <h2>2. Nature of the Service</h2>
            <p>
              Pome is a self-guided emotional wellness application designed to support emotional intelligence, reflection, and personal well-being. Pome provides tools such as breathing exercises, mood check-ins, guided reflections, and other wellness features intended for informational and self-guided purposes.
            </p>
            <p>
              Pome is not a clinical service, therapy platform, or crisis intervention tool. It is designed to complement — not replace — professional care or human support systems.
            </p>
          </section>

          <section id="t-not-medical" className="legal-section">
            <h2>3. Not Medical or Healthcare Services</h2>
            <div className="legal-callout">
              <strong>Important Disclaimer</strong>
              <p>
                Pome does not provide medical advice, mental health diagnosis, psychiatric treatment, or any form of clinical care. Use of Pome does not create a physician–patient, therapist–client, or any other healthcare provider relationship.
              </p>
            </div>
            <p>
              The content, features, and outputs available through Pome — including breathing exercises, emotional reflections, and any AI-generated suggestions — are for informational and self-development purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always seek the advice of a qualified healthcare professional regarding any questions you may have about a medical condition, mental health diagnosis, medication, or treatment plan. Never disregard professional medical advice or delay seeking it because of something you have read or experienced in the app.
            </p>
          </section>

          <section id="t-crisis" className="legal-section">
            <h2>4. Crisis &amp; Emergency Disclaimer</h2>
            <div className="legal-callout legal-callout-warning">
              <strong>⚠ If You Are in Crisis — Read This First</strong>
              <p>
                Pome is not designed for use in emergencies or crisis situations. If you are experiencing a mental health emergency, are having thoughts of suicide or self-harm, or are in danger, please contact emergency services or a crisis resource immediately.
              </p>
              <ul>
                <li><strong>988</strong> — Suicide &amp; Crisis Lifeline (call or text)</li>
                <li><strong>911</strong> — Emergency Services</li>
                <li><strong>Crisis Text Line</strong> — Text HOME to 741741</li>
              </ul>
              <p>
                Do not attempt to access emergency care through Pome. If outside the United States, please contact your local emergency services or crisis resources immediately.
              </p>
            </div>
            <p>
              You agree that you will not use Pome as a substitute for professional crisis support, and that Pome and its team bear no responsibility for actions taken or not taken in a crisis situation.
            </p>
          </section>

          <section id="t-accounts" className="legal-section">
            <h2>5. User Accounts</h2>
            <p>To access certain features of Pome, you may be required to create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information when creating your account</li>
              <li>Maintain the security of your login credentials and not share them with others</li>
              <li>Notify us promptly at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a> if you suspect unauthorized access to your account</li>
              <li>Accept responsibility for all activity that occurs under your account</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these Terms or that we reasonably believe are being used fraudulently.
            </p>
          </section>

          <section id="t-purchases" className="legal-section">
            <h2>6. In-App Purchases &amp; Subscriptions</h2>
            <p>
              Pome may offer optional in-app purchases, including subscription plans and one-time support contributions, processed through the Apple App Store. All billing, refunds, and payment-related disputes are handled by Apple and governed by Apple's Terms of Service and applicable App Store policies.
            </p>
            <p>If you purchase a subscription:</p>
            <ul>
              <li>Your subscription will automatically renew at the end of each billing period unless you cancel at least 24 hours before the renewal date.</li>
              <li>You may manage or cancel your subscription at any time through your Apple ID account settings.</li>
              <li>We do not offer refunds for partial subscription periods, except where required by applicable law or Apple's refund policies.</li>
            </ul>
            <p>Pome does not collect or store your payment information. All payment data is handled solely by Apple.</p>
          </section>

          <section id="t-user-content" className="legal-section">
            <h2>7. User Content</h2>
            <p>
              You retain full ownership of all content you create within Pome, including journal entries, reflections, and personal notes ("User Content").
            </p>
            <p>
              By submitting User Content to Pome, you grant us a limited, non-exclusive, royalty-free license to store, process, and display your User Content solely for the purpose of operating and providing the Services to you. We do not claim ownership of your User Content and will not use it for marketing, advertising, or any purpose beyond operating the app, except in de-identified, aggregated form as described in our Privacy Policy.
            </p>
            <p>You represent that you own or have the rights to any User Content you submit and that doing so does not violate any third-party rights.</p>
          </section>

          <section id="t-acceptable-use" className="legal-section">
            <h2>8. Acceptable Use</h2>
            <p>You agree to use Pome only for lawful purposes and in accordance with these Terms. You agree not to:</p>
            <ul>
              <li>Use the Services for any illegal purpose or in violation of any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to any part of the Services or its infrastructure</li>
              <li>Reverse-engineer, decompile, or disassemble any portion of the app</li>
              <li>Transmit harmful, abusive, harassing, defamatory, or otherwise objectionable content</li>
              <li>Use the Services to impersonate another person or entity</li>
              <li>Use automated tools (bots, scrapers, crawlers) to access or interact with the Services</li>
              <li>Interfere with or disrupt the integrity or performance of the Services</li>
            </ul>
            <p>We reserve the right to remove content and suspend or terminate accounts for violations of these standards.</p>
          </section>

          <section id="t-ip" className="legal-section">
            <h2>9. Intellectual Property</h2>
            <p>
              The Pome name, logo, design, app interface, written content, visual elements, animations, and underlying technology are owned by DataArtistry, LLC and protected by applicable copyright, trademark, and intellectual property laws. Nothing in these Terms grants you any right to use our intellectual property other than to use the Services as described herein.
            </p>
            <p>
              If you believe that content on Pome infringes your intellectual property rights, please contact us at <a href="mailto:care@pomeapp.com">care@pomeapp.com</a> with a description of the alleged infringement.
            </p>
          </section>

          <section id="t-disclaimers" className="legal-section">
            <h2>10. Disclaimers</h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, POME DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
            <p>We do not warrant that:</p>
            <ul>
              <li>The Services will be available uninterrupted, error-free, or secure at all times</li>
              <li>Any content, suggestions, or features in the app are accurate, complete, or suitable for your individual circumstances</li>
              <li>Use of the Services will achieve any particular wellness or emotional outcome</li>
            </ul>
            <p>Your use of the Services is at your own risk.</p>
          </section>

          <section id="t-liability" className="legal-section">
            <h2>11. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL POME, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES — INCLUDING LOSS OF DATA, LOSS OF PROFITS, PERSONAL INJURY, EMOTIONAL HARM, OR SERVICE INTERRUPTIONS — ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </p>
            <p>
              IN NO EVENT SHALL POME'S TOTAL CUMULATIVE LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATING TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF: (A) THE AMOUNT YOU PAID TO POME IN THE 12 MONTHS PRECEDING THE CLAIM, OR (B) $100.
            </p>
            <p>Some jurisdictions do not allow certain limitations of liability. In such jurisdictions, our liability is limited to the fullest extent permitted by law.</p>
          </section>

          <section id="t-indemnification" className="legal-section">
            <h2>12. Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Pome and its officers, directors, employees, and agents from and against any claims, damages, losses, liabilities, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any rights of a third party; or (d) your User Content.
            </p>
          </section>

          <section id="t-termination" className="legal-section">
            <h2>13. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to Pome at any time, with or without notice, for any reason, including if we reasonably believe you have violated these Terms.
            </p>
            <p>
              You may stop using the Services and delete your account at any time. Upon termination, your right to use the Services ceases immediately. Provisions of these Terms that by their nature should survive termination will remain in effect, including Sections 9, 10, 11, 12, 14, and 15.
            </p>
          </section>

          <section id="t-governing-law" className="legal-section">
            <h2>14. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of the State of Florida, United States, without regard to its conflict of laws principles, except as otherwise required by applicable law or as provided in the Arbitration section below.
            </p>
          </section>

          <section id="t-arbitration" className="legal-section">
            <h2>15. Binding Arbitration &amp; Class Action Waiver</h2>
            <div className="legal-callout legal-callout-important">
              <strong>Please Read Carefully — This Affects Your Legal Rights</strong>
              <p>
                This section requires you to resolve disputes with Pome through binding individual arbitration rather than through a court, and waives your right to participate in a class action.
              </p>
            </div>

            <h3>Agreement to Arbitrate</h3>
            <p>
              Except for disputes that qualify for small claims court, you and Pome agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Services will be resolved exclusively through binding individual arbitration administered by the American Arbitration Association ("AAA") under its Consumer Arbitration Rules, rather than in court.
            </p>

            <h3>Class Action Waiver</h3>
            <p>
              YOU AND POME AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS ACTION, CONSOLIDATED ACTION, OR REPRESENTATIVE PROCEEDING.
            </p>

            <h3>Opt-Out Right</h3>
            <p>
              You may opt out of this arbitration agreement by sending a written notice to <a href="mailto:care@pomeapp.com">care@pomeapp.com</a> within 30 days of first accepting these Terms. Your opt-out notice must include your name, email address, and a clear statement that you are opting out of arbitration.
            </p>

            <h3>Exceptions</h3>
            <p>
              This arbitration agreement does not apply to: (a) disputes that qualify for small claims court; (b) requests for injunctive relief to prevent intellectual property infringement; or (c) any claims that applicable law expressly prohibits from being arbitrated.
            </p>
          </section>

          <section id="t-changes" className="legal-section">
            <h2>16. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. If we make material changes, we will notify you by email or through a prominent in-app notice at least 14 days before the changes take effect. Your continued use of the Services after the updated Terms take effect constitutes your acceptance of the revised Terms. If you do not agree to the revised Terms, you must stop using the Services.
            </p>
          </section>

          <section id="t-contact" className="legal-section">
            <h2>17. Contact Us</h2>
            <p>If you have questions or concerns about these Terms, please reach out:</p>
            <p>
              Email: <a href="mailto:care@pomeapp.com">care@pomeapp.com</a>
              <br />
              DataArtistry, LLC
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
