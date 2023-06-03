import "@/styles/VideoCardStyle.css";

interface Props {
  title: string;
  thumbnail: string;
  views: number;
}

function VideoCard(props: Props) {
  const { title, thumbnail, views } = props;

  // Pouvoir récupérer les infos de l'utilisateur pour pouvoir afficher son logo et son nom sur la vidéo

  return (
    <div className="w-80 sm:w-96 md:w-80 lg:w-96 xl:w-80 2xl:w-96 m-2 border border-gray-300 shadow-sm rounded-md overflow-hidden inline-block align-top bg-white dark:bg-gray-800 video-card">
       {thumbnail ? (
          <img className="w-full h-40 sm:h-52 object-cover" src={`http://127.0.0.1:3000/image?imagename=${thumbnail}`} alt={title} />
        ) : (
          <img className="w-full h-40 sm:h-52 object-cover" src="https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png" alt="Placeholder" />
        )}
      
      <h3 className="text-lg font-medium my-2 mx-3 text-gray-900 dark:text-white video-title">{title}</h3>
      <p>{`${views} ${views > 1 ? 'views' : 'view'}`}</p>
    </div>
  );
}

export default VideoCard;