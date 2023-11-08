import React from 'react';
import PageWrapper from '../components/wrappers/PageWrapper';
import Billing from './bills/Bills';

const Dashboard = () => {
  return (
    <PageWrapper>
      <Billing />
    </PageWrapper>
  );
};

export default Dashboard;