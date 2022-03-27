import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuthContext } from "./Context/AuthContext";
import { AdminPage } from "./pages/Admin/Admin";
import { EditarMotoPage } from "./pages/Admin/EditarMoto";
import { EditarMotosPage } from "./pages/Admin/EditarMotos";
import { EditarUsuarioPage } from "./pages/Admin/EditarUsuario";
import { EditarUsuariosPage } from "./pages/Admin/EditarUsuarios";
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
              <Route path="/admin/motos" element={<EditarMotosPage />} />
              <Route
                path="/admin/motos/edit/:motoId"
                element={<EditarMotoPage tipo="edit" />}
              />

              <Route path="/admin/usuarios" element={<EditarUsuariosPage />} />
              <Route
                path="/admin/usuarios/edit/:usuarioId"
                element={<EditarUsuarioPage tipo="edit" />}
              />
              <Route
                path="/admin/usuarios/add"
                element={<EditarUsuarioPage tipo="add" />}
              />
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
