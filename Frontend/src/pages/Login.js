import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '../api/api';

const { Title, Paragraph } = Typography;

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await login(values);
      const token = response.headers['token'];
      localStorage.setItem('token', token);
      navigate('/dashboard');
      notification.success({
        message: response.data.message,
        description: 'You have successfully logged in.',
        duration: 5,
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(error.response.data.error);
      } else {
        setError('Something went wrong. Please try again later.');
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', marginTop: '100px' }}>
      <Title level={2}>Login</Title>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Log in
          </Button>
        </Form.Item>
      </Form>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{
            margin: '10px 0px',
            width: 'max-content',
            minWidth: '300px'
          }}
        />
      )}
      <Paragraph style={{ textAlign: 'center', marginTop: '20px' }}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </Paragraph>
    </div>
  );
}

export default Login;
