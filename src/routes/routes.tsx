
import { Route, Routes } from 'react-router-dom';
import HeroSection from '../components/HeroSection/HeroSection';
import QuemSouEu from '../components/QuemSouEu/QuemSouEu';
import AreasAtuacao from '../components/AreasAtuacao/AreasAtuacao';
import Servicos from '../components/Servicos/Servicos';
import EbooksLivros from '../components/EbooksLivros/EbooksLivros';
import Politicas from '../components/Insitucionais/Politicas/Politicas';
import TermosUso from '../components/Insitucionais/TermosUso/TermosUso';
import NaMidia from '../components/NaMidia/NaMidia';

const HomePage = () => (
  <>
    <HeroSection/>
    <QuemSouEu/>
    <AreasAtuacao/>
    <Servicos/>
    <NaMidia/>
    <EbooksLivros/>
  </>
);

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path='/politicas-de-privacidade' element={<Politicas/>}/>
      <Route path='/termos-de-uso' element={<TermosUso/>}/>
    </Routes>
  );
};

export default AppRoutes;