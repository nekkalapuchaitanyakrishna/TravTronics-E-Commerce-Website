import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, Typography, Alert } from 'antd';

const { Title } = Typography;

interface User {
  username: string;
  password: string;
  role: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Check if the user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/products');
      }
    }
  }, [navigate]);

  const handleLogin = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.get<User[]>('http://localhost:3000/users');
      const users = response.data;
      const user = users.find(
        (u) => u.username === values.username && u.password === values.password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      } else {
        setError('Invalid username or password');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to log in');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <Title level={2} className="text-center">Login</Title>
        {error && <Alert message={error} type="error" showIcon className="mb-4" />}
        <Form
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: 'Please enter your username' }]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={loading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
