import React, { useEffect, useRef, useState } from "react";
import { baseURL } from "../axios/baseURL";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slice/cartSlice";
import { calculateDiscountedPrice } from "../utils/priceUtils";

const ProductShow = () => {
  const [product, setProduct] = useState(null);
  const [mainImg, setMainImg] = useState(null);
  const [productQty, setProductQty] = useState(1);

  const productID = useParams("id");
  //console.log(productID.id);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const myRef = useRef(null);
  const commentsToScroll = () =>
    myRef.current?.scrollIntoView({ behavior: "smooth" });

  // useEffect(() => {
  //   const productDetails = async () => {
  //     try {
  //       const response =  await () => {
  //         baseURL.get(`product/${productID.id}`).then((res) => {

  //         }).catch((error) => {

  //         })
  //       }
  //     } catch (error) {

  //     }
  //   }
  // })

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await baseURL.get(`/product/${productID.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productID.id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setMainImg(product.images[0]);
    }
  }, [product]);

  const isAdded = product && cart.items.some((item) => item.id === product.id);

  return (
    <>
      {product &&
        ((
          <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-8">
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <img
                    src={mainImg}
                    alt={product.title}
                    className="w-full h-auto rounded-lg shadow-md mb-4"
                    id="mainImage"
                  />
                  <div className="flex gap-4 py-4 justify-center overflow-x-auto">
                    {product?.images?.length > 0 &&
                      product.images.map((img, index) => (
                        <img
                          src={img}
                          alt={product.title}
                          className={`size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 ${
                            img === mainImg ? "cursor-not-allowed" : ""
                          }`}
                          onClick={() => setMainImg(img)}
                          key={img}
                        />
                      ))}
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-4">
                  <h2 className="text-3xl font-bold mb-2">{product.title}</h2>
                  <p className="text-gray-600 mb-4">SKU: {product.sku}</p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold mr-2">
                      ${calculateDiscountedPrice(product)}
                    </span>
                    <span className="text-gray-500 line-through">
                      {" "}
                      ${product.price}
                    </span>
                  </div>
                  <div
                    className="flex items-center mb-4 cursor-pointer"
                    onClick={commentsToScroll}
                  >
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

                    <span className="ml-2 text-gray-600">
                      {product.rating} ({product.reviews.length} Reviews)
                    </span>
                  </div>
                  <p className="text-gray-700 mb-6">{product.description}</p>

                  {/* <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Color:</h3>
                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-black rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"></button>
                      <button className="w-8 h-8 bg-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"></button>
                      <button className="w-8 h-8 bg-blue-500 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"></button>
                    </div>
                  </div> */}

                  <div className="mb-6">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Quantity:
                    </label>

                    <div className="relative flex items-center max-w-[8rem]">
                      <button
                        onClick={() =>
                          setProductQty((prev) => Math.max(1, prev - 1))
                        }
                        type="button"
                        id="decrement-button"
                        data-input-counter-decrement="quantity-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        id="quantity-input"
                        data-input-counter
                        aria-describedby="helper-text-explanation"
                        className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={productQty}
                        readOnly
                        required
                      />
                      <button
                        onClick={() => setProductQty((prev) => prev + 1)}
                        type="button"
                        id="increment-button"
                        data-input-counter-increment="quantity-input"
                        className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                      >
                        <svg
                          className="w-3 h-3 text-gray-900 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-4 mb-6">
                    <button
                      className={`flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                        !isAdded ? "bg-indigo-600" : "bg-red-900"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (isAdded) {
                          dispatch(removeFromCart(product));
                        } else {
                          dispatch(
                            addToCart({ product: product, qty: productQty })
                          );
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>

                      {isAdded ? "Remove From Cart" : "Add to Cart"}
                    </button>
                    <button className="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                      Wishlist
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Features:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>{product.returnPolicy}</li>
                      <li>{product.warrantyInformation}</li>
                      <li>{product.shippingInformation}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div ref={myRef}>
                <Comments reviews={product.reviews} />
              </div>
            </div>
          </div>
        ): "<p>No data found</p>")}
    </>
  );
};

const Comments = ({ reviews }) => {
  const [userReviews, setUserReviews] = useState(reviews);
  const [name, setName] = useState(null);
  const [comment, setComment] = useState(null);
  const [inputError, setInputError] = useState({ name: "", comment: "" });
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      setInputError({ name: "Please fill name" });
      return;
    }

    if (!comment) {
      setInputError((prev) => ({ ...prev, comment: "Please fill comment" }));
      return;
    }

    setInputError({ name: "", comment: "" });

    const newReview = {
      comment: comment,
      date: new Date(),
      rating: 5,
      reviewerEmail: null,
      reviewerName: name,
    };

    setUserReviews((prevReviews) => [...prevReviews, newReview]);
    setName("");
    setComment("");
  };
  //console.log(userReviews);

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-lg font-bold mb-4">Comments</h2>
      <div className="flex flex-col space-y-4">
        {userReviews.length > 0 &&
          userReviews.map((review) => (
            <div
              className="bg-white p-4 rounded-lg shadow-md"
              key={review.reviewerEmail}
            >
              <h3 className="text-lg font-bold flex">
                {review.reviewerName}
                <span className="flex ml-2 mt-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <svg
                      key={index}
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
              </h3>
              {/* <p className="text-gray-700 text-sm mb-2">
                {review.reviewerEmail}
              </p> */}
              <p className="text-gray-700 text-sm mb-2">
                Posted on{" "}
                {new Date(review.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}

        <form
          className="bg-white p-4 rounded-lg shadow-md"
          onSubmit={(e) => handleSubmit(e)}
        >
          <h3 className="text-lg font-bold mb-2">Add a comment</h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <small className="text-red-555">{inputError.name || ""}</small>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="comment"
              rows="3"
              placeholder="Enter your comment"
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <small className="text-red-555">{inputError.comment || ""}</small>
          </div>
          <div className="mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      aria-hidden="true"
                      className="h-5 w-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
</div>
          </div>
          <button className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductShow;
