export function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero-section" id="inicio">
      <div className="hero-copy">
        <h1 id="hero-title">
          Conectamos ideias,
          <br />
          <span>criamos possibilidades.</span>
        </h1>
        <p className="hero-description">
          Conectamos código, dados, e processos para transformar desafios
          em sistemas digitais úteis, consistentes e preparados para evoluir.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#sobre">
            Conheça a Asterismo <span aria-hidden="true">↘</span>
          </a>
          <a className="button button-text" href="#contato">
            Fale conosco <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
      <div aria-hidden="true" className="hero-visual">
        <div className="hero-light" />
        <div className="tech-orbit-stage">
          <div className="tech-orbit tech-orbit--outer">
            <span className="tech-orbiter" aria-label="Código">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M14 4l-4 16" />
              </svg>
            </span>
          </div>
          <div className="tech-orbit tech-orbit--middle">
            <span className="tech-orbiter" aria-label="Dados">
              <svg fill="none" viewBox="0 0 24 24">
                <ellipse cx="12" cy="5.5" rx="7.5" ry="3" />
                <path d="M4.5 5.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6M4.5 11.5v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
              </svg>
            </span>
          </div>
          <div className="tech-orbit tech-orbit--inner">
            <span className="tech-orbiter" aria-label="Nuvem">
              <svg fill="none" viewBox="0 0 24 24">
                <path d="M7.5 18.5h10a4 4 0 0 0 .45-7.98A6 6 0 0 0 6.2 9.4a4.6 4.6 0 0 0 1.3 9.1Z" />
              </svg>
            </span>
          </div>
          <div className="tech-orbit-core">
            <svg aria-hidden="true" fill="none" viewBox="0 0 100 100">
              <path d="M50 12v76M12 50h76M23 23l54 54m0-54L23 77" />
              <circle cx="50" cy="50" r="5" />
              <circle cx="50" cy="12" r="3" />
              <circle cx="88" cy="50" r="3" />
              <circle cx="50" cy="88" r="3" />
              <circle cx="12" cy="50" r="3" />
            </svg>
          </div>
          <span className="tech-orbit-spark tech-orbit-spark--one" />
          <span className="tech-orbit-spark tech-orbit-spark--two" />
          <span className="tech-orbit-spark tech-orbit-spark--three" />
        </div>
      </div>
    </section>
  );
}
