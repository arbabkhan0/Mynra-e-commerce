import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { flashSaleEndTime } from "../utils/data";
import ProductCard from "./cards/ProductCard";

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 60px 24px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  gap: 20px;
  flex-wrap: wrap;
`;

const Left = styled.div``;

const Badge = styled.span`
  background: #e63946;
  color: white;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 2px;
  display: inline-block;
  margin-bottom: 10px;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const Title = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: 36px;
  font-weight: 700;
  color: #f0ede8;
`;

const CountdownRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const TimeUnit = styled.div`
  text-align: center;
`;

const TimeNum = styled.div`
  background: #16161f;
  border: 1px solid #2a2a3a;
  color: #c9a84c;
  font-size: 28px;
  font-weight: 800;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inter", monospace;
`;

const TimeLabel = styled.div`
  font-size: 10px;
  color: #9a9ab0;
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
`;

const Colon = styled.div`
  color: #c9a84c;
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 20px;
  animation: ${pulse} 1s linear infinite;
`;

const CardRow = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  padding-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: #c9a84c60 transparent;
  &::-webkit-scrollbar { height: 4px; }
  &::-webkit-scrollbar-thumb { background: #c9a84c60; border-radius: 2px; }
`;

const useCountdown = (endTime) => {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) return setTimeLeft({ h: 0, m: 0, s: 0 });
      setTimeLeft({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [endTime]);
  return timeLeft;
};

const pad = (n) => String(n).padStart(2, "0");

const FlashSaleSection = ({ products }) => {
  const { h, m, s } = useCountdown(flashSaleEndTime);
  const saleProducts = products?.slice(0, 8) || [];

  return (
    <Section>
      <Header>
        <Left>
          <Badge>⚡ FLASH SALE</Badge>
          <Title>Today's Hot Deals</Title>
        </Left>
        <CountdownRow>
          <TimeUnit>
            <TimeNum>{pad(h || 0)}</TimeNum>
            <TimeLabel>Hours</TimeLabel>
          </TimeUnit>
          <Colon>:</Colon>
          <TimeUnit>
            <TimeNum>{pad(m || 0)}</TimeNum>
            <TimeLabel>Mins</TimeLabel>
          </TimeUnit>
          <Colon>:</Colon>
          <TimeUnit>
            <TimeNum>{pad(s || 0)}</TimeNum>
            <TimeLabel>Secs</TimeLabel>
          </TimeUnit>
        </CountdownRow>
      </Header>

      <CardRow>
        {saleProducts.map((product) => (
          <div key={product._id} style={{ flexShrink: 0 }}>
            <ProductCard product={product} />
          </div>
        ))}
        {saleProducts.length === 0 && (
          <div style={{ color: "#9a9ab0", padding: "40px 0" }}>
            No flash sale products available yet. Add some products from the backend!
          </div>
        )}
      </CardRow>
    </Section>
  );
};

export default FlashSaleSection;
