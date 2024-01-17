import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from "react-redux";
import Spinner from './components/Spinner';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Societes from './pages/Societes';
import TypeMateriels from './pages/TypeMateriels';
import Services from './pages/Services';
import Materiels from './pages/Materiels';
import AjouterTypeMateriel from './pages/Ajout/AjouterTypeMateriel';
import AjouterSociete from './pages/Ajout/AjouterSociete';
import AjouterService from './pages/Ajout/AjouterService';
import MainCourante from './pages/MainCourante';
import BonLivraison from './pages/BonLivraison';
import BonCommande from './pages/BonCommande';
import Stock from './pages/Stock';

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? ( <Spinner /> ) : (
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />
          <Route path='/login' element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path='/register' element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path='/typeMateriels' element={
            <ProtectedRoute>
              <TypeMateriels />
            </ProtectedRoute>
          } />
          <Route path='/materiels' element={
            <ProtectedRoute>
              <Materiels />
            </ProtectedRoute>
          } />
          <Route path='/ajouterTypeMateriel' element={
            <ProtectedRoute>
              <AjouterTypeMateriel />
            </ProtectedRoute>
          } />
          <Route path='/ajouterSociete' element={
            <ProtectedRoute>
              <AjouterSociete />
            </ProtectedRoute>
          } />
          <Route path='/ajouterService' element={
            <ProtectedRoute>
              <AjouterService />
            </ProtectedRoute>
          } />
          <Route path='/societes' element={
            <ProtectedRoute>
              <Societes />
            </ProtectedRoute>
          } />
          <Route path='/services' element={
            <ProtectedRoute>
              <Services />
            </ProtectedRoute>
          } />

          <Route path='/bonlivraison' element={
            <ProtectedRoute>
              <BonLivraison />
            </ProtectedRoute>
          } />

          <Route path='/bonCommande' element={
            <ProtectedRoute>
              <BonCommande />
            </ProtectedRoute>
          } />

          <Route path='/maincourante' element={
            <ProtectedRoute>
              <MainCourante />
            </ProtectedRoute>
          } />
           <Route path='/stock' element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          } />
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
