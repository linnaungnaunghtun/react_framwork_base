import { lazy } from "react";

const GalleryList = lazy(() => import("../features/gallery/pages/GalleryList"));

const galleryRoute = [
  {
    path: "gallery",
    element: <GalleryList />,
  },
];

export default galleryRoute;
