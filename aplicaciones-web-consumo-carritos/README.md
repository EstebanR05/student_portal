# Aplicaciones Web: Consumo de API REST - Carritos (DummyJSON Carts)

Proyecto interactivo de React desarrollado siguiendo las buenas prácticas de arquitectura y consumo de API enseñadas en clase: separación de responsabilidades en `components/`, `context/`, `data/`, `pages/` y `services/`, manejo de ciclo de vida con `useEffect`, cancelación de peticiones con `AbortController`, control de estados asíncronos (`loading`, `error`, `data`), y diseño responsivo inspirado en la interfaz moderna de DummyJSON con Master-Detail split view, tarjetas de métricas, transiciones suaves e interactividad.

---

## 🛠️ Tecnologías Utilizadas

- **React 19** + **Vite 8**
- **React Router 7** para navegación sin recargas
- **DummyJSON REST API** ([https://dummyjson.com/docs/carts](https://dummyjson.com/docs/carts))
- CSS moderno con variables, flexbox, CSS grid, transiciones y animaciones fluidas

---

## 🚀 Cómo Ejecutar el Proyecto

```bash
cd student_portal/aplicaciones-web-consumo-carritos
pnpm install   # o npm install
pnpm run dev   # o npm run dev
```

Abre en tu navegador la URL indicada por Vite (normalmente `http://localhost:5173/`).

---

## 📂 Arquitectura del Proyecto

```text
src/
├── components/
│   ├── Cart3DIllustration.jsx   # Ilustración 3D SVG del carrito con bolsas y cajas
│   ├── CartDetailView.jsx       # Panel derecho: Inspector de productos, cantidades y totales
│   ├── CartListMaster.jsx       # Panel izquierdo: Lista de carritos con búsqueda en tiempo real
│   ├── Footer.jsx               # Pie de página institucional con enlaces a la documentación
│   ├── Header.jsx               # Barra superior con logo, pestañas y botón </ > API
│   └── StatsOverview.jsx        # 4 tarjetas de métricas calculadas en tiempo real
├── context/
│   └── ApiContext.jsx           # Monitoreo global del estado de la API (online, loading, offline)
├── data/
│   ├── apiConfig.js             # URL base y enlaces oficiales
│   └── apiExamples.js           # Endpoints preparados para el laboratorio
├── pages/
│   ├── Carritos.jsx             # Vista principal con Banner Hero, Métricas y Master-Detail
│   ├── ExploradorAPI.jsx        # Laboratorio interactivo para probar endpoints con latencia en ms
│   ├── NoEncontrado.jsx         # Página 404 amigable
│   ├── Productos.jsx            # Catálogo complementario de productos
│   └── Usuarios.jsx             # Explorador de usuarios vinculados a los carritos
├── services/
│   └── cartsApi.js              # Capa de consumo HTTP con fetch, AbortController y validaciones
├── App.jsx                      # Configuración central de rutas y proveedor de contexto
├── index.css                    # Variables CSS, fuentes tipográficas y reset
├── main.jsx                     # Punto de entrada
└── styles.css                   # Hoja de estilos completa con transiciones y microinteracciones
```

---

## 🌐 Endpoints Consumidos

1. `GET https://dummyjson.com/carts?limit=20` — Carga masiva de carritos para el panel Master-Detail y métricas globales.
2. `GET https://dummyjson.com/carts/{id}` — Consulta de un carrito individual con su desglose de productos.
3. `GET https://dummyjson.com/carts/user/{userId}` — Filtrado de carritos por comprador.
4. `GET https://dummyjson.com/products` y `GET https://dummyjson.com/users` — Datos de soporte para navegación integrada.
5. Endpoints didácticos en el **Laboratorio API** (`/api`): medición de tiempos de respuesta (`performance.now()`), código de estado HTTP (`200 OK`) y visualizador JSON interactivo.
