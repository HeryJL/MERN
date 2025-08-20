
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Login from './page/login';
import Accueil from './page/accueil';
import Film from './page/film';
import Inscription from './page/inscription';
import Layout from './components/layout';

function App() {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Login />} />
      <Route path='/login' element={<Login />} />
      <Route path='/inscription' element={<Inscription />} />

      <Route path='/accueil' element={
        <Layout>
          <Accueil />
        </Layout>} />
      <Route path='/film/:id' element={
        <Layout>
          <Film />
        </Layout>} />
    </Routes>
  )
}

export default App
