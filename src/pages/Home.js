import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/fakeStoreApi';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('priceLowToHigh');
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts().then((res) => setProducts(res.data));
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Sort products based on selected sort option
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.price - b.price;
    } else if (sortOption === 'priceHighToLow') {
      return b.price - a.price;
    } else if (sortOption === 'titleAtoZ') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'titleZtoA') {
      return b.title.localeCompare(a.title);
    }
    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Products</h1>

      {/* Filter and Sort in the same row */}
      <div className="flex flex-wrap justify-end gap-4 items-center mb-4">

        {/* Filter Dropdown */}
        <div className="w-130">
          <select
            className="p-2 border rounded w-full"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="w-130">
          <select
            className="p-2 border rounded w-full"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="titleAtoZ">Title: A to Z</option>
            <option value="titleZtoA">Title: Z to A</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {paginatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
        onPageChange={setCurrentPage}
        className="mx-auto mt-4" // Center the pagination and add margin
      />
    </div>
  );
};

export default Home;
