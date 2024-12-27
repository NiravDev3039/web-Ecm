import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';


const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('price');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get('https://fakestoreapi.com/products');
        setProducts(productResponse.data);

        const categoryResponse = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price':
        return a.price - b.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      case 'price-desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-white p-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <label className="text-lg font-semibold text-teal-600">Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded-md border-2 border-teal-500 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="">All</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
          <label className="text-lg font-semibold text-teal-600">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 rounded-md border-2 border-teal-500 text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            <option value="price">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {sortedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-xl p-6 transform transition-all hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-teal-600 mb-2">{product.title}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-lg text-teal-500 font-semibold">₹{product.price.toFixed(2)}</p>
            <p className="text-sm text-teal-500 mb-4">{product.rating.rate}★</p>

            <button
              onClick={() => addToCart(product)}
              className="w-full py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-md text-lg font-semibold hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
         
      </div>
    
    </div>
  );
};

export default Products;
