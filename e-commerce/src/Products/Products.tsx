import React, { useEffect, useState } from 'react';
import { Input, Card, Pagination, Alert } from 'antd';
import { useCart } from '../CartContext';  // Use the CartContext
import 'antd/dist/reset.css';

const { Meta } = Card;

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [error, setError] = useState(''); // Error state for handling fetch errors

  const { addToCart } = useCart();  // Add to cart function from context

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Unable to fetch products. Please try again later.');
      }
    };

    fetchProducts();
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
      {error && <Alert message={error} type="error" showIcon className="mb-4" />}

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
                src="https://th.bing.com/th/id/OIP.KwavIwuhhIw20dSqHQA4pAHaHa?rs=1&pid=ImgDetMain"
                className="h-40 object-cover"
                loading="lazy"  // Lazy loading added here
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
