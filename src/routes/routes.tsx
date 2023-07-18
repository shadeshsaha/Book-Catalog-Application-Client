import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddNewBook from "../pages/Book/AddNewBook";
import BookDetails from "../pages/Book/BookDetails";
import BookPage from "../pages/Book/BookPage";
import EditBookPage from "../pages/Book/EditBookPage";
import WishlistPage from "../pages/Book/WishList";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import NotFound from "../pages/shared/NotFound";
import Login from "./../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

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
      {
        path: "/wishlist",
        element: (
          <PrivateRoute>
            {" "}
            <WishlistPage />
          </PrivateRoute>
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "add-new-book",
        element: (
          <PrivateRoute>
            {" "}
            <AddNewBook />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "edit-book/:id",
        element: (
          <PrivateRoute>
            <EditBookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
