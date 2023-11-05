import React, { useState } from 'react';
import { searchDatasets, downloadDataset } from '../../api/api';

function DatasetSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      // Call the search API function with searchTerm
      const response = await searchDatasets(searchTerm);
      setSearchResults(response.data.searchResults);
      setError(null); // Clear previous errors if any
    } catch (error) {
      setError('Error searching datasets. Please try again later.');
    }
  };

  const handleDownload = async (datasetId) => {
    try {
      // Call the download dataset API function with datasetId
      const response = await downloadDataset(datasetId);
      // Handle successful dataset download (e.g., initiate file download)
      console.log('Dataset downloaded successfully:', response);
    } catch (error) {
      // Handle download error (e.g., display error message)
      console.error('Error downloading dataset:', error);
    }
  };

  return (
    <div>
      <h2>Search Datasets</h2>
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Search by name" value={searchTerm} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {searchResults.map((dataset) => (
          <li key={dataset.id}>
            {dataset.datasetName}{' '}
            <button onClick={() => handleDownload(dataset.id)}>Download</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DatasetSearch;
