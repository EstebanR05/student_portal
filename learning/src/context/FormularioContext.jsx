import { createContext, useEffect, useState } from "react";

export const FormularioContext = createContext(null);

const formularioInicial = {
  nombre: "",
  correo: "",
  telefono: "",
  direccion: ""
};

function cargarCarritoInicial() {
  const carritoGuardado = localStorage.getItem("carrito");

  if (!carritoGuardado) {
    return [];
  }

  try {
    return JSON.parse(carritoGuardado);
  } catch (error) {
    console.error("No se pudo recuperar el carrito:", error);
    return [];
  }
}

function FormularioProvider({ children }) {
  const [formulario, setFormulario] = useState(formularioInicial);

  // El carrito se recupera desde localStorage al iniciar la aplicación.
  const [carrito, setCarrito] = useState(cargarCarritoInicial);

  // Cada cambio del carrito se sincroniza automáticamente.
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((carritoActual) => {
      const productoExistente = carritoActual.find(
        (item) => item.id === producto.id
      );

      if (productoExistente) {
        return carritoActual.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: item.cantidad + 1
              }
            : item
        );
      }

      return [
        ...carritoActual,
        {
          ...producto,
          cantidad: 1
        }
      ];
    });
  };

  const disminuirCantidad = (id) => {
    setCarrito((carritoActual) =>
      carritoActual
        .map((item) =>
          item.id === id
            ? {
                ...item,
                cantidad: item.cantidad - 1
              }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((carritoActual) =>
      carritoActual.filter((item) => item.id !== id)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const cantidadProductos = carrito.reduce(
    (acumulado, producto) => acumulado + producto.cantidad,
    0
  );

  const totalCarrito = carrito.reduce(
    (acumulado, producto) =>
      acumulado + producto.precio * producto.cantidad,
    0
  );

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
  };

  return (
    <FormularioContext.Provider
      value={{
        formulario,
        setFormulario,
        limpiarFormulario,
        carrito,
        agregarAlCarrito,
        disminuirCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        cantidadProductos,
        totalCarrito
      }}
    >
      {children}
    </FormularioContext.Provider>
  );
}

export default FormularioProvider;
