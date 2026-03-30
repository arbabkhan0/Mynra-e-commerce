import React from "react";
import styled, { keyframes } from "styled-components";
import { brands } from "../utils/data";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Section = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 40px 0;
  background: #12121a;
  border-top: 1px solid #2a2a3a;
  border-bottom: 1px solid #2a2a3a;
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 22s linear infinite;
  gap: 0;
`;

const BrandItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 48px;
  font-family: "Cormorant Garamond", serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 3px;
  color: #3a3a4a;
  white-space: nowrap;
  transition: color 0.3s ease;
  position: relative;

  &::after {
    content: "◆";
    position: absolute;
    right: 0;
    color: #c9a84c30;
    font-size: 10px;
  }

  &:hover {
    color: #c9a84c;
  }
`;

const BrandsMarquee = () => {
  const doubled = [...brands, ...brands, ...brands, ...brands];
  return (
    <Section>
      <Track>
        {doubled.map((brand, i) => (
          <BrandItem key={i}>{brand}</BrandItem>
        ))}
      </Track>
    </Section>
  );
};

export default BrandsMarquee;
