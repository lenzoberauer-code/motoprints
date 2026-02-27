import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const add = (p) => setCart([...cart, p]);

  const checkout = async () => {
    const res = await fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart })
    });
    const data = await res.json();
    window.location = data.url;
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>MotoPrints</h1>

      <h2>Produkte</h2>
      {products.map(p => (
        <div key={p.id}>
          {p.name} – {p.price}€
          <button onClick={() => add(p)}>Kaufen</button>
        </div>
      ))}

      <h2>Warenkorb: {cart.length}</h2>
      <button onClick={checkout}>Bezahlen</button>
    </div>
  );
}

export default App;