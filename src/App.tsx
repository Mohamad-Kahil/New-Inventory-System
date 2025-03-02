import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Home />} />
          <Route path="/pos" element={<Home />} />
          <Route path="/analytics" element={<Home />} />
          <Route path="/customers" element={<Home />} />
          <Route path="/orders" element={<Home />} />
          <Route path="/suppliers" element={<Home />} />
          <Route path="/settings" element={<Home />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
