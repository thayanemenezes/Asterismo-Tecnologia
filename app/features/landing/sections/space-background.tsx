import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

const constellations = [
  {
    name: "asterismo",
    depth: 0.7,
    phase: 0.2,
    opacity: 0.58,
    className: "space-constellation--top-left",
    mobile: true,
  },
  {
    name: "cubo",
    depth: 1.1,
    phase: 1.8,
    opacity: 0.72,
    className: "space-constellation--top-right",
    mobile: true,
  },
  {
    name: "rede",
    depth: 0.6,
    phase: 3.1,
    opacity: 0.42,
    className: "space-constellation--left",
    mobile: false,
  },
  {
    name: "codigo",
    depth: 1.25,
    phase: 4.4,
    opacity: 0.62,
    className: "space-constellation--right",
    mobile: false,
  },
  {
    name: "banco-de-dados",
    depth: 0.9,
    phase: 5.2,
    opacity: 0.54,
    className: "space-constellation--bottom-left",
    mobile: true,
  },
  {
    name: "git-branch",
    depth: 1.15,
    phase: 2.5,
    opacity: 0.64,
    className: "space-constellation--bottom-right",
    mobile: true,
  },
] as const;

interface SpaceBackgroundProps {
  children: ReactNode;
}

export function SpaceBackground({ children }: SpaceBackgroundProps) {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    if (!background) return;

    const items = Array.from(
      background.querySelectorAll<HTMLImageElement>("[data-depth]"),
    ).map((element) => ({
      element,
      depth: Number(element.dataset.depth),
      phase: Number(element.dataset.phase),
      opacity: Number(element.dataset.opacity),
    }));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId: number | null = null;

    const update = () => {
      frameId = null;

      if (reducedMotion.matches) {
        items.forEach(({ element, opacity }) => {
          element.style.transform = "none";
          element.style.opacity = String(opacity);
        });
        return;
      }

      const bounds = background.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)),
      );
      const scrollProgress = progress * Math.PI * 2;
      const isMobile = window.matchMedia("(max-width: 760px)").matches;
      const maxDistance = Math.min(
        viewportHeight * (isMobile ? 0.012 : 0.035),
        isMobile ? 9 : 34,
      );

      items.forEach(({ element, depth, phase, opacity }) => {
        const translateY = (progress - 0.5) * 2 * maxDistance * depth;
        const scale = 1.01 + 0.07 * Math.sin(scrollProgress + phase);
        const currentOpacity = Math.min(
          0.9,
          Math.max(0.25, opacity + 0.04 * Math.sin(scrollProgress + phase)),
        );

        element.style.transform = `translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(3)})`;
        element.style.opacity = currentOpacity.toFixed(2);
      });
    };

    const scheduleUpdate = () => {
      if (!reducedMotion.matches && frameId === null) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    const handleMotionPreferenceChange = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      scheduleUpdate();
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    update();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div className="space-background" ref={backgroundRef}>
      <div aria-hidden="true" className="space-constellation-layer">
        {constellations.map((constellation) => (
          <img
            alt=""
            aria-hidden="true"
            className={`space-constellation ${constellation.className}${constellation.mobile ? " space-constellation--mobile" : ""}`}
            data-depth={constellation.depth}
            data-opacity={constellation.opacity}
            data-phase={constellation.phase}
            draggable={false}
            key={constellation.name}
            src={`/images/asterismo_icones_svg/${constellation.name}.svg`}
          />
        ))}
      </div>
      {children}
    </div>
  );
}