import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./styles.module.scss";
import { wppEquipe } from "../../utils/whatsapp";

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
        rootMargin: "0px 0px -80px 0px",
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

const AreaCard = ({
  area,
  index,
  isExpanded,
  toggleExpand,
  aplicarClamp,
  mostrarBotao,
  alturaReal,
  descRef,
  handleTransitionEnd,
  cardElRef,
  minHeight,
}) => {
  const [cardObserverRef, cardInView] = useInView();
  const maxHeight = isExpanded ? `${alturaReal}px` : "6em";

  /* Combina os dois refs: o do observer + o ref para medir o card */
  const setRefs = (el) => {
    cardObserverRef.current = el;
    if (cardElRef) cardElRef(el);
  };

  return (
    <div
      ref={setRefs}
      className={`${styles.areaItem} ${cardInView ? styles.visible : ""}`}
      style={{ minHeight: minHeight ? `${minHeight}px` : undefined }}
    >
      <h3 className={styles.areaTitle}>{area.nomeArea}</h3>
      <div className={styles.areaContent}>
        <p
          ref={descRef}
          className={`${styles.areaDesc} ${aplicarClamp ? styles.clamped : ""}`}
          style={{ maxHeight }}
          onTransitionEnd={(e) => handleTransitionEnd(index, e)}
        >
          {area.descricaoArea}
        </p>
        {mostrarBotao && (
          <button
            className={styles.verMais}
            onClick={() => toggleExpand(index)}
          >
            {isExpanded ? "ver menos" : "ver mais"}
          </button>
        )}
      </div>
    </div>
  );
};

const AreasAtuacao = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [showClamp, setShowClamp] = useState({});
  const [precisaTruncar, setPrecisaTruncar] = useState({});
  const [minCardHeight, setMinCardHeight] = useState(0);
  const refs = useRef({});
  const cardRefs = useRef({});

  const [headerRef, headerInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => {
      const novoEstado = prev === index ? null : index;
      if (novoEstado === index) {
        setShowClamp((prevClamp) => ({ ...prevClamp, [index]: false }));
      }
      return novoEstado;
    });
  };

  const handleTransitionEnd = (index, e) => {
    if (e.propertyName !== "max-height") return;
    if (expandedIndex !== index) {
      setShowClamp((prev) => ({ ...prev, [index]: true }));
    }
  };

  const areaAtuacao = [
    {
      nomeArea: "Proteção de Dados & LGPD",
      descricaoArea:
        "Atuação completa na adequação à Lei Geral de Proteção de Dados (LGPD), com foco em orientação jurídica e estratégia empresarial. Desenvolvimento e implementação de programas de governança em privacidade, incluindo mapeamento de dados, elaboração de documentos, políticas e processos internos, gestão de riscos, planejamento e respostas a incidentes. Assessoria contínua para empresas que buscam conformidade e vantagem competitiva no uso de dados.",
    },
    {
      nomeArea: "Direito Digital",
      descricaoArea:
        "Assessoria jurídica especializada em demandas do ambiente digital, abrangendo remoção de conteúdo, recuperação de contas, produção de provas digitais e responsabilização civil. Atuação estratégica em contratos digitais, termos de uso, proteção de reputação online e resolução de conflitos envolvendo tecnologia, redes sociais e plataformas digitais. Análise jurídica completa para projetos de inovação e Inteligência artificial.",
    },
    {
      nomeArea: "DPO as a Service (DPO como Serviço)",
      descricaoArea:
        "Atuação como Encarregada de Dados (DPO) de forma personalizada, garantindo conformidade contínua com a LGPD. Intermediação com a ANPD, gestão de solicitações de titulares, monitoramento de riscos e suporte estratégico para tomada de decisões empresariais envolvendo dados pessoais. Apoio aos DPO internos, com assessoria e mentorias.",
    },
    {
      nomeArea: "Direito Empresarial e negócios",
      descricaoArea:
        "Consultoria e assessoria jurídica voltada à estruturação, proteção e crescimento de empresas. Elaboração e revisão de contratos nacionais e internacionais, pareceres jurídicos, recuperação de créditos, estruturação de operações e suporte em decisões estratégicas, sempre alinhando o jurídico aos objetivos do negócio.",
    },
    {
      nomeArea: "Direito Civil Contencioso",
      descricaoArea:
        "Atuação em demandas judiciais e administrativas, com foco em responsabilidade civil, indenizações e resolução de conflitos. Elaboração de estratégias processuais eficientes, produção de provas e defesa dos interesses do cliente em litígios que impactam diretamente o patrimônio e a reputação empresarial.",
    },
    {
      nomeArea: "Propriedade Intelectual",
      descricaoArea:
        "Proteção e valorização de ativos intangíveis da empresa, incluindo registro de marcas, direitos autorais e contratos relacionados. Atuação estratégica na prevenção de uso indevido e na exploração segura da propriedade intelectual, garantindo exclusividade e vantagem competitiva no mercado.",
    },
    {
      nomeArea: "Cibersegurança",
      descricaoArea:
        "Assessoria jurídica integrada à segurança da informação, com implementação de controles baseados em normas como ISO 27001 e 27701. Atuação na prevenção e resposta a incidentes de segurança, gestão de riscos cibernéticos e estruturação de políticas que protegem dados e operações empresariais. Apoio na implementação e atualização do Sistema de Gestão de Segurança da Informação.",
    },
    {
      nomeArea: "Compliance e Integridade",
      descricaoArea:
        "Desenvolvimento e implementação de programas de compliance, governança, risco e integridade. Condução de due diligence, criação de políticas internas, códigos de conduta e treinamentos corporativos, fortalecendo a cultura organizacional e reduzindo riscos legais, reputacionais e financeiros.",
    },
  ];

  const medirOverflow = () => {
    const inicialClamp = {};
    const inicialTruncar = {};
    areaAtuacao.forEach((_, i) => {
      inicialClamp[i] = true;
      const el = refs.current[i];
      if (el) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
        const maxLinesHeight = lineHeight * 4;
        inicialTruncar[i] = el.scrollHeight > maxLinesHeight + 1;
      }
    });
    setShowClamp(inicialClamp);
    setPrecisaTruncar(inicialTruncar);
  };

  /* Mede a altura natural máxima entre todos os cards (no estado colapsado) */
  const medirAlturaMaxima = () => {
    /* Só roda no desktop */
    if (window.innerWidth <= 1024) {
      setMinCardHeight(0);
      return;
    }

    let maiorAltura = 0;
    Object.values(cardRefs.current).forEach((el) => {
      if (el) {
        /* Reseta o minHeight para medir altura natural */
        const alturaAtual = el.style.minHeight;
        el.style.minHeight = "auto";
        const altura = el.offsetHeight;
        el.style.minHeight = alturaAtual;

        if (altura > maiorAltura) {
          maiorAltura = altura;
        }
      }
    });

    setMinCardHeight(maiorAltura);
  };

  useLayoutEffect(() => {
    medirOverflow();

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        medirOverflow();
        /* Mede a altura máxima APÓS o overflow ser calculado e o clamp aplicado */
        requestAnimationFrame(() => medirAlturaMaxima());
      });
    } else {
      requestAnimationFrame(() => medirAlturaMaxima());
    }

    const handleResize = () => {
      medirOverflow();
      requestAnimationFrame(() => medirAlturaMaxima());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, []);

  /* Re-mede a altura máxima quando o estado de truncamento muda */
  useEffect(() => {
    if (Object.keys(precisaTruncar).length > 0) {
      requestAnimationFrame(() => medirAlturaMaxima());
    }
    // eslint-disable-next-line
  }, [precisaTruncar]);

  return (
    <div id="areas" className={styles.containerAreas}>
      <div
        ref={headerRef}
        className={`${styles.containerHeaderAreas} ${
          headerInView ? styles.visible : ""
        }`}
      >
        <div className={styles.headerAreas}>
          <p className={styles.identPage}>Especialidades</p>
          <h1>Áreas de Atuação</h1>
        </div>
        <p className={styles.descricaoPage}>
          Conheça como posso ajudar você e seu negócio
        </p>
      </div>

      <article className={styles.gridAreas}>
        {areaAtuacao.map((area, index) => {
          const isExpanded = expandedIndex === index;
          const aplicarClamp = !isExpanded && showClamp[index];
          const alturaReal = refs.current[index]?.scrollHeight;
          const mostrarBotao = precisaTruncar[index];

          return (
            <AreaCard
              key={index}
              area={area}
              index={index}
              isExpanded={isExpanded}
              toggleExpand={toggleExpand}
              aplicarClamp={aplicarClamp}
              mostrarBotao={mostrarBotao}
              alturaReal={alturaReal}
              descRef={(el) => (refs.current[index] = el)}
              cardElRef={(el) => (cardRefs.current[index] = el)}
              handleTransitionEnd={handleTransitionEnd}
              minHeight={minCardHeight}
            />
          );
        })}
      </article>

      <div
        ref={ctaRef}
        className={`${styles.containerCta} ${ctaInView ? styles.visible : ""}`}
      >
        <p>Não encontrou oque procura?</p>
        <a
          href={wppEquipe}
          target="_blank"
          rel="noopener noreferrer"
        >
          Fale com nossa equipe
        </a>
      </div>
    </div>
  );
};

export default AreasAtuacao;