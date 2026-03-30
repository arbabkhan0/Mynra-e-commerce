import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Card = styled.div`
  width: 220px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #2a2a3a;
  background: #12121a;

  &:hover {
    transform: translateY(-8px);
    border-color: rgba(201, 168, 76, 0.4);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.7);
  }

  &:hover img {
    transform: scale(1.08);
  }

  &:hover .hover-overlay {
    opacity: 1;
  }

  &:hover .shop-btn {
    transform: translateY(0);
    opacity: 1;
  }

  @media (max-width: 600px) {
    width: 160px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/4;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
  display: block;
`;

const Gradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 10, 15, 0) 40%,
    rgba(10, 10, 15, 0.92) 100%
  );
`;

const HoverOverlay = styled.div.attrs({ className: "hover-overlay" })`
  position: absolute;
  inset: 0;
  background: rgba(201, 168, 76, 0.08);
  opacity: 0;
  transition: opacity 0.4s ease;
`;

const SaleBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: #e63946;
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 4px;
`;

const BottomContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 16px 16px;
`;

const CategoryName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #f0ede8;
  font-family: "Cormorant Garamond", serif;
  margin-bottom: 4px;
`;

const Count = styled.div`
  font-size: 12px;
  color: #9a9ab0;
  margin-bottom: 14px;
`;

const ShopBtn = styled.div.attrs({ className: "shop-btn" })`
  display: inline-block;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 8px 18px;
  border-radius: 4px;
  transform: translateY(8px);
  opacity: 0;
  transition: all 0.3s ease;
`;

const ProductCategoryCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(`/shop?category=${category.name}`)}>
      <ImageWrap>
        <Image src={category.img} alt={category.name} />
        <Gradient />
        <HoverOverlay />
        <SaleBadge>{category.off}</SaleBadge>
        <BottomContent>
          <CategoryName>{category.name}</CategoryName>
          <Count>{category.count}</Count>
          <ShopBtn>Shop Now →</ShopBtn>
        </BottomContent>
      </ImageWrap>
    </Card>
  );
};

export default ProductCategoryCard;
