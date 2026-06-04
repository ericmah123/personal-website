export default function Currently() {
  return (
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
          <span className="c-val">Trying to nail a proper steak</span>
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
  );
}
