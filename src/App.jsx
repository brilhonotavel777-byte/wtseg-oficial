import { useState, useEffect, useRef } from "react";

const WA =
  "https://wa.me/5511990005445?text=Ol%C3%A1%2C%20visitei%20o%20site%20da%20WTSEG%20e%20gostaria%20de%20receber%20mais%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20de%20seguran%C3%A7a.";

const C = {
  gold:     "#d4af37",
  white:    "#ffffff",
  gray:     "#d6d6d6",
  bg:       "#050505",
  graphite: "#0f0f0f",
  card:     "rgba(17,17,17,0.85)",
};

const HERO_OVERLAY = [
  "linear-gradient(90deg, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.86) 10%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.04) 100%)",
  "linear-gradient(180deg, rgba(0,0,0,0.36) 0%, rgba(0,0,0,0.08) 48%, rgba(5,5,5,1) 100%)",
].join(", ");

const NAV = [
  { label: "Início",       id: "inicio"       },
  { label: "Sobre",        id: "sobre"        },
  { label: "Serviços",     id: "servicos"     },
  { label: "Diferenciais", id: "diferenciais" },
  { label: "Contato",      id: "contato"      },
];

const HERO_STRIP = [
  { value: "+100",     label: "Operações Planejadas"    },
  { value: "24h",      label: "Atendimento Operacional" },
  { value: "Equipe",   label: "Qualificada"             },
  { value: "Presença", label: "Preventiva"              },
];

const STAT_METRICS = [
  { prefix: "+",  target: 100,  suffix: "",  label: "Operações Planejadas"       },
  { prefix: "+",  target: 5000, suffix: "h", label: "Horas de Atuação"           },
  { prefix: "",   target: 24,   suffix: "h", label: "Atendimento Operacional"    },
  { prefix: "",   target: 100,  suffix: "%", label: "Compromisso com a Execução" },
];

const SERVICES = [
  { icon: "🛡️", title: "Segurança Patrimonial",  desc: "Proteção eficiente de patrimônio físico com atuação presencial e planejamento estratégico." },
  { icon: "🏢", title: "Segurança Empresarial",   desc: "Soluções adaptadas ao ambiente corporativo com foco em prevenção e controle operacional." },
  { icon: "🎯", title: "Controle de Acesso",      desc: "Gerenciamento de acesso com rigor operacional para garantir a integridade dos ambientes." },
  { icon: "📅", title: "Segurança para Eventos",  desc: "Cobertura profissional para eventos de todos os portes com equipe qualificada e planejamento dedicado." },
  { icon: "🔄", title: "Rondas Preventivas",      desc: "Vigilância presencial ativa e rondas periódicas para prevenir ocorrências e garantir segurança contínua." },
  { icon: "📦", title: "Proteção de Ativos",      desc: "Salvaguarda de mercadorias, equipamentos e ativos empresariais com responsabilidade operacional." },
];

const AREAS = [
  { icon: "🏢", title: "Empresas",                desc: "Segurança para escritórios, sedes e ambientes corporativos." },
  { icon: "🏘️", title: "Condomínios",             desc: "Proteção residencial e comercial com presença preventiva." },
  { icon: "📦", title: "Centros Logísticos",       desc: "Cobertura operacional para galpões, cargas e ativos logísticos." },
  { icon: "🤝", title: "Eventos Corporativos",     desc: "Planejamento e execução de segurança para eventos empresariais." },
  { icon: "🎉", title: "Eventos Privados",          desc: "Segurança personalizada para celebrações e eventos exclusivos." },
  { icon: "🏠", title: "Patrimônios Residenciais", desc: "Proteção de residências e patrimônios de alto valor." },
];

const DIFFERENTIALS = [
  { icon: "👥", title: "Equipe Qualificada",         desc: "Profissionais treinados para atuar com excelência em diferentes ambientes e cenários operacionais." },
  { icon: "📍", title: "Presença Operacional",        desc: "Vigilância e prevenção garantindo visibilidade, controle e resposta imediata em cada operação." },
  { icon: "⚡", title: "Atendimento Ágil",            desc: "Resposta rápida e eficiente para atender às demandas dos clientes com precisão e agilidade." },
  { icon: "🗂️", title: "Planejamento Estratégico",   desc: "Cada operação é planejada com cuidado para maximizar eficácia e minimizar riscos." },
  { icon: "✅", title: "Compromisso com Resultados", desc: "Foco total na entrega de resultados com presença operacional contínua e responsabilidade total." },
  { icon: "🎯", title: "Cobertura Personalizada",    desc: "Soluções adaptadas às necessidades específicas de cada cliente, empresa ou evento." },
];

const STEPS = [
  { num: "01", title: "Contato Inicial",     desc: "Entendimento da necessidade, local, horários e perfil da operação." },
  { num: "02", title: "Planejamento",        desc: "Definição da cobertura, equipe, horários e pontos de atenção." },
  { num: "03", title: "Execução Presencial", desc: "Atuação da equipe de segurança com rondas, presença preventiva e acompanhamento operacional." },
  { num: "04", title: "Acompanhamento",      desc: "Comunicação, suporte e ajustes necessários durante a execução dos serviços." },
];

/* ─────────────────── HOOKS ─────────────────── */

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useAnimatedCount(target, duration, active) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const totalSteps = Math.ceil(duration / 16);
    const step = target / totalSteps;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(current)); }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);
  return count;
}

/* ─────────────────── COMPONENTS ─────────────────── */

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "64px" }}>
      <h2 style={{ fontSize: "2.1rem", fontWeight: 700, color: C.white, marginBottom: "16px", lineHeight: 1.3 }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{ color: C.gray, maxWidth: "580px", margin: "0 auto", lineHeight: 1.8, fontSize: "1rem" }}>
          {subtitle}
        </p>
      )}
      <div style={{ width: "56px", height: "3px", background: C.gold, margin: "20px auto 0", borderRadius: "2px" }} />
    </div>
  );
}

function Card({ icon, title, desc }) {
  return (
    <div className="card" style={{
      background: C.card,
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      border: "1px solid rgba(212,175,55,0.12)",
      borderRadius: "14px",
      padding: "40px 28px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ fontSize: "2.4rem", marginBottom: "20px" }}>{icon}</div>
      <h3 style={{ color: C.gold, fontWeight: 600, marginBottom: "14px", fontSize: "1.02rem", letterSpacing: "0.3px" }}>
        {title}
      </h3>
      <p style={{ color: C.gray, fontSize: "0.92rem", lineHeight: 1.8 }}>{desc}</p>
    </div>
  );
}

function StatCard({ prefix, target, suffix, label, active, nth }) {
  const count = useAnimatedCount(target, 1800, active);
  const display = target >= 1000 ? count.toLocaleString("pt-BR") : String(count);
  return (
    <div
      className={`stat-card stat-card-${nth}${active ? " stat-active" : ""}`}
      style={{
        background: "rgba(15,15,15,0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(212,175,55,0.22)",
        borderRadius: "14px",
        padding: "44px 28px",
        textAlign: "center",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ color: C.gold, fontSize: "2.9rem", fontWeight: 800, lineHeight: 1, marginBottom: "14px", letterSpacing: "-1px" }}>
        {prefix}{display}{suffix}
      </div>
      <div style={{ color: C.gray, fontSize: "0.88rem", lineHeight: 1.5 }}>
        {label}
      </div>
    </div>
  );
}

/* ─────────────────── APP ─────────────────── */

export default function App() {
  const [open, setOpen]           = useState(false);
  const [statsRef, statsInView]   = useInView(0.2);
  const [isMobile, setIsMobile]   = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const handle = () => setIsMobile(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── CSS global ──────────────────────────────────── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; overflow-x: hidden; }
        body { background: ${C.bg}; overflow-x: hidden; }
        #root { width: 100%; }

        /* ── HEADER */
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .wa-btn    { display: inline-block; }
        .burger    { display: none; flex-direction: column; gap: 5px;
                     background: none; border: none; cursor: pointer; padding: 6px; }
        .burger span { display: block; width: 24px; height: 2px;
                       background: ${C.gold}; border-radius: 2px; }
        .mob-menu  { display: none; }

        /* ── HERO */
        .hero-content { text-align: left; }
        .hero-ctas    { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 48px; }
        .hero-strip   {
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: rgba(10,10,10,0.65);
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(212,175,55,0.2); border-radius: 12px; overflow: hidden;
        }
        .strip-item { padding: 20px 16px; text-align: center;
                      border-right: 1px solid rgba(212,175,55,0.12); }
        .strip-item:last-child { border-right: none; }

        /* ── STAT CARDS */
        @keyframes statEntry {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stat-card {
          opacity: 0;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .stat-card::before {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(212,175,55,0.07) 0%, transparent 65%);
          opacity: 0; transition: opacity 0.4s ease;
        }
        .stat-card:hover { border-color: rgba(212,175,55,0.52) !important;
                           box-shadow: 0 32px 72px rgba(0,0,0,0.55) !important; }
        .stat-card:hover::before { opacity: 1; }
        .stat-active { animation: statEntry 0.7s cubic-bezier(0.22,1,0.36,1) both; }
        .stat-card-0.stat-active { animation-delay: 0.05s; }
        .stat-card-1.stat-active { animation-delay: 0.18s; }
        .stat-card-2.stat-active { animation-delay: 0.31s; }
        .stat-card-3.stat-active { animation-delay: 0.44s; }

        /* ── GENERIC CARDS */
        .card { transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease; }
        .card::before {
          content: ''; position: absolute; inset: 0; border-radius: 14px;
          background: radial-gradient(circle at 50% 0%, rgba(212,175,55,0.06) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.4s ease; pointer-events: none;
        }
        .card:hover { border-color: rgba(212,175,55,0.40) !important;
                      transform: translateY(-5px);
                      box-shadow: 0 16px 48px rgba(0,0,0,0.55); }
        .card:hover::before { opacity: 1; }

        /* ── GRIDS */
        .grid-auto  { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

        /* ── TIMELINE */
        .timeline { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; }
        .timeline::before {
          content: ''; position: absolute;
          top: 32px; left: 12.5%; right: 12.5%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.32) 20%, rgba(212,175,55,0.32) 80%, transparent);
        }
        .step-item { text-align: center; padding: 0 20px; }
        .step-num  {
          width: 64px; height: 64px; border-radius: 50%;
          background: rgba(212,175,55,0.08); border: 2px solid rgba(212,175,55,0.4);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 24px;
          color: ${C.gold}; font-weight: 700; font-size: 1.2rem;
          position: relative; z-index: 1; flex-shrink: 0;
        }
        .step-text { flex: 1; }

        /* ── FOOTER */
        .footer-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
        .footer-col-mid { text-align: center; }
        .footer-col-end { text-align: right; }

        /* ── RESPONSIVE ─────────────────────────────────── */
        @media (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .wa-btn    { display: none; }
          .burger    { display: flex; }
          .mob-menu.is-open { display: flex; flex-direction: column; }
          #inicio { min-height: 760px !important; }
          .hero-content { text-align: center; padding: 96px 24px 40px !important; }
          .hero-ctas    { justify-content: center; }
          .hero-strip   { grid-template-columns: repeat(2, 1fr); }
          .strip-item:nth-child(2) { border-right: none; }
          .strip-item:nth-child(3) { border-right: 1px solid rgba(212,175,55,0.12); }
          .hero-h1      { font-size: clamp(1.9rem, 6.5vw, 2.4rem) !important; line-height: 1.15 !important; }
          .stats-grid   { grid-template-columns: repeat(2, 1fr); }
          .timeline     { grid-template-columns: 1fr; gap: 0; }
          .timeline::before { display: none; }
          .step-item    { display: flex; gap: 20px; text-align: left; padding: 0; margin-bottom: 36px; align-items: flex-start; }
          .step-item:last-child { margin-bottom: 0; }
          .step-num     { margin: 0; width: 52px; height: 52px; font-size: 1rem; }
          .contact-box  { padding: 36px 24px !important; }
          .footer-cols  { grid-template-columns: 1fr; gap: 28px; }
          .footer-col-mid { text-align: left; }
          .footer-col-end { text-align: left; }
        }
        @media (max-width: 480px) {
          .hero-h1    { font-size: 1.65rem !important; line-height: 1.2 !important; }
          .stats-grid { grid-template-columns: 1fr; }
        }

        /* ── DEV CREDIT */
        .dev-link {
          position: relative;
          display: inline-block;
          color: #555;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.25s ease, transform 0.25s ease;
        }
        .dev-link:hover {
          color: #d4af37;
          text-decoration: underline;
          text-underline-offset: 3px;
          transform: translateY(-2px);
        }
        .dev-badge {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%) translateY(4px);
          background: #25D366;
          color: #ffffff;
          font-size: 0.68rem;
          padding: 4px 8px;
          border-radius: 999px;
          white-space: nowrap;
          box-shadow: 0 6px 16px rgba(37,211,102,0.35);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .dev-badge::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #25D366;
        }
        .dev-link:hover .dev-badge {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        /* ── HERO ENTRY ANIMATIONS */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-badge { animation: heroFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.08s both; }
        .hero-brand { animation: heroFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.20s both; }
        .hero-h1    { animation: heroFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.33s both; }
        .hero-sub   { animation: heroFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.50s both; }
        .hero-ctas  { animation: heroFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.64s both; }
        .hero-strip { animation: heroFadeUp 0.55s cubic-bezier(0.22,1,0.36,1) 0.78s both; }

        /* ── SECTION REVEAL */
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                      transform 0.65s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        /* ── FLOATING WA PULSE */
        @keyframes waPulse {
          0%, 100% { box-shadow: 0 4px 24px rgba(37,211,102,0.45); }
          50%       { box-shadow: 0 4px 32px rgba(37,211,102,0.72),
                                  0 0 0 7px rgba(37,211,102,0.07); }
        }
        .wa-float { animation: waPulse 3s ease-in-out infinite; }

        /* ── REDUCED MOTION */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div style={{ background: C.bg, color: C.white, fontFamily: "'Segoe UI', Arial, sans-serif" }}>

        {/* ── HEADER ──────────────────────────────────────── */}
        <header style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: "rgba(5,5,5,0.78)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(212,175,55,0.15)",
          padding: "0 32px", height: "68px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => go("inicio")} style={{
            background: "none", border: "none", cursor: "pointer",
            color: C.gold, fontWeight: 700, fontSize: "1.4rem", letterSpacing: "3px",
            fontFamily: "inherit",
          }}>
            WTSEG
          </button>

          <nav className="nav-links">
            {NAV.map(({ label, id }) => (
              <button key={id} onClick={() => go(id)} style={{
                background: "none", border: "none", color: C.gray, cursor: "pointer",
                fontSize: "0.82rem", letterSpacing: "1px", textTransform: "uppercase",
                fontFamily: "inherit", padding: "4px 0",
              }}>
                {label}
              </button>
            ))}
          </nav>

          <a href={WA} target="_blank" rel="noreferrer" className="wa-btn" style={{
            background: C.gold, color: "#050505", padding: "10px 22px",
            borderRadius: "6px", textDecoration: "none", fontWeight: 700, fontSize: "0.85rem",
          }}>
            WhatsApp
          </a>

          <button className="burger" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </header>

        {/* ── MOBILE MENU ─────────────────────────────────── */}
        <div className={`mob-menu${open ? " is-open" : ""}`} style={{
          position: "fixed", top: "68px", left: 0, right: 0, zIndex: 999,
          background: "rgba(5,5,5,0.97)",
          backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(212,175,55,0.12)",
        }}>
          {NAV.map(({ label, id }) => (
            <button key={id} onClick={() => go(id)} style={{
              background: "none", border: "none", borderBottom: "1px solid #1a1a1a",
              color: C.gray, cursor: "pointer", fontSize: "0.95rem",
              padding: "18px 32px", textAlign: "left", fontFamily: "inherit",
              width: "100%", textTransform: "uppercase", letterSpacing: "1px",
            }}>
              {label}
            </button>
          ))}
          <a href={WA} target="_blank" rel="noreferrer" style={{
            display: "block", background: C.gold, color: "#050505",
            padding: "18px 32px", textDecoration: "none", fontWeight: 700, fontSize: "0.95rem",
          }}>
            Falar no WhatsApp
          </a>
        </div>

        {/* ── HERO FULLSCREEN ─────────────────────────────── */}
        <section id="inicio" style={{
          position: "relative", height: "100vh", minHeight: "720px", width: "100%",
          backgroundImage: isMobile ? "url('/hero5.png')" : "url('/hero3.png')",
          backgroundSize: "cover", backgroundPosition: "center 58%", backgroundRepeat: "no-repeat",
          display: "flex", alignItems: "center",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", inset: 0, background: HERO_OVERLAY, zIndex: 0 }} />

          <div className="hero-content" style={{
            position: "relative", zIndex: 1,
            maxWidth: "1440px", width: "100%", margin: "0 auto",
            padding: "clamp(100px, 12vh, 136px) clamp(24px, 4vw, 72px) 56px",
          }}>
            <div style={{ maxWidth: "720px" }}>
              <div className="hero-badge" style={{
                display: "inline-block", color: C.gold, fontSize: "0.7rem",
                fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase",
                border: "1px solid rgba(212,175,55,0.35)", borderRadius: "4px",
                padding: "6px 14px", marginBottom: "24px",
              }}>
                Segurança Patrimonial • Empresarial • Eventos
              </div>

              <div className="hero-brand" style={{
                color: C.gold, fontWeight: 800, fontSize: "1.05rem",
                letterSpacing: "6px", textTransform: "uppercase", marginBottom: "16px", opacity: 0.9,
              }}>
                WTSEG
              </div>

              <h1 className="hero-h1" style={{
                fontSize: "clamp(3.2rem, 5vw, 4.8rem)", fontWeight: 700, color: C.white,
                marginBottom: "22px", lineHeight: 1.05, letterSpacing: "-0.5px", maxWidth: "700px",
              }}>
                Proteção, Presença<br />e Confiança.
              </h1>

              <p className="hero-sub" style={{
                color: "rgba(214,214,214,0.88)", fontSize: "1.05rem",
                maxWidth: "560px", marginBottom: "40px", lineHeight: 1.85,
              }}>
                Com atuação presencial, planejamento operacional e compromisso com a proteção dos ativos do cliente.
              </p>

              <div className="hero-ctas">
                <a href={WA} target="_blank" rel="noreferrer" style={{
                  display: "inline-block", background: C.gold, color: "#050505",
                  padding: "16px 40px", borderRadius: "8px", textDecoration: "none",
                  fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.3px",
                }}>
                  Solicitar Atendimento
                </a>
                <a
                  href="https://wa.me/5511990005445?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20avalia%C3%A7%C3%A3o%20gratuita%20do%20n%C3%ADvel%20de%20seguran%C3%A7a%20da%20minha%20empresa.%0A%0ANome%20da%20empresa%3A%0ACidade%3A%0ASegmento%3A%0A%0AAguardo%20contato."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                    color: C.white, padding: "16px 36px", borderRadius: "8px",
                    textDecoration: "none", fontWeight: 600, fontSize: "0.95rem",
                  }}
                >
                  Avaliação Gratuita de Segurança
                </a>
              </div>

              <div className="hero-strip">
                {HERO_STRIP.map(({ value, label }, i) => (
                  <div key={i} className="strip-item">
                    <div style={{ color: C.gold, fontWeight: 700, fontSize: "1.4rem", lineHeight: 1 }}>{value}</div>
                    <div style={{ color: C.gray, fontSize: "0.78rem", marginTop: "7px", lineHeight: 1.35 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROVA OPERACIONAL ───────────────────────────── */}
        <section ref={statsRef} style={{ background: C.graphite, padding: "80px 24px" }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="Números que reforçam planejamento, responsabilidade e compromisso na execução das operações de segurança.">
              Presença Operacional que Gera Confiança
            </SectionTitle>
            <div className="stats-grid">
              {STAT_METRICS.map((m, i) => (
                <StatCard key={i} {...m} nth={i} active={statsInView} />
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE ───────────────────────────────────────── */}
        <section id="sobre" style={{ background: C.bg, padding: "112px 24px" }}>
          <div className="reveal" style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="Atuação com foco em resultados, organização operacional e proteção real dos ativos dos nossos clientes.">
              Compromisso com a Segurança e a Excelência Operacional
            </SectionTitle>
            <p style={{
              color: C.gray, lineHeight: 1.95, fontSize: "1.05rem",
              maxWidth: "820px", margin: "0 auto 44px", textAlign: "center",
            }}>
              A WTSEG atua com{" "}
              <strong style={{ color: C.white }}>atuação presencial</strong> e{" "}
              <strong style={{ color: C.white }}>responsabilidade operacional</strong> em
              segmentos que exigem precisão e comprometimento:{" "}
              <strong style={{ color: C.white }}>proteção patrimonial</strong>,{" "}
              <strong style={{ color: C.white }}>eventos</strong>,{" "}
              <strong style={{ color: C.white }}>empresas</strong> e salvaguarda de{" "}
              <strong style={{ color: C.white }}>mercadorias e ativos</strong>. Cada
              operação é conduzida com planejamento, disciplina e foco no resultado.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              {["Atuação Presencial","Proteção Patrimonial","Eventos","Empresas","Mercadorias e Ativos","Responsabilidade Operacional"]
                .map((tag) => (
                  <span key={tag} style={{
                    background: "rgba(20,20,20,0.9)", border: "1px solid rgba(212,175,55,0.28)",
                    color: C.gold, borderRadius: "20px", padding: "9px 22px", fontSize: "0.85rem", fontWeight: 500,
                  }}>
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {/* ── SERVIÇOS ────────────────────────────────────── */}
        <section id="servicos" style={{ background: C.graphite, padding: "112px 24px" }}>
          <div className="reveal" style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="Cobertura completa para proteger o que mais importa para você e sua empresa.">
              Nossos Serviços
            </SectionTitle>
            <div className="grid-auto">
              {SERVICES.map((s) => <Card key={s.title} {...s} />)}
            </div>
          </div>
        </section>

        {/* ── ÁREA DE ATUAÇÃO ─────────────────────────────── */}
        <section style={{ background: C.bg, padding: "112px 24px" }}>
          <div className="reveal" style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="Soluções presenciais de segurança para diferentes ambientes e necessidades operacionais.">
              Onde Atuamos
            </SectionTitle>
            <div className="grid-auto">
              {AREAS.map((a) => <Card key={a.title} {...a} />)}
            </div>
          </div>
        </section>

        {/* ── DIFERENCIAIS ────────────────────────────────── */}
        <section id="diferenciais" style={{ background: C.graphite, padding: "112px 24px" }}>
          <div className="reveal" style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="O que nos destaca no mercado de segurança privada.">
              Nossos Diferenciais
            </SectionTitle>
            <div className="grid-auto">
              {DIFFERENTIALS.map((d) => <Card key={d.title} {...d} />)}
            </div>
          </div>
        </section>

        {/* ── PROCESSO OPERACIONAL ────────────────────────── */}
        <section style={{ background: C.bg, padding: "112px 24px" }}>
          <div className="reveal" style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <SectionTitle subtitle="Uma metodologia estruturada que garante organização, presença e resultado em cada operação.">
              Como Conduzimos Cada Operação
            </SectionTitle>
            <div className="timeline">
              {STEPS.map(({ num, title, desc }, i) => (
                <div key={i} className="step-item">
                  <div className="step-num">{num}</div>
                  <div className="step-text">
                    <h3 style={{ color: C.white, fontWeight: 600, marginBottom: "12px", fontSize: "1rem" }}>
                      {title}
                    </h3>
                    <p style={{ color: C.gray, fontSize: "0.9rem", lineHeight: 1.78 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTATO ─────────────────────────────────────── */}
        <section id="contato" style={{ background: C.graphite, padding: "112px 24px", textAlign: "center" }}>
          <div className="reveal" style={{ maxWidth: "620px", margin: "0 auto" }}>
            <SectionTitle>Entre em Contato</SectionTitle>
            <div className="contact-box" style={{
              background: "rgba(12,12,12,0.92)",
              backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.18)", borderRadius: "16px",
              padding: "56px 48px", boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}>
              <div style={{ color: C.gold, fontWeight: 700, fontSize: "1.9rem", letterSpacing: "4px", marginBottom: "20px" }}>
                WTSEG
              </div>
              <div style={{ color: C.white, fontWeight: 600, fontSize: "1.15rem", marginBottom: "6px" }}>
                Welington
              </div>
              <div style={{
                color: C.gold, fontSize: "0.75rem", fontWeight: 500,
                marginBottom: "28px", letterSpacing: "1px", textTransform: "uppercase",
              }}>
                Responsável pela Gestão Operacional da WTSEG
              </div>
              <p style={{ color: C.gray, lineHeight: 1.9, marginBottom: "36px", fontSize: "0.95rem" }}>
                Atuação focada no planejamento, coordenação e acompanhamento das
                operações de segurança, garantindo organização, presença operacional
                e excelência na execução dos serviços.
              </p>
              <div style={{ marginBottom: "36px", fontSize: "0.95rem" }}>
                <span style={{ color: C.white, fontWeight: 600 }}>WhatsApp: </span>
                <span style={{ color: C.gold, fontWeight: 500 }}>(11) 99000-5445</span>
              </div>
              <a href={WA} target="_blank" rel="noreferrer" style={{
                display: "inline-block", background: C.gold, color: "#050505",
                padding: "18px 52px", borderRadius: "8px", textDecoration: "none",
                fontWeight: 700, fontSize: "1rem",
              }}>
                Falar no WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer style={{
          background: "#020202",
          borderTop: "1px solid rgba(212,175,55,0.12)",
          padding: "64px 40px 40px",
        }}>
          <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "52px" }}>
              <div style={{
                color: C.gold, fontWeight: 700, fontSize: "1.5rem",
                letterSpacing: "5px", marginBottom: "10px",
              }}>
                WTSEG
              </div>
              <div style={{ color: C.gray, fontSize: "0.9rem" }}>
                Segurança Patrimonial • Empresarial • Eventos
              </div>
            </div>

            <div className="footer-cols" style={{ marginBottom: "48px" }}>
              <div>
                <div style={{
                  color: C.gold, fontWeight: 600, fontSize: "0.78rem",
                  letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px",
                }}>
                  Atendimento
                </div>
                <p style={{ color: C.gray, fontSize: "0.9rem", lineHeight: 1.75 }}>
                  São Paulo e região
                </p>
              </div>
              <div className="footer-col-mid">
                <div style={{
                  color: C.gold, fontWeight: 600, fontSize: "0.78rem",
                  letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px",
                }}>
                  Contato
                </div>
                <a href={WA} target="_blank" rel="noreferrer" style={{
                  color: C.gray, fontSize: "0.9rem", textDecoration: "none", lineHeight: 1.75,
                }}>
                  WhatsApp (11) 99000-5445
                </a>
              </div>
              <div className="footer-col-end">
                <p style={{
                  color: C.gray, fontSize: "0.9rem", lineHeight: 1.8,
                  fontStyle: "italic", opacity: 0.8,
                }}>
                  "Proteção, presença e confiança para operações que exigem responsabilidade."
                </p>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: "28px", textAlign: "center" }}>
              <div style={{ color: "#383838", fontSize: "0.78rem", lineHeight: 2 }}>
                © {new Date().getFullYear()} WTSEG. Todos os direitos reservados.
                <br />
                Desenvolvido por{" "}
                <a
                  href="https://wa.me/5511998070085?text=Ol%C3%A1%20Rodrigo%2C%20vi%20o%20site%20da%20WTSEG%20e%20gostaria%20de%20criar%20um%20site."
                  target="_blank"
                  rel="noreferrer"
                  className="dev-link"
                >
                  <span className="dev-badge">Desenvolvimento Web</span>
                  Rodrigo Souza
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* ── WHATSAPP FLUTUANTE ──────────────────────────── */}
        <a
          href={WA}
          target="_blank"
          rel="noreferrer"
          aria-label="Falar no WhatsApp"
          className="wa-float"
          style={{
            position: "fixed", bottom: "28px", right: "28px", zIndex: 2000,
            background: "#25d366", color: C.white,
            width: "60px", height: "60px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "1.7rem", boxShadow: "0 4px 24px rgba(37,211,102,0.45)",
            textDecoration: "none",
          }}
        >
          💬
        </a>

      </div>
    </>
  );
}
