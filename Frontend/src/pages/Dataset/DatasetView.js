function Dashboard() {
  const [datasets, setDatasets] = useState([]);

  useEffect(() => {
    // Fetch user datasets when the component mounts
    const fetchData = async () => {
      try {
        // Fetch datasets from API or perform any necessary data fetching logic
        // For example:
        // const response = await getDatasets();
        // setDatasets(response.data.datasets);
      } catch (error) {
        // Handle error (e.g., display error message)
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs once after initial render

  return (
    <ContentWrapper sidebar={<Sidebar />}>
      <Navbar />
      <PageWrapper>
        <div>
          <h2>Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
          <ul>
            {datasets.map((dataset) => (
              <li key={dataset.id}>{dataset.datasetName}</li>
            ))}
          </ul>
        </div>
      </PageWrapper>
    </ContentWrapper>
  );
}

export default Dashboard;
