import React from 'react';
import { useParams } from 'react-router-dom';

type VideoDetailsProps = {
  id: number;
};

function VideoDetails({ id }: VideoDetailsProps) {
  const { title, description, thumbnailUrl } = getVideoDetails(id); // replace this with your function that gets the details for a video

  return (
    <div>
      <h2>{title}</h2>
      <img src={thumbnailUrl} alt={title} />
      <p>{description}</p>
    </div>
  );
}

export default VideoDetails;