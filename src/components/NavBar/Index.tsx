import SearchBar from "./SearchBar";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const navbarClasses = `flex items-center justify-between px-8 py-4 dark:bg-gray-800 dark:text-white bg-white text-gray-800`;

  return (
    <nav className={navbarClasses}>
      <ul className="flex items-center justify-between w-full">
        <li className="flex-shrink-0">
          <Link to="/" className="text-lg font-bold">
            ISee-Supinfo
          </Link>
        </li>

        <li className="flex-grow text-center ">
          <SearchBar />
        </li>

        <li>
          {!sessionStorage.token ? (
            <Link to="/connect" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-#fff">
              Connect
            </Link>
          ) : (
            <div className="relative inline-block text-left">
              <button
                className="p-2 rounded-md bg-gray-200 hover:bg-gray-300 dark:text-#000000"
                onClick={toggleMenu}
              >
                User
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg" onClick={toggleMenu}>
                  <Link to="/profile" className="block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:text-#212121">
                    Profile
                  </Link>
                  <Link to="/channel/" className="block px-4 py-2 text-sm rounded-md hover:bg-gray-100 dark:text-#212121">
                    Channel
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
}

export default Navbar;
