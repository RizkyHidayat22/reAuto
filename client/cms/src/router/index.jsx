import { createBrowserRouter, redirect } from "react-router-dom";
import HomePage from "../views/HomePage";
import Register from "../views/Register";
import Login from "../views/login";
import BaseLayout from "../BaseLayout/BaseLayout";
import HomeBuyer from "../views/HomeBuyer";
import AddCar from "../views/AddProduct";
import AddCategory from "../views/AddCategory";
import EditProduct from "../views/EditProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <BaseLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "/home-buyer",
        element: <HomeBuyer />,
      },
      {
        path: "/addCar",
        element: <AddCar />,
      },
      {
        path: "/Add-category",
        element: <AddCategory />,
      },
      {
        path: "/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
