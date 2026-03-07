"use client";

import { useEffect } from "react";

export function LandingEffects() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;

    const setSceneVars = (x: number, y: number, scrollY: number) => {
      root.style.setProperty("--scene-shift-x", `${x * 18}px`);
      root.style.setProperty("--scene-shift-y", `${y * 14}px`);
      root.style.setProperty("--scene-soft-x", `${x * 10}px`);
      root.style.setProperty("--scene-soft-y", `${y * 8}px`);
      root.style.setProperty("--scene-scroll", `${Math.min(scrollY * 0.08, 36)}px`);
    };

    const updateFromViewport = (clientX: number, clientY: number) => {
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setSceneVars(x, y, window.scrollY);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        updateFromViewport(event.clientX, event.clientY);
      });
    };

    const onScroll = () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      frame = requestAnimationFrame(() => {
        setSceneVars(0, 0, window.scrollY);
      });
    };

    root.classList.add("motion-ready");

    if (prefersReducedMotion) {
      revealItems.forEach((item) => {
        item.classList.add("is-visible");
      });
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          });
        },
        {
          rootMargin: "0px 0px -10% 0px",
          threshold: 0.18
        }
      );

      revealItems.forEach((item) => {
        observer?.observe(item);
      });
    }

    setSceneVars(0, 0, window.scrollY);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
      root.classList.remove("motion-ready");
      root.style.removeProperty("--scene-shift-x");
      root.style.removeProperty("--scene-shift-y");
      root.style.removeProperty("--scene-soft-x");
      root.style.removeProperty("--scene-soft-y");
      root.style.removeProperty("--scene-scroll");
    };
  }, []);

  return null;
}
