import Image from "next/image";
import Link from "next/link";
import { AuthModalProvider, AuthModalTrigger } from "@/components/auth-modal";
import { LandingEffects } from "@/components/landing-effects";
import { OrbitalBrand } from "@/components/orbital-brand";

type Capability = {
  title: string;
  copy: string;
  iconSrc: string;
};

type ShowcasePanel = {
  label: string;
  title: string;
  copy: string;
  imageSrc: string;
  detailA: string;
  detailB: string;
  wide?: boolean;
};

const capabilities: Capability[] = [
  {
    title: "AI Powered",
    copy: "Real-time self-learning analysis.",
    iconSrc: "/brand/ai-icon.png"
  },
  {
    title: "Quant",
    copy: "Systematic modeling for an edge.",
    iconSrc: "/brand/quant-icon.png"
  },
  {
    title: "Invest",
    copy: "Data-backed curated portfolios.",
    iconSrc: "/brand/invest-icon.png"
  },
  {
    title: "Scam Detector",
    copy: "Deep-layer risk screening and due diligence.",
    iconSrc: "/brand/scam-icon.png"
  },
  {
    title: "Ventures",
    copy: "Access to high-growth opportunities.",
    iconSrc: "/brand/ventures-icon.png"
  }
];

const showcasePanels: ShowcasePanel[] = [
  {
    label: "Team Presence",
    title: "A client-facing team built to represent AlphaForge with clarity, trust and polish.",
    copy:
      "From investor meetings to partner introductions, we show up with a disciplined brand presence that matches the quality of the platform.",
    imageSrc: "/brand/showcase-team.jpeg",
    detailA: "Investor relations",
    detailB: "Partner meetings",
    wide: true
  },
  {
    label: "Event Floor",
    title: "Branded spaces that turn product, research and security into a premium physical experience.",
    copy:
      "Our booth environment mirrors the portal itself: dark surfaces, gold signal cues and a clear product narrative for every visitor.",
    imageSrc: "/brand/stand.jpeg",
    detailA: "Exhibition setup",
    detailB: "Interactive demos"
  },
  {
    label: "Client Suite",
    title: "Private workspaces where identity, tools and investment context stay connected.",
    copy:
      "Tablet-first workflows, branded collateral and secure dashboard access keep every client touchpoint consistent with the AlphaForge system.",
    imageSrc: "/brand/client-suite.jpeg",
    detailA: "Secure onboarding",
    detailB: "Premium materials"
  }
];

type HomePageProps = {
  searchParams?: Promise<{
    auth?: string;
    next?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};
  const currentYear = new Date().getFullYear();
  const initialMode = params.auth === "signup" || params.auth === "login" ? params.auth : undefined;
  const initialNextRoute = typeof params.next === "string" ? params.next : "/dashboard";

  return (
    <AuthModalProvider initialMode={initialMode} initialNextRoute={initialNextRoute}>
      <main className="portal-page portal-page--reference">
        <LandingEffects />

        <header className="reference-header">
          <Link href="/" className="brand-link" aria-label="AlphaForge home">
            <OrbitalBrand compact />
          </Link>

          <nav className="reference-nav" aria-label="Primary">
            <a href="#capabilities">AI & Quant</a>
            <a href="#platform">Platforms</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
            <Link href="/mobile">Mobile App</Link>
            <a href="/dashboard">Dashboard</a>
          </nav>

          <div className="reference-actions">
            <AuthModalTrigger className="button button--ghost" mode="login" nextRoute="/dashboard">
              Sign In
            </AuthModalTrigger>
            <AuthModalTrigger className="button button--primary" mode="signup" nextRoute="/dashboard">
              Get Started
            </AuthModalTrigger>
          </div>
        </header>

        <section className="reference-stage">
          <section className="reference-hero reveal delay-1">
          <div className="reference-hero__atmosphere">
            <div className="reference-hero__lines reference-hero__lines--left" />
            <div className="reference-hero__lines reference-hero__lines--right" />
            <div className="reference-hero__grid" />
            <div className="reference-hero__horizon" />
          </div>

          <div className="hero-orbital">
            <div className="hero-logo-video-shell hero-logo-image-shell" aria-hidden="true">
              <Image
                alt=""
                height={768}
                src="/brand/logo-wall.jpeg"
                width={1376}
              />
            </div>
          </div>

            <div className="reference-hero__copy">
              <h1>Unleash the power of intelligent investing</h1>
              <p>Secure data. Systematic edge. Verified opportunities.</p>
              <div className="reference-hero__actions">
                <AuthModalTrigger className="button button--primary button--wide button--shimmer" mode="signup">
                  Get Started Now
                </AuthModalTrigger>
              </div>
            </div>
          </section>

        <section className="reference-center-block reveal delay-2" id="capabilities">
          <div className="center-heading">
            <h2>Intelligence That Matters</h2>
            <p>Secure data streams. Deep insights.</p>
          </div>

          <div className="center-capability-row">
            {capabilities.map(({ title, copy, iconSrc }, index) => (
              <article
                className="center-capability"
                key={title}
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <span className="center-capability__icon center-capability__icon--custom">
                  <Image
                    alt=""
                    className="center-capability__icon-image"
                    height={116}
                    src={iconSrc}
                    width={148}
                  />
                </span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="reference-divider reveal delay-3" />

        <section className="reference-center-block reveal delay-4" id="platform">
          <div className="center-heading center-heading--platform">
            <h2>Systems And Platforms</h2>
            <p>Secure data streams. Deep insights.</p>
          </div>

          <div className="center-platform-frame parallax-card">
            <div className="center-platform-frame__bar">
              <span />
              <span />
              <span />
              <div>alphaforge.dashboard.com</div>
            </div>
            <Image
              alt="AlphaForge dashboard system preview"
              height={768}
              src="/brand/dashboard-reference.jpeg"
              width={1376}
            />
          </div>
        </section>

        <section className="reference-center-block reveal delay-5" id="security">
          <div className="center-heading center-heading--platform">
            <h2>Security And Trust</h2>
            <p>Verified protocols. Capital protection.</p>
          </div>

          <div className="reference-security-grid">
            <article className="reference-security-card parallax-card">
              <strong>Verified Protocols</strong>
              <p>Identity, source and access validation before decisions move into the private workspace.</p>
            </article>
            <article className="reference-security-card parallax-card">
              <strong>Capital Protection</strong>
              <p>Signals are screened through mandate fit, risk controls and due diligence layers.</p>
            </article>
          </div>
        </section>

        <section className="reference-center-block reference-center-block--about reveal delay-5" id="about">
          <div className="center-heading center-heading--platform">
            <h2>About AlphaForge</h2>
            <p>Our company, our team, our operating floor.</p>
          </div>

          <div className="about-grid">
            <article className="about-company-card parallax-card">
              <div className="about-company-card__copy">
                <span className="about-label">Company</span>
                <h3>We build investment intelligence systems for teams that need signal, structure and trust.</h3>
                <p>
                  AlphaForge combines AI research, quant workflow and human-led investment discipline into one
                  operating platform. We are focused on decision quality, not decorative dashboards.
                </p>
                <div className="about-metrics">
                  <div>
                    <strong>12+</strong>
                    <span>research operators</span>
                  </div>
                  <div>
                    <strong>24/7</strong>
                    <span>market monitoring</span>
                  </div>
                  <div>
                    <strong>4</strong>
                    <span>core coverage lanes</span>
                  </div>
                </div>
              </div>

              <div className="about-company-card__media">
                <Image alt="AlphaForge office" height={768} src="/brand/office.jpeg" width={1376} />
              </div>
            </article>

            <div className="about-team-grid">
              <article className="about-team-card parallax-card">
                <div className="about-team-card__media">
                  <div className="employee-rotator" aria-hidden="true">
                    <div className="employee-rotator__slide employee-rotator__slide--one">
                      <div className="employee-rotator__image employee-rotator__image--top" />
                      <span className="employee-rotator__tag">Lead Analyst</span>
                    </div>
                    <div className="employee-rotator__slide employee-rotator__slide--two">
                      <div className="employee-rotator__image employee-rotator__image--middle" />
                      <span className="employee-rotator__tag">Venture Operator</span>
                    </div>
                    <div className="employee-rotator__slide employee-rotator__slide--three">
                      <div className="employee-rotator__image employee-rotator__image--bottom" />
                      <span className="employee-rotator__tag">Strategic Partner</span>
                    </div>
                  </div>
                </div>
                <div className="about-team-card__copy">
                  <span className="about-label">People</span>
                  <h3>Analysts, operators and partners working from one shared intelligence layer.</h3>
                  <p>
                    Our team blends research, diligence and venture screening so every opportunity is reviewed in
                    context.
                  </p>
                </div>
              </article>

              <article className="about-team-card parallax-card">
                <div className="about-team-card__media">
                  <Image alt="AlphaForge company team" height={768} src="/brand/leadership.jpeg" width={1376} />
                </div>
                <div className="about-team-card__copy">
                  <span className="about-label">Presence</span>
                  <h3>Brand, office presence and a team built for premium client-facing execution.</h3>
                  <p>
                    We present AlphaForge as an institutional-grade company, with the people and environment to match
                    the product.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="reference-center-block reference-center-block--showcase" id="presence">
          <div className="center-heading center-heading--platform reveal delay-1">
            <h2>Where AlphaForge Shows Up</h2>
            <p>People, environments and client moments built for institutional trust.</p>
          </div>

          <div className="showcase-grid">
            {showcasePanels.map(({ label, title, copy, imageSrc, detailA, detailB, wide }, index) => (
              <article
                className={`showcase-story${wide ? " showcase-story--wide" : ""} parallax-card reveal delay-${Math.min(index + 2, 5)}`}
                key={title}
              >
                <div className="showcase-story__media">
                  <Image alt={title} height={768} src={imageSrc} width={1376} />
                </div>

                <div className="showcase-story__body">
                  <div>
                    <span className="about-label">{label}</span>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>

                  <div className="showcase-story__details">
                    <div>{detailA}</div>
                    <div>{detailB}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        </section>

        <footer className="site-footer reference-footer reveal delay-2">
          <div className="reference-footer__brand">
            <Link href="/" className="brand-link" aria-label="AlphaForge home">
              <OrbitalBrand compact />
            </Link>
            <p>
              AlphaForge unifies AI research, quant modeling and investment diligence into one premium intelligence
              environment.
            </p>
          </div>

          <div className="reference-footer__nav">
            <span className="about-label">Explore</span>
            <div className="footer-links">
              <a href="#capabilities">AI & Quant</a>
              <a href="#platform">Platform</a>
              <a href="#security">Security</a>
              <a href="#about">About</a>
              <a href="#presence">Presence</a>
              <Link href="/mobile">Mobile App</Link>
            </div>
          </div>

          <div className="reference-footer__meta">
            <span className="about-label">Status</span>
            <div className="reference-footer__signals">
              <div>
                <strong>24/7</strong>
                <span>monitoring</span>
              </div>
              <div>
                <strong>Private</strong>
                <span>client access</span>
              </div>
            </div>
            <p className="footer-meta">© {currentYear} AlphaForge. Investment Intelligence.</p>
          </div>
        </footer>
      </main>
    </AuthModalProvider>
  );
}
