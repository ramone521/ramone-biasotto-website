import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export function ParticlesBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: false,
        },
        background: {
          color: { value: "transparent" },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#B69B72", "#FFFFFF", "#6B8FB5"],
          },
          links: {
            color: "#8B9BB5",
            distance: 170,
            enable: true,
            opacity: 0.10,
            width: 0.6,
          },
          move: {
            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            random: true,
            speed: 0.4,
            straight: false,
          },
          number: {
            density: { enable: true, area: 1400 },
            value: 250,
          },
          opacity: {
            value: { min: 0.2, max: 0.9 },
            animation: {
              enable: true,
              speed: 0.8,
              sync: false,
            },
          },
          shape: { type: "circle" },
          size: {
            value: { min: 0.5, max: 2.5 },
            animation: {
              enable: true,
              speed: 2,
              sync: false,
            },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );
}