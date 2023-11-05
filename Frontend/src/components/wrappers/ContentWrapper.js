import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentWrapper = ({ children }) => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: 0,
        padding: 24,
        minHeight: 280,
        backgroundColor: '#f5f5f5',
      }}
    >
      {children}
    </Content>
  );
};

export default ContentWrapper;
