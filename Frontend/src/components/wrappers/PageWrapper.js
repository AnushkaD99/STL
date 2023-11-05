import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '../comps/Sidebar';
import Navbar from '../comps/Navbar';
import Titlebar from '../comps/Titlebar';
import ContentWrapper from './ContentWrapper';

const { Sider } = Layout;

const PageWrapper = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Sidebar />
      </Sider>
      <Layout className="site-layout" style={{ backgroundColor: '#ffffff' }}>
        <Navbar />
        <Titlebar />
        <ContentWrapper>{children}</ContentWrapper>
      </Layout>
    </Layout>
  );
};

export default PageWrapper;
