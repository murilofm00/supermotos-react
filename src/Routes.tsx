import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuthContext } from "./Context/AuthContext";
import { AdminPage } from "./pages/Admin";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";

function AppRoutes() {
  const { usuario } = useAuthContext();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Home />} />
            {usuario?.isAdmin && <Route path="" element={<AdminPage />} />}
          </Route>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default AppRoutes;
