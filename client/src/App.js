import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from "react-redux";
import Spinner from './components/Spinner';
// import ProtectedRoute  from './components/protectedRoute';
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

function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? ( <Spinner /> ) : (
        <Routes>
          <Route path='/' element={
            <>
              <HomePage />
            </>
          } />
          <Route path='/service' element={
            <>
              <Service />
            </>
          } />
          <Route path='/provenance' element={
            <>
              <Provenance />
            </>
          } />
          <Route path='/typeUnite' element={
            <>
              <TypeUnite />
            </>
          } />
          <Route path='/typeEtat' element={
            <>
              <TypeEtat />
            </>
          } />
          <Route path='/bonLivraison' element={
            <>
              <BonLivraison />
            </>
          } />
          <Route path='/societe' element={
            <>
              <Societe />
            </>
          } />
          <Route path='/departement' element={
            <>
              <Departement />
            </>
          } />
          <Route path='/typeMateriel' element={
            <>
              <TypeMateriel />
            </>
          } />
          <Route path='/materiel' element={
            <>
              <Materiel />
            </>
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
        </Routes>
      )}
      </BrowserRouter>
    </>
  );
}

export default App;
