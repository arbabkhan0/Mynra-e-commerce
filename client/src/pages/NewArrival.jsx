import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ProductCard from "../components/cards/ProductCard";
import { getAllProducts } from "../api";
import { CircularProgress } from "@mui/material";
import AppFooter from "../components/AppFooter";

const shimmer = keyframes`
  0% { left: -150%; }
  100% { left: 150%; }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: #0a0a0f;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled.div`
  width: 100%;
  height: 360px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.35);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 0 24px;
`;

const HeroTag = styled.div`
  display: inline-block;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 3px;
  padding: 6px 18px;
  border-radius: 2px;
  margin-bottom: 20px;
`;

const HeroTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(36px, 6vw, 72px);
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 12px;
  line-height: 1.1;
`;

const HeroSub = styled.p`
  font-size: 16px;
  color: #9a9ab0;
`;

const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 72px 32px;
  @media (max-width: 768px) { padding: 40px 16px; }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const FilterBtn = styled.button`
  background: ${({ active }) => (active ? "linear-gradient(135deg, #c9a84c, #e8d5b0)" : "#12121a")};
  color: ${({ active }) => (active ? "#0a0a0f" : "#9a9ab0")};
  border: 1px solid ${({ active }) => (active ? "transparent" : "#2a2a3a")};
  padding: 8px 20px;
  border-radius: 24px;
  font-size: 13px;
  font-weight: ${({ active }) => (active ? "700" : "500")};
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.25s ease;
  &:hover {
    border-color: #c9a84c;
    color: ${({ active }) => (active ? "#0a0a0f" : "#c9a84c")};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;

const LoaderWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 80px 0;
`;

const NewArrival = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("all");

  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getProducts(); }, []);

  const categories = ["all", "Men", "Women", "Kids", "Accessories"];

  const filtered =
    filter === "all"
      ? products
      : products.filter((p) => p.category?.toLowerCase() === filter.toLowerCase());

  return (
    <Container>
      <Hero>
        <HeroImg
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80"
          alt="New Arrivals"
        />
        <HeroContent>
          <HeroTag>✦ JUST DROPPED</HeroTag>
          <HeroTitle>New Arrivals</HeroTitle>
          <HeroSub>Fresh Styles, Every Single Week</HeroSub>
        </HeroContent>
      </Hero>

      <Section>
        <FilterRow>
          {categories.map((cat) => (
            <FilterBtn
              key={cat}
              active={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat === "all" ? "All" : cat}
            </FilterBtn>
          ))}
        </FilterRow>

        {loading ? (
          <LoaderWrap>
            <CircularProgress sx={{ color: "#c9a84c" }} />
          </LoaderWrap>
        ) : (
          <Grid>
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
            {filtered.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "60px 0",
                  color: "#5a5a70",
                  fontSize: "15px",
                }}
              >
                No products in this category yet.
              </div>
            )}
          </Grid>
        )}
      </Section>

      <div style={{ width: "100%" }}>
        <AppFooter />
      </div>
    </Container>
  );
};

export default NewArrival;
