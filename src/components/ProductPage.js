import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/constants";
import { Button, message } from 'antd'
// import Header from "./Header";
// import Footer from "./Footer";
import "./ProductPage.css"
import dayjs from "dayjs";

const ProductPage = () => {
  const navigate = useNavigate([]);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProduct=()=>{
    axios
    .get(`${API_URL}/products/${id}`)
    .then((result) => {
      console.log(result);
      setProduct(result.data.product);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getProduct();
  }, []);
  if (product == null) {
    return <h1>상품정보를 받고 있습니다.</h1>;
  }

  const onClickPurchase=()=>{
    axios
    .post(`${API_URL}/purchase/${id}`)
    .then((result) => {
      message.info("결제가 완료 되었습니다");
      getProduct();
    })
    .catch((error) => {
      console.log(error);
    });
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
          {/* <div className="product-date">상품등록일: {dayjs(product.createdAt).format}</div> */}
          <Button size="large" type="primary" danger={true} className="payment" onClick={onClickPurchase}>즉시결재하기</Button>
          <pre id="description">{product.description}</pre>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default ProductPage;
