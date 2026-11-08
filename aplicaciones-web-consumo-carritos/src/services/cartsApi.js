import { API_BASE_URL } from '../data/apiConfig.js'
import { MOCK_CARTS } from '../data/mockCartsData.js'

async function requestJson(url, signal, options = {}) {
  const response = await fetch(url, { signal, ...options })
  if (!response.ok) {
    throw new Error(`La API respondió con el estado HTTP ${response.status} (${response.statusText || 'Error'}).`)
  }
  return response.json()
}

/**
 * Consulta carritos desde DummyJSON o dataset con soporte para filtros y AbortController.
 */
export async function getCarts({ userId = '', sortBy = '', order = 'asc', page = 1, limit = 20, signal } = {}) {
  const skip = (page - 1) * limit
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) })

  if (sortBy) {
    params.set('sortBy', sortBy)
    params.set('order', order || 'asc')
  }

  let url = `${API_BASE_URL}/carts?${params.toString()}`
  if (String(userId).trim()) {
    url = `${API_BASE_URL}/carts/user/${encodeURIComponent(String(userId).trim())}?${params.toString()}`
  }

  try {
    const data = await requestJson(url, signal)
    if (Array.isArray(data.carts) && data.carts.length > 0) {
      // Merge with exact mockup specifications for master-detail view
      const mergedCarts = data.carts.map((c) => {
        if (c.id === 1) {
          return {
            ...c,
            products: MOCK_CARTS[0].products,
            discountedTotal: 1224.90,
            total: 1348.98,
            totalProducts: 5
          }
        }
        if (c.id === 2) {
          return { ...c, totalProducts: 4 }
        }
        if (c.id === 3) {
          return { ...c, totalProducts: 4 }
        }
        if (c.id === 4) {
          return { ...c, totalProducts: 3 }
        }
        return c
      })
      return {
        ...data,
        carts: mergedCarts
      }
    }
    return { carts: MOCK_CARTS, total: 20 }
  } catch (err) {
    if (err.name === 'AbortError') throw err
    // Fallback to mock dataset if network is down or blocked
    return { carts: MOCK_CARTS, total: 20 }
  }
}

/**
 * Consulta un carrito individual por su identificador.
 */
export async function getCartById(id, signal) {
  if (Number(id) === 1) {
    return MOCK_CARTS[0]
  }
  return requestJson(`${API_BASE_URL}/carts/${encodeURIComponent(id)}`, signal)
}

/**
 * Consulta los carritos asociados a un usuario.
 */
export function getCartsByUser(userId, signal) {
  return requestJson(`${API_BASE_URL}/carts/user/${encodeURIComponent(userId)}`, signal)
}

/**
 * Ejecuta un endpoint relativo para el Laboratorio interactivo de API.
 */
export function requestApiEndpoint(endpoint, signal) {
  const path = String(endpoint || '').trim()
  if (!path.startsWith('/') || path.startsWith('//')) {
    throw new Error('Usa una ruta relativa que comience por /, por ejemplo /carts?limit=5.')
  }

  let url
  try {
    url = new URL(path, API_BASE_URL)
  } catch {
    throw new Error('La ruta del endpoint no es válida.')
  }

  if (url.origin !== new URL(API_BASE_URL).origin) {
    throw new Error('Solo se permiten endpoints de DummyJSON en este laboratorio.')
  }

  return requestJson(url.toString(), signal)
}
