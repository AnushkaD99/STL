import { Form, Input, Button, notification } from 'antd'
import React , {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

export default function Payment() {
  const navigate = useNavigate();
  // console.log(ID)
  const id =useParams();
  console.log(id.id)
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const getBillingDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5001/api/v1/billing/" + id.id);
      setDetail(response.data);
      console.log(response.data)
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const [amount, setAmount] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/v1/billing', {
        userId: 1,
        Outstanding: detail.Outstanding - parseFloat(amount),
        payment: parseFloat(amount),
        BillValue: detail.BillValue,
      });

      navigate('/billing');
      notification.success({
        message: response.data.message,
        description: 'Payment Success.',
        duration: 5,
      });
      // Handle the response, show success message, etc.
      console.log('Payment successful', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Payment failed', error);
    }
  };
  

  useEffect(() => {
    getBillingDetail();
  },[])
  if(isLoading) return (null)
  return (
    <>
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
    >
      <Form.Item label="Total Payable">
      <Input
        type="text"
        value={detail.Outstanding !== undefined ? detail.Outstanding.toFixed(2) : 'N/A'}
        disabled
      />

      </Form.Item>
      <Form.Item label="Amount">
        <Input
          type="number"
          step="0.01" // Allow two decimal places
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 22, span: 16 }}>
        <Button type="primary" htmlType="button" onClick={handlePayment}>
          Pay
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}
