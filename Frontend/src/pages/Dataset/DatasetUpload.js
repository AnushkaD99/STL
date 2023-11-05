import React, { useState } from 'react';
import { Alert, notification } from 'antd';
import { uploadDataset } from '../../api/api';

function DatasetUpload() {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    datasetName: '',
    files: null
  });

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: name === 'files' ? files : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      uploadData.append('datasetName', formData.datasetName);
      for (let i = 0; i < formData.files.length; i++) {
        uploadData.append('files', formData.files[i]);
      }

      const response = await uploadDataset(uploadData);

      if (response.status === 201) {
        notification.success({
          message: response.data.message,
          duration: 5,
        });
      } else {
        console.error('Failed to upload dataset. Server returned status: ', response.status);
        setError('Failed to upload dataset. Please try again.');
      }
    } catch (error) {
      console.error('Error occurred while uploading dataset: ', error.message);
      setError('Something went wrong. Please try again later.');
    }
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Upload Dataset</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="datasetName" placeholder="Dataset Name" onChange={handleInputChange} />
        <input type="file" name="files" onChange={handleInputChange} multiple />
        <button type="submit">Upload</button>
      </form>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{
            margin: '10px 0px',
            width: 'max-content'
          }}
        />
      )}
    </div>
  );
}

export default DatasetUpload;
