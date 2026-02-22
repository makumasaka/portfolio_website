export default function AboutCard() {
  return (
    <div className="about-card">
      <div className="about-gradient" />
      <div className="about-content">
        <div className="about-top">
          <div className="about-status">
            <span className="status-dot" />
            <span className="status-text">
              Fielding inquiries for contract, consultation, and collaboration.
            </span>
          </div>
          <a
            href="https://www.makotomoseskumasaka.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="about-arrow"
            aria-label="About Makoto"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
        <div className="about-bottom">
          <div>
            <span className="about-label">Learn more about</span>
            <h3 className="about-name">Makoto Moses Kumasaka</h3>
          </div>
          <nav className="about-links" aria-label="Contact links">
            <a href="mailto:makumasaka@gmail.com" title="Email" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13 2 4" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/makoto-kumasaka-937b36ab/" target="_blank" rel="noopener noreferrer" title="LinkedIn" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* <a href="https://twitter.com/makokumasaka" target="_blank" rel="noopener noreferrer" title="Twitter / X" aria-label="Twitter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
