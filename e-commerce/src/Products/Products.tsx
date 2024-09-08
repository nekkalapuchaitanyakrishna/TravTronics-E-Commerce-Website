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
    const filtered = products.filter((product:any) =>
      product.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <div className="search-container" style={{ maxWidth: '400px', margin: '0 auto', marginBottom: '20px' }}>
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: '100%' }}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {currentProducts.map((product:any) => (
          <Card
            key={product.id}
            hoverable
            bordered
            style={{ height: '350px', textAlign: 'center' }}
            cover={<img alt={product.name} src="https://via.placeholder.com/150" style={{ height: '150px', objectFit: 'cover' }} />}
            actions={[
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            ]}
          >
            <Meta title={product.name} description={`Category: ${product.category}`} />
            <p className="mt-2 font-bold">Price: ${product.price}</p>
          </Card>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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
