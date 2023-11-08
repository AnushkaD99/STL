import {React, useEffect, useState} from 'react'
import { Card } from 'antd'
import axios from 'axios'

export default function History() {
  const [isLoading, setIsLoading] = useState(false);
  const [details, setDetails] = useState([]);
  const getBillingDetails = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5001/api/v1/billing");
      setDetails(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBillingDetails();
  },[])
  if(isLoading) return (null)
  return (
    <>
    {details.map((detail, index) => (
      <div key={index}>
        <Card
          bordered={false}
          style={{
            width: 500,
            margin: '10px 0px',
          }}
        >
          <b>Outstanding: {detail.Outstanding.toFixed(2)}</b>
          <p>Bill Value: Rs. {detail.BillValue.toFixed(2)} at {new Date(detail.date).getFullYear()}/{new Date(detail.date).getMonth()+1}/01</p>
          <b>Payments: Rs. {detail.payment}</b>
        </Card>
      </div>
    ))}
    </>
  )
}
