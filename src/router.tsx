import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedLayout";

import CategoryList from "./components/CategoryList";

import ProductByCategory from "./components/ProductByCategory";
import MainLayout from "./components/layout/MainLayout";
import ProductList from "./components/ProductList";
import MyOrders from "./components/MyOrders";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    path: "/",
    children: [
      {
        element: <MainLayout />,
        path: "/",
        children: [
          {
            index: true,
            element: <CategoryList />,
          },
          {
            path: "/product",
            element: <ProductList />,
          },
          {
            path: "category/:id",
            element: <ProductByCategory />,
          },
          {
            path: "orders",
            element: <MyOrders />,
          },
        ],
      },
    ],
  },
]);
export default router;
