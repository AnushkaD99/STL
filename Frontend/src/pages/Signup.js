import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert, notification } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { signup } from '../api/api';

const { Title, Paragraph } = Typography;

function Signup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await signup(values); // Make sure signup function returns a response object
      navigate('/');
      notification.success({
        message: response.data.message,
        duration: 5,
      });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.error); // Use error.response to access the response data
      } else {
        setError('Signup failed. Please try again.');
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto', marginTop: '100px' }}>
      <Title level={2}>Signup</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please enter your email!' },
            { type: 'email', message: 'Invalid email format!' },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[
            { required: true, message: 'Please enter your phone number!' },
            { pattern: /^\d{10}$/, message: 'Invalid phone number format!' },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please enter your password!' },
            { min: 4, message: 'Password must be minimum 4 characters.' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please re-enter your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Re-enter Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Signup
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
      <Paragraph style={{ marginTop: '20px' }}>
        Already have an account? <Link to="/">Login here</Link>
      </Paragraph>
    </div>
  );
}

export default Signup;
