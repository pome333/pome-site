import React, { useState } from 'react';
import Footer from '../components/Footer';

const Landing = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

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

      {/* CTA Section - kept without Start Your Journey buttons; feedback form retained */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Join women who are growing their emotional intelligence, creating more balance, clarity, and confidence in everyday life with Pome.</p>

          <div className="feedback-section">
            <button
              className="feedback-cta-button"
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
              data-testid="feedback-toggle-button"
            >
              LEAVE FEEDBACK
            </button>

            {showFeedbackForm && (
              <div className="feedback-form-container" data-testid="feedback-form-container">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfimMroes1U1ho1k3nNmVuJHPxDXp_CcYWl4GTgyFkmqxHotQ/viewform?embedded=true"
                  width="640"
                  height="2001"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Feedback Form"
                >
                  Loading…
                </iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <div className="container">
          <div className="social-links">
            <a
              href="https://www.instagram.com/pome_app"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-instagram-link"
            >
              <span>📸</span> Follow us on Instagram
            </a>
            <a
              href="https://t.me/+q1qz-pSOEiNjZGFh"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="social-telegram-link"
            >
              <span>💬</span> Join our Telegram group to be part of the Pome app building community
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
