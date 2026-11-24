import { useId, useState } from "react";

function Accordion({ items = [] }) {
  const [abiertoIndex, setAbiertoIndex] = useState(null);
  const baseId = useId();

  const toggleItem = (index) => {
    setAbiertoIndex((actual) => (actual === index ? null : index));
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const estaAbierto = abiertoIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const headerId = `${baseId}-header-${index}`;

        return (
          <div key={item.pregunta} className="accordion-item">
            <button
              type="button"
              id={headerId}
              className={`accordion-trigger ${estaAbierto ? "accordion-trigger--open" : ""}`}
              aria-expanded={estaAbierto}
              aria-controls={panelId}
              onClick={() => toggleItem(index)}
            >
              <span>{item.pregunta}</span>
              <span className="accordion-icon" aria-hidden="true">
                {estaAbierto ? "−" : "+"}
              </span>
            </button>
            {estaAbierto && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="accordion-panel"
              >
                <p>{item.respuesta}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Accordion;
