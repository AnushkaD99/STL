import React, { useEffect, useState } from 'react'
import { Button, Card, Flex } from 'antd'
import Link from 'antd/es/typography/Link'
import axios from 'axios'

export default function TotalPayable() {
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState([]);
  const getBillingDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5001/api/v1/billing/last");
      setDetail(response.data);
      console.log(response.data)
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getBillingDetail();
  },[])

  // const date = new Date(detail.date).toLocaleDateString();
  if(isLoading) return (null)
  return (
    <>
      <Card
        bordered={false}
        style={{
          width: 500,
        }}
      >
        <p><b>Total Payable : {detail.Outstanding !== undefined ? (
          <>{detail.Outstanding.toFixed(2)}</>
        ) : (
          <p>Outstanding: N/A</p>
        )}
        </b></p>
      </Card>
      <Card
        bordered={false}
        style={{
          width: 500,
          margin: '10px 0px',
        }}
      >
        <Flex justify='flex-end'><p>For month ending at {new Date(detail.date).getFullYear()}/{new Date(detail.date).getMonth()+1}/01</p></Flex>
      </Card>
      <Card
        bordered={false}
        style={{
          width: 500,
        }}
      >
        <Flex justify='space-between'>
          <dev>Last Payment</dev>
          <dev>
            {detail.payment !== undefined ? (
              <p><b>{detail.payment.toFixed(2)}</b></p>
            ) : (
              <p>Outstanding: N/A</p>
            )}
            <p>On {new Date(detail.date).toLocaleDateString()}</p>
          </dev>
        </Flex>
      </Card>
      <Link href={`../Payment/${detail.id}`}>
        <Button type='primary' style={{margin: '5px 0'}}>Pay</Button>
      </Link>
      
    </>
  )
}
