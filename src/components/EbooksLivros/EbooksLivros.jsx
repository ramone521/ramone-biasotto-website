import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./styles.module.scss";
import bookLgpd from "../../assets/imgs/bookLgpd.png";
import bookEncarregados from "../../assets/imgs/bookEncarregados.png";
import { wppLivro } from "../../utils/whatsapp";

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

const EbooksLivros = () => {
  const [headerRef, headerInView] = useInView();

  const booksCards = [
    {
      imgLivros: bookLgpd,
      txtTag: "Lançamento",
      nomeLivro: "E-book LGPD: do básico ao avançado ",
      descricaoP: "Guia prático sobre LGPD do básico ao avançado",
      descricaoG:
        "Um e-book pensado para quem precisa ir além da teoria e realmente aplicar a LGPD com segurança e estratégia. Com linguagem clara, mas tecnicamente consistente, o material conduz o leitor do entendimento dos fundamentos até a implementação prática dentro das organizações, abordando bases legais, direitos dos titulares e estruturação de programas de conformidade. Ideal para empresas, advogados e profissionais que buscam transformar a proteção de dados em organização, credibilidade e vantagem competitiva.",
    },
    {
      imgLivros: bookEncarregados,
      txtTag: "Lançamento",
      nomeLivro: "Encarregados",
      descricaoP:
        "Experiências reais e práticas do cotidiano de um DPO, com visão estratégica e aplicada à LGPD.",
      descricaoG:
        "Uma obra que traz a realidade de quem atua na linha de frente da proteção de dados e privacidade nas organizções. No meu capítulo, compartilho vivências, desafios e soluções práticas do cotidiano de um DPO, com uma visão estratégica e aplicável ao mercado. Um conteúdo direto, construído a partir da experiência real, para quem deseja entender na prática como funciona o papel do Encarregado e tomar decisões mais seguras e eficientes.",
    },
  ];

  return (
    <div id="livros" className={styles.containerEbooks}>
      <div
        ref={headerRef}
        className={`${styles.containerHeaderEbooks} ${
          headerInView ? styles.visible : ""
        }`}
      >
        <p>Obras da Dra. Ramone</p>
        <h1>Conhecimento escrito para você</h1>
      </div>

      <section className={styles.containerCardsLivros}>
        {booksCards.map((item, index) => (
          <BookCard
            key={index}
            item={item}
            reversed={index % 2 !== 0}
          />
        ))}
      </section>
    </div>
  );
};

const CLAMP_LINES = 5;

/* Subcomponente para isolar a lógica de cada card */
const BookCard = ({ item, reversed }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [cardRef, cardInView] = useInView({ threshold: 0.15 });
  const descRef = useRef(null);
  const clampedHeightRef = useRef(0);

  const measureClamp = () => {
    const el = descRef.current;
    if (!el) return 0;
    const lh = parseFloat(getComputedStyle(el).lineHeight);
    return lh * CLAMP_LINES;
  };

  useLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const clamped = measureClamp();
    clampedHeightRef.current = clamped;
    el.style.height = `${clamped}px`;
    setIsOverflowing(el.scrollHeight > clamped + 2);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (expanded) return;
      const el = descRef.current;
      if (!el) return;
      const clamped = measureClamp();
      clampedHeightRef.current = clamped;
      el.style.height = `${clamped}px`;
      setIsOverflowing(el.scrollHeight > clamped + 2);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [expanded]);

  const handleToggle = () => {
    const el = descRef.current;
    if (!el) return;
    if (!expanded) {
      el.style.height = `${el.scrollHeight}px`;
    } else {
      el.style.height = `${clampedHeightRef.current}px`;
    }
    setExpanded((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.containerCard} ${reversed ? styles.reversed : ""} ${
        cardInView ? styles.visible : ""
      }`}
    >
      <div className={styles.imgWrapper}>
        <img
          className={styles.imgLivro}
          src={item.imgLivros}
          alt={item.nomeLivro}
        />
      </div>

      <div className={styles.containerContentCard}>
        <span className={styles.txtTag}>{item.txtTag}</span>

        <div className={styles.headerBooks}>
          <h1 className={styles.titleBook}>{item.nomeLivro}</h1>
          <span className={styles.descricaoP}>{item.descricaoP}</span>
        </div>

        <p ref={descRef} className={styles.descricaoG}>
          {item.descricaoG}
        </p>

        <div className={styles.actionsRow}>
          <a
            href={wppLivro(item.nomeLivro)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBooks}
          >
            Garanta já
          </a>

          {(isOverflowing || expanded) && (
            <button
              className={styles.verMaisBtn}
              onClick={handleToggle}
              type="button"
            >
              {expanded ? "Ver menos" : "Ver mais"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EbooksLivros;