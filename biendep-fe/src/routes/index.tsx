import SearchPage from "pages/search";
import HomePage from "pages/home";
import PublicLayout from "pages/layout/Public";
import { Navigate, createBrowserRouter } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import AdminLogin from "pages/login";
import AdminLayout from "pages/layout/Admin";
import AdminLicensePlate from "pages/admin/license-plate";

export const ROUTE_URL = {
  HOME: "/",
  SEARCH: "/tim-kiem",
  ADMIN: "/quan-ly",
  ADMIN_LICENSE_PLATE: "/quan-ly/bien-so",
  ADMIN_LOGIN: "/quan-ly/dang-nhap",
};
const routes = [
  {
    path: ROUTE_URL.HOME,
    element: <PublicLayout />,
    children: [
      {
        path: ROUTE_URL.HOME,
        element: <HomePage />,
      },
      {
        path: ROUTE_URL.SEARCH,
        element: <SearchPage />,
      },
    ],
  },
  {
    path: ROUTE_URL.ADMIN_LOGIN,
    element: <AdminLogin />,
  },
  {
    path: ROUTE_URL.ADMIN,
    element: <AdminLayout />,
    children: [
      {
        path: ROUTE_URL.ADMIN_LICENSE_PLATE,
        element: <AdminLicensePlate />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={ROUTE_URL.HOME} />,
  },
];

export const router = createBrowserRouter(routes);

export const sidebarItems = [
  {
    key: ROUTE_URL.ADMIN_LICENSE_PLATE,
    icon: <MdSpaceDashboard />,
    label: "Biển số",
  },
];
