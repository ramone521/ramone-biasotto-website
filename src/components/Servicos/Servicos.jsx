import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { wppProposta } from "../../utils/whatsapp";
import servicosIcon from "../../assets/servicosIcon.svg";
import treinamentosIcon from "../../assets/treinamentoIcon.svg";
import exclusividadeIcon from "../../assets/exclusividadeIcon.svg";

/* Hook customizado: observa um elemento e retorna true quando ele entra na viewport */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return [ref, inView];
};

/* Subcomponente do card — cada um com seu próprio observer */
const CardServico = ({ item, index }) => {
  const [cardRef, cardInView] = useInView();

  return (
    <div
      ref={cardRef}
      className={`${styles.cardServicos} ${cardInView ? styles.visible : ""}`}
      style={{ "--card-index": index }}
    >
      <img src={item.icon} alt={`Ícone ${item.nomeServico}`} />
      <h1>{item.nomeServico}</h1>
      <ul className={styles.listaServicos}>
        <li>{item.servicos1}</li>
        <li>{item.servicos2}</li>
        <li>{item.servicos3}</li>
      </ul>
    </div>
  );
};

const Servicos = () => {
  const [headerRef, headerInView] = useInView();
  const [cardsContainerRef, cardsContainerInView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView();

  const cardsServicos = [
    {
      icon: servicosIcon,
      nomeServico: "Serviços Jurídicos",
      servicos1: "Advocacia personalizada",
      servicos2: "Consultoria e assessoria especializada",
      servicos3: "Demandas judiciais e administrativas",
    },
    {
      icon: treinamentosIcon,
      nomeServico: "Treinamentos",
      servicos1: "Palestras e workshops",
      servicos2: "Mentoria para advogados e DPOs",
      servicos3: "Conteúdo sobre LGPD e Direito Digital",
    },
    {
      icon: exclusividadeIcon,
      nomeServico: "Exclusividade",
      servicos1: "Projetos 100% personalizados",
      servicos2: "Atendimento dedicado e agenda flexível",
      servicos3: "Soluções sob medida para o seu negócio",
    },
  ];

  return (
    <section id="servicos" className={styles.containerServicos}>
      <div
        ref={headerRef}
        className={`${styles.containerHeadeServicos} ${
          headerInView ? styles.visible : ""
        }`}
      >
        <p>Soluções</p>
        <h1>Serviços</h1>
      </div>

      <div
        ref={cardsContainerRef}
        className={`${styles.containerCards} ${
          cardsContainerInView ? styles.visible : ""
        }`}
      >
        {cardsServicos.map((item, index) => (
          <CardServico key={index} item={item} index={index} />
        ))}
      </div>

      <div
        ref={ctaRef}
        className={`${styles.containerCta} ${ctaInView ? styles.visible : ""}`}
      >
        <a
          href={wppProposta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Solicitar proposta personalizada
        </a>
      </div>
    </section>
  );
};

export default Servicos;