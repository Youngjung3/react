import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constants";
// import Header from "./Header";
// import Footer from "./Footer";
import "./ProductPage.css"

const ProductPage = () => {
  const navigate = useNavigate([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    // const url = `https://6d234e1f-4f06-4f4f-a473-ef51c7d28bbf.mock.pstmn.io/products/${id}`;
    const url = `${API_URL}/products/${id}`;
    axios
      .get(url)
      .then((result) => {
        console.log(result);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (product == null) {
    return <h1>상품정보를 받고 있습니다.</h1>;
  }
  return (
    <div>
      {/* <Header /> */}
      <div>
        {/* <button onClick={() => navigate("/")} id="home-btn">
            홈
        </button> */}
        <button onClick={() => navigate(-1)} id="back-btn">
          이전화면
        </button>
        <div id="image-box">
          <img src={`${API_URL}/${product.imageUrl}`} alt={product.name} />
        </div>
        <div id="profile-box">
          <img src="/images/icons/avatar.png" alt={product.seller} />
          <span className="product-seller">{product.seller}</span>
        </div>
        <div id="contents-box">
          <div id="name">{product.name}</div>
          <div id="price">{product.price}원</div>
          <div id="createAt">{product.createdAt}</div>
          <pre id="description">{product.description}</pre>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default ProductPage;
