import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import styled from "styled-components";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
  VisibilityOutlined,
} from "@mui/icons-material";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/snackbarSlice";

const Card = styled.div`
  width: 260px;
  display: flex;
  flex-direction: column;
  gap: 0;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
  background: #12121a;
  border: 1px solid #2a2a3a;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(201, 168, 76, 0.35);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(201, 168, 76, 0.1);
  }

  @media (max-width: 600px) {
    width: 170px;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 0;

  &:hover img {
    transform: scale(1.07);
  }

  &:hover .overlay {
    opacity: 1;
  }

  &:hover .actions {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;

  @media (max-width: 600px) {
    height: 220px;
  }
`;

const Overlay = styled.div.attrs({ className: "overlay" })`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(10,10,15,0.0) 40%, rgba(10,10,15,0.7) 100%);
  opacity: 0;
  transition: opacity 0.35s ease;
`;

const Actions = styled.div.attrs({ className: "actions" })`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(calc(-50% + 8px));
  opacity: 0;
  transition: all 0.35s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ActionBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(18, 18, 26, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(201, 168, 76, 0.3);
  color: ${({ active }) => (active ? "#e74c3c" : "#f0ede8")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s ease;
  &:hover {
    background: rgba(201, 168, 76, 0.2);
    border-color: #c9a84c;
    color: #c9a84c;
    transform: scale(1.1);
  }
`;

const BadgeRow = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Badge = styled.span`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 4px 10px;
  border-radius: 4px;
  background: ${({ type }) =>
    type === "sale"
      ? "#e63946"
      : type === "new"
      ? "#c9a84c"
      : "rgba(22,22,31,0.8)"};
  color: ${({ type }) => (type === "new" ? "#0a0a0f" : "white")};
  display: inline-block;
`;

const RatingWrap = styled.div`
  position: absolute;
  bottom: 12px;
  left: 12px;
  background: rgba(10, 10, 15, 0.8);
  border-radius: 6px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(6px);
`;

const Details = styled.div`
  padding: 16px 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ProductTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #9a9ab0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ProductName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #f0ede8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: "Cormorant Garamond", serif;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Price = styled.div`
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(135deg, #c9a84c, #e8d5b0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const OriginalPrice = styled.div`
  font-size: 13px;
  font-weight: 400;
  color: #5a5a70;
  text-decoration: line-through;
`;

const Discount = styled.div`
  font-size: 11px;
  font-weight: 700;
  color: #2ecc71;
  background: rgba(46, 204, 113, 0.1);
  border-radius: 4px;
  padding: 2px 6px;
`;

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, { productId: product?._id })
      .then(() => { setFavorite(true); setFavoriteLoading(false); })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(openSnackbar({ message: err.message, severity: "error" }));
      });
  };

  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavourite(token, { productId: product?._id })
      .then(() => { setFavorite(false); setFavoriteLoading(false); })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(openSnackbar({ message: err.message, severity: "error" }));
      });
  };

  const addCart = async () => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then(() => navigate("/cart"))
      .catch((err) => dispatch(openSnackbar({ message: err.message, severity: "error" })));
  };

  const checkFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        setFavorite(res.data?.some((f) => f._id === product?._id));
        setFavoriteLoading(false);
      })
      .catch(() => setFavoriteLoading(false));
  };

  useEffect(() => { checkFavourite(); }, []);

  return (
    <Card>
      <ImageWrap>
        <Image src={product?.img} alt={product?.name} />
        <Overlay />

        <BadgeRow>
          {product?.price?.off > 0 && <Badge type="sale">{product?.price?.off}% OFF</Badge>}
          <Badge type="new">NEW</Badge>
        </BadgeRow>

        <Actions>
          <ActionBtn
            active={favorite}
            onClick={(e) => { e.stopPropagation(); favorite ? removeFavorite() : addFavorite(); }}
            title="Add to Wishlist"
          >
            {favoriteLoading ? (
              <CircularProgress size={16} sx={{ color: "inherit" }} />
            ) : favorite ? (
              <FavoriteRounded sx={{ fontSize: "18px" }} />
            ) : (
              <FavoriteBorder sx={{ fontSize: "18px" }} />
            )}
          </ActionBtn>
          <ActionBtn onClick={(e) => { e.stopPropagation(); addCart(); }} title="Add to Cart">
            <AddShoppingCartOutlined sx={{ fontSize: "18px" }} />
          </ActionBtn>
          <ActionBtn onClick={() => navigate(`/shop/${product._id}`)} title="Quick View">
            <VisibilityOutlined sx={{ fontSize: "18px" }} />
          </ActionBtn>
        </Actions>

        <RatingWrap>
          <Rating value={product?.rating || 4} readOnly sx={{ fontSize: "13px" }} />
        </RatingWrap>
      </ImageWrap>

      <Details onClick={() => navigate(`/shop/${product._id}`)}>
        <ProductTitle>{product?.title || "Mynra Fashion"}</ProductTitle>
        <ProductName>{product?.name}</ProductName>
        <PriceRow>
          <Price>${product?.price?.org}</Price>
          {product?.price?.mrp !== product?.price?.org && (
            <OriginalPrice>${product?.price?.mrp}</OriginalPrice>
          )}
          {product?.price?.off > 0 && (
            <Discount>{product?.price?.off}% off</Discount>
          )}
        </PriceRow>
      </Details>
    </Card>
  );
};

export default ProductCard;
