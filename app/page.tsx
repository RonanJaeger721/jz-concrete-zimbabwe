"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

const products = [
  { n:"01", title:"Commercial ready-mix", summary:"Structural concrete for everyday and large-scale building programmes.", grades:"C15 · C20 · C25 · C30 · C35 · C40+", use:"Blinding, foundations, floor slabs, columns, beams, suspended slabs and structural frames.", note:"The final grade must follow the structural engineer’s specification." },
  { n:"02", title:"High-performance concrete", summary:"Engineered strength, durability and controlled workability.", grades:"Project-specific performance classes", use:"High-rise structures, heavily loaded foundations, industrial floors and demanding structural elements.", note:"Designed with the project engineer around strength, exposure and placement requirements." },
  { n:"03", title:"Waterproof concrete", summary:"Low-permeability concrete for structures exposed to water.", grades:"Project-specific watertight mix", use:"Water tanks, swimming pools, basements, retaining walls, sumps, reservoirs and water infrastructure.", note:"Watertight performance also depends on joint design, correct placement and curing." },
  { n:"04", title:"Self-compacting concrete", summary:"High-flow placement through congested reinforcement and complex formwork.", grades:"Performance-specified SCC", use:"Dense reinforcement, architectural forms, columns, walls and areas that are difficult to vibrate.", note:"Flow, stability and formwork pressure are checked against the placement method." },
  { n:"05", title:"Mining concrete", summary:"Purpose-built mixes for demanding mining and industrial environments.", grades:"Application and exposure specific", use:"Mine infrastructure, equipment bases, hardstands, processing areas, underground works and shotcrete applications.", note:"Mix selection considers abrasion, chemicals, access, pumping and operating conditions." },
  { n:"06", title:"Road & bridge concrete", summary:"Consistent paving and structural mixes for public infrastructure.", grades:"Engineer-specified paving and structural classes", use:"Rigid pavements, culverts, bridge decks, abutments, barriers, drains and road structures.", note:"Designed around traffic loading, exposure, finish and construction programme." },
  { n:"07", title:"Fibre-reinforced concrete", summary:"Concrete enhanced with specified fibres for crack control and performance.", grades:"Project-specific fibre type and dosage", use:"Industrial floors, slabs, pavements, precast elements and applications requiring improved crack resistance.", note:"Fibre selection and dosage must match the structural and service requirements." },
  { n:"08", title:"Shotcrete", summary:"Pumpable concrete or mortar placed pneumatically at high velocity.", grades:"Wet-mix or project-specified shotcrete", use:"Slope stabilisation, tunnels, mining support, retaining structures, repairs and complex surfaces.", note:"Nozzle technique, rebound control, access and substrate preparation are critical to performance." },
  { n:"09", title:"Flowable fill", summary:"A self-levelling controlled low-strength material for fast, complete filling.", grades:"Controlled low-strength material", use:"Trenches, pipe bedding, void filling, abandoned services and areas that are difficult to compact.", note:"Strength and future excavability are selected around the application." },
  { n:"10", title:"Mortar & custom mixes", summary:"Application-specific mixes developed around placement and finish requirements.", grades:"Project-specific formulation", use:"Masonry, screeds, grouting, repairs and specialised construction details.", note:"Final formulation depends on materials, finish, exposure and method of placement." },
];

const industries = ["Residential", "Commercial", "Industrial", "Mining", "Roads", "Bridges", "Airports", "Water", "Schools", "Hospitals", "Government", "Energy"];

const capabilities = [
  ["Production facilities", "Batching plants, aggregate handling, cement silos, control room, workshop and fleet yard.", "Facilities", "facilities"],
  ["Quality assurance", "Material inspection, moisture analysis, mix design, slump, cube and durability testing.", "Quality", "quality"],
  ["Logistics & fleet", "Mixer trucks, concrete pumps, service vehicles, GPS tracking and coordinated operations.", "Delivery", "logistics"],
  ["Safety culture", "Training, PPE standards, equipment inspection, emergency response and incident reporting.", "Safety", "why-jz"],
  ["Sustainability", "Water recycling, dust control, waste reduction, energy efficiency and community investment.", "Responsibility", "why-jz"],
  ["Technical support", "Mix selection, pre-pour planning, placement guidance and project documentation.", "Support", "concrete-guide"],
];

const companyAreas = [
  ["About Jianzhou", "about"], ["Why choose J Z", "why-jz"], ["Production facilities", "facilities"], ["Quality assurance", "quality"],
  ["Logistics & fleet", "logistics"], ["Major projects", "projects"], ["Sustainability", "why-jz"], ["Safety", "why-jz"],
  ["Careers", "quote"], ["News & media", "media"], ["Downloads", "downloads"], ["Customer enquiries", "quote"],
];

const defaultTerms = "1. Quotations remain valid until the date shown.\n2. Supply is subject to confirmed mix design, site access and delivery schedule.\n3. The client must provide safe access, suitable off-loading or pumping conditions and an authorised representative on site.\n4. Concrete quantities are charged from approved delivery records.\n5. Variations, waiting time, returned concrete and additional services may be charged separately.\n6. Payment is due according to the terms shown on this document.";

const defaultCompanySettings = { bank:"", accountName:"J Z Concrete", accountNumber:"", branch:"", swift:"", terms:defaultTerms };

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [language, setLanguage] = useState<"EN" | "FR" | "ZH">("EN");
  const [activeProduct, setActiveProduct] = useState(0);
  const [entered, setEntered] = useState(false);
  const [length, setLength] = useState("0");
  const [width, setWidth] = useState("0");
  const [depth, setDepth] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [allowance, setAllowance] = useState("0");
  const [contactName, setContactName] = useState("");
  const [projectType, setProjectType] = useState("Commercial building");
  const [projectLocation, setProjectLocation] = useState("");
  const [concreteGrade, setConcreteGrade] = useState("C25");
  const [requiredDate, setRequiredDate] = useState("");
  const [replyMode, setReplyMode] = useState("WhatsApp");
  const [contactValue, setContactValue] = useState("");
  const [destination, setDestination] = useState("operations");
  const logoTaps = useRef<number[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");
  const [invoice, setInvoice] = useState({ type:"Invoice", number:`JZ-INV-${new Date().getFullYear()}-001`, date:new Date().toISOString().slice(0,10), due:"", client:"", company:"", address:"", clientPhone:"", clientEmail:"", taxReference:"", purchaseOrder:"", description:"C25 Ready-Mix Concrete", quantity:"1", rate:"0", vatMode:"Exclusive", vat:"15", tax:"0", notes:"Thank you for choosing J Z Concrete." });
  const [companySettings, setCompanySettings] = useState(defaultCompanySettings);
  const [settingsSaved, setSettingsSaved] = useState(false);
  useEffect(() => {
    const entranceTimer = window.setTimeout(() => setEntered(true), 80);
    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("revealed");
    }), { threshold: 0.12 });
    nodes.forEach(node => observer.observe(node));
    const savedLanguage = document.cookie.match(/googtrans=\/en\/([^;]+)/)?.[1];
    if (savedLanguage === "fr") setLanguage("FR");
    if (savedLanguage === "zh-CN") setLanguage("ZH");
    const savedCompanySettings = window.localStorage.getItem("jz-document-settings");
    if (savedCompanySettings) {
      try { setCompanySettings({ ...defaultCompanySettings, ...JSON.parse(savedCompanySettings) }); } catch { /* keep safe defaults */ }
    }
    (window as unknown as { googleTranslateElementInit?: () => void }).googleTranslateElementInit = initialiseTranslator;
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
    const number = destination === "operations" ? "263774661555" : "263776506885";
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
    if (replyMode === "Phone call") {
      window.location.href = `tel:+${number}`;
      return;
    }
    if (replyMode === "Email") {
      window.location.href = `mailto:jianzhou01@gmail.com?subject=${encodeURIComponent("J Z Concrete project enquiry")}&body=${encodeURIComponent(message)}`;
      return;
    }
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const handleLogoTap = () => {
    const now = Date.now();
    const taps = [...logoTaps.current.filter(time => now - time < 1300), now];
    logoTaps.current = taps;
    if (taps.length >= 3) {
      setAdminOpen(true);
      logoTaps.current = [];
      return;
    }
  };

  const unlockAdmin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch("/api/admin-login", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password:adminPassword}) });
    if (response.ok) {
      setAdminUnlocked(true);
      setAdminError("");
      setAdminPassword("");
    } else {
      setAdminError("Incorrect password. Please try again.");
    }
  };

  const invoiceLineAmount = Math.max(0, Number(invoice.quantity) || 0) * Math.max(0, Number(invoice.rate) || 0);
  const invoiceVatRate = Math.max(0, Number(invoice.vat) || 0) / 100;
  const invoiceSubtotal = invoice.vatMode === "Inclusive" && invoiceVatRate > 0 ? invoiceLineAmount / (1 + invoiceVatRate) : invoiceLineAmount;
  const invoiceVat = invoice.vatMode === "No VAT" ? 0 : invoice.vatMode === "Inclusive" ? invoiceLineAmount - invoiceSubtotal : invoiceSubtotal * invoiceVatRate;
  const invoiceTax = invoiceSubtotal * Math.max(0, Number(invoice.tax) || 0) / 100;
  const invoiceTotal = (invoice.vatMode === "Inclusive" ? invoiceLineAmount : invoiceSubtotal + invoiceVat) + invoiceTax;
  const money = (value:number) => new Intl.NumberFormat("en-US", { style:"currency", currency:"USD" }).format(value);

  const saveCompanySettings = () => {
    window.localStorage.setItem("jz-document-settings", JSON.stringify(companySettings));
    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 2200);
  };

  const words = { capability:"Capabilities", concrete:"Concrete", projects:"Projects", knowledge:"Knowledge", quote:"Request a quote", calculator:"Calculate volume", eyebrow:"Ready-mix concrete for Zimbabwe", headline:["Building","Zimbabwe’s","future.","Together."], hero:"Premium ready-mix concrete backed by quality assurance, reliable delivery and practical technical support for projects of every scale.", tagline:"If it’s not JZ, it’s not concrete." };

  const initialiseTranslator = () => {
    const googleApi = (window as unknown as { google?: { translate?: { TranslateElement: new (options: object, elementId: string) => object } } }).google;
    if (typeof googleApi?.translate?.TranslateElement === "function" && !document.querySelector(".goog-te-combo")) new googleApi.translate.TranslateElement({ pageLanguage: "en", includedLanguages: "en,fr,zh-CN", autoDisplay: false }, "google_translate_element");
  };

  const changeLanguage = (next: "EN" | "FR" | "ZH") => {
    const target = next === "FR" ? "fr" : next === "ZH" ? "zh-CN" : "en";
    const cookieValue = target === "en" ? "" : `/en/${target}`;
    document.cookie = `googtrans=${cookieValue};path=/;max-age=${target === "en" ? 0 : 31536000}`;
    document.cookie = `googtrans=${cookieValue};domain=.${window.location.hostname};path=/;max-age=${target === "en" ? 0 : 31536000}`;
    window.location.reload();
  };

  return (
    <main className={entered ? "site-entered" : "site-entering"}>
      <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" onLoad={initialiseTranslator} />
      <div id="google_translate_element" aria-hidden="true" />
      <header className="nav">
        <button className="brand brand-trigger" type="button" aria-label="J Z Concrete home" onClick={handleLogoTap}>
          <img src="/jz/logo-clean.jpeg" alt="J Z Concrete" />
          <span>J Z <b>CONCRETE</b></span>
        </button>
        <nav className={menu ? "navlinks open" : "navlinks"} aria-label="Primary navigation">
          <a href="#capability" onClick={() => setMenu(false)}>{words.capability}</a>
          <a href="#products" onClick={() => setMenu(false)}>{words.concrete}</a>
          <a href="#projects" onClick={() => setMenu(false)}>{words.projects}</a>
          <a href="#knowledge" onClick={() => setMenu(false)}>{words.knowledge}</a>
        </nav>
        <div className="language-switch notranslate" role="group" aria-label="Change language">{(["EN","FR","ZH"] as const).map(code => <button className={language === code ? "active" : ""} onClick={() => changeLanguage(code)} key={code} aria-pressed={language === code}>{code === "ZH" ? "中文" : code}</button>)}</div>
        <a className="nav-cta" href="#quote">Request a quote <span>↗</span></a>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">{menu ? "Close" : "Menu"}</button>
      </header>

      <section className="hero" id="top">
        <div className="hero-mast"><span>J Z CONCRETE / ZIMBABWE</span><span>PREMIUM READY-MIX CONCRETE</span><span>ESTABLISHED FOR PERFORMANCE</span></div>
        <div className="hero-visual"><img className="hero-image" src="/jz/fleet-premium.jpeg" alt="J Z Concrete batching plant and ready-mix fleet in Zimbabwe" fetchPriority="high" /><div className="hero-shade" /></div>
        <div className="hero-copy">
          <p className="eyebrow"><i /> {words.eyebrow}</p>
          <h1><span className="hero-word word-one">{words.headline[0]}</span><span className="hero-word word-two">{words.headline[1]}</span><em><span className="hero-word word-three">{words.headline[2]}</span><span className="hero-word word-four">{words.headline[3]}</span></em></h1>
          <p className="hero-lede">{words.hero}</p>
          <p className="brand-line">{words.tagline}</p>
          <div className="hero-actions">
            <a className="primary" href="#quote">Request a quote <span>→</span></a>
            <a className="text-link" href="#calculator">Calculate volume <span>↓</span></a>
          </div>
        </div>
        <div className="hero-proof"><span><b>Premium quality</b>Concrete you can trust</span><span><b>Reliable delivery</b>Planned around your pour</span><span><b>Technical support</b>From selection to placement</span></div>
      </section>

      <aside className="contact-ribbon" aria-label="J Z Concrete direct contacts">
        <span>DIRECT PROJECT CONTACTS</span>
        <a href="https://wa.me/263774661555" target="_blank" rel="noreferrer"><small>01 / OPERATIONS</small><b>0774 661 555</b><i>WhatsApp ↗</i></a>
        <a href="https://wa.me/263776506885" target="_blank" rel="noreferrer"><small>02 / SALES</small><b>0776 506 885</b><i>WhatsApp ↗</i></a>
      </aside>

      <section className="statement reveal" id="capability">
        <p className="section-tag">/ The Jianzhou standard</p>
        <h2>Engineered for the pour.<br /><span>Proven in the structure.</span></h2>
        <div className="statement-grid">
          <p>Every cubic metre is controlled through material checks, mix design, automated batching, coordinated delivery and technical support—giving the project team confidence from order to placement.</p>
          <a href="#quality">Explore quality control <span>↗</span></a>
        </div>
      </section>

      <section className="service-scope reveal" aria-label="J Z Concrete service scope">
        <div className="scope-intro"><p className="section-tag">/ Complete concrete service</p><h2>Produce.<br />Supply.<br /><span>Place.</span></h2><p>The concrete itself is only one part of a successful pour. J Z connects controlled production with coordinated delivery and practical placement planning.</p></div>
        <div className="scope-steps">
          <article><span>01</span><h3>Produce</h3><p>Mix selection, raw-material control, moisture checks and automated batching support consistent output.</p><a href="#facilities">Production facilities →</a></article>
          <article><span>02</span><h3>Supply</h3><p>Order planning and coordinated mixer movement align concrete supply with the site programme.</p><a href="#logistics">Logistics & fleet →</a></article>
          <article><span>03</span><h3>Place</h3><p>Pumping strategy, access planning and technical guidance help the site prepare for efficient placement.</p><a href="#quote">Plan a pour →</a></article>
        </div>
      </section>

      <section className="project-journey reveal">
        <div className="journey-intro"><p className="section-tag">/ One partner at every stage</p><h2>From our plant<br />to your project.</h2><p>Quality concrete depends on more than the mix. Our production, laboratory and delivery teams work together to support every pour with consistency and care.</p><a href="#quote">Plan your next pour <span>→</span></a></div>
        <div className="journey-gallery">
          <figure className="journey-main"><img src="/jz/plant.jpeg" alt="J Z Concrete production facility" /><figcaption><small>Production facilities</small><b>Consistent concrete starts here.</b></figcaption></figure>
          <figure><img src="/jz/slump.jpeg" alt="Concrete quality testing" /><figcaption><small>Quality assurance</small><b>Every mix is checked.</b></figcaption></figure>
          <figure><img src="/jz/fleet-premium.jpeg" alt="J Z Concrete mixer fleet" /><figcaption><small>Reliable delivery</small><b>Prepared for your programme.</b></figcaption></figure>
        </div>
      </section>

      <section className="capability-hub reveal">
        <div className="hub-head"><p className="section-tag">/ Integrated capability</p><h2>One partner.<br /><span>Every critical stage.</span></h2><p>International production discipline connected to practical, responsive support on Zimbabwean projects.</p></div>
        <div className="capability-tiles">
          {capabilities.map(([title, copy, code, target], index) => <a href={`#${target}`} key={title} style={{"--delay": `${index * 70}ms`} as React.CSSProperties}><div className="tile-code">{code}</div><h3>{title}</h3><p>{copy}</p><span className="tile-arrow">↗</span></a>)}
        </div>
      </section>

      <section className="operational-proof reveal" aria-label="J Z operational capabilities">
        <article id="facilities"><img src="/jz/plant.jpeg" alt="J Z Concrete batching plants and cement silos" /><div><span>01 / PRODUCTION</span><h2>Production facilities</h2><p>Integrated batching plants, aggregate handling, cement silos, automated control, fleet yard and maintenance support form the operating centre of every order.</p><a href="#media">View the facility gallery →</a></div></article>
        <article id="quality"><img src="/jz/slump.jpeg" alt="Concrete slump testing and quality inspection" /><div><span>02 / QUALITY</span><h2>Quality assurance</h2><p>Raw-material inspection, moisture analysis, controlled mix design, slump testing, cube testing and final verification support consistent concrete performance.</p><a href="#knowledge">Explore technical guidance →</a></div></article>
        <article id="logistics"><img src="/jz/fleet-line.jpeg" alt="J Z Concrete mixer truck fleet" /><div><span>03 / LOGISTICS</span><h2>Logistics & fleet</h2><p>Mixer trucks, concrete pumps, service support and coordinated operations connect plant production to the pour programme on site.</p><a href="#quote">Plan delivery with operations →</a></div></article>
      </section>

      <section className="process reveal" id="quality-process">
        <div className="process-image"><img src="/jz/slump.jpeg" alt="Concrete slump testing" /><span>QUALITY ASSURANCE</span></div>
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
        <div className="concrete-guide" id="concrete-guide">
          <div className="product-list" role="tablist" aria-label="Concrete systems">
            {products.map((product, index) => <div className="product-row" key={product.n}>
              <button type="button" className={activeProduct === index ? "active" : ""} onClick={() => setActiveProduct(index)} role="tab" aria-selected={activeProduct === index} aria-expanded={activeProduct === index}><span>{product.n}</span><h3>{product.title}</h3><p>{product.summary}</p><b>{activeProduct === index ? "−" : "+"}</b></button>
              {activeProduct === index && <article className="product-detail-mobile" role="tabpanel">
                <div><small>GRADES / CLASS</small><p>{product.grades}</p></div>
                <div><small>COMMON APPLICATIONS</small><p>{product.use}</p></div>
                <div><small>TECHNICAL NOTE</small><p>{product.note}</p></div>
                <a href="#quote">Discuss this concrete <b>→</b></a>
              </article>}
            </div>)}
          </div>
          <article className="product-detail" aria-live="polite">
            <span className="detail-number">{products[activeProduct].n} / {String(products.length).padStart(2,"0")}</span>
            <h3>{products[activeProduct].title}</h3>
            <div><small>GRADES / CLASS</small><p>{products[activeProduct].grades}</p></div>
            <div><small>COMMON APPLICATIONS</small><p>{products[activeProduct].use}</p></div>
            <div><small>TECHNICAL NOTE</small><p>{products[activeProduct].note}</p></div>
            <a href="#quote">Discuss this concrete <b>→</b></a>
          </article>
        </div>
      </section>

      <section className="fleet-scene reveal">
        <img src="/jz/mixer.jpeg" alt="J Z Concrete ready-mix truck" />
        <div className="fleet-copy"><p className="section-tag">/ Concrete in motion</p><h2>The pour doesn’t<br />wait. <em>Neither do we.</em></h2><p>Production, operations and placement support move as one—so the right concrete arrives ready for the moment it matters.</p><a href="#quote">Talk to operations <span>→</span></a></div>
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
          <figure className="project-main"><img src="/jz/plant.jpeg" alt="J Z Concrete production plant" /><figcaption><span>Production infrastructure</span><b>Controlled batching at scale</b></figcaption></figure>
          <figure><img src="/jz/mixer.jpeg" alt="J Z Concrete ready-mix truck" /><figcaption><span>Fleet readiness</span><b>Concrete prepared for dispatch</b></figcaption></figure>
          <figure><img src="/jz/pour.jpeg" alt="Concrete pouring crew" /><figcaption><span>Placement support</span><b>Coordinated site pour</b></figcaption></figure>
        </div>
        <div className="project-gallery-more" aria-label="More J Z Concrete project work">
          <figure><img src="/jz/project-campus-01.jpeg" alt="J Z Concrete project under construction" /><figcaption><span>Project delivery</span><b>Concrete built for scale</b></figcaption></figure>
          <figure><img src="/jz/project-campus-02.jpeg" alt="Large concrete development under construction" /><figcaption><span>Detailed execution</span><b>Care at every stage</b></figcaption></figure>
          <figure><img src="/jz/project-campus-03.jpeg" alt="Curved concrete structures under construction" /><figcaption><span>Precision</span><b>Complex structural work</b></figcaption></figure>
          <figure><img src="/jz/project-campus-04.jpeg" alt="Major circular concrete structure under construction" /><figcaption><span>Capability</span><b>Projects of every scale</b></figcaption></figure>
        </div>
      </section>

      <section className="media-centre reveal" id="media">
        <div className="media-head"><div><p className="section-tag">/ Media gallery</p><h2>Inside the<br />operation.</h2></div><p>Plant, fleet, testing and placement—captured from the work itself. Approved project videos can be added here without changing the experience.</p></div>
        <div className="media-grid">
          <figure className="media-wide"><img src="/jz/campaign-truck-2026.jpeg" alt="J Z Concrete mixer truck at the production facility" /><figcaption><b>Plant & fleet</b><span>Production ready</span></figcaption></figure>
          <figure><img src="/jz/pump.jpeg" alt="Concrete pump used for placement" /><figcaption><b>Pumping</b><span>Placement capability</span></figcaption></figure>
          <figure><img src="/jz/pour.jpeg" alt="Concrete placement team at work" /><figcaption><b>On site</b><span>Coordinated pour</span></figcaption></figure>
          <figure><img src="/jz/slump.jpeg" alt="Concrete slump test" /><figcaption><b>Laboratory</b><span>Quality verification</span></figcaption></figure>
          <div className="video-ready"><span>VIDEO / READY</span><h3>Project film library</h3><p>This space is prepared for approved plant tours, project milestones and testimonial footage.</p><small>Video files awaiting client upload</small></div>
        </div>
        <div className="social-bar"><span>FOLLOW J Z CONCRETE</span><a href="https://wa.me/263776506885" target="_blank" rel="noreferrer">WhatsApp ↗</a><span className="pending-social">Facebook · Instagram · LinkedIn <b>links awaiting confirmation</b></span></div>
      </section>

      <section className="company-story reveal" id="about">
        <div><p className="section-tag">/ About J Z</p><h2>International engineering.<br /><span>Built for Zimbabwe.</span></h2></div>
        <div className="story-copy"><p>Jianzhou Concrete brings production discipline, technical control and coordinated ready-mix delivery together for Zimbabwe’s building and infrastructure market.</p><ol><li><b>01</b><span>Production</span>Controlled batching and material management.</li><li><b>02</b><span>Verification</span>Laboratory-led checks before and during supply.</li><li><b>03</b><span>Delivery</span>Operations aligned to the project’s pour window.</li><li><b>04</b><span>Support</span>Technical guidance from selection to placement.</li></ol></div>
      </section>

      <section className="why-jz reveal" id="why-jz">
        <figure className="why-image"><img src="/jz/campaign-tagline.jpeg" alt="If it’s not JZ, it’s not concrete" /><figcaption><span>THE J Z STANDARD</span><b>If it’s not JZ,<br />it’s not concrete.</b></figcaption></figure>
        <div className="why-copy"><p className="section-tag">/ Why choose J Z</p><h2>More than a supplier.<br /><span>A project partner.</span></h2><p>From mix selection and laboratory verification to dispatch and placement support, J Z stays accountable across the critical stages of every pour.</p><ul><li><b>01</b> Intelligent production control</li><li><b>02</b> Laboratory-led quality assurance</li><li><b>03</b> Coordinated fleet and pumping support</li><li><b>04</b> Practical technical guidance</li><li><b>05</b> Safety and responsible operations</li><li><b>06</b> Concrete designed around the application</li></ul><div className="why-contacts"><a href="https://wa.me/263774661555" target="_blank" rel="noreferrer"><small>Operations</small>0774 661 555</a><a href="https://wa.me/263776506885" target="_blank" rel="noreferrer"><small>Sales</small>0776 506 885</a></div></div>
      </section>

      <section className="knowledge reveal" id="knowledge">
        <div className="knowledge-title"><p className="section-tag">/ Technical knowledge centre</p><h2>Better concrete<br />starts before<br />the truck arrives.</h2></div>
        <div className="articles">
          {["Concrete grades explained", "C15 vs C20 vs C25 vs C30", "How to cure concrete", "Slump testing explained", "How much concrete do I need?"].map((x,i) => <a href="#quote" key={x}><span>0{i+1}</span><h3>{x}</h3><b>Read guide ↗</b></a>)}
        </div>
      </section>

      <section className="downloads reveal" id="downloads">
        <div><p className="section-tag">/ Downloads</p><h2>Project documents,<br /><span>properly controlled.</span></h2><p>Technical data sheets, mix brochures, certificates, safety documents and the corporate profile will appear here as soon as approved source files are supplied.</p></div>
        <div className="download-list"><span><b>01</b> Product catalogue <small>AWAITING APPROVED PDF</small></span><span><b>02</b> Technical data sheets <small>AWAITING APPROVED PDF</small></span><span><b>03</b> Quality certificates <small>AWAITING APPROVED PDF</small></span><span><b>04</b> Corporate profile <small>AWAITING APPROVED PDF</small></span></div>
      </section>

      <section className="company-map reveal">
        <div className="map-title"><p className="section-tag">/ Complete company platform</p><h2>Explore the<br />J Z ecosystem.</h2><p>Built to become both a sales platform and a technical resource centre for contractors, engineers, architects, developers, mines and public agencies.</p></div>
        <div className="map-links">{companyAreas.map(([item, target], i) => <a href={`#${target}`} key={item}><span>{String(i + 1).padStart(2,"0")}</span>{item}<b>↗</b></a>)}</div>
      </section>

      <section className="contact-suite reveal" id="quote">
        <div className="contact-story"><img src="/jz/operations-sales-team.jpeg" alt="J Z Concrete operations and sales team" /><div><p className="section-tag">/ Start the conversation</p><h2>Plan your<br />next pour.</h2><p>Choose Operations or Sales, then select WhatsApp, email or a phone call. The final button follows the method you choose.</p><p className="contact-tagline">If it’s not <b>JZ</b>, it’s not concrete.</p></div></div>
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
          <fieldset><legend>Contact team</legend><label><input type="radio" name="destination" value="operations" checked={destination === "operations"} onChange={e => setDestination(e.target.value)} /> Operations · +263 774 661 555</label><label><input type="radio" name="destination" value="sales" checked={destination === "sales"} onChange={e => setDestination(e.target.value)} /> Sales · +263 776 506 885</label></fieldset>
          <fieldset><legend>How should J Z reply?</legend>{["WhatsApp", "Phone call", "Email"].map(mode => <label key={mode}><input type="radio" name="reply" value={mode} checked={replyMode === mode} onChange={e => setReplyMode(e.target.value)} /> {mode}</label>)}</fieldset>
          <label className="reply-detail">Your {replyMode === "Email" ? "email address" : "phone number"}<input required type={replyMode === "Email" ? "email" : "tel"} value={contactValue} onChange={e => setContactValue(e.target.value)} placeholder={replyMode === "Email" ? "name@company.com" : "+263 …"} /></label>
          <button className="submit-enquiry" type="submit"><span>{replyMode === "Phone call" ? "Call selected team" : "Prepare enquiry"}</span><b>{replyMode === "Email" ? "Open email ↗" : replyMode === "Phone call" ? "Start call ↗" : "Open WhatsApp ↗"}</b></button>
          <small>Nothing is sent automatically. You can review the prepared message before sending it.</small>
        </form>
      </section>

      <a className="whatsapp-dock" href="https://wa.me/263776506885" target="_blank" rel="noreferrer" aria-label="Chat with J Z Concrete Sales on WhatsApp"><i>WA</i><span>WhatsApp<br /><b>Sales online</b></span></a>

      {adminOpen && <div className="admin-shell notranslate" role="dialog" aria-modal="true" aria-label="J Z invoice administration">
        <button className="admin-backdrop" aria-label="Close administration" onClick={() => setAdminOpen(false)} />
        {!adminUnlocked ? <section className="admin-login">
          <button className="admin-close" onClick={() => setAdminOpen(false)} aria-label="Close">×</button>
          <img src="/jz/logo-clean.jpeg" alt="J Z Concrete" />
          <span>RESTRICTED / ADMINISTRATION</span>
          <h2>Invoice access</h2>
          <p>Enter the administration password to open the invoice studio.</p>
          <form onSubmit={unlockAdmin}><label>Password<input autoFocus type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} /></label>{adminError && <small role="alert">{adminError}</small>}<button type="submit">Unlock administration →</button></form>
        </section> : <section className="invoice-studio">
          <header><div><span>J Z / ADMINISTRATION</span><h2>Invoice studio</h2></div><button onClick={() => setAdminOpen(false)} aria-label="Close">×</button></header>
          <div className="invoice-workspace">
            <form className="invoice-controls" onSubmit={e => e.preventDefault()}>
              <div className="document-switch" role="group" aria-label="Document type">{["Invoice","Quotation"].map(type => <button type="button" className={invoice.type === type ? "active" : ""} key={type} onClick={() => setInvoice({...invoice,type,number:`JZ-${type === "Invoice" ? "INV" : "QUO"}-${new Date().getFullYear()}-001`})}>{type}</button>)}</div>
              <div className="invoice-field-grid">
                <label>{invoice.type} number<input value={invoice.number} onChange={e => setInvoice({...invoice,number:e.target.value})} /></label>
                <label>{invoice.type} date<input type="date" value={invoice.date} onChange={e => setInvoice({...invoice,date:e.target.value})} /></label>
                <label>{invoice.type === "Invoice" ? "Due date" : "Valid until"}<input type="date" value={invoice.due} onChange={e => setInvoice({...invoice,due:e.target.value})} /></label>
                <label>Client name<input value={invoice.client} onChange={e => setInvoice({...invoice,client:e.target.value})} placeholder="Client contact" /></label>
                <label>Company<input value={invoice.company} onChange={e => setInvoice({...invoice,company:e.target.value})} placeholder="Customer company" /></label>
                <label className="full">Billing address<textarea value={invoice.address} onChange={e => setInvoice({...invoice,address:e.target.value})} /></label>
                <label>Client phone<input type="tel" value={invoice.clientPhone} onChange={e => setInvoice({...invoice,clientPhone:e.target.value})} placeholder="+263 …" /></label>
                <label>Client email<input type="email" value={invoice.clientEmail} onChange={e => setInvoice({...invoice,clientEmail:e.target.value})} placeholder="accounts@client.com" /></label>
                <label>Client tax / VAT number<input value={invoice.taxReference} onChange={e => setInvoice({...invoice,taxReference:e.target.value})} /></label>
                <label>Purchase order / reference<input value={invoice.purchaseOrder} onChange={e => setInvoice({...invoice,purchaseOrder:e.target.value})} /></label>
                <label className="full">Concrete grade / mix<select value={invoice.description} onChange={e => setInvoice({...invoice,description:e.target.value})}>{["C10 Ready-Mix Concrete","C15 Ready-Mix Concrete","C20 Ready-Mix Concrete","C25 Ready-Mix Concrete","C30 Ready-Mix Concrete","C35 Ready-Mix Concrete","Swimming Pool Mix","Waterproof Concrete Mix","High-Performance Concrete","Self-Compacting Concrete","Fibre-Reinforced Concrete","Shotcrete","Mortar / Custom Mix"].map(item => <option key={item}>{item}</option>)}</select></label>
                <label>Quantity<input type="number" min="0" step="0.01" value={invoice.quantity} onChange={e => setInvoice({...invoice,quantity:e.target.value})} /></label>
                <label>Rate (USD)<input type="number" min="0" step="0.01" value={invoice.rate} onChange={e => setInvoice({...invoice,rate:e.target.value})} /></label>
                <label>VAT treatment<select value={invoice.vatMode} onChange={e => setInvoice({...invoice,vatMode:e.target.value})}><option>Exclusive</option><option>Inclusive</option><option>No VAT</option></select></label>
                <label>VAT rate (%)<input type="number" min="0" step="0.01" disabled={invoice.vatMode === "No VAT"} value={invoice.vat} onChange={e => setInvoice({...invoice,vat:e.target.value})} /></label>
                <label>Additional tax (%)<input type="number" min="0" step="0.01" value={invoice.tax} onChange={e => setInvoice({...invoice,tax:e.target.value})} /></label>
                <label className="full">Notes<textarea value={invoice.notes} onChange={e => setInvoice({...invoice,notes:e.target.value})} /></label>
              </div>
              <details className="company-settings">
                <summary><span>Company defaults</span><b>Banking & terms ↘</b></summary>
                <p>Enter these once. They are saved on this device and automatically applied to every invoice and quotation.</p>
                <div className="invoice-field-grid">
                  <label>Bank name<input value={companySettings.bank} onChange={e => setCompanySettings({...companySettings,bank:e.target.value})} placeholder="Bank name" /></label>
                  <label>Account name<input value={companySettings.accountName} onChange={e => setCompanySettings({...companySettings,accountName:e.target.value})} /></label>
                  <label>Account number<input value={companySettings.accountNumber} onChange={e => setCompanySettings({...companySettings,accountNumber:e.target.value})} /></label>
                  <label>Branch<input value={companySettings.branch} onChange={e => setCompanySettings({...companySettings,branch:e.target.value})} /></label>
                  <label className="full">SWIFT / reference<input value={companySettings.swift} onChange={e => setCompanySettings({...companySettings,swift:e.target.value})} /></label>
                  <label className="full">Standard terms & conditions<textarea className="terms-input" value={companySettings.terms} onChange={e => setCompanySettings({...companySettings,terms:e.target.value})} /></label>
                </div>
                <button className="save-settings" type="button" onClick={saveCompanySettings}>{settingsSaved ? "Company defaults saved ✓" : "Save company defaults"}</button>
              </details>
              <button className="print-invoice" type="button" onClick={() => window.print()}>Print / save PDF →</button>
              <small>Review every detail before issuing the invoice. Records are not stored by the website.</small>
            </form>
            <article className="invoice-sheet">
              <div className="invoice-brand"><img src="/jz/logo-clean.jpeg" alt="" /><div><b>J Z CONCRETE</b><span>Ready-mix concrete · Harare, Zimbabwe</span></div><h3>{invoice.type.toUpperCase()}</h3></div>
              <div className="invoice-meta"><div><small>{invoice.type === "Invoice" ? "BILL TO" : "QUOTATION FOR"}</small><b>{invoice.company || "Customer company"}</b><span>{invoice.client || "Client name"}</span><span>{invoice.address || "Billing address"}</span><span>{[invoice.clientPhone,invoice.clientEmail].filter(Boolean).join(" · ") || "Client contact details"}</span><span>{invoice.taxReference ? `Tax / VAT: ${invoice.taxReference}` : ""}</span></div><dl><dt>{invoice.type}</dt><dd>{invoice.number}</dd><dt>Date</dt><dd>{invoice.date || "—"}</dd><dt>{invoice.type === "Invoice" ? "Due" : "Valid until"}</dt><dd>{invoice.due || (invoice.type === "Invoice" ? "On receipt" : "To be confirmed")}</dd><dt>PO / Reference</dt><dd>{invoice.purchaseOrder || "—"}</dd><dt>VAT basis</dt><dd>{invoice.vatMode}</dd></dl></div>
              <table><thead><tr><th>Description</th><th>Quantity</th><th>Rate</th><th>Amount</th></tr></thead><tbody><tr><td>{invoice.description || "Concrete supply"}</td><td>{invoice.quantity || "0"}</td><td>{money(Number(invoice.rate) || 0)}</td><td>{money(invoiceLineAmount)}</td></tr></tbody></table>
              <div className="invoice-totals"><span>{invoice.vatMode === "Inclusive" ? "Net subtotal" : "Subtotal"} <b>{money(invoiceSubtotal)}</b></span><span>VAT · {invoice.vatMode} ({invoice.vatMode === "No VAT" ? 0 : Number(invoice.vat) || 0}%) <b>{money(invoiceVat)}</b></span><span>Additional tax ({Number(invoice.tax) || 0}%) <b>{money(invoiceTax)}</b></span><strong>Total <b>{money(invoiceTotal)}</b></strong></div>
              <div className="banking-preview"><small>BANKING DETAILS</small><div><span><b>Bank</b>{companySettings.bank || "Add bank name in Company defaults"}</span><span><b>Account name</b>{companySettings.accountName || "J Z Concrete"}</span><span><b>Account number</b>{companySettings.accountNumber || "Add account number in Company defaults"}</span><span><b>Branch</b>{companySettings.branch || "Add branch in Company defaults"}</span><span><b>SWIFT / Reference</b>{companySettings.swift || "Add SWIFT or reference in Company defaults"}</span></div></div>
              <div className="invoice-notes"><small>NOTES</small><p>{invoice.notes}</p></div>
              <div className="invoice-terms"><small>TERMS & CONDITIONS</small><p>{companySettings.terms}</p></div>
              <footer><b>If it’s not JZ, it’s not concrete.</b><span>Operations +263 774 661 555 · Sales +263 776 506 885</span></footer>
            </article>
          </div>
        </section>}
      </div>}

      <footer>
        <div className="footer-brand"><img src="/jz/logo-clean.jpeg" alt="" /><h2>J Z CONCRETE</h2><p>Building Zimbabwe’s future with international engineering excellence.</p></div>
        <div><small>EXPLORE</small><a href="#products">Concrete systems</a><a href="#quality">Quality assurance</a><a href="#projects">Projects</a><a href="#knowledge">Knowledge centre</a></div>
        <div><small>CONTACT</small><a href="tel:+263774661555">Operations · +263 774 661 555</a><a href="tel:+263776506885">Sales · +263 776 506 885</a><span>Harare, Zimbabwe</span></div>
        <div className="footer-bottom"><span>© 2026 J Z Concrete</span><span>Engineered to perform.</span></div>
      </footer>
    </main>
  );
}
