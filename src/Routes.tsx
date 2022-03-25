import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuthContext } from "./Context/AuthContext";
import { AdminPage } from "./pages/Admin";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { SignUpPage } from "./pages/Signup";

function AppRoutes() {
  const { usuario } = useAuthContext();

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Home />} />
              {usuario?.isAdmin && <Route path="" element={<AdminPage />} />}
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default AppRoutes;
