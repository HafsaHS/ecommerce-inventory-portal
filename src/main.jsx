import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.jsx";
import Admin from "./pages/admin/index.jsx";
import Home from "./pages/home/index.jsx";
import ProductList from "./pages/home/product/index.jsx";
import AddProduct from "./pages/admin/product/add.jsx";
import EditProduct from "./pages/admin/product/edit.jsx";
import ViewProduct from "./pages/admin/product/view.jsx";
import CategoryList from "./pages/admin/category/index.jsx";
import EditCategory from "./pages/admin/category/edit.jsx";
import ViewCategory from "./pages/admin/category/view.jsx";
import AddCategory from "./pages/admin/category/add.jsx";
import Register from "./pages/auth/Register.jsx";
import Login from "./pages/auth/Login.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="product" element={<ProductList />} />
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          >
            <Route path="product" element={<ProductList />}>
              {/* <Route path="add" element={<AddProduct />} />
              <Route path="edit/:id" element={<EditProduct />} />
              <Route path="view/:id" element={<ViewProduct />} /> */}
            </Route>
            <Route path="category" element={<CategoryList />}>
              <Route path="add" element={<AddCategory />} />
              <Route path="edit/:id" element={<EditCategory />} />
              <Route path="view/:id" element={<ViewCategory />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
);
