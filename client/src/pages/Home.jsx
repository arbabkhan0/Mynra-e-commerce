import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { category } from "../utils/data";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductCard from "../components/cards/ProductCard";
import { getAllProducts } from "../api";
import HeroSlider from "../components/HeroSlider";
import FeaturesStrip from "../components/FeaturesStrip";
import FlashSaleSection from "../components/FlashSaleSection";
import BrandsMarquee from "../components/BrandsMarquee";
import TestimonialsSection from "../components/TestimonialsSection";
import NewsletterSection from "../components/NewsletterSection";
import AppFooter from "../components/AppFooter";

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #0a0a0f;
  scroll-behavior: smooth;
`;

/* ─── Section wrapper ──────────────────────────────────────────────── */
const Section = styled.section`
  width: 100%;
  max-width: 1400px;
  padding: 72px 32px;
  @media (max-width: 768px) {
    padding: 48px 16px;
  }
`;

const FullWidthSection = styled.section`
  width: 100%;
`;

/* ─── Section heading ──────────────────────────────────────────────── */
const SectionHeader = styled.div`
  margin-bottom: 48px;
  text-align: ${({ center }) => (center ? "center" : "left")};
  animation: ${fadeUp} 0.6s ease forwards;
`;

const SectionLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 5px;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 10px;
`;

const SectionTitle = styled.h2`
  font-family: "Cormorant Garamond", serif;
  font-size: clamp(26px, 3.5vw, 44px);
  font-weight: 700;
  color: #f0ede8;
  line-height: 1.2;
`;

const TitleDivider = styled.div`
  width: 50px;
  height: 2px;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  border-radius: 2px;
  margin: 14px ${({ center }) => (center ? "auto" : "0")} 0;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 12px;
`;

const ViewAll = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: #c9a84c;
  text-decoration: none;
  letter-spacing: 1px;
  padding-bottom: 2px;
  border-bottom: 1px solid rgba(201, 168, 76, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    border-color: #c9a84c;
  }
`;

/* ─── Category scroll strip ──────────────────────────────────────── */
const CategoryStrip = styled.div`
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 12px;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;

/* ─── Products grid ─────────────────────────────────────────────── */
const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;

/* ─── Promo banner ──────────────────────────────────────────────── */
const PromoBanner = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 16px;
  }
`;

const PromoCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 300px;
  cursor: pointer;
  border: 1px solid #2a2a3a;
  transition: all 0.4s ease;

  &:hover img {
    transform: scale(1.05);
  }
  &:hover {
    border-color: rgba(201, 168, 76, 0.3);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
`;

const PromoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

const PromoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ side }) =>
    side === "left"
      ? "linear-gradient(90deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 100%)"
      : "linear-gradient(270deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.2) 100%)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px;
  align-items: ${({ side }) => (side === "right" ? "flex-end" : "flex-start")};
`;

const PromoTag = styled.span`
  background: #c9a84c;
  color: #0a0a0f;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2px;
  padding: 4px 12px;
  border-radius: 2px;
  margin-bottom: 12px;
  display: inline-block;
`;

const PromoTitle = styled.h3`
  font-family: "Cormorant Garamond", serif;
  font-size: 26px;
  font-weight: 700;
  color: #f0ede8;
  margin-bottom: 6px;
`;

const PromoSub = styled.p`
  font-size: 13px;
  color: #9a9ab0;
  margin-bottom: 20px;
`;

const PromoBtn = styled.div`
  display: inline-block;
  padding: 10px 22px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  border-radius: 4px;
  border: 1px solid rgba(201, 168, 76, 0.5);
  color: #c9a84c;
  transition: all 0.3s ease;
  &:hover {
    background: #c9a84c;
    color: #0a0a0f;
    border-color: #c9a84c;
  }
`;

/* ─── Stats strip ──────────────────────────────────────────────── */
const StatsStrip = styled.div`
  width: 100%;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  padding: 48px 40px;
`;

const StatsGrid = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  text-align: center;
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatItem = styled.div``;
const StatNum = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-size: 40px;
  font-weight: 700;
  color: #0a0a0f;
`;
const StatText = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: rgba(10, 10, 15, 0.7);
  margin-top: 4px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

/* ─── Component ─────────────────────────────────────────────────── */
const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

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

  return (
    <Container>
      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Features Strip ── */}
      <FullWidthSection>
        <FeaturesStrip />
      </FullWidthSection>

      {/* ── Shop by Categories ── */}
      <Section>
        <SectionHeader>
          <TitleRow>
            <div>
              <SectionLabel>Collections</SectionLabel>
              <SectionTitle>Shop by Category</SectionTitle>
              <TitleDivider />
            </div>
            <ViewAll href="/shop">View All →</ViewAll>
          </TitleRow>
        </SectionHeader>
        <CategoryStrip>
          {category.map((cat, i) => (
            <ProductCategoryCard key={i} category={cat} />
          ))}
        </CategoryStrip>
      </Section>

      {/* ── Flash Sale ── */}
      <FullWidthSection style={{ background: "#0D0D18", borderTop: "1px solid #1a1a26", borderBottom: "1px solid #1a1a26" }}>
        <FlashSaleSection products={products} />
      </FullWidthSection>

      {/* ── Promo Banners ── */}
      <PromoBanner style={{ marginTop: "60px", marginBottom: "20px" }}>
        <PromoCard>
          <PromoImg
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
            alt="Women's Collection"
          />
          <PromoOverlay side="left">
            <PromoTag>WOMEN'S EDIT</PromoTag>
            <PromoTitle>Summer Collection</PromoTitle>
            <PromoSub>Up to 30% off on selected styles</PromoSub>
            <PromoBtn>Shop Women →</PromoBtn>
          </PromoOverlay>
        </PromoCard>
        <PromoCard>
          <PromoImg
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
            alt="Men's Collection"
          />
          <PromoOverlay side="right">
            <PromoTag>MEN'S EDIT</PromoTag>
            <PromoTitle>The Sharp Look</PromoTitle>
            <PromoSub>Formal & casual for every occasion</PromoSub>
            <PromoBtn>Shop Men →</PromoBtn>
          </PromoOverlay>
        </PromoCard>
      </PromoBanner>

      {/* ── Brands Marquee ── */}
      <FullWidthSection style={{ marginTop: "40px" }}>
        <BrandsMarquee />
      </FullWidthSection>

      {/* ── Bestsellers Grid ── */}
      <Section>
        <SectionHeader center>
          <SectionLabel>Top Picks</SectionLabel>
          <SectionTitle>Our Bestsellers</SectionTitle>
          <TitleDivider center />
        </SectionHeader>
        <ProductsGrid>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </ProductsGrid>
        {products.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "60px 0",
              color: "#5a5a70",
              fontSize: "15px",
            }}
          >
            No products yet. Add some products from the backend admin panel!
          </div>
        )}
      </Section>

      {/* ── Stats ── */}
      <FullWidthSection>
        <StatsStrip>
          <StatsGrid>
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "1200+", label: "Products" },
              { num: "98%", label: "Satisfaction Rate" },
              { num: "15+", label: "Countries Served" },
            ].map((s, i) => (
              <StatItem key={i}>
                <StatNum>{s.num}</StatNum>
                <StatText>{s.label}</StatText>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsStrip>
      </FullWidthSection>

      {/* ── Testimonials ── */}
      <Section style={{ paddingBottom: "40px" }}>
        <TestimonialsSection />
      </Section>

      {/* ── Newsletter ── */}
      <FullWidthSection>
        <NewsletterSection />
      </FullWidthSection>

      {/* ── Footer ── */}
      <FullWidthSection>
        <AppFooter />
      </FullWidthSection>
    </Container>
  );
};

export default Home;
