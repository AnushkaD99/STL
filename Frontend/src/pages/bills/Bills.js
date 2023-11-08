import React from 'react';
import Total_Payable from './Total Payable';
import History from './History';
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Total Payable',
    children: <Total_Payable />,
  },
  {
    key: '2',
    label: 'Bill History',
    children: <History />,
  }
];
const App = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
export default App;