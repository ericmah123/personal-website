import HomeEffects from "./components/HomeEffects";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import Currently from "./components/Currently";

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
            <polyline id="rl-thin" className="ln thin" points="60,-8 60,30 47,58 40,100 40,102" />
            <polyline id="rl-primary" className="ln primary" points="66,-8 66,30 53,58 46,100 46,102" />
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
          <div className="section-label reveal">Intro</div>
          <div className="intro-panel glass reveal d-80">
            <p>
              I recently completed a co-op at Keyera and worked as an Information
              Services Analyst at Gibson Energy. I like working at the intersection
              of <span className="em">data and software</span> — building things
              that make a difference for the people using them.
            </p>
          </div>
        </section>

        <Timeline />
        <Projects />
        <Currently />
      </div>

      <HomeEffects />
    </>
  );
}
