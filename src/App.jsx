import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TypeCalculator from "./pages/TypeCalculator";
import Pokedex from "./pages/Pokedex";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        <Link to="/">Calculadora</Link> |{" "}
        <Link to="/pokedex">Pokédex</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TypeCalculator />} />
        <Route path="/pokedex" element={<Pokedex />} />
      </Routes>
    </BrowserRouter>
  );
}
