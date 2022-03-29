import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { AuthProvider, useAuthContext } from "./Context/AuthContext";
import { AdminPage } from "./pages/Admin/Admin";
import { EditarCategoriasPage } from "./pages/Admin/EditarCategorias";
import { EditarMarcasPage } from "./pages/Admin/EditarMarcas";
import { EditarMotoPage } from "./pages/Admin/EditarMoto";
import { EditarMotosPage } from "./pages/Admin/EditarMotos";
import { EditarUsuarioPage } from "./pages/Admin/EditarUsuario";
import { EditarUsuariosPage } from "./pages/Admin/EditarUsuarios";
import { ComentariosPage } from "./pages/Comentarios";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/Login";
import { PerfilPage } from "./pages/Perfil";
import { SignUpPage } from "./pages/Signup";

function AppRoutes() {
  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="" element={<Home />} />
              <Route path="comentarios/:motoId" element={<ComentariosPage />} />
              <Route path="perfil" element={<PerfilPage />} />

              <Route path="admin" element={<AdminPage />}>
                <Route path="motos" element={<EditarMotosPage />} />
                <Route
                  path="motos/edit/:motoId"
                  element={<EditarMotoPage tipo="edit" />}
                />
                <Route
                  path="motos/add"
                  element={<EditarMotoPage tipo="add" />}
                />
                <Route
                  path="categorias"
                  element={<EditarCategoriasPage />}
                ></Route>
                <Route path="marcas" element={<EditarMarcasPage />}></Route>

                <Route path="usuarios" element={<EditarUsuariosPage />} />
                <Route
                  path="usuarios/edit/:usuarioId"
                  element={<EditarUsuarioPage tipo="edit" />}
                />
                <Route
                  path="usuarios/add"
                  element={<EditarUsuarioPage tipo="add" />}
                />
              </Route>
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
