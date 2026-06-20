import React, { useRef, useEffect, useState } from "react";
import styles from "./styles.module.scss";

/* Hook customizado: observa um elemento e retorna true quando ele entra na viewport */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); /* anima só uma vez */
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

const QuemSouEu = () => {
  /* Observers individuais para cada bloco */
  const [headerRef, headerInView] = useInView();
  const [p1Ref, p1InView] = useInView();
  const [p2Ref, p2InView] = useInView();
  const [p3Ref, p3InView] = useInView();
  const [p4Ref, p4InView] = useInView();
  const [cardsRef, cardsInView] = useInView();
  const [imgRef, imgInView] = useInView();

  const cardsDiferenciais = [
    { textG: "13+", descricao: "Anos de Experiência jurídica empresarial" },
    { textG: "50+", descricao: "Projetos LGPD" },
    { textG: "Global", descricao: "Atendimento Internacional" },
    {
      textG: "Certificações",
      descricao: "Nacionais e Internacionais",
      small: true,
    },
  ];

  return (
    <section id="sobre" className={styles.containerQuemsou}>
      <article className={styles.contentQuemsou}>
        <div
          ref={headerRef}
          className={`${styles.containerHeaderQuem} ${styles.animateItem} ${
            headerInView ? styles.visible : ""
          }`}
        >
          <p>Sobre</p>
          <h1>Quem sou eu?</h1>
        </div>

        <p
          ref={p1Ref}
          className={`${styles.animateItem} ${p1InView ? styles.visible : ""}`}
        >
          Sou a Ramone Biasotto, empresária, escritora e advogada com experiência na área empresarial, apaixonada
          por inovação e IA. Especialista em direito digital, proteção de dados
          e cibersegurança, sendo uma advogada referência em LGPD - Lei Geral de
          Proteção de Dados.
        </p>

        <p
          ref={p2Ref}
          className={`${styles.animateItem} ${p2InView ? styles.visible : ""}`}
        >
          Acredito na importância de um trabalho preventivo e estratégico para a
          segurança jurídica e o crescimento sustentável das empresas. Mais do
          que resolver conflitos, minha atuação é voltada para orientar decisões
          seguras e construir soluções jurídicas alinhadas aos objetivos dos
          negócio.
        </p>

        <p
          ref={p3Ref}
          className={`${styles.animateItem} ${p3InView ? styles.visible : ""}`}
        >
          Já ajudei centenas de empresas nacionais e multinacionais a
          solucionarem problemas jurídicos, administrativos e atuação/gestão de
          projetos.
        </p>

        <p
          ref={p4Ref}
          className={`${styles.animateItem} ${p4InView ? styles.visible : ""}`}
        >
          Realizo atendimento presencial ou on-line, conforme demandas, de maneira personalizada e comprometido.
        </p>

        <div
          ref={cardsRef}
          className={`${styles.containerDife} ${
            cardsInView ? styles.visible : ""
          }`}
        >
          {cardsDiferenciais.map((item, index) => (
            <div key={index} className={styles.card}>
              <h1 className={item.small ? styles.smallTitle : ""}>
                {item.textG}
              </h1>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>
      </article>

      <div
        ref={imgRef}
        className={`${styles.containerImg} ${imgInView ? styles.visible : ""}`}
      >
        <img src="/img/ramoneQuemSou.jpg" alt="Ramone Biasotto" />
      </div>
    </section>
  );
};

export default QuemSouEu;