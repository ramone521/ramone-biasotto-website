import React from "react";
import styles from "./styles.module.scss";
import { ParticlesBackground } from "./ParticlesBackground/ParticlesBackground";
import { wppDefault } from "../../utils/whatsapp";

const HeroSection = () => {
  return (
    <section id="home" className={styles.containerHero}>
      <ParticlesBackground/>
      <div className={styles.containerContentBanner}>
        <p className={styles.trilhaFraseBanner}>Direito Digital · LGPD · Cibersegurança</p>
        <div>
          <p className={styles.fraseone}>Protegendo empresas,</p>
          <p className={styles.frasetwo}>fortalecendo negócios</p>
        </div>

        <p className={styles.impactFrase}>Estratégia jurídica para a era digital, com foco em inovação e tecnologia.</p>

        <a
          href={wppDefault}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBanner}
        >
          Fale pelo WhatsApp
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
