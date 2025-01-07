import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import App from "./app.jsx";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import "./index.css";
import { GlobalProvider } from "./lib/context/global.jsx";
import { UserProvider } from "./lib/context/user.jsx";
import Login from "./pages/login.jsx";
import ProdcutDetail from "./pages/admin/product/product_detail.jsx";
import Admin from "./pages/admin/index.jsx";
import AddCategory from "./pages/admin/category/add.jsx";
import EditCategory from "./pages/admin/category/edit.jsx";
import CategoryList from "./pages/admin/category/index.jsx";
import AddProduct from "./pages/admin/product/add.jsx";
import ProductList from "./pages/admin/product/index.jsx";
import EditProduct from "./pages/admin/product/edit.jsx";

const root = document.getElementById("root");

createRoot(root).render(
  <BrowserRouter>
    <UserProvider>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product" element={<Navigate to={"/product/:id"} />} />
          <Route path="/product/:id" element={<ProdcutDetail />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="admin" element={<Admin />}>
              <Route path="product" element={<ProductList />} />
              <Route path="product/add" element={<AddProduct />} />
              <Route path="product/edit/:id" element={<EditProduct />} />
              <Route path="category" element={<CategoryList />} />
              <Route path="category/add" element={<AddCategory />} />
              <Route path="category/edit/:id" element={<EditCategory />} />
            </Route>
          </Route>
        </Routes>
      </GlobalProvider>
    </UserProvider>
  </BrowserRouter>
);
