export default function StatsOverview({ carts = [] }) {
  // If we have custom carts or default mockup
  const totalCarts = 20
  const totalProducts = 142
  const totalAmount = '$70,287.02'
  const uniqueUsers = 6

  return (
    <section className="stats-cards-row" aria-label="Métricas de Carritos">
      {/* 1. Carritos */}
      <article className="metric-card-single">
        <div className="metric-icon-circle purple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div>
        <div className="metric-text-group">
          <span className="metric-large-number">{totalCarts}</span>
          <span className="metric-label-text">Carritos</span>
        </div>
      </article>

      {/* 2. Productos */}
      <article className="metric-card-single">
        <div className="metric-icon-circle blue">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        <div className="metric-text-group">
          <span className="metric-large-number">{totalProducts}</span>
          <span className="metric-label-text">Productos</span>
        </div>
      </article>

      {/* 3. Total en carritos */}
      <article className="metric-card-single">
        <div className="metric-icon-circle green">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </div>
        <div className="metric-text-group">
          <span className="metric-large-number">{totalAmount}</span>
          <span className="metric-label-text">Total en carritos</span>
        </div>
      </article>

      {/* 4. Usuarios únicos */}
      <article className="metric-card-single">
        <div className="metric-icon-circle orange">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <div className="metric-text-group">
          <span className="metric-large-number">{uniqueUsers}</span>
          <span className="metric-label-text">Usuarios únicos</span>
        </div>
      </article>
    </section>
  )
}
