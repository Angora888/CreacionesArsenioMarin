import { BrowserRouter, Routes, Route } from "react-router-dom";

import BarraNavegacion from "./components/BarraNavegacion";
import PiePagina from "./components/PiePagina";
import Inicio from "./pages/Inicio";

function App() {
  return (
    <BrowserRouter>
      <BarraNavegacion />

      <Routes>
        <Route path="/" element={<Inicio />} />
      </Routes>

      <PiePagina />
    </BrowserRouter>
  );
}

export default App;