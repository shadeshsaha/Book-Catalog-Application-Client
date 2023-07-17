import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import BookPage from "../pages/Book/BookPage";
import Home from "../pages/Home/Home";
// import NotFound from "../pages/shared/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <BookPage />,
      },
    ],
  },

  // {
  //   path: "*",
  //   element: <NotFound />,
  // },
]);

export default routes;
