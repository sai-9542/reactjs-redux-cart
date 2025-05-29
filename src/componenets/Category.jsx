import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../axios/baseURL";
import Products from "./Products";
import { useSelector } from "react-redux";

const Category = () => {
  const category = useParams();
  const categoryName = category.categoryName;
  const [products, setProducts] = useState();
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const categoryProducts = await baseURL.get(
          `/products/category/${categoryName}?limit=15`
        );        
        if (categoryProducts.status === 200) {
          setProducts(categoryProducts.data.products);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <div className="mt-3">
      <div key={categoryName}>
        <h2  className="pl-10">{categoryName.toUpperCase()}</h2>
        <div className="grid grid-cols-5 gap-1">
          {products && products.map((product) => (
            <Products key={product.id} product={product} isAdded={Boolean(cart.items.length > 0 && cart.items.find(item => item.id === product.id))} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
