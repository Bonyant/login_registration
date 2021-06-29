import { LOGIN_ROUTE, REGISTRATION_ROUTE, HOME_ROUTE } from "./utils/consts";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
];
