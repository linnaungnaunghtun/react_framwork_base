import { lazy } from "react";
import LoginPage from "../features/auth/pages/LoginPage";

// const AboutUsPage = lazy(() => import("../features/public/pages/AboutUsPage"));
// const ContactUsPage = lazy(() => import("../features/public/pages/ContactUsPage"));
const HomePage = lazy(() => import("../features/public/pages/HomePage"));

const publicRoute = [
  {
    index: true,
    element: <HomePage />,
  },
  // {
  //   path: "about-us",
  //   element: <AboutUsPage />,
  // },
  // {
  //   path: "contact-us",
  //   element: <ContactUsPage />,
  // },
];

export default publicRoute;
