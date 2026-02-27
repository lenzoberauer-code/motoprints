import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Lade...");

  useEffect(() => {
    fetch("https://motoprints.onrender.com")
      .then(res => res.text())
      .then(data => setMessage(data))
      .catch(() => setMessage("Backend nicht erreichbar"));
  }, []);

  return (
    <div style={{ fontFamily: "Arial", textAlign: "center", marginTop: "50px" }}>
      <h1>🚀 MotoPrints</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;