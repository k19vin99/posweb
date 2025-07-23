import { useState, useEffect } from "react";
import axios from "axios";

export default function Sales() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/products");
        const availableProducts = res.data.filter((p) => p.stock > 0);
        setProducts(availableProducts);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.nombre?.toLowerCase().includes(search.toLowerCase()) ||
      p.descripcion?.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce(
    (acc, item) => acc + ((item.precio ?? 0) * (item.quantity ?? 0)),
    0
  );

  const handleConfirmSale = () => {
    if (cart.length === 0) {
      alert("El carrito está vacío.");
      return;
    }
    // Aquí puedes conectar con el backend de ventas:
    console.log("Venta confirmada:", cart, "Total:", total);
    alert("✅ Venta confirmada.\n(Implementa guardado en backend aquí.)");
    setCart([]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      
      <div className="flex flex-1">
        
        <main className="flex-1 flex justify-center items-start p-6 overflow-auto">
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Sección de Productos */}
            <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-4 text-center">🛒 Panel de Ventas</h1>
              <input
                type="text"
                placeholder="Buscar producto..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:border-blue-500"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto">
                {filteredProducts.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500">
                    No hay productos disponibles.
                  </p>
                ) : (
                  filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-md bg-white transition"
                    >
                      <div>
                        <h2 className="text-lg font-semibold">{product.nombre}</h2>
                        <p className="text-sm text-gray-600">{product.descripcion}</p>
                        <p className="text-sm">Stock: {product.stock}</p>
                        <p className="text-sm font-bold text-green-600">
                          ${ (product.precio ?? 0).toLocaleString() }
                        </p>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="mt-2 bg-blue-500 text-white rounded py-1 hover:bg-blue-600"
                      >
                        Agregar
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sección de Carrito */}
            <div className="bg-white rounded-lg shadow p-6 flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-center">🛒 Carrito</h2>
              {cart.length === 0 ? (
                <p className="text-center text-gray-600">
                  No hay productos en el carrito.
                </p>
              ) : (
                <div className="flex-1 overflow-y-auto max-h-[400px]">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center border-b py-2"
                    >
                      <div>
                        <p className="font-semibold">
                          {item.nombre} x{item.quantity}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${ (item.precio ?? 0).toLocaleString() } c/u
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 font-bold text-right">
                Total: ${ total.toLocaleString() }
              </div>
              <button
                disabled={cart.length === 0}
                onClick={handleConfirmSale}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-300"
              >
                Confirmar Venta
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
