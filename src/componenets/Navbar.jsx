import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiURL, baseURL } from "../axios/baseURL";
import { useSelector } from "react-redux";
import { calculateDiscountedPrice } from "../utils/priceUtils";
//import Cart from "./Cart";
import CartItems from "./CartItems";

const Navbar = () => {
  const [cartShow, setCartshow] = useState(false);
  const [categories, setCategories] = useState([]);
  const showCategories = ["smartphones", "laptops", "motorcycle", "tablets"];
  const history = useLocation();

  const cart = useSelector((state) => state.cart);
  //console.log(cart);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const getCategories = await baseURL.get(`products/category-list`);
        if (getCategories.status === 200) {
          setCategories(getCategories.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
    </nav> */}

      <nav className="bg-indigo-700">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  className="hidden size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <Link
                    to="/"
                    className={`rounded-md px-3 py-2 text-sm font-medium text-white  ${
                      history.pathname == "/" ? "bg-gray-900" : ""
                    } `}
                    aria-current="page"
                  >
                    Home
                  </Link>
                  {/* {categories &&
                    categories.map((category) => (

                      <Link
                        to={`/category/${category}`}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                        aria-current="page"
                      >
                        {category}
                      </Link>
                    ))} */}
                  {categories &&
                    categories
                      .filter((category) => showCategories.includes(category))
                      .map((category) => (
                        <Link
                          key={category}
                          to={`/category/${category}`}
                          className={`rounded-md px-3 py-2 text-sm font-medium text-white capitalize ${
                            history.pathname == `/category/${category}`
                              ? "bg-gray-900"
                              : ""
                          }`}
                          aria-current="page"
                        >
                          {category}
                        </Link>
                      ))}
                  <Link
                    to="/cart"
                    className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                      history.pathname == `/cart` ? "bg-gray-900" : ""
                    }`}
                    aria-current="page"
                    onClick={() => setCartshow(false)}
                  >
                    Cart
                  </Link>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                onClick={() => setCartshow(!cartShow)}
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
              >
                <span className="absolute -inset-1.5">
                  <sup>{cart.totalQuantity}</sup>
                </span>
                <span className="sr-only"></span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>

              <div className="relative ml-3">
                {cartShow && cart.items.length > 0 ? (
                  <div
                    className="absolute right-0 z-10 mt-8 w-100 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <CartItems />

                    <div className="mt-5 mb-5 text-center">
                      <Link
                        to={"/cart"}
                        onClick={() => setCartshow(!cartShow)}
                        className="text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-red-900"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
            <Link
              to="/"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              aria-current="page"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              aria-current="page"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              aria-current="page"
            >
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
