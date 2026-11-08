import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ApiProvider } from './context/ApiContext.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Carritos from './pages/Carritos.jsx'
import ExploradorAPI from './pages/ExploradorAPI.jsx'
import Productos from './pages/Productos.jsx'
import Usuarios from './pages/Usuarios.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
import './styles.css'

export default function App() {
  return (
    <BrowserRouter>
      <ApiProvider>
        <div className="app-shell">
          <Header />
          <Routes>
            <Route path="/" element={<Navigate to="/carritos" replace />} />
            <Route path="/carritos" element={<Carritos />} />
            <Route path="/api" element={<ExploradorAPI />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
          <Footer />
        </div>
      </ApiProvider>
    </BrowserRouter>
  )
}
