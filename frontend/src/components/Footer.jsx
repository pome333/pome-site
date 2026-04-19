import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="site-footer" data-testid="site-footer">
      <div className="container">
        <div className="footer-links">
          <Link to="/privacy" className="footer-link" data-testid="footer-privacy-link">
            Privacy Policy
          </Link>
          <span className="footer-separator" aria-hidden="true">•</span>
          <Link to="/terms" className="footer-link" data-testid="footer-terms-link">
            Terms &amp; Conditions
          </Link>
          <span className="footer-separator" aria-hidden="true">•</span>
          <Link to="/care" className="footer-link" data-testid="footer-care-link">
            Care
          </Link>
        </div>
        <p className="footer-copy" data-testid="footer-copy">
          Pome is operated by DataArtistry, LLC, a Florida limited liability company.
          <br />
          &copy; 2026 DataArtistry, LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
