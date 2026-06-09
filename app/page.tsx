import HomeEffects from "./components/HomeEffects";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import BackToTop from "./components/BackToTop";

export default function Home() {
  return (
    <>
      {/* Animated gradient field — drifting light the glass refracts */}
      <div className="bg" aria-hidden="true">
        <b className="b1" />
        <b className="b2" />
        <b className="b3" />
      </div>

      {/* Drifting ember particles */}
      <canvas className="embers" aria-hidden="true" />

      {/* Redline motif — JS positions this over the hero */}
      <div className="redline-layer anim-up d-520" aria-hidden="true">
        <div className="redline">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="rl-mask-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor="white" stopOpacity="1" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="rl-mask">
                <rect x="0" y="0" width="100%" height="100%" fill="url(#rl-mask-grad)" />
              </mask>
            </defs>
            <g mask="url(#rl-mask)">
              <polyline id="rl-thin" className="ln thin" points="60,-8 60,30 47,58 40,100 40,102" />
              <polyline id="rl-primary" className="ln primary" points="66,-8 66,30 53,58 46,100 46,102" />
            </g>
          </svg>
        </div>
      </div>

      <div className="shell">
        {/* Hero */}
        <header className="hero">
          <div className="hero-text">
            <h1 className="hero-name anim-up d-80">Eric Mah</h1>
            <p className="one-liner anim-up d-240">
              CS grad &amp; incoming{" "}
              <span className="hl">Technical Business Analyst</span> at{" "}
              <span className="cnrl-chip">
                <span className="cnrl-mark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/cnrl-icon.png" alt="Canadian Natural" />
                </span>
                <span>CNRL</span>
              </span>
            </p>
         
          </div>
        </header>

        {/* Intro */}
        <section id="about" className="page-section">
          <div className="intro-panel glass reveal">
<p>
  I spent my degree learning to build things and my co-ops learning that{" "}
  <span className="em">the hard part is never the code.</span> Currently
  figuring out the rest. I also try to touch grass, but still working on it.
</p>
          </div>
        </section>

        <Timeline />
        <Projects />
      </div>

      <HomeEffects />
      <BackToTop />
    </>
  );
}
