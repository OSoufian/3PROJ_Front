import { VideoType } from '~/types';

const VideoChart = () => {
    const [videoData, setVideoData] = useState([]);
  
    useEffect(() => {
      // Fetch video data and update the videoData state
      // You can use your own logic to fetch and process the video data
      // For this example, let's assume you have an array of video objects with a "createdAt" property
  
      const fetchVideoData = async () => {
        try {
          const response = await fetch('your-api-endpoint');
          const data = await response.json();
          setVideoData(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchVideoData();
    }, []);
  
    // Extract the creation dates from the videoData
    const creationDates = videoData.map((video: VideoType) => video.CreatedAt);
  
    // Define the chart data
    const chartData = {
      labels: creationDates, // X-axis labels (video creation dates)
      datasets: [
        {
          label: 'Videos',
          data: creationDates, // Y-axis data (video creation dates)
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1,
        },
      ],
    };
  
    // Define the chart options
    const chartOptions = {
      scales: {
        x: {
          type: 'time', // Use time scale for the X-axis
          time: {
            unit: 'month', // Display data by month (you can customize the unit as per your requirement)
          },
        },
      },
    };
  
    return (
      <div>
        <h2>Video Creation Dates</h2>
        {/* <Line data={chartData} options={chartOptions} /> */}
      </div>
    );
  };
  
  export default VideoChart;