import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, LogoutOutlined, FileOutlined } from '@ant-design/icons';

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // If you are using localStorage
    // document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // If you are using cookies
    window.location.href = '/';
  };

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeOutlined />}>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<FileOutlined />}>
        <Link to="/Billing">Bill Details</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        <Link onClick={handleLogout}>Logout</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;
