import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const FooterWrapper = styled.footer`
  width: 100%;
  background: #080810;
  border-top: 1px solid #2a2a3a;
  padding: 70px 40px 32px;
`;

const Grid = styled.div`
  max-width: 1200px;
  margin: 0 auto 60px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;
  @media (max-width: 900px) { grid-template-columns: 1fr 1fr; }
  @media (max-width: 550px) { grid-template-columns: 1fr; }
`;

const Brand = styled.div``;

const Logo = styled.div`
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 16px;
`;

const BrandDesc = styled.p`
  font-size: 13px;
  color: #5a5a70;
  line-height: 1.8;
  max-width: 260px;
  margin-bottom: 24px;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 12px;
`;

const SocialBtn = styled.a`
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #12121a;
  border: 1px solid #2a2a3a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    border-color: #c9a84c;
    background: rgba(201,168,76,0.1);
    transform: translateY(-2px);
  }
`;

const ColTitle = styled.div`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #f0ede8;
  margin-bottom: 24px;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FootLink = styled(NavLink)`
  font-size: 14px;
  color: #5a5a70;
  text-decoration: none;
  transition: color 0.3s ease;
  &:hover { color: #c9a84c; }
`;

const Bottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 32px;
  border-top: 1px solid #1a1a26;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const Copy = styled.div`
  font-size: 13px;
  color: #3a3a4a;
`;

const BottomLinks = styled.div`
  display: flex;
  gap: 24px;
`;

const BLink = styled.a`
  font-size: 13px;
  color: #3a3a4a;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover { color: #c9a84c; }
`;

const AppFooter = () => {
  return (
    <FooterWrapper>
      <Grid>
        <Brand>
          <Logo>Mynra</Logo>
          <BrandDesc>
            Premium fashion for modern life. Curated collections for every occasion,
            delivered with care and style by Mynra.
          </BrandDesc>
          <SocialRow>
            <SocialBtn href="#" aria-label="Instagram">📸</SocialBtn>
            <SocialBtn href="#" aria-label="Twitter">🐦</SocialBtn>
            <SocialBtn href="#" aria-label="Facebook">👤</SocialBtn>
            <SocialBtn href="#" aria-label="Pinterest">📌</SocialBtn>
          </SocialRow>
        </Brand>

        <div>
          <ColTitle>Shop</ColTitle>
          <Links>
            <FootLink to="/shop">All Products</FootLink>
            <FootLink to="/new_arrivals">New Arrivals</FootLink>
            <FootLink to="/shop?category=Men">Men</FootLink>
            <FootLink to="/shop?category=Women">Women</FootLink>
            <FootLink to="/shop?category=Kids">Kids</FootLink>
            <FootLink to="/shop?category=Accessories">Accessories</FootLink>
          </Links>
        </div>

        <div>
          <ColTitle>Help</ColTitle>
          <Links>
            <FootLink to="/contact">Contact Us</FootLink>
            <FootLink to="/orders">Track Order</FootLink>
            <FootLink to="/">Shipping Policy</FootLink>
            <FootLink to="/">Returns & Exchange</FootLink>
            <FootLink to="/">Size Guide</FootLink>
          </Links>
        </div>

        <div>
          <ColTitle>Company</ColTitle>
          <Links>
            <FootLink to="/">About Us</FootLink>
            <FootLink to="/">Careers</FootLink>
            <FootLink to="/">Blog</FootLink>
            <FootLink to="/">Press</FootLink>
            <FootLink to="/">Sustainability</FootLink>
          </Links>
        </div>
      </Grid>

      <Bottom>
        <Copy>© {new Date().getFullYear()} Mynra Fashion. All rights reserved.</Copy>
        <BottomLinks>
          <BLink href="#">Privacy Policy</BLink>
          <BLink href="#">Terms of Service</BLink>
          <BLink href="#">Cookies</BLink>
        </BottomLinks>
      </Bottom>
    </FooterWrapper>
  );
};

export default AppFooter;
