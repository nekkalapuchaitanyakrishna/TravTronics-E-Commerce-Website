import React from 'react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { Table, InputNumber, Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate(); // Use navigate to go back

  const calculateTotalPrice = () => {
    return cart.reduce((total: number, product: any) => total + product.price * product.quantity, 0);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <span className="text-lg font-semibold">{text}</span>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <span>${price}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_: any, product: any) => (
        <InputNumber
          min={1}
          value={product.quantity}
          onChange={(value) => updateQuantity(product.id, value)}
          className="w-16"
        />
      ),
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (_: any, product: any) => (
        <span>${product.price * product.quantity}</span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, product: any) => (
        <Button danger onClick={() => removeFromCart(product.id)}>
          Remove
        </Button>
      ),
    },
  ];

  const dataSource = cart.map((product: any) => ({
    ...product,
    key: product.id,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart Summary</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Table columns={columns} dataSource={dataSource} pagination={false} />

          <div className="mt-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total Price: <span className="text-green-500">${calculateTotalPrice()}</span>
            </h2>

            <div className="flex space-x-4">
              <Button
                type="primary"
                icon={<LeftOutlined />}
                onClick={() => navigate('/products')}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Go Back
              </Button>
              <Button
                type="primary"
                size="large"
                className="bg-blue-500 hover:bg-blue-600"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
