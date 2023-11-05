import React from 'react';
import PageWrapper from '../components/wrappers/PageWrapper';
import DatasetUpload from './Dataset/DatasetUpload';
import DatasetSearch from './Dataset/DatasetSearch';

const Dashboard = () => {
  return (
    <PageWrapper>
      <DatasetUpload />
      <DatasetSearch />
    </PageWrapper>
  );
};

export default Dashboard;
