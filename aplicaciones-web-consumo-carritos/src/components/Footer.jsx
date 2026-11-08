import { API_DOCUMENTATION_URL } from '../data/apiConfig.js'

export default function Footer() {
  return (
    <footer className="app-footer">
      <div>
        <strong>DummyJSON Carritos</strong> — Proyecto de Consumo de API REST en React con diseño moderno y buenas prácticas de ingeniería.
      </div>
      <div>
        <a href={API_DOCUMENTATION_URL} target="_blank" rel="noreferrer">
          Documentación oficial de DummyJSON ↗
        </a>
      </div>
    </footer>
  )
}
