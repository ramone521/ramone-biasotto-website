import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { contentfulClient } from "./contentful";
import styles from "./styles.module.scss";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

/* Subcomponente do card — isola a lógica de medição de overflow */
const NoticiaCard = ({ item, isExpanded, onToggle }) => {
  const id = item.sys.id;
  const descricaoRich = item.fields.textoNoticia;
  const imagem = item.fields.imagemNoticia?.fields?.file?.url;
  const titulo = item.fields.imagemNoticia?.fields?.title;

  const descRef = useRef(null);
  const [precisaTruncar, setPrecisaTruncar] = useState(false);

  /* Mede se o texto realmente está sendo truncado */
  useLayoutEffect(() => {
    const checkOverflow = () => {
      const el = descRef.current;
      if (!el) return;

      /* Calcula altura de 6 linhas baseado no line-height real */
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxLinesHeight = lineHeight * 6;

      setPrecisaTruncar(el.scrollHeight > maxLinesHeight + 1);
    };

    checkOverflow();

    /* Re-mede depois das fontes carregarem */
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(checkOverflow);
    }

    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, [descricaoRich]);

  return (
    <article className={`${styles.cardNoticia} ${isExpanded ? styles.cardExpanded : ""}`}>
      {imagem && (
        <div className={styles.imgWrapper}>
          <img src={`https:${imagem}`} alt="" loading="lazy" />
        </div>
      )}

      <div className={styles.contentNoticia}>
        {titulo && <h3 className={styles.tituloNoticia}>{titulo}</h3>}
        <div
          ref={descRef}
          className={`${styles.descricaoNoticia} ${
            isExpanded ? styles.expanded : styles.clamped
          }`}
        >
          {descricaoRich && documentToReactComponents(descricaoRich)}
        </div>

        <div className={styles.actionsRow}>
          {precisaTruncar && !isExpanded && (
            <button
              className={styles.verMais}
              onClick={() => onToggle(id)}
              type="button"
            >
              Ver mais
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {isExpanded && (
            <button
              className={styles.verMais}
              onClick={() => onToggle(id)}
              type="button"
            >
              Ver menos
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                style={{ transform: "rotate(180deg)" }}
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

const NaMidia = () => {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState({});

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const [headerRef, headerInView] = useInView();

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await contentfulClient.getEntries({
          content_type: "naMidia",
          order: "-sys.createdAt",
        });

        // console.log("NaMidia response:", response);
        setNoticias(response.items);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  useEffect(() => {
    if (swiperInstance && prevRef.current && nextRef.current) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;
      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!loading && noticias.length === 0) {
    return null;
  }

  return (
    <section id="midia" className={styles.containerNaMidia}>
      <div
        ref={headerRef}
        className={`${styles.headerNaMidia} ${
          headerInView ? styles.visible : ""
        }`}
      >
        <p className={styles.identPage}>Imprensa</p>
        <h1>Na mídia</h1>
      </div>

      {loading ? (
        <div className={styles.loading}>Carregando...</div>
      ) : (
        <div className={styles.swiperWrapper}>
          <button
            ref={prevRef}
            className={`${styles.navBtn} ${styles.navBtnPrev}`}
            type="button"
            aria-label="Anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={setSwiperInstance}
            onSlideChangeTransitionEnd={() => setExpandedIds({})}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            loop={noticias.length > 3}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className={styles.swiper}
          >
            {noticias.map((item) => (
              <SwiperSlide key={item.sys.id} className={styles.slide}>
                <NoticiaCard
                  item={item}
                  isExpanded={!!expandedIds[item.sys.id]}
                  onToggle={toggleExpand}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={nextRef}
            className={`${styles.navBtn} ${styles.navBtnNext}`}
            type="button"
            aria-label="Próximo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
};

export default NaMidia;