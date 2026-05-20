import LoginPage from "./pages/LoginPage";
import TicketsPage from "./pages/TicketsPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  if (!token) {
    return <LoginPage />;
  }

  return <TicketsPage />;
}

export default App;