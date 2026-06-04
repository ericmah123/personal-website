import HomeEffects from "./components/HomeEffects";

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

        {/* Currently */}
        <section id="currently" className="page-section">
          <div className="section-label reveal">Currently</div>
          <div className="currently-list">
            <div className="c-row reveal d-40">
              <span className="c-num">01</span>
              <span className="c-key">Training</span>
              <span className="c-val">BJJ, Wrestling, Muay Thai</span>
            </div>
            <div className="c-row reveal d-110">
              <span className="c-num">02</span>
              <span className="c-key">Cooking</span>
              <span className="c-val">Trying not to cook my steak well-done</span>
            </div>
            <div className="c-row reveal d-180">
              <span className="c-num">03</span>
              <span className="c-key">Watching</span>
              <span className="c-val">Bloodhounds, Modern Family</span>
            </div>
            <div className="c-row reveal d-250">
              <span className="c-num">04</span>
              <span className="c-key">Building</span>
              <span className="c-val">This site + exploring Claude workflows</span>
            </div>
          </div>
        </section>

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
      </div>

      <HomeEffects />
    </>
  );
}
