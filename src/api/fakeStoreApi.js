import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = () => axios.get(`${API_BASE_URL}/products`);
export const fetchProductById = (id) => axios.get(`${API_BASE_URL}/products/${id}`);
export const fetchCategories = () => axios.get(`${API_BASE_URL}/products/categories`);
export const fetchProductsByCategory = (category) =>
  axios.get(`${API_BASE_URL}/products/category/${category}`);
