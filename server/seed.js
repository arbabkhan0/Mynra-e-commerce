import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Products from "./models/Products.js";

dotenv.config();

const products = [
  {
    title: "Men's Casual Shirt",
    name: "Classic Cotton Shirt",
    desc: "A premium 100% cotton shirt for all-day comfort and style.",
    img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80",
    price: { org: 25.0, mrp: 40.0, off: 37 },
    sizes: ["S", "M", "L", "XL"],
    category: ["Men", "Casual Wear"],
  },
  {
    title: "Women's Summer Dress",
    name: "Floral Print Dress",
    desc: "Lightweight and breathable floral print dress, perfect for summer.",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80",
    price: { org: 35.0, mrp: 50.0, off: 30 },
    sizes: ["S", "M", "L"],
    category: ["Women", "Western Wear"],
  },
  {
    title: "Formal Blazer",
    name: "Slim Fit Formal Blazer",
    desc: "Professional slim fit blazer for a sharp corporate look.",
    img: "https://images.unsplash.com/photo-1507679722356-436e1f24fd81?w=600&q=80",
    price: { org: 80.0, mrp: 120.0, off: 33 },
    sizes: ["M", "L", "XL", "XXL"],
    category: ["Men", "Formal Wear"],
  },
  {
    title: "Winter Jacket",
    name: "Puffer Jacket",
    desc: "Insulated puffer jacket to keep you warm in extreme cold.",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=600&q=80",
    price: { org: 60.0, mrp: 100.0, off: 40 },
    sizes: ["M", "L", "XL"],
    category: ["Men", "Winter Wear"],
  },
  {
    title: "Ethnic Saree",
    name: "Silk Saree",
    desc: "Elegant silk saree with intricate embroidery for festive occasions.",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&q=80",
    price: { org: 45.0, mrp: 75.0, off: 40 },
    sizes: ["Free Size"],
    category: ["Women", "Ethnic Wear"],
  },
  {
    title: "Kids Denim Jacket",
    name: "Classic Blue Denim",
    desc: "Durable and stylish denim jacket for kids.",
    img: "https://images.unsplash.com/photo-1519704943920-1844582b7bac?w=600&q=80",
    price: { org: 30.0, mrp: 45.0, off: 33 },
    sizes: ["S", "M", "L"],
    category: ["Kids", "Kids Wear"],
  },
  {
    title: "Casual T-Shirt",
    name: "Cotton Basic Tee",
    desc: "Simple and essential cotton t-shirt for everyday wear.",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    price: { org: 15.0, mrp: 25.0, off: 40 },
    sizes: ["S", "M", "L", "XL"],
    category: ["Men", "Casual Wear"],
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MODNO_DB);
    console.log("Connected to MongoDB for seeding");

    // Clear existing products
    await Products.deleteMany({});
    console.log("Cleared existing products");

    // Insert new products
    await Products.insertMany(products);
    console.log("Successfully seeded products");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
};

seedDB();
