"use client";

import { useEffect, useMemo, useState } from "react";

const products = [
  ["01", "Commercial ready-mix", "Reliable structural concrete for programmes that cannot drift."],
  ["02", "High-performance", "Engineered strength, durability and controlled workability."],
  ["03", "Waterproof concrete", "Low-permeability mixes for tanks, basements and water infrastructure."],
  ["04", "Self-compacting", "High-flow placement through dense reinforcement and complex formwork."],
  ["05", "Mining concrete", "Purpose-built mixes for demanding mining and industrial environments."],
  ["06", "Road & bridge", "Consistent paving and structural mixes for national infrastructure."],
];

const industries = ["Residential", "Commercial", "Industrial", "Mining", "Roads", "Bridges", "Airports", "Water", "Schools", "Hospitals", "Government", "Energy"];

const capabilities = [
  ["Production facilities", "Batching plants, aggregate handling, cement silos, control room, workshop and fleet yard.", "PLANT / 01"],
  ["Quality assurance", "Material inspection, moisture analysis, mix design, slump, cube and durability testing.", "LAB / 02"],
  ["Logistics & fleet", "Mixer trucks, concrete pumps, service vehicles, GPS tracking and coordinated dispatch.", "MOVE / 03"],
  ["Safety culture", "Training, PPE standards, equipment inspection, emergency response and incident reporting.", "SAFE / 04"],
  ["Sustainability", "Water recycling, dust control, waste reduction, energy efficiency and community investment.", "ESG / 05"],
  ["Technical support", "Mix selection, pre-pour planning, placement guidance and project documentation.", "TECH / 06"],
];

const companyAreas = ["About Jianzhou", "Why choose J Z", "Production facilities", "Quality assurance", "Logistics & fleet", "Major projects", "Sustainability", "Safety", "Careers", "News & media", "Downloads", "Customer portal"];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [entered, setEntered] = useState(false);
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("8");
  const [depth, setDepth] = useState("150");
  const [quantity, setQuantity] = useState("1");
  const [allowance, setAllowance] = useState("5");
  const [contactName, setContactName] = useState("");
  const [projectType, setProjectType] = useState("Commercial building");
  const [projectLocation, setProjectLocation] = useState("");
  const [concreteGrade, setConcreteGrade] = useState("C25");
  const [requiredDate, setRequiredDate] = useState("");
  const [replyMode, setReplyMode] = useState("WhatsApp");
  const [contactValue, setContactValue] = useState("");
  const [destination, setDestination] = useState("sales");
  useEffect(() => {
    const entranceTimer = window.setTimeout(() => setEntered(true), 80);
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("revealed");
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    return () => { observer.disconnect(); window.clearTimeout(entranceTimer); };
  }, []);
  const volume = useMemo(() => {
    const base = Number(length) * Number(width) * (Number(depth) / 1000) * Number(quantity);
    const order = base * (1 + Number(allowance) / 100);
    return {
      base: Number.isFinite(base) && base > 0 ? base.toFixed(2) : "0.00",
      order: Number.isFinite(order) && order > 0 ? order.toFixed(2) : "0.00",
    };
  }, [length, width, depth, quantity, allowance]);

  const sendEnquiry = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const number = destination === "dispatch" ? "263777003547" : "263777003039";
    const message = [
      "J Z Concrete website enquiry",
      `Name: ${contactName}`,
      `Project: ${projectType}`,
      `Location: ${projectLocation}`,
      `Concrete grade: ${concreteGrade}`,
      `Estimated volume: ${volume.order} m³`,
      `Required date: ${requiredDate || "To be confirmed"}`,
      `Preferred reply: ${replyMode} — ${contactValue}`,
    ].join("\n");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className={entered ? "site-entered" : "site-entering"}>
      <header className="nav">
        <a className="brand" href="#top" aria-label="J Z Concrete home">
          <img src="/jz/logo-clean.jpeg" alt="J Z Concrete" />
          <span>J Z <b>CONCRETE</b></span>
        </a>
        <nav className={menu ? "navlinks open" : "navlinks"} aria-label="Primary navigation">
          <a href="#capability" onClick={() => setMenu(false)}>Capabilities</a>
          <a href="#products" onClick={() => setMenu(false)}>Concrete</a>
          <a href="#projects" onClick={() => setMenu(false)}>Projects</a>
          <a href="#knowledge" onClick={() => setMenu(false)}>Knowledge</a>
        </nav>
        <a className="nav-cta" href="#quote">Request a quote <span>↗</span></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "Close" : "Menu"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-mast"><span>JIANZHOU / ZIMBABWE</span><span>READY-MIX INFRASTRUCTURE</span><span>CONTROL SYSTEM 01</span></div>
        <div className="hero-visual"><img className="hero-image" src="/jz/fleet-premium.jpeg" alt="J Z Concrete batching plant and ready-mix fleet in Zimbabwe" /><div className="hero-shade" /><div className="plant-tag"><i /> J Z FLEET<br /><b>PRODUCTION ONLINE</b></div></div>
        <div className="blueprint" aria-hidden="true"><i /><i /><i /></div>
        <div className="hero-copy">
          <p className="eyebrow"><i /> Concrete infrastructure platform</p>
          <h1><span className="hero-word word-one">WE DON’T</span><span className="hero-word word-two">JUST POUR.</span><em><span className="hero-word word-three">WE POWER</span><span className="hero-word word-four">PROGRESS.</span></em></h1>
          <p className="hero-lede">J Z Concrete connects intelligent production, laboratory control, coordinated fleet movement and technical support into one high-performance supply system.</p>
          <p className="brand-line">If it’s not <b>JZ</b>, it’s not concrete.</p>
          <div className="hero-actions">
            <a className="primary" href="#quote">Request a quote <span>→</span></a>
            <a className="text-link" href="#calculator">Calculate volume <span>↓</span></a>
          </div>
        </div>
        <div className="command-stack">
          <article><small>PRODUCTION</small><b>INTELLIGENT</b><span><i /> ACTIVE</span></article>
          <article><small>LABORATORY</small><b>CONTROLLED</b><span><i /> VERIFIED</span></article>
          <article><small>DISPATCH</small><b>COORDINATED</b><span><i /> READY</span></article>
        </div>
        <div className="hero-rail"><span>01 — Production</span><span>02 — Quality</span><span>03 — Logistics</span><span>04 — Placement</span><b>SCROLL TO ENTER ↓</b></div>
      </section>

      <section className="statement reveal" id="capability">
        <p className="section-tag">/ The Jianzhou standard</p>
        <h2>Concrete is invisible<br />when it works.<br /><span>Unforgettable when it fails.</span></h2>
        <div className="statement-grid">
          <p>We approach every cubic metre as engineered infrastructure—not a commodity. Materials, moisture, mix, movement and placement are managed as one connected system.</p>
          <a href="#quality">Explore quality control <span>↗</span></a>
        </div>
      </section>

      <section className="operations-theatre reveal">
        <div className="ops-stage">
          <div className="ops-copy"><p className="section-tag">/ One connected operation</p><h2>PLANT.<br />LAB.<br />FLEET.<br /><span>FIELD.</span></h2><p>A concrete supply chain designed as one continuous engineering system—from raw material verification to the final placed structure.</p></div>
          <div className="ops-orbit" aria-hidden="true"><i /><i /><i /><i /></div>
          <figure className="ops-photo ops-plant"><img src="/jz/plant.jpeg" alt="J Z batching facility" /><figcaption>01 / PRODUCE</figcaption></figure>
          <figure className="ops-photo ops-fleet"><img src="/jz/fleet-line.jpeg" alt="J Z concrete mixer fleet" /><figcaption>03 / MOBILISE</figcaption></figure>
          <figure className="ops-photo ops-lab"><img src="/jz/slump.jpeg" alt="Concrete laboratory testing" /><figcaption>02 / VERIFY</figcaption></figure>
          <div className="ops-axis"><span>RAW MATERIAL</span><i /><span>STRUCTURE</span></div>
        </div>
      </section>

      <section className="capability-hub reveal">
        <div className="hub-head"><p className="section-tag">/ Integrated capability</p><h2>One partner.<br /><span>Every critical stage.</span></h2><p>International production discipline connected to practical, responsive support on Zimbabwean projects.</p></div>
        <div className="capability-tiles">
          {capabilities.map(([title, copy, code], index) => <article key={title} style={{"--delay": `${index * 70}ms`} as React.CSSProperties}><div className="tile-code">{code}</div><div className="tile-orbit"><i /><i /></div><h3>{title}</h3><p>{copy}</p><span className="tile-arrow">↗</span></article>)}
        </div>
      </section>

      <section className="process reveal" id="quality">
        <div className="process-image"><img src="/jz/slump.jpeg" alt="Concrete slump testing" /><span>LAB / 01</span></div>
        <div className="process-copy">
          <p className="section-tag">/ From material to structure</p>
          <h2>Precision<br />at every stage.</h2>
          {[
            ["01", "Verify", "Raw materials, moisture and mix requirements checked before batching."],
            ["02", "Produce", "Controlled batching supports repeatable strength and workability."],
            ["03", "Deliver", "Coordinated dispatch keeps concrete moving to the pour window."],
            ["04", "Support", "Technical guidance continues on site through testing and placement."],
          ].map(([n,t,d]) => <article className="process-step" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}
        </div>
      </section>

      <section className="products reveal" id="products">
        <div className="product-head"><div><p className="section-tag">/ Concrete systems</p><h2>Specified for<br /><i>the real world.</i></h2></div><p>From residential slabs to mining and public infrastructure, our mix portfolio is built around the demands of the structure, site and programme.</p></div>
        <div className="product-list">
          {products.map(([n,t,d]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><b>↗</b></article>)}
        </div>
      </section>

      <section className="fleet-scene reveal">
        <img src="/jz/mixer.jpeg" alt="J Z Concrete ready-mix truck" />
        <div className="fleet-copy"><p className="section-tag">/ Concrete in motion</p><h2>The pour doesn’t<br />wait. <em>Neither do we.</em></h2><p>Production, dispatch and placement support move as one—so the right concrete arrives ready for the moment it matters.</p><a href="#quote">Talk to dispatch <span>→</span></a></div>
        <div className="route-line"><i /><i /><i /><i /></div>
      </section>

      <section className="industries reveal">
        <p className="section-tag">/ Built across Zimbabwe</p>
        <div className="ticker"><div>{[...industries, ...industries].map((x,i) => <span key={i}>{x}<b>✦</b></span>)}</div></div>
      </section>

      <section className="calculator reveal" id="calculator">
        <div className="calc-intro"><p className="section-tag">/ Concrete volume calculator</p><h2>Measure twice.<br /><span>Pour once.</span></h2><p>This calculator uses the exact rectangular-volume formula: length × width × thickness × quantity. Choose your allowance separately, then confirm the final order with our technical team.</p><div className="formula">V = L × W × (T ÷ 1000) × Q</div></div>
        <div className="calc-machine">
          <div className="scan"><div className="slab"><i /></div><span>RECTANGULAR SLAB / FOOTING</span></div>
          <div className="inputs">
            <label>Length <span>metres</span><input value={length} onChange={e => setLength(e.target.value)} inputMode="decimal" /></label>
            <label>Width <span>metres</span><input value={width} onChange={e => setWidth(e.target.value)} inputMode="decimal" /></label>
            <label>Thickness <span>millimetres</span><input value={depth} onChange={e => setDepth(e.target.value)} inputMode="decimal" /></label>
            <label>Identical pours <span>quantity</span><input value={quantity} onChange={e => setQuantity(e.target.value)} inputMode="numeric" /></label>
            <label>Allowance <span>percent</span><select value={allowance} onChange={e => setAllowance(e.target.value)}><option value="0">0%</option><option value="5">5%</option><option value="10">10%</option></select></label>
          </div>
          <div className="calc-breakdown"><span>Calculated structure volume <b>{volume.base} m³</b></span><span>Selected allowance <b>{allowance}%</b></span></div>
          <div className="result"><small>ESTIMATED ORDER VOLUME</small><strong>{volume.order}<span>m³</span></strong><a href="#quote">Request this volume <b>→</b></a></div>
        </div>
      </section>

      <section className="projects reveal" id="projects">
        <div className="projects-head"><div><p className="section-tag">/ Field work</p><h2>Proof,<br />in concrete.</h2></div><p>Real production. Real logistics. Real placement environments.</p></div>
        <div className="project-gallery">
          <figure className="project-main"><img src="/jz/site.jpeg" alt="Concrete placement on reinforced slab" /><figcaption><span>Structural concrete</span><b>Reinforced slab placement</b></figcaption></figure>
          <figure><img src="/jz/pour.jpeg" alt="Concrete pouring crew" /><figcaption><span>Placement support</span><b>Coordinated site pour</b></figcaption></figure>
          <figure><img src="/jz/dam.jpeg" alt="Large scale concrete dam structure" /><figcaption><span>Infrastructure</span><b>High-volume applications</b></figcaption></figure>
        </div>
      </section>

      <section className="knowledge reveal" id="knowledge">
        <div className="knowledge-title"><p className="section-tag">/ Technical knowledge centre</p><h2>Better concrete<br />starts before<br />the truck arrives.</h2></div>
        <div className="articles">
          {["Concrete grades explained", "C15 vs C20 vs C25 vs C30", "How to cure concrete", "Slump testing explained", "How much concrete do I need?"].map((x,i) => <a href="#quote" key={x}><span>0{i+1}</span><h3>{x}</h3><b>Read guide ↗</b></a>)}
        </div>
      </section>

      <section className="company-map reveal">
        <div className="map-title"><p className="section-tag">/ Complete company platform</p><h2>Explore the<br />J Z ecosystem.</h2><p>Built to become both a sales platform and a technical resource centre for contractors, engineers, architects, developers, mines and public agencies.</p></div>
        <div className="map-links">{companyAreas.map((item, i) => <a href="#quote" key={item}><span>{String(i + 1).padStart(2,"0")}</span>{item}<b>↗</b></a>)}</div>
      </section>

      <section className="contact-suite reveal" id="quote">
        <div className="contact-story"><img src="/jz/campaign-tagline.jpeg" alt="If it’s not JZ, it’s not concrete" /><div><p className="section-tag">/ Start the conversation</p><h2>Plan your<br />next pour.</h2><p>Choose the team you need and how you want them to reply. Submitting opens a prepared WhatsApp enquiry containing your project details.</p><p className="contact-tagline">If it’s not <b>JZ</b>, it’s not concrete.</p></div></div>
        <form className="enquiry-form" onSubmit={sendEnquiry}>
          <div className="form-head"><span>PROJECT ENQUIRY</span><b>01 / 03</b></div>
          <div className="form-grid">
            <label>Your name<input required value={contactName} onChange={e => setContactName(e.target.value)} placeholder="Full name" /></label>
            <label>Project type<select value={projectType} onChange={e => setProjectType(e.target.value)}><option>Commercial building</option><option>Residential</option><option>Mining</option><option>Road or bridge</option><option>Industrial</option><option>Water infrastructure</option><option>Other</option></select></label>
            <label>Project location<input required value={projectLocation} onChange={e => setProjectLocation(e.target.value)} placeholder="Site location" /></label>
            <label>Concrete grade<select value={concreteGrade} onChange={e => setConcreteGrade(e.target.value)}><option>C15</option><option>C20</option><option>C25</option><option>C30</option><option>C35</option><option>C40+</option><option>Technical advice needed</option></select></label>
            <label>Estimated volume<input readOnly value={`${volume.order} m³`} /></label>
            <label>Required pour date<input type="date" value={requiredDate} onChange={e => setRequiredDate(e.target.value)} /></label>
          </div>
          <fieldset><legend>Send enquiry to</legend><label><input type="radio" name="destination" value="sales" checked={destination === "sales"} onChange={e => setDestination(e.target.value)} /> Sales · +263 777 003 039</label><label><input type="radio" name="destination" value="dispatch" checked={destination === "dispatch"} onChange={e => setDestination(e.target.value)} /> Dispatch · +263 777 003 547</label></fieldset>
          <fieldset><legend>How should J Z reply?</legend>{["WhatsApp", "Phone call", "Email"].map(mode => <label key={mode}><input type="radio" name="reply" value={mode} checked={replyMode === mode} onChange={e => setReplyMode(e.target.value)} /> {mode}</label>)}</fieldset>
          <label className="reply-detail">Your {replyMode === "Email" ? "email address" : "phone number"}<input required type={replyMode === "Email" ? "email" : "tel"} value={contactValue} onChange={e => setContactValue(e.target.value)} placeholder={replyMode === "Email" ? "name@company.com" : "+263 …"} /></label>
          <button className="submit-enquiry" type="submit"><span>Prepare enquiry</span><b>Open WhatsApp ↗</b></button>
          <small>Nothing is sent automatically. You can review the prepared message before sending it.</small>
        </form>
      </section>

      <a className="whatsapp-dock" href="https://wa.me/263777003039" target="_blank" rel="noreferrer" aria-label="Chat with J Z Concrete on WhatsApp"><i>WA</i><span>WhatsApp<br /><b>Sales online</b></span></a>

      <footer>
        <div className="footer-brand"><img src="/jz/logo-clean.jpeg" alt="" /><h2>J Z CONCRETE</h2><p>Building Zimbabwe’s future with international engineering excellence.</p></div>
        <div><small>EXPLORE</small><a href="#products">Concrete systems</a><a href="#quality">Quality assurance</a><a href="#projects">Projects</a><a href="#knowledge">Knowledge centre</a></div>
        <div><small>CONTACT</small><a href="tel:+263777003039">+263 777 003 039</a><a href="tel:+263777003547">+263 777 003 547</a><span>Harare, Zimbabwe</span></div>
        <div className="footer-bottom"><span>© 2026 J Z Concrete</span><span>Engineered to perform.</span></div>
      </footer>
    </main>
  );
}
