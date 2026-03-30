import React, { useEffect, useState } from "react";
import ProductCard from "../components/cards/ProductCard";
import styled from "styled-components";
import { filter } from "../utils/data";
import { CircularProgress, Slider } from "@mui/material";
import { getAllProducts } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { FilterListRounded, GridViewRounded, ViewListRounded } from "@mui/icons-material";

const Container = styled.div`
  height: 100%;
  overflow-y: hidden;
  display: flex;
  background: #0a0a0f;
  @media (max-width: 900px) {
    flex-direction: column;
    overflow-y: scroll;
  }
`;

const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
  height: 100%;
  overflow-y: auto;
  background: #0e0e16;
  border-right: 1px solid #2a2a3a;
  padding: 32px 24px;
  @media (max-width: 900px) {
    width: 100%;
    height: auto;
    overflow-y: visible;
    border-right: none;
    border-bottom: 1px solid #2a2a3a;
    display: ${({ mobileOpen }) => (mobileOpen ? "block" : "none")};
  }
`;

const SidebarTitle = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #c9a84c;
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FilterGroup = styled.div`
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #1a1a26;
  &:last-child {
    border-bottom: none;
  }
`;

const FilterTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #f0ede8;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Tag = styled.div`
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.25s ease;
  border: 1px solid ${({ selected }) => (selected ? "#c9a84c" : "#2a2a3a")};
  background: ${({ selected }) => (selected ? "rgba(201,168,76,0.12)" : "transparent")};
  color: ${({ selected }) => (selected ? "#c9a84c" : "#9a9ab0")};
  &:hover {
    border-color: #c9a84c;
    color: #c9a84c;
  }
`;

const PriceRange = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #9a9ab0;
  margin-top: 12px;
`;

const ClearBtn = styled.button`
  background: transparent;
  border: 1px solid #e63946;
  color: #e63946;
  font-size: 12px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  transition: all 0.25s ease;
  width: 100%;
  margin-top: 16px;
  &:hover {
    background: rgba(230, 57, 70, 0.1);
  }
`;

/* ── Main content ── */
const Main = styled.div`
  flex: 1;
  height: 100%;
  overflow-y: auto;
  padding: 32px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 28px;
  flex-wrap: wrap;
  gap: 12px;
`;

const PageTitle = styled.h1`
  font-family: "Cormorant Garamond", serif;
  font-size: 28px;
  font-weight: 700;
  color: #f0ede8;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SortSelect = styled.select`
  background: #12121a;
  border: 1px solid #2a2a3a;
  color: #9a9ab0;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus { border-color: #c9a84c; }
  option { background: #12121a; }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 1px solid #2a2a3a;
  border-radius: 8px;
  overflow: hidden;
`;

const ViewBtn = styled.button`
  background: ${({ active }) => (active ? "#c9a84c20" : "transparent")};
  border: none;
  color: ${({ active }) => (active ? "#c9a84c" : "#5a5a70")};
  padding: 8px 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  &:hover { background: #c9a84c10; color: #c9a84c; }
`;

const MobileFilterBtn = styled.button`
  background: transparent;
  border: 1px solid #2a2a3a;
  color: #9a9ab0;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-family: "Poppins", sans-serif;
  cursor: pointer;
  display: none;
  align-items: center;
  gap: 6px;
  @media (max-width: 900px) { display: flex; }
  &:hover { border-color: #c9a84c; color: #c9a84c; }
`;

const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const ActiveChip = styled.div`
  background: rgba(201, 168, 76, 0.1);
  border: 1px solid rgba(201, 168, 76, 0.3);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 12px;
  color: #c9a84c;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  &:hover { background: rgba(201, 168, 76, 0.2); }
`;

const GridView = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  gap: 24px;
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
  }
`;

const ResultCount = styled.div`
  font-size: 13px;
  color: #5a5a70;
  margin-bottom: 20px;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;

const EmptyIcon = styled.div`
  font-size: 60px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #f0ede8;
  margin-bottom: 8px;
`;

const EmptySub = styled.div`
  font-size: 14px;
  color: #5a5a70;
`;

const ShopListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("categories") || params.get("category");
    if (cat) setSelectedCategories([cat]);
  }, [location.search]);

  const getProducts = async () => {
    setLoading(true);
    const query = `minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}${
      selectedSizes.length > 0 ? `&sizes=${selectedSizes.join(",")}` : ""
    }${
      selectedCategories.length > 0
        ? `&categories=${selectedCategories.join(",")}`
        : ""
    }`;
    try {
      const res = await getAllProducts(query);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { getProducts(); }, [priceRange, selectedSizes, selectedCategories]);

  const toggleSize = (item) => {
    setSelectedSizes((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const toggleCategory = (item) => {
    setSelectedCategories((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  const clearAll = () => {
    setSelectedSizes([]);
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc") return a.price?.org - b.price?.org;
    if (sortBy === "price_desc") return b.price?.org - a.price?.org;
    return 0;
  });

  const allActive = [...selectedCategories.map(c => ({ label: c, type: "category" })),
                     ...selectedSizes.map(s => ({ label: s, type: "size" }))];

  return (
    <Container>
      {/* ── Sidebar ── */}
      <Sidebar mobileOpen={mobileFilterOpen}>
        <SidebarTitle>
          <FilterListRounded sx={{ fontSize: "16px" }} />
          Filters
        </SidebarTitle>

        {filter.map((f) => (
          <FilterGroup key={f.value}>
            <FilterTitle>{f.name}</FilterTitle>
            {f.value === "price" ? (
              <>
                <Slider
                  value={priceRange}
                  min={0}
                  max={1000}
                  valueLabelDisplay="auto"
                  onChange={(_, v) => setPriceRange(v)}
                  sx={{
                    color: "#c9a84c",
                    "& .MuiSlider-thumb": { background: "#c9a84c" },
                    "& .MuiSlider-rail": { background: "#2a2a3a" },
                  }}
                />
                <PriceRange>
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </PriceRange>
              </>
            ) : (
              <Tags>
                {f.items.map((item) => (
                  <Tag
                    key={item}
                    selected={
                      f.value === "size"
                        ? selectedSizes.includes(item)
                        : selectedCategories.includes(item)
                    }
                    onClick={() =>
                      f.value === "size" ? toggleSize(item) : toggleCategory(item)
                    }
                  >
                    {item}
                  </Tag>
                ))}
              </Tags>
            )}
          </FilterGroup>
        ))}

        {allActive.length > 0 && (
          <ClearBtn onClick={clearAll}>✕ Clear All Filters</ClearBtn>
        )}
      </Sidebar>

      {/* ── Main ── */}
      <Main>
        <TopBar>
          <PageTitle>Shop</PageTitle>
          <Controls>
            <MobileFilterBtn onClick={() => setMobileFilterOpen(!mobileFilterOpen)}>
              <FilterListRounded sx={{ fontSize: "16px" }} />
              Filters {allActive.length > 0 && `(${allActive.length})`}
            </MobileFilterBtn>
            <SortSelect value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="default">Sort: Featured</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
            </SortSelect>
            <ViewToggle>
              <ViewBtn active={view === "grid"} onClick={() => setView("grid")}>
                <GridViewRounded sx={{ fontSize: "18px" }} />
              </ViewBtn>
              <ViewBtn active={view === "list"} onClick={() => setView("list")}>
                <ViewListRounded sx={{ fontSize: "18px" }} />
              </ViewBtn>
            </ViewToggle>
          </Controls>
        </TopBar>

        {allActive.length > 0 && (
          <ActiveFilters>
            {allActive.map((a, i) => (
              <ActiveChip
                key={i}
                onClick={() =>
                  a.type === "category"
                    ? toggleCategory(a.label)
                    : toggleSize(a.label)
                }
              >
                {a.label} ✕
              </ActiveChip>
            ))}
          </ActiveFilters>
        )}

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <CircularProgress sx={{ color: "#c9a84c" }} />
          </div>
        ) : (
          <>
            <ResultCount>{sortedProducts.length} products found</ResultCount>
            {sortedProducts.length === 0 ? (
              <EmptyState>
                <EmptyIcon>🛍️</EmptyIcon>
                <EmptyText>No products found</EmptyText>
                <EmptySub>Try adjusting your filters or clear them to see all products.</EmptySub>
              </EmptyState>
            ) : (
              <GridView>
                {sortedProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </GridView>
            )}
          </>
        )}
      </Main>
    </Container>
  );
};

export default ShopListing;
