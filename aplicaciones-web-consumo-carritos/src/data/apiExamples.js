export const API_EXAMPLES = [
  { label: 'Listado de carritos (5)', value: '/carts?limit=5' },
  { label: 'Mayor valor total (orden descendente)', value: '/carts?sortBy=total&order=desc&limit=5' },
  { label: 'Mayor cantidad de unidades (totalQuantity)', value: '/carts?sortBy=totalQuantity&order=desc&limit=5' },
  { label: 'Carritos del usuario 5', value: '/carts/user/5' },
  { label: 'Carritos del usuario 1', value: '/carts/user/1' },
  { label: 'Detalle del carrito 1', value: '/carts/1' },
  { label: 'Detalle del carrito 10', value: '/carts/10' },
  { label: 'Paginación: omitir 10 y tomar 3', value: '/carts?limit=3&skip=10' },
]
