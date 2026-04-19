import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Care = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="landing-page" data-testid="care-page">
      <header className="landing-header">
        <div className="logo">
          <Link to="/" style={{ textDecoration: 'none' }} data-testid="care-logo-home-link">
            <h1>pome</h1>
          </Link>
        </div>
      </header>

      <main className="legal-page">
        <div className="container">
          <h1 className="legal-title">We're here for you.</h1>

          <section className="legal-section">
            <p>
              Pome is built with care, and so is our support. If you have a question, ran into something unexpected, or simply want to share feedback, we'd love to hear from you.
            </p>
          </section>

          <section className="legal-section">
            <h2>How to reach us</h2>
            <p>
              Email us at <a href="mailto:care@pomeapp.com" data-testid="care-email-link">care@pomeapp.com</a>, and we'll get back to you within 1–2 business days.
            </p>
          </section>

          <section className="legal-section">
            <h2>A note on emotional wellbeing</h2>
            <div className="legal-callout legal-callout-warning">
              <p>
                Pome is a wellness tool, not a clinical service. If you're experiencing a mental health crisis or need immediate support, please reach out to a qualified professional or contact a crisis helpline in your country.
              </p>
              <p>
                In the US, you can reach the <strong>988 Suicide and Crisis Lifeline</strong> by calling or texting <strong>988</strong>.
              </p>
            </div>
          </section>

          <section className="legal-section">
            <p className="care-closing" data-testid="care-closing">
              Thank you for being part of Pome. Taking care of yourself matters, and so do you.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Care;
