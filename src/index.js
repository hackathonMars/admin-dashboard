import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import Loadable from "./components/Lodable/Loadable";

const App = Loadable(lazy(() => import("./App")));

const PrivateRoute = Loadable(
  lazy(() => import("./components/PrivateRoute/PrivateRoute"))
);
const Dashboard = Loadable(
  lazy(() =>
    import("./pages/main").then((module) => ({ default: module.Dashboard }))
  )
);
const Callings = Loadable(
  lazy(() =>
    import("./pages/main").then((module) => ({
      default: module.Callings,
    }))
  )
);
const Reports = Loadable(
  lazy(() =>
    import("./pages/main").then((module) => ({
      default: module.Reports,
    }))
  )
);
const Login = Loadable(
  lazy(() =>
    import("./pages/main").then((module) => ({ default: module.Login }))
  )
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to="/login" replace /> },
      { path: "login", element: <Login /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "callings", element: <Callings /> },
          { path: "reports", element: <Reports /> },
        ],
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
