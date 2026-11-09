import { useEffect, useState } from "react";

const navigation = [
  { href: "#sobre", label: "Sobre" },
  { href: "#projetos", label: "Projetos" },
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
] as const;

export function SiteHeader() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 761px)");
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      if (!desktopQuery.matches || currentScrollY < 80) {
        setIsHidden(false);
      } else if (currentScrollY > lastScrollY + 4) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY - 4) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    const handleBreakpointChange = () => {
      lastScrollY = window.scrollY;
      setIsHidden(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    desktopQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      desktopQuery.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  return (
    <header className={`site-header${isHidden ? " site-header--hidden" : ""}`}>
      <div className="items">
      <a className="brand" href="#inicio" aria-label="Asterismo Tecnologia, início">
        <img src="/images/logo-asterismo.png" alt="Asterismo Tecnologia" width={180}  />
      </a>
      <nav aria-label="Navegação principal" className="primary-navigation">
        {navigation.map((item) => (
          <a href={item.href} key={item.href}>
            {item.label}
          </a>
        ))}
        <a className="navigation-cta" href="#contato">
          Fale conosco <span aria-hidden="true">↗</span>
        </a>
      </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <a className="brand footer-brand" href="#inicio">
        <img src="/images/logo-asterismo.png" alt="Asterismo Tecnologia" width={48} height={48} />
        <span className="brand-wordmark">
          <span>Asterismo</span>
          <span className="brand-subtitle">Tecnologia</span>
        </span>
      </a>
      <p>Elementos diferentes. Um sistema com propósito.</p>
      <nav aria-label="Navegação do rodapé" className="footer-navigation">
        <a href="#sobre">Sobre</a>
        <a href="#projetos">Projetos</a>
        <a href="#servicos">Serviços</a>
        <a href="#contato">Contato</a>
      </nav>
      <span className="copyright">
        © {new Date().getFullYear()} Asterismo Tecnologia
      </span>
    </footer>
  );
}
