import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import {
  FavoriteBorder,
  MenuRounded,
  CloseRounded,
  SearchRounded,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { logout } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";

const Nav = styled.nav`
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.4s ease;
  background: ${({ $scrolled }) =>
    $scrolled
      ? "rgba(8, 8, 16, 0.92)"
      : "rgba(10, 10, 15, 0.5)"};
  backdrop-filter: blur(${({ $scrolled }) => ($scrolled ? "16px" : "8px")});
  -webkit-backdrop-filter: blur(${({ $scrolled }) => ($scrolled ? "16px" : "8px")});
  border-bottom: 1px solid ${({ $scrolled }) =>
    $scrolled ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)"};
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? "0 4px 40px rgba(0,0,0,0.4)" : "none"};
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0 32px;
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
`;

const LogoWrap = styled(NavLink)`
  font-family: "Cormorant Garamond", serif;
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-decoration: none;
  letter-spacing: 1px;
  flex-shrink: 0;
`;

const NavItems = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  padding: 0;
  list-style: none;
  @media (max-width: 900px) {
    display: none;
  }
`;

const Navlink = styled(NavLink)`
  font-size: 14px;
  font-weight: 500;
  color: #9a9ab0;
  text-decoration: none;
  letter-spacing: 0.5px;
  position: relative;
  transition: color 0.3s ease;
  padding-bottom: 4px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 0;
    height: 1.5px;
    background: linear-gradient(135deg, #c9a84c, #e8d5b0);
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  &:hover {
    color: #f0ede8;
  }
  &:hover::after {
    width: 100%;
  }
  &.active {
    color: #c9a84c;
    &::after {
      width: 100%;
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 900px) {
    gap: 14px;
  }
`;

const IconBtn = styled(NavLink)`
  color: #9a9ab0;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  position: relative;
  &:hover { color: #c9a84c; }
`;

const CartBadge = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: #c9a84c;
  color: #0a0a0f;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignInBtn = styled.button`
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  color: #0a0a0f;
  border: none;
  padding: 10px 24px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px #c9a84c40;
    filter: brightness(1.05);
  }
`;

const LogoutBtn = styled.button`
  background: transparent;
  border: 1px solid #2a2a3a;
  color: #9a9ab0;
  padding: 8px 18px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
  &:hover {
    border-color: #c9a84c;
    color: #c9a84c;
  }
`;

const HamburgerBtn = styled.button`
  background: transparent;
  border: 1px solid #2a2a3a;
  color: #9a9ab0;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: none;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover { border-color: #c9a84c; color: #c9a84c; }
  @media (max-width: 900px) { display: flex; }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  background: rgba(8, 8, 16, 0.97);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #2a2a3a;
  padding: 24px 32px 32px;
  z-index: 99;
  transform: ${({ open }) => (open ? "translateY(0)" : "translateY(-10px)")};
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "all" : "none")};
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MobileNavLink = styled(NavLink)`
  font-size: 18px;
  font-weight: 500;
  color: #9a9ab0;
  text-decoration: none;
  padding: 12px 0;
  border-bottom: 1px solid #1a1a26;
  display: block;
  transition: color 0.3s ease;
  &:hover, &.active { color: #c9a84c; }
  &:last-child { border-bottom: none; }
`;

const MobileActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 10px;
  background: #12121a;
  border: 1px solid #2a2a3a;
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #f0ede8;
`;

const Navbar = ({ openAuth, setOpenAuth, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setIsOpen(false);

  return (
    <>
      <Nav $scrolled={scrolled}>
        <Container>
          <LogoWrap to="/">Mynra</LogoWrap>

          <NavItems>
            <li><Navlink to="/">Home</Navlink></li>
            <li><Navlink to="/shop">Shop</Navlink></li>
            <li><Navlink to="/new_arrivals">New Arrivals</Navlink></li>
            <li><Navlink to="/orders">Orders</Navlink></li>
            <li><Navlink to="/contact">Contact</Navlink></li>
          </NavItems>

          <RightSection>
            <IconBtn to="/shop">
              <SearchRounded sx={{ fontSize: "22px" }} />
            </IconBtn>

            {currentUser ? (
              <>
                <IconBtn to="/favorite">
                  <FavoriteBorder sx={{ fontSize: "22px" }} />
                </IconBtn>
                <IconBtn to="/cart" style={{ color: "#9a9ab0" }}>
                  <ShoppingCartOutlined sx={{ fontSize: "22px" }} />
                  <CartBadge>0</CartBadge>
                </IconBtn>
                <UserInfo>
                  <Avatar
                    src={currentUser?.img}
                    sx={{ width: 28, height: 28, fontSize: "13px", background: "#C9A84C", color: "#0a0a0f" }}
                  >
                    {currentUser?.name?.[0]}
                  </Avatar>
                  <UserName style={{ display: "none" }}>{currentUser?.name}</UserName>
                </UserInfo>
                <LogoutBtn onClick={() => dispatch(logout())}>Logout</LogoutBtn>
              </>
            ) : (
              <SignInBtn onClick={() => setOpenAuth(!openAuth)}>Sign In</SignInBtn>
            )}

            <HamburgerBtn onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <CloseRounded sx={{ fontSize: "20px" }} />
              ) : (
                <MenuRounded sx={{ fontSize: "20px" }} />
              )}
            </HamburgerBtn>
          </RightSection>
        </Container>
      </Nav>

      <MobileMenu open={isOpen}>
        <MobileNavLink to="/" onClick={close}>Home</MobileNavLink>
        <MobileNavLink to="/shop" onClick={close}>Shop</MobileNavLink>
        <MobileNavLink to="/new_arrivals" onClick={close}>New Arrivals</MobileNavLink>
        <MobileNavLink to="/orders" onClick={close}>Orders</MobileNavLink>
        <MobileNavLink to="/contact" onClick={close}>Contact</MobileNavLink>
        {currentUser ? (
          <MobileActions>
            <LogoutBtn onClick={() => { close(); dispatch(logout()); }}>Logout</LogoutBtn>
          </MobileActions>
        ) : (
          <MobileActions>
            <SignInBtn onClick={() => { close(); setOpenAuth(!openAuth); }}>Sign In</SignInBtn>
          </MobileActions>
        )}
      </MobileMenu>
    </>
  );
};

export default Navbar;
