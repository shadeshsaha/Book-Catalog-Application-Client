/* eslint-disable no-unused-vars */
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CartSlider from "../../components/CartSlider";
import {
  setAccessToken,
  setFirstName,
  setUserEmail,
} from "../../redux/features/auth/authSlice";
import { useCreateWishListMutation } from "../../redux/features/wishlist/wishListApi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

const NavBar = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    document.body.classList.toggle("drawer-open");
  };
  const handleCartSliderClose = () => {
    setIsDrawerOpen(false);
    document.body.classList.remove("drawer-open");
  };
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navOptions = (
    <>
      <li className="nav-link nav-link-ltr ">
        <Link to="/" className="hover:text-white hover:bg-transparent">
          Home
        </Link>
      </li>
      <li className="nav-link nav-link-ltr">
        <Link to="/books" className="hover:text-white hover:bg-transparent">
          Books
        </Link>
      </li>
      <li className="nav-link nav-link-ltr">
        <Link to="/wishlist" className="hover:text-white hover:bg-transparent">
          WishList
        </Link>
      </li>
      <li className="nav-link nav-link-ltr">
        <Link
          to="/add-new-book"
          className="hover:text-white hover:bg-transparent"
        >
          Add New Books
        </Link>
      </li>

      {/* <li className="nav-link nav-link-ltr">
        <Link to="/dashboard" className="hover:text-white hover:bg-transparent">
          Dashboard
        </Link>
      </li> */}
    </>
  );

  const { accessToken, firstName } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");
    localStorage.removeItem("cart");
    dispatch(setAccessToken({ data: { accessToken: null } }));
    dispatch(setFirstName(null));
    dispatch(setUserEmail({ data: { email: null } }));
    navigate("/");
  };

  const { book } = useAppSelector((state) => state.cart);

  const totalQuantity = () => {
    let totalQuantity = 0;
    book.forEach((book) => {
      totalQuantity += book.quantity;
    });

    return totalQuantity;
  };

  return (
    <div className="navbar fixed z-20  max-w-screen-2xl bg-gray-600	 ">
      <div className="navbar-start">
        <div className="dropdown ">
          {!isDropdownOpen ? (
            <label
              tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-ghost   lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          ) : (
            <label
              tabIndex={0}
              onClick={toggleDropdown}
              className="btn btn-ghost  lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/1990/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </label>
          )}

          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-compact bg-black  dropdown-content mt-3 p-2 text-primary font-bold shadow  rounded-box w-52 z-50"
            >
              {navOptions}
            </ul>
          )}
        </div>

        <Link to="/" className="btn btn-ghost normal-case text-white text-xl">
          BookMania{" "}
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu font-bold menu-horizontal px-1 ">{navOptions}</ul>
      </div>

      <div className="navbar-end">
        <>
          <div className="drawer navbar-end drawer-end mr-5">
            <input
              id="my-drawer-4"
              type="checkbox"
              className="drawer-toggle"
              checked={isDrawerOpen}
              onChange={handleDrawerToggle}
            />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4">
                <div className="badge badge-outline  font-bold text-white">
                  <span>
                    <FaShoppingCart></FaShoppingCart>
                  </span>
                  <span className="m-2 font-bold text-xl">
                    {totalQuantity()}
                  </span>
                </div>
              </label>
            </div>

            <div className="drawer-side ">
              <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

              <div className="menu bg-base-300 p-4 w-72 h-full  text-base-content">
                <ul className="cart-slider-list">
                  {" "}
                  <CartSlider onClose={handleCartSliderClose} />
                </ul>
              </div>
            </div>
          </div>
        </>
        {firstName && <p className="font-bold mr-3 text-cyan-400">{firstName}</p>}
        {accessToken ? (
          <button onClick={handleLogOut} className="btn btn-sm btn-outline ">
            <span className="text-white text-xs">logout</span>
          </button>
        ) : (
          <Link to="/login">
            {" "}
            <button className="btn btn-sm btn-primary">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
