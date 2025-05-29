import React from "react";
import axios from "axios";
//import baseURL from "../axios/baseURL";
import { baseURL } from "../axios/baseURL";
import { useEffect, useState } from "react";
import Products from "./Products";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const categoriesList = ["smartphones", "laptops", "motorcycle", "tablets"];
  const cart = useSelector((state) => state.cart)
  //console.log(cart);
  
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const responses = await Promise.all(
          categoriesList.map((category) =>
            baseURL.get(`/products/category/${category}?limit=5`).then((res) => ({
              category,
              products: res.data.products,
            }))
          )
        );

        const productsMap = {};
        responses.forEach(({ category, products }) => {
          productsMap[category] = products;
        });

        setProductsByCategory(productsMap);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchAllCategories();
  }, []);
  //console.log(productsByCategory);

  return <div className="mt-3">
    {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category}>
          <div className="pl-10">
          <h2><Link to={`/category/${category}`}>{category.toUpperCase()}</Link></h2>
          </div>
          <div className="grid grid-cols-5 gap-1">
          {products.map((product) => (
            <Products key={product.id} product={product} cart={cart} isAdded={Boolean(cart.items.length > 0 && cart.items.find(item => item.id === product.id))}
 />
          ))}
          </div>
        </div>
      ))}
    <Products />
  </div>;
};

export default Home;
