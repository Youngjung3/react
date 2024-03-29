import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import { Carousel } from "antd";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    // const url = "https://6d234e1f-4f06-4f4f-a473-ef51c7d28bbf.mock.pstmn.io/products/";
    let url = `${API_URL}/products`;
    axios
    //   .get(`${API_URL}/products`)
      .get(url)
      .then((result) => {
        // console.log(result);
        const products = result.data.product;
        setProducts(products);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div id="body">
        <Carousel autoplay autoplaySpeed={3000}>
          {banners.map((banner, index) => {
            return (
              <Link to={banner.href} key={index}>
                <div id="banner">
                  <img src={`${API_URL}/${banner.imageUrl}`} alt="" />
                </div>
              </Link>
            );
          })}
          {/* <img src="images/banners/banner1.png" alt="" /> */}
        </Carousel>
        <h1>Products</h1>
        <div id="product-list">
          {products.map((product, idx) => {
            return (
              <div className="product-card" key={idx}>
				{product.soldout===1?<div className="product-blur"></div> : null}
				
                <Link
                  className="product-link"
                  to={`/productPage/${product.id}`}
                >
                  <div>
                    <img
                      className="product-img"
                      src={`${API_URL}/${product.imageUrl}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="product-content">
                    <span className="product-name">{product.name}</span>
                    <span className="product-price">{product.price}</span>
                    <div className="product-footer">
                      <span className="product-seller">
                        <img
                          src="images/icons/avatar.png"
                          className="product-avatar"
                          alt="{product.seller}"
                        />
                        <span>{product.seller}</span>
                      </span>
                      <span className="product-date">
                        상품등록일:{dayjs(product.createdAt).format("YY-MM-DD")}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default MainPage;
