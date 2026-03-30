import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { heroSlides } from "../utils/data";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  min-height: 600px;
  overflow: hidden;
  border-radius: 0 0 32px 32px;
`;

const Slide = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ active }) => (active ? 1 : 0)};
  transition: opacity 1s ease;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: ${({ active }) => (active ? "scale(1.03)" : "scale(1)")};
  transition: transform 6s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    175deg,
    rgba(10, 10, 15, 0.2) 0%,
    rgba(10, 10, 15, 0.75) 60%,
    rgba(10, 10, 15, 0.98) 100%
  );
`;

const Content = styled.div`
  position: absolute;
  bottom: 12%;
  left: 8%;
  max-width: 600px;
  animation: ${({ active }) => (active ? fadeIn : "none")} 0.8s ease forwards;
`;

const Tag = styled.span`
  display: inline-block;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  padding: 6px 16px;
  border-radius: 2px;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(48px, 7vw, 96px);
  font-weight: 700;
  color: #f0ede8;
  line-height: 1.05;
  margin-bottom: 12px;
  text-shadow: 0 4px 30px rgba(0,0,0,0.5);
`;

const HeroSubtitle = styled.p`
  font-size: 18px;
  color: #9a9ab0;
  margin-bottom: 36px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const PrimaryBtn = styled.button`
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  border: none;
  padding: 16px 40px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px #c9a84c50;
  }
`;

const SecondaryBtn = styled.button`
  background: transparent;
  color: #f0ede8;
  border: 1px solid rgba(240, 237, 232, 0.4);
  padding: 16px 40px;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Poppins", sans-serif;
  &:hover {
    border-color: #c9a84c;
    color: #c9a84c;
    transform: translateY(-2px);
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
`;

const Dot = styled.div`
  width: ${({ active }) => (active ? "32px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background: ${({ active }) => (active ? "#C9A84C" : "rgba(255,255,255,0.3)")};
  cursor: pointer;
  transition: all 0.4s ease;
`;

const NavArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ dir }) => (dir === "left" ? "left: 24px;" : "right: 24px;")}
  background: rgba(22, 22, 31, 0.6);
  border: 1px solid rgba(201, 168, 76, 0.3);
  color: #c9a84c;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  font-size: 22px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgba(201, 168, 76, 0.2);
    border-color: #c9a84c;
    transform: translateY(-50%) scale(1.05);
  }
  @media (max-width: 768px) { display: none; }
`;

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const next = () => setCurrent((c) => (c + 1) % heroSlides.length);

  return (
    <SliderWrapper>
      {heroSlides.map((slide, i) => (
        <Slide key={i} active={i === current}>
          <SlideImage src={slide.img} alt={slide.title} active={i === current} />
          <Overlay />
          {i === current && (
            <Content active>
              <Tag>{slide.tag}</Tag>
              <HeroTitle>{slide.title}</HeroTitle>
              <HeroSubtitle>{slide.subtitle}</HeroSubtitle>
              <ButtonRow>
                <PrimaryBtn onClick={() => navigate("/shop")}>{slide.cta}</PrimaryBtn>
                <SecondaryBtn onClick={() => navigate("/new_arrivals")}>
                  New Arrivals
                </SecondaryBtn>
              </ButtonRow>
            </Content>
          )}
        </Slide>
      ))}

      <NavArrow dir="left" onClick={prev}>‹</NavArrow>
      <NavArrow dir="right" onClick={next}>›</NavArrow>

      <Dots>
        {heroSlides.map((_, i) => (
          <Dot key={i} active={i === current} onClick={() => setCurrent(i)} />
        ))}
      </Dots>
    </SliderWrapper>
  );
};

export default HeroSlider;
