import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/AppContext";

import Home from "./pages/Home";
import BRTeam from "./pages/BRTeam";

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Main Website */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* Branch Representatives */}
          <Route
            path="/br-team"
            element={<BRTeam />}
          />

          {/* Backward-compatible route */}
          <Route
            path="/BRTeam"
            element={<BRTeam />}
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<Home />}
          />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;