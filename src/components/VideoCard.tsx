import React from 'react';
import './VideoCard.css';

interface Props {
  title: string;
  description: string;
  thumbnail: string;
}

function VideoCard(props: Props) {
  const { title, description, thumbnail } = props;

  return (
    <div className="video-card">
      <img src={thumbnail} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default VideoCard;