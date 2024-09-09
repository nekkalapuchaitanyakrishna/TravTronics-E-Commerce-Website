import React, { useEffect, useState } from 'react';
import { Input, Card, Pagination } from 'antd';
import { useCart } from '../CartContext';  // Use the CartContext
import 'antd/dist/reset.css';

const { Meta } = Card;

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  const { addToCart } = useCart();  // Add to cart function from context

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filtered = products.filter((product: any) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="container mx-auto p-4">
      <div className="search-container mb-6 mx-auto max-w-sm md:max-w-md lg:max-w-lg">
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full"
        />
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-3 max-sm:grid-cols-1 max-md:grid-cols-3 max-lg:grid-cols-4 gap-4">
        {currentProducts.map((product: any) => (
          <Card
            key={product.id}
            hoverable
            bordered
            className="text-center"
            cover={
              <img
                alt={product.name}
                src="https://via.placeholder.com/150"
                className="h-40 object-cover"
              />
            }
            actions={[
              <button
                onClick={() => addToCart(product)}
                className="hover:text-blue-500"
              >
                Add to Cart
              </button>,
            ]}
          >
            <Meta title={product.name} description={`Category: ${product.category}`} />
            <p className="font-bold mt-2">Price: ${product.price}</p>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Pagination
          current={currentPage}
          pageSize={productsPerPage}
          total={filteredProducts.length}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Products;
