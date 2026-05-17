import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Landing = () => {
  return (
    <div className="landing-page" data-testid="landing-page">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">
          <h1>pome</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Build Your Emotional Intelligence</h1>
          <p className="hero-subtitle">
            Empower yourself with tools to track emotional states, identify triggers, and discover activities that shift you into a more resourceful, resilient mindset. This is your journey, one loving check-in at a time.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2>Why Choose Pome?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Emotion Tracking</h3>
              <p>Use the scientifically-backed Circumplex Model to identify and track your emotional states with precision.</p>
            </div>
            <div className="feature-card">
              <h3>Activity Planning</h3>
              <p>Discover and plan resourceful activities across 5 energy categories to boost your emotional well-being.</p>
            </div>
            <div className="feature-card">
              <h3>Personal Insights</h3>
              <p>Get personalized analytics about your emotional patterns and activity effectiveness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <div className="container">
          <div className="testimonial">
            <p>"Pome has helped me see the patterns in my emotions: what I feel, when I feel it, and why. I love keeping track of the little things that bring me energy and light. It's more than just tracking, it's feeling like I truly own my life again."</p>
            <div className="testimonial-author">
              <strong>— Veranika</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Pome is now live on the App Store</h2>
          <p>A quiet, beautiful space for women who feel deeply and want to understand themselves better.</p>

          <div className="app-store-cta">
            <a
              href="https://apps.apple.com/us/app/pome-emotional-well-being/id6761636471"
              target="_blank"
              rel="noopener noreferrer"
              className="app-store-badge-link"
              aria-label="Download Pome on the App Store"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 120 40"
                className="app-store-badge"
                role="img"
                aria-label="Download on the App Store"
              >
                <rect rx="5" ry="5" width="120" height="40" fill="#000" />
                <path
                  fill="#fff"
                  d="M24.769 20.304c-.029-3.26 2.657-4.838 2.779-4.913-1.516-2.217-3.873-2.52-4.705-2.55-1.986-.203-3.904 1.18-4.912 1.18-1.02 0-2.574-1.163-4.24-1.128-2.16.032-4.166 1.267-5.275 3.2-2.268 3.927-.577 9.718 1.606 12.897 1.088 1.553 2.363 3.283 4.037 3.22 1.628-.067 2.241-1.04 4.205-1.04 1.975 0 2.537 1.04 4.256.993 1.748-.028 2.853-1.565 3.916-3.119 1.25-1.789 1.756-3.532 1.78-3.621-.04-.017-3.41-1.304-3.447-5.119z"
                />
                <path
                  fill="#fff"
                  d="M21.573 11.133c.888-1.09 1.496-2.59 1.329-4.113-1.284.054-2.86.862-3.784 1.932-.82.948-1.545 2.485-1.362 3.95 1.431.109 2.887-.724 3.817-1.769z"
                />
                <text
                  x="35.5"
                  y="14.5"
                  fill="#fff"
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif",
                    fontSize: '8.2px',
                    fontWeight: 400,
                    letterSpacing: '0.1px',
                  }}
                >
                  Download on the
                </text>
                <text
                  x="34.5"
                  y="30"
                  fill="#fff"
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, sans-serif",
                    fontSize: '18px',
                    fontWeight: 600,
                    letterSpacing: '-0.3px',
                  }}
                >
                  App Store
                </text>
              </svg>
            </a>

            <p className="cta-footer-line">
              Already using Pome?{' '}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfimMroes1U1ho1k3nNmVuJHPxDXp_CcYWl4GTgyFkmqxHotQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-footer-link"
              >
                Leave feedback
              </a>
              {' · '}
              Need help?{' '}
              <Link to="/care" className="cta-footer-link" data-testid="landing-contact-link">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <div className="container">
          <div className="social-buttons">
            <a
              href="https://www.instagram.com/pome_app"
              className="social-pill"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-instagram-link"
            >
              <svg
                className="social-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
              </svg>
              Follow us on Instagram
            </a>

            <a
              href="https://t.me/+q1qz-pSOEiNjZGFh"
              className="social-pill"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-telegram-link"
            >
              <svg
                className="social-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M20.665 3.717L2.935 10.562c-1.197.476-1.19 1.143-.22 1.438l4.572 1.427 10.573-6.67c.499-.303.955-.14.58.192L9.228 15.306l-.319 4.753c.467 0 .673-.213.932-.466l2.238-2.176 4.654 3.44c.858.474 1.476.23 1.692-.795l3.064-14.434c.314-1.26-.48-1.83-1.824-1.91z"
                  fill="currentColor"
                />
              </svg>
              Join our Telegram community
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
