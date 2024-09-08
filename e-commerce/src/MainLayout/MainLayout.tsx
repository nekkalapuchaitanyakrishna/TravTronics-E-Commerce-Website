import React from 'react';
import { Layout } from 'antd';
import Header from '../Header/Header';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header />
      <Content className="p-6 mx-auto max-w-4xl bg-gray-100">
        {children}
      </Content>
    </Layout>
  );
};

export default MainLayout;
