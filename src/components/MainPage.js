import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import "./MainPage.css";
import axios from "axios";
import Header from './Header'
import Footer from './Footer'

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // const url =
    //   "https://6d234e1f-4f06-4f4f-a473-ef51c7d28bbf.mock.pstmn.io/products/";
    let url =
      "http://localhost:8080/products/";
    axios
      .get(url)
      .then((result) => {
        const products = result.data.products;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // console.log(products);
  return (
    <>
      <Header/>
      <div id="body">
        <div id="banner">
          <img src="images/banners/banner1.png" alt="" />
        </div>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            // console.log(`product:${product.name} idx:${idx}, ${products}`);
            return (
            <div className="product-card" key={idx}>
              <Link className="product-link" to={`/productPage/${(product.id)}`}>
                <div>
                  <img src={product.imageUrl} className="product-img" alt={product.name} />
                </div>
                <div className="product-content">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}</span>
                  <span className="product-seller">
                    <img
                      src="images/icons/avatar.png"
                      className="product-avatar"
                      alt={product.seller}
                    />
                    <span>{product.seller}</span>
                  </span>
                </div>
              </Link>
            </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MainPage;
