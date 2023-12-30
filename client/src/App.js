import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from "react-redux";
import Spinner from './components/Spinner';
import PublicRoute from './components/PublicRoute';
import Societe from './pages/Societe';
import Departement from './pages/Departement';
import TypeMateriel from './pages/TypeMateriel';
import Materiel from './pages/Materiel';
import BonLivraison from './pages/BonLivraison';
import Service from './pages/Service';
import Provenance from './pages/Provenance';
import TypeUnite from './pages/TypeUnite';
import TypeEtat from './pages/TypeEtat';
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path='/service' element={
            <ProtectedRoute>
              <Service />
            </ProtectedRoute>
          } />
          <Route path='/provenance' element={
            <ProtectedRoute>
              <Provenance />
            </ProtectedRoute>
          } />
          <Route path='/typeUnite' element={
            <ProtectedRoute>
              <TypeUnite />
            </ProtectedRoute>
          } />
          <Route path='/typeEtat' element={
            <ProtectedRoute>
              <TypeEtat />
            </ProtectedRoute>
          } />
          <Route path='/bonLivraison' element={
            <ProtectedRoute>
              <BonLivraison />
            </ProtectedRoute>
          } />
          <Route path='/societe' element={
            <ProtectedRoute>
              <Societe />
            </ProtectedRoute>
          } />
          <Route path='/departement' element={
            <ProtectedRoute>
              <Departement />
            </ProtectedRoute>
          } />
          <Route path='/typeMateriel' element={
            <ProtectedRoute>
              <TypeMateriel />
            </ProtectedRoute>
          } />
          <Route path='/materiel' element={
            <ProtectedRoute>
              <Materiel />
            </ProtectedRoute>
          } />
          
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
