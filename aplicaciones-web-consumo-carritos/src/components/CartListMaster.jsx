import { useState } from 'react'

export default function CartListMaster({ carts = [], activeCartId, onSelectCart }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCarts = carts.filter((cart) => {
    if (!searchTerm.trim()) return true
    const term = searchTerm.toLowerCase().trim()
    const matchesId = String(cart.id).includes(term) || `cart #${cart.id}`.toLowerCase().includes(term)
    const matchesUser = String(cart.userId).includes(term) || `usuario ${cart.userId}`.toLowerCase().includes(term)
    return matchesId || matchesUser
  })

  return (
    <aside className="sidebar-carts-panel" aria-label="Lista de Carritos">
      <div className="sidebar-heading-row">
        <h2 className="sidebar-title">Carritos</h2>
        <span className="pill-count-badge">{carts.length}</span>
      </div>

      {/* Search Input pill */}
      <div className="search-field-pill-wrap">
        <span className="search-field-icon" aria-hidden="true">
          🔍
        </span>
        <input
          type="search"
          className="search-field-input"
          placeholder="Buscar por ID o usuario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cart items list with smooth transitions */}
      <div className="sidebar-scroll-items" role="list">
        {filteredCarts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 10px', color: '#94a3b8', fontSize: '13px' }}>
            No se encontraron carritos para "{searchTerm}"
          </div>
        ) : (
          filteredCarts.map((cart) => {
            const isActive = cart.id === activeCartId
            const productCount = cart.totalProducts || cart.products?.length || 0

            return (
              <button
                key={cart.id}
                type="button"
                className={`cart-select-card ${isActive ? 'active' : ''}`}
                onClick={() => onSelectCart(cart.id)}
                role="listitem"
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="cart-card-icon-pill">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                </div>

                <div className="cart-card-meta">
                  <div className="cart-card-name">Cart #{cart.id}</div>
                  <div className="cart-card-subinfo">
                    Usuario: {cart.userId} • {productCount} productos
                  </div>
                </div>

                <span className="cart-card-arrow" aria-hidden="true">
                  ›
                </span>
              </button>
            )
          })
        )}
      </div>
    </aside>
  )
}
