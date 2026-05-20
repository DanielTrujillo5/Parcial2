import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import TicketsPage from "./pages/TicketsPage";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>

      <Route
        path="/login"
        element={
          token
            ? <Navigate to="/inicio" replace />
            : <LoginPage />
        }
      />

      <Route
        path="/inicio"
        element={
          <PrivateRoute>
            <TicketsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/inicio" : "/login"}
            replace
          />
        }
      />

    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;