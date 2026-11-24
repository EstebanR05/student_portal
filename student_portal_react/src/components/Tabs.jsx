import { useId, useState } from "react";

function Tabs({ items = [] }) {
  const [activo, setActivo] = useState(0);
  const baseId = useId();

  if (items.length === 0) return null;

  const indiceSeguro = activo < items.length ? activo : 0;

  return (
    <div className="tabs-container">
      <div className="tabs-list" role="tablist">
        {items.map((item, index) => {
          const seleccionado = index === indiceSeguro;
          return (
            <button
              key={item.titulo}
              type="button"
              id={`${baseId}-tab-${index}`}
              role="tab"
              aria-selected={seleccionado}
              aria-controls={`${baseId}-panel-${index}`}
              className={`tab-btn ${seleccionado ? "tab-btn--active" : ""}`}
              onClick={() => setActivo(index)}
            >
              {item.titulo}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel-${indiceSeguro}`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${indiceSeguro}`}
        className="tab-panel"
      >
        {items[indiceSeguro].contenido}
      </div>
    </div>
  );
}

export default Tabs;
