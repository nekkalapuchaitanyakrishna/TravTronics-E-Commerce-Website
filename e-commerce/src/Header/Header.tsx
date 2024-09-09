import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Avatar } from 'antd';
import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../CartContext'; // Import the cart context to show the number of items in the cart

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart(); // Get cart items from context
  const userRole = localStorage.getItem('role'); // Assuming the role is stored in localStorage

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login page
  };

  const handleCartNavigation = () => {
    navigate('/cart'); // Navigate to cart page
  };

  const handleTitleClick = () => {
    navigate('/products'); // Navigate to products page when title is clicked
  };

  return (
    <header className="bg-blue-900 shadow-md px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Title with onClick */}
        <div
          className="text-white text-lg font-semibold cursor-pointer"
          onClick={handleTitleClick}
        >
          E-commerce
        </div>


        <div className="flex items-center space-x-4">
         
          

          <Badge count={cart.length} showZero>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleCartNavigation}
              className="bg-green-500 border-none hover:bg-green-600"
            >
              Cart
            </Button>
          </Badge>

          {/* Logout Button */}
          <Button
            type="primary"
            danger
            onClick={handleLogout}
            className="bg-red-600 border-none hover:bg-red-700"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
