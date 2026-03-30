import React from "react";
import styled, { keyframes } from "styled-components";
import { features } from "../utils/data";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Strip = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #12121A, #1A1A26);
  border-top: 1px solid #2a2a3a;
  border-bottom: 1px solid #2a2a3a;
  padding: 32px 40px;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  animation: ${slideIn} 0.5s ease forwards;
  animation-delay: ${({ delay }) => delay}s;
  opacity: 0;
`;

const IconBox = styled.div`
  font-size: 28px;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid rgba(201, 168, 76, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Text = styled.div``;

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
`;

const Desc = styled.div`
  font-size: 12px;
  color: #9a9ab0;
`;

const FeaturesStrip = () => {
  return (
    <Strip>
      <Grid>
        {features.map((f, i) => (
          <Item key={i} delay={i * 0.1}>
            <IconBox>{f.icon}</IconBox>
            <Text>
              <Title>{f.title}</Title>
              <Desc>{f.desc}</Desc>
            </Text>
          </Item>
        ))}
      </Grid>
    </Strip>
  );
};

export default FeaturesStrip;
