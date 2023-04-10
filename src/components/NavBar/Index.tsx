import { useState } from "react";
import { Link } from "react-router-dom";
// import SearchBar from "./SearchBar";
// import { useGetVideos } from "@/apis";
// import { VideoType } from "@/types";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [videos, setVideos] = useState<VideoType[]>([]);
  // const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  // useEffect(() => {
  //   useGetVideos((videoList: VideoType[]) => {
  //     setVideos(videoList);
  //     setFilteredVideos(videoList);
  //   });
  // }, []);

  // const handleSearch = (searchText: string) => {
  //   const filteredVideos = videos.filter(video => video.Name.toLowerCase().includes(searchText.toLowerCase()));
  //   setFilteredVideos(filteredVideos);
  // };

  return (
    <nav>
      <ul className="flex items-center justify-between px-8 py-4">
        <li>
          <Link to="/" className="text-lg font-bold">
            ISee-Supinfo
          </Link>
        </li>

        {/* <li>
          <SearchBar onSearch={handleSearch}/>
        </li> */}
        <li>
          {!sessionStorage.token ? (
            <Link to="/connect" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Connect
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={toggleMenu}
              >
                User
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-sm rounded-md text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  <Link to="/logout" className="block px-4 py-2 text-sm rounded-md text-red-700 hover:bg-red-100">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};


export default Navbar;

