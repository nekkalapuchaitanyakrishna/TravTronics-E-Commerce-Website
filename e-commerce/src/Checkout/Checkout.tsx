import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { Button, Card, List, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const calculateTotalPrice = () => {
    return cart.reduce((total: number, product: any) => total + product.price * product.quantity, 0);
  };

  const handleOrderPlacement = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    clearCart();
    navigate('/products');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4"> {/* Center the layout */}
      <div className="w-[60vw]"> {/* Limit the content width */}
        <h1 className="text-4xl font-bold mb-8 text-center">Order Review</h1>

        <Card className="shadow-md mb-10 p-8 w-full mx-auto"> {/* Adjust width to 100% */}
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(product: any) => (
              <List.Item>
                <List.Item.Meta
                  title={<span className="text-xl font-semibold">{product.name}</span>}
                  description={`Quantity: ${product.quantity}`}
                />
                <div className="text-lg font-semibold text-gray-600">${product.price * product.quantity}</div>
              </List.Item>
            )}
          />
        </Card>

        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-semibold">
            Total: <span className="text-green-500">${calculateTotalPrice()}</span>
          </h2>
          <Button
            type="primary"
            size="large"
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleOrderPlacement}
          >
            Place Order
          </Button>
        </div>

        <Modal
          title="Order Placed"
          visible={isModalVisible}
          onOk={handleOk}
          okText="Go to Products"
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>Your order has been placed successfully!</p>
        </Modal>
      </div>
    </div>
  );
};

export default Checkout;
