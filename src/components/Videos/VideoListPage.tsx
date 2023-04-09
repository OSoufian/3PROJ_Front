import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import "@/styles/VideoListPage.css"

function VideoListPage() {

  return (
    <div className="container">
      <div>
        <CategoryPanel />
      </div>
      <div>
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
  );
}

export default VideoListPage;