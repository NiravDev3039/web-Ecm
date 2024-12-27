import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Footer Logo or Title */}
        <div className="text-lg font-semibold">
          ShopSphere
        </div>
        
        {/* Links Section */}
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/about" className="hover:text-white">About</a>
          <a href="/products" className="hover:text-white">Products</a>
          <a href="/contact" className="hover:text-white">Contact</a>
          <a href="/faq" className="hover:text-white">FAQs</a>
        </div>
        
        {/* Footer Credit */}
        <div className="text-sm mt-4 md:mt-0">
          © {new Date().getFullYear()} ShopSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
