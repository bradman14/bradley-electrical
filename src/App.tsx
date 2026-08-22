import { type FormEvent, type ReactNode, useEffect, useRef, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  CircuitBoard,
  ClipboardCheck,
  HardHat,
  Lightbulb,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import heroImage from '../attached_assets/generated_images/hero-electrical.jpg';

type ServiceName = 'House Wiring' | 'Lighting Installation' | 'Electrical Repairs' | 'Electrical Installation';

type Service = {
  name: ServiceName;
  text: string;
  icon: ReactNode;
  number: string;
};

const services: Service[] = [
  { name: 'House Wiring', text: 'Safe, tidy wiring for new builds, renovations and homes that need a dependable electrical foundation.', icon: <CircuitBoard />, number: '01' },
  { name: 'Lighting Installation', text: 'Thoughtful lighting installation that improves comfort, visibility and the character of every space.', icon: <Lightbulb />, number: '02' },
  { name: 'Electrical Repairs', text: 'Careful fault finding and repairs for outlets, switches, circuits and everyday electrical problems.', icon: <Zap />, number: '03' },
  { name: 'Electrical Installation', text: 'Professional installations for homes, shops, offices and growing businesses across Mombasa.', icon: <HardHat />, number: '04' },
];

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

const whyItems = [
  { title: 'Quality Work', text: 'The right materials, careful workmanship and a clean finish designed to last.', icon: <ShieldCheck /> },
  { title: 'Professional Service', text: 'Clear communication, dependable visits and respect for your home or business.', icon: <ClipboardCheck /> },
  { title: 'Affordable Pricing', text: 'Straightforward recommendations and fair quotes without unnecessary surprises.', icon: <Sparkles /> },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedService, setSelectedService] = useState<ServiceName | ''>('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const sections = ['home', 'services', 'about', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.05, 0.2, 0.6] });

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);

  const openQuote = (service?: ServiceName) => {
    if (service) setSelectedService(service);
    setMenuOpen(false);
    window.setTimeout(() => {
      scrollToId('contact');
      window.setTimeout(() => {
        const target = service ? 'service' : 'name';
        const field = formRef.current?.elements.namedItem(target) as HTMLInputElement | HTMLSelectElement | null;
        field?.focus();
      }, 500);
    }, 20);
  };

  const go = (id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Hello Bradley Electrical, I would like to request a quote.',
      '',
      `Name: ${data.get('name') || ''}`,
      `Phone Number: ${data.get('phone') || ''}`,
      `Service: ${data.get('service') || ''}`,
      `Property Type: ${data.get('propertyType') || ''}`,
      `Location: ${data.get('location') || ''}`,
      `Description: ${data.get('description') || ''}`,
      `Photo: ${fileName || 'Not attached'}`,
    ].join('\n');

    setSubmitted(true);
    window.location.href = `https://wa.me/254713616932?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="site-shell">
      <nav className="site-nav" aria-label="Main navigation">
        <div className="container nav-inner">
          <button className="brand-lockup" onClick={() => go('home')} aria-label="Bradley Electrical home">
            <span className="brand-mark"><Zap size={18} fill="currentColor" /></span>
            <span>
              <span className="brand-name">Bradley Electrical</span>
              <span className="brand-sub">Power. Precisely.</span>
            </span>
          </button>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
            <a className="nav-phone" href="tel:0713616932"><Phone size={14} /> 0713 616 932</a>
            <button className="nav-quote" onClick={() => openQuote()}>Request a quote <ArrowRight size={14} /></button>
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="home">
          <img className="hero-image" src={heroImage} alt="Professional electrical installation" />
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-grid" />
          <div className="hero-sparks" aria-hidden="true"><i /><i /><i /><i /><i /></div>

          <div className="container hero-content">
            <div className="hero-copy">
              <div className="eyebrow hero-kicker reveal">Mombasa · Kenya · Electrical Services</div>
              <div className="hero-badge reveal delay-1"><span className="status-dot" /> Professional electrical solutions</div>
              <h1 className="hero-title reveal delay-1">Powering Your Home.<br /><span>Connecting</span> Your Future.</h1>
              <p className="hero-description reveal delay-2">Safe, reliable and professional electrical solutions for homes and businesses.</p>
              <div className="hero-actions reveal delay-3">
                <button className="button button-primary" onClick={() => openQuote()}>Request a Quote <ArrowRight size={16} /></button>
                <button className="button button-ghost" onClick={() => go('services')}>View Services <ArrowDownRight size={16} /></button>
              </div>
              <div className="hero-trust reveal delay-3">
                <div><span>01</span><strong>Safety first</strong><small>Careful, dependable work</small></div>
                <div><span>02</span><strong>Local service</strong><small>Mombasa &amp; surrounding areas</small></div>
                <div><span>03</span><strong>Clear pricing</strong><small>Honest recommendations</small></div>
              </div>
            </div>

            <div className="hero-visual reveal delay-2" aria-hidden="true">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <div className="visual-core"><Zap size={58} fill="currentColor" /></div>
              <div className="visual-card visual-card-top"><span>POWER SYSTEM</span><strong>READY</strong><i /></div>
              <div className="visual-card visual-card-bottom"><Zap size={14} /><span>Reliable by design</span></div>
            </div>
          </div>

          <button className="hero-scroll" onClick={() => go('services')} aria-label="Scroll to services"><span>Explore</span><i /></button>
        </section>

        <section className="signal-strip" aria-label="Bradley Electrical highlights">
          <div className="container signal-grid">
            <div><span className="signal-icon"><Zap size={17} /></span><span><strong>Safety-led</strong><small>Every connection matters</small></span></div>
            <div><span className="signal-icon"><CircuitBoard size={17} /></span><span><strong>Professional</strong><small>Clean, considered installations</small></span></div>
            <div><span className="signal-icon"><MessageCircle size={17} /></span><span><strong>Easy to reach</strong><small>Call or WhatsApp directly</small></span></div>
          </div>
        </section>

        <section className="services section-dark" id="services">
          <div className="container">
            <div className="section-heading-row reveal">
              <div><div className="eyebrow">What we do</div><h2 className="section-title light">Electrical work, <span>elevated.</span></h2></div>
              <p className="section-copy light-copy">From a single repair to a complete installation, we bring the same focus on safety, detail and dependable results.</p>
            </div>

            <div className="service-grid">
              {services.map((service, index) => (
                <article className={`service-card reveal delay-${(index % 3) + 1}`} key={service.name}>
                  <div className="service-card-top"><span className="service-number">{service.number}</span><span className="service-icon">{service.icon}</span></div>
                  <div className="service-card-body"><h3>{service.name}</h3><p>{service.text}</p></div>
                  <button className="service-link" onClick={() => openQuote(service.name)}>Get a Quote <ArrowRight size={15} /></button>
                  <span className="service-glow" aria-hidden="true" />
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="why section-light" id="why">
          <div className="container why-grid">
            <div className="why-intro reveal">
              <div className="eyebrow">Why Bradley Electrical</div>
              <h2 className="section-title">Confidence in every <span>connection.</span></h2>
              <p className="section-copy">Electrical work should feel simple after it is done. We combine practical skill with professional communication so you know what is happening and why.</p>
              <button className="text-button" onClick={() => openQuote()}>Talk to Bradley <ArrowRight size={15} /></button>
            </div>
            <div className="why-cards">
              {whyItems.map((item, index) => (
                <article className="why-card reveal delay-1" key={item.title}>
                  <span className="why-icon">{item.icon}</span><span className="why-number">0{index + 1}</span>
                  <h3>{item.title}</h3><p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about section-mid" id="about">
          <div className="container about-grid">
            <div className="about-visual reveal" aria-hidden="true">
              <div className="about-panel about-panel-back" />
              <div className="about-panel about-panel-front">
                <span className="about-chip"><Zap size={14} /> BRADLEY ELECTRICAL</span>
                <div className="about-bolt"><Zap size={72} fill="currentColor" /></div>
                <div className="about-lines"><i /><i /><i /></div>
              </div>
              <span className="about-corner">BE / 2026</span>
            </div>
            <div className="about-copy-block reveal delay-1">
              <div className="eyebrow">About Bradley Electrical</div>
              <h2 className="section-title">Built around <span>trust.</span></h2>
              <p className="about-lead">Bradley Electrical provides reliable and professional electrical services for homes and businesses.</p>
              <p className="section-copy">Our goal is to provide safe, quality and affordable electrical solutions for every customer. We listen first, explain clearly and approach every job with care.</p>
              <div className="about-points"><div><Check size={15} /> Clear communication</div><div><Check size={15} /> Quality workmanship</div><div><Check size={15} /> Safety-focused service</div></div>
            </div>
          </div>
        </section>

        <section className="process section-light" aria-label="Our process">
          <div className="container">
            <div className="section-heading-row reveal">
              <div><div className="eyebrow">How it works</div><h2 className="section-title">Simple from <span>start to finish.</span></h2></div>
              <p className="section-copy">Tell us what you need, get a clear next step, then let us take care of the electrical work.</p>
            </div>
            <div className="process-grid">
              {[['01', 'Tell us what you need', 'Call, WhatsApp or use the quote form.'], ['02', 'We assess the work', 'We ask the right questions and plan the job.'], ['03', 'Get a clear quote', 'A straightforward scope and price before work.'], ['04', 'We make it right', 'Careful work, testing and a clean handover.']].map(([number, title, text], index) => (
                <article className={`process-card reveal delay-${(index % 3) + 1}`} key={number}><span>{number}</span><div className="process-line" /><h3>{title}</h3><p>{text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="quote-section section-dark" id="contact">
          <div className="container quote-grid">
            <div className="quote-intro reveal">
              <div className="eyebrow">Request a Quote</div>
              <h2 className="section-title light">Let’s get your power <span>sorted.</span></h2>
              <p className="section-copy light-copy">Tell us a little about the work. Your details will open a WhatsApp message so we can respond directly.</p>
              <div className="contact-list">
                <a href="tel:0713616932"><span><Phone size={16} /></span><div><small>Phone</small><strong>0713 616 932</strong></div></a>
                <a href="https://wa.me/254713616932" target="_blank" rel="noreferrer"><span><MessageCircle size={16} /></span><div><small>WhatsApp</small><strong>Chat with Bradley</strong></div></a>
                <div><span><MapPin size={16} /></span><div><small>Service area</small><strong>Mombasa, Kenya</strong></div></div>
              </div>
              <a className="whatsapp-large" href="https://wa.me/254713616932" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Chat on WhatsApp <ArrowRight size={15} /></a>
            </div>

            <form className="quote-form reveal delay-1" ref={formRef} onSubmit={handleSubmit}>
              <div className="form-header"><div><span>01</span><h3>Tell us about the job</h3></div><p>Fields marked * are required</p></div>
              <div className="form-grid">
                <div className="field"><label htmlFor="quote-name">Name *</label><input id="quote-name" name="name" required placeholder="Your full name" /></div>
                <div className="field"><label htmlFor="quote-phone">Phone Number *</label><input id="quote-phone" name="phone" required type="tel" placeholder="0713 616 932" /></div>
                <div className="field"><label htmlFor="quote-service">Service *</label><select id="quote-service" name="service" required value={selectedService} onChange={(event) => setSelectedService(event.target.value as ServiceName)}><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.name} value={service.name}>{service.name}</option>)}</select></div>
                <div className="field"><label htmlFor="quote-property">Property Type *</label><select id="quote-property" name="propertyType" required defaultValue=""><option value="" disabled>Select property type</option><option>Home</option><option>Business</option><option>Office</option><option>Shop</option><option>Other</option></select></div>
                <div className="field full"><label htmlFor="quote-location">Location *</label><input id="quote-location" name="location" required placeholder="Area or neighbourhood in Mombasa" /></div>
                <div className="field full"><label htmlFor="quote-description">Description *</label><textarea id="quote-description" name="description" required placeholder="Tell us what you would like us to help with..." /></div>
                <div className="field full"><label htmlFor="quote-photo">Photo</label><label className="file-label" htmlFor="quote-photo"><span className="file-name">{fileName || 'Optional — attach a photo of the issue or space'}</span><span className="file-action">Choose file</span><input id="quote-photo" name="photo" type="file" accept="image/*" onChange={(event) => setFileName(event.target.files?.[0]?.name || '')} /></label></div>
              </div>
              <div className="form-footer"><p>We will open WhatsApp with your information ready to send.</p><button className="button button-primary" type="submit">Send via WhatsApp <ArrowRight size={16} /></button></div>
              {submitted && <div className="form-success" role="status"><Check size={14} /> Opening WhatsApp with your request...</div>}
            </form>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-inner reveal">
            <div><div className="eyebrow">Ready when you are</div><h2>Good power starts with <span>good work.</span></h2></div>
            <button className="button button-primary" onClick={() => openQuote()}>Request a Quote <ArrowRight size={16} /></button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div><div className="footer-brand"><span className="brand-mark"><Zap size={16} fill="currentColor" /></span><strong>Bradley Electrical</strong></div><p>Professional Electrical Services</p></div>
          <div className="footer-links"><button onClick={() => go('home')}>Home</button><button onClick={() => go('services')}>Services</button><button onClick={() => go('about')}>About</button><button onClick={() => go('contact')}>Contact</button></div>
          <div className="footer-contact"><a href="tel:0713616932"><Phone size={14} /> 0713 616 932</a><a href="https://wa.me/254713616932" target="_blank" rel="noreferrer"><MessageCircle size={14} /> WhatsApp</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 Bradley Electrical. All rights reserved.</span><button onClick={() => go('home')}>Back to top ↑</button></div>
      </footer>
    </div>
  );
}

function Router() {
  return <Switch><Route path="/" component={Home} /><Route component={() => <div style={{ padding: 40 }}>Page not found.</div>} /></Switch>;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RoutedErrorBoundary><Router /></RoutedErrorBoundary></WouterRouter>;
}

export default App;
