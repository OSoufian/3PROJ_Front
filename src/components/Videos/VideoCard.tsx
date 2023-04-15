interface Props {
  title: string;
  description: string;
  thumbnail: string;
}

function VideoCard(props: Props) {
  const { title, description, thumbnail } = props;

  return (
    <div className="w-80 sm:w-96 md:w-80 lg:w-96 xl:w-80 2xl:w-96 m-2 border border-gray-300 shadow-sm rounded-md overflow-hidden inline-block align-top bg-white dark:bg-gray-800">
      <img className="w-full h-40 sm:h-52 object-cover" src={`http://127.0.0.1:3000/files?filename=${thumbnail}`} alt={title} />
      <h3 className="text-lg font-medium my-2 mx-3 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-600 text-sm my-2 mx-3 dark:text-gray-400">{description}</p>
    </div>
  );
}

export default VideoCard;
