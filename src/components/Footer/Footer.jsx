import React, { useState } from "react";
import styles from "./styles.module.scss";
import { WPP_NUMBER, wppDefault } from "../../utils/whatsapp";
import wppIcon from "../../assets/iconesRedesSociais/wppIcon.svg"
import emailIcon from "../../assets/iconesRedesSociais/emailIcon.svg"
import instaIcon from "../../assets/iconesRedesSociais/instaIcon.svg"
import linkedinIcon from "../../assets/iconesRedesSociais/linkedinIcon.svg"
import ytIcon from "../../assets/iconesRedesSociais/ytIcon.svg"
import logo from "../../assets/logoCinza.svg" 

const Footer = () => {

  const cardsRedes = [
    {icons: wppIcon, nameRede:"WhatsApp", labelRede: "(54) 99923-9512", linkRede: wppDefault},
    {icons: emailIcon, nameRede:"E-MAIL", labelRede: "ramonebiasotto.adv@outlook.com", linkRede: "mailto:ramonebiasotto.adv@outlook.com"},
    {icons: instaIcon, nameRede:"Instagram", labelRede: "@dra.ramonebiasotto", linkRede: "https://instagram.com/dra.ramonebiasotto"},
    {icons: linkedinIcon, nameRede:"LinkedIn", labelRede: "Ramone Biasotto", linkRede: "https://linkedin.com/in/ramone-biasotto"},
    {icons: ytIcon, nameRede:"Youtube", labelRede: "RamoneBiasottoAdv", linkRede: "https://youtube.com/@RamoneBiasottoAdv"}
  ]

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    assunto: "",
    mensagem: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nome, email, mensagem } = formData;

    const textoMensagem =
      `*Seja bem-vindo ao escritório Ramone Biasotto Advocacia. Em breve retornaremos sua mensagem.*%0A%0A` +
      `*Nome:* ${nome}%0A` +
      `*E-mail:* ${email}%0A` +
      `*Mensagem:*%0A${mensagem}`;

    const url = `https://wa.me/${WPP_NUMBER}?text=${textoMensagem}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <div id="contato" className={styles.containerFooter}>
        <div className={styles.containerHeaderFooter}>
          <p className={styles.descricaoPage}>Contato</p>
          <h1 className={styles.titlefooter}>Vamos proteger o seu negócio?</h1>
          <p className={styles.descricaoFooter}>Entre em contato e agende uma consulta personalizada.</p>
        </div>

        <section className={styles.containerCardsRedes}> 
          {cardsRedes.map((item, index) => (
            <a href={item.linkRede} className={styles.cardRedes} key={index} target="_blank" rel="noopener noreferrer">
                <img src={item.icons} alt="" />

                <div className={styles.contentCardRedes}>
                    <h1>{item.nameRede}</h1>
                    <p>{item.labelRede}</p>
                </div>
            </a>
          ))}
        </section>

        <form className={styles.formMensagem} onSubmit={handleSubmit}>
          <h2 className={styles.tituloForm}>Envie uma mensagem</h2>

          <div className={styles.containerInputs}>
            <div className={styles.linhaInputs}>
              <div className={styles.campoInput}>
                <label htmlFor="nome">NOME</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.campoInput}>
                <label htmlFor="email">E-MAIL</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={styles.campoInput}>
              <label htmlFor="mensagem">MENSAGEM</label>
              <textarea
                id="mensagem"
                name="mensagem"
                placeholder="Descreva brevemente como posso te ajudar..."
                value={formData.mensagem}
                onChange={handleChange}
                rows={5}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.botaoEnviar}>
            Enviar mensagem via WhatsApp
          </button>
        </form>
      </div>

      {/* ===== Barra inferior ===== */}
      <footer className={styles.barraInferior}>
        <div className={styles.logoBarra}>
          <img src={logo} alt="Ramone Biasotto Advocacia logo" />
          <h1>Ramone Biasotto Advocacia</h1>
        </div>

        <p className={styles.copyright}>
          © 2026 Ramone Biasotto Sociedade Individual de Advocacia — Todos os direitos reservados.
        </p>

        <div className={styles.linksLegais}>
          <a href="/politicas-de-privacidade">Aviso de privacidade</a>
          <a href="/termos-de-uso">Termos de uso</a>
        </div>
      </footer>
    </>
  );
};

export default Footer;