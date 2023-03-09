import React, { useState, useEffect } from "react";
import "./MainPage.css";
import axios from "axios";

const MainPage = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const url =
      "https://5cd40a6e-06b0-41cc-a5c8-7f2adff0691c.mock.pstmn.io/products";
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
  console.log(products);
  return (
    <>
      <div id="header">
        <div id="header-area">
          <img src="images/icons/logo.png" alt="" />
        </div>
      </div>
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
              <div>
                <img src={product.imageUrl} className="product-img" alt="" />
              </div>
              <div className="product-content">
                <span className="product-name">{product.name}</span>
                <span className="product-price">{product.price}</span>
                <span className="product-seller">
                  <img
                    src="images/icons/avatar.png"
                    className="product-avatar"
                    alt=""
                  />
                  <span>{product.seller}</span>
                </span>
              </div>
            </div>
            );
          })}
        </div>
      </div>
      <div id="footer">
        <a href="#!">회사소개</a>
        <a href="#!">이용약관</a>
        <a href="#!">통신판매업신고번호:123-1234</a>
        <a href="#!">사업자등록번호:456-56-789743</a>
        <a href="#!">고객센터:424-784512</a>
      </div>
    </>
  );
};
export default MainPage;
