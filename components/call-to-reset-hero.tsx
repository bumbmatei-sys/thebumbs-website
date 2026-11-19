/**
 * Call to Reset homepage feature, based on the actual hero in
 * bumbmatei-sys/men-reset-site/src/pages/index.astro.
 * The original marble bust and landscape files are copied into this repo.
 */
export function CallToResetHero() {
  return (
    <section className="call-reset-section" aria-label="Call to Reset discipleship">
      <div className="call-reset-hero">
        <img
          className="call-reset-bg"
          src="/images/call-to-reset/hero-landscape.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width="1448"
          height="1086"
        />
        <div className="call-reset-shade" aria-hidden="true" />
        <div className="call-reset-copy">
          <h2>
            <span>Know His love.</span>
            <span>Know who you are.</span>
            <span>Live it out.</span>
          </h2>
        </div>
        <p className="call-reset-wordmark" aria-hidden="true">Reset</p>
        <img className="call-reset-figure call-reset-figure-left" src="/images/call-to-reset/bust.webp" alt="" loading="lazy" decoding="async" width="1000" height="1274" />
        <img className="call-reset-figure call-reset-figure-right" src="/images/call-to-reset/bust.webp" alt="" loading="lazy" decoding="async" width="1000" height="1274" />
      </div>
      <div className="call-reset-introduction">
        <div>
          <span className="eyebrow">CALL TO RESET · DISCIPLESHIP</span>
          <p>Discover free Christian teaching on God’s love, your identity in Christ, and living it out.</p>
        </div>
        <a className="call-reset-button" href="https://calltoreset.site/" target="_blank" rel="noopener noreferrer">
          Be Discipled <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
