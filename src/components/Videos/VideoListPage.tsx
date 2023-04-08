import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
// import { getVideoList } from '../api/videos';

function VideoListPage() {
//   const [videos, setVideos] = useState([]);

//   useEffect(() => {
//     getVideoList().then(data => {
//       setVideos(data);
//     });
//   }, []);

  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-lg">
        <div>
          <CategoryPanel />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Video List</h1>
          <VideoList videos={[
            {
                id: 1,
                title: 'Video 1',
                description: 'This is a description for video 1',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
                id: 2,
                title: 'Video 2',
                description: 'This is a description for video 2',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/2tAjbnPXtRQ'
            },
            {
                id: 3,
                title: 'Video 3',
                description: 'This is a description for video 3',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/WgWz-8KdGlc'
            },
            {
                id: 4,
                title: 'Video 4',
                description: 'This is a description for video 4',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/zDAN3K-vrzc'
            },
            {
                id: 5,
                title: 'Video 5',
                description: 'This is a description for video 5',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/oHg5SJYRHA0'
            },
            {
                id: 6,
                title: 'Video 1',
                description: 'This is a description for video 1',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
                id: 7,
                title: 'Video 2',
                description: 'This is a description for video 2',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/2tAjbnPXtRQ'
            },
            {
                id: 8,
                title: 'Video 3',
                description: 'This is a description for video 3',
                thumbnail: 'https://via.placeholder.com/150x150.png',
                // videoUrl: 'https://www.youtube.com/embed/WgWz-8KdGlc'
            }
            ]}/>
        </div>
      </div>
    </div>
  );
}

export default VideoListPage;