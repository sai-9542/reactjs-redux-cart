import React from "react";
//import baseURL from "../axios/baseURL";
import { baseURL, apiURL } from "../axios/baseURL";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slice/cartSlice";
import { Link } from "react-router-dom";
import { calculateDiscountedPrice } from "../utils/priceUtils";

const Products = ({ product, isAdded }) => {
  //console.log(product?.id ?? "");


  const dispatch = useDispatch();

  return (
    <>
      {product ? (
        <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
          <Link
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            //href={`${apiURL}product/${product.id}`}
            to={`/product/show/${product.id}`}
          >
            <img
              className="object-cover"
              src={product.thumbnail}
              alt={product.title}
            />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {product.discountPercentage}% OFF
            </span>
          </Link>
          <div className="mt-4 px-5 pb-5">
            <Link to={`/product/show/${product.id}`}>
              <h5 className="text-xl tracking-tight text-slate-900">
                {product.title}
              </h5>
            </Link>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-2xl font-bold text-slate-900">
                  $
                  {calculateDiscountedPrice(product)}
                </span>
                <span className="text-sm text-slate-900 line-through">
                  ${product.price}
                </span>
              </p>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <svg
                    key={index}
                    aria-hidden="true"
                    className={`h-5 w-5 ${
                      index < Math.round(product.rating)
                        ? "text-yellow-300"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}

                <span className="ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {product.rating}
                </span>
              </div>
            </div>
            {!isAdded ? (
            <button
              className="flex items-center justify-center rounded-md bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={(e) => dispatch(addToCart({product: product, qty: 1}))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Add to cart
            </button>
            ) : (
              <button
              className="flex items-center justify-center rounded-md bg-red-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
              onClick={(e) => dispatch(removeFromCart(product))}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Remove From Cart
            </button>
            )
}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Products;
