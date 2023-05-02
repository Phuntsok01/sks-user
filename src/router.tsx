import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedLayout";

import NavLayout from "./components/layout/NavLayout";
import CategoryList from "./components/CategoryList";
import ProductList from "./components/ProductList";
import ProductCard from "./components/ProductCard";
import ProductPage from "./components/ProductPage";
import ProductByCategory from "./components/ProductByCategory";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        element: <NavLayout />,
        path: "/",
        children: [
          {
            index: true,
            element: <CategoryList />,
          },
          {
            path: "/product",
            element: <ProductPage />,
          },
          {
            path: "category/:id",
            element: <ProductByCategory />,
          },
        ],
      },
    ],
  },
]);
export default router;
