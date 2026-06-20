export const WPP_NUMBER = "5554999239512";

const BASE = `https://wa.me/${WPP_NUMBER}`;

export const wppUrl = (msg) => `${BASE}?text=${encodeURIComponent(msg)}`;

export const WPP_MSGS = {
  default:
    "Olá, Dra. Ramone! Vim pelo site e gostaria de saber mais sobre seus serviços jurídicos. Poderia me ajudar?",
  proposta:
    "Olá, Dra. Ramone! Vim pelo site e gostaria de solicitar uma proposta personalizada de assessoria jurídica. Poderia me ajudar?",
  equipe:
    "Olá, Dra. Ramone! Vim pelo site e gostaria de saber mais sobre seus serviços jurídicos. Poderia me ajudar?",
};

export const wppLivro = (nomeLivro) =>
  wppUrl(
    `Olá, Dra. Ramone! Vi pelo site e gostaria de garantir o "${nomeLivro}". Poderia me ajudar com as informações?`
  );

export const wppDefault = wppUrl(WPP_MSGS.default);
export const wppProposta = wppUrl(WPP_MSGS.proposta);
export const wppEquipe = wppUrl(WPP_MSGS.equipe);
