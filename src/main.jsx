import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import "./index.css";
import { Login } from "./pages/Login.jsx";
import { UserProvider } from "./lib/context/user.jsx";
import { IdeasProvider } from "./lib/context/products.jsx";
import Admin from "./pages/admin/Index.jsx";
import Ideas from "./pages/admin/ideas/Index.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
    <UserProvider>
      <IdeasProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="admin" element={<Admin />}>
              <Route path="ideas" element={<Ideas />} />
            </Route>
          </Route>
        </Routes>
      </IdeasProvider>
    </UserProvider>
  </BrowserRouter>
);
