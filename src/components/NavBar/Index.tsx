function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate(1)
  };

  const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Searching for videos with query: ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <nav>
      <ul className="flex items-center justify-between px-8 py-4">
        <li>
          <Link to="/" className="text-lg font-bold">
            ISee-Supinfo
          </Link>
        </li>

        <li>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search videos..."
              className="border border-gray-300 rounded-md p-2 mr-2"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2"
            >
              Search
            </button>
          </form>
        </li>
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
                  <div className="py-1">
                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-100">
                    Logout
                  </button>
                  </div>
                  <div className="py-1">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </Link>
                  </div>
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

// import { useState } from "react";
// import { Link } from "react-router-dom";

// interface User {
//     Id: number;
//     Icon: string;
//     Username: string;
//     Email: string;
//     Password: string;
//     Incredentials: string;
//     ValideAccount: boolean;
//     Disable: boolean;
//     Subscribtion?: any;
//     Role?: any;
//     Credentials?: any;
//   }

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [user, setUser] = useState<User | undefined>();
//   const [searchQuery, setSearchQuery] = useState("");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLogout = () => {
//     sessionStorage.clear();
//     setUser(undefined);
//     window.location.reload();
//   };

//   const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     console.log(`Searching for videos with query: ${searchQuery}`);
//     setSearchQuery("");
//   };

//   return (
//     <nav>
//       <ul className="flex items-center justify-between px-8 py-4">
//         <li>
//           <Link to="/" className="text-lg font-bold">
//             ISee-Supinfo
//           </Link>
//         </li>

//         <li>
//           <form onSubmit={handleSearchSubmit}>
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchQueryChange}
//               placeholder="Search videos..."
//               className="border border-gray-300 rounded-md p-2 mr-2"
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 text-white rounded-md p-2"
//             >
//               Search
//             </button>
//           </form>
//         </li>
//         <li>
//           {sessionStorage.token ? (
//             <button onClick={handleLogout} className="p-2 rounded-md bg-gray-200 hover:bg-gray-300">
//               Logout
//             </button>
//           ) : (
//             <div className="relative inline-block text-left">
//               <button
//                 className="p-2 rounded-md bg-gray-200 hover:bg-gray-300"
//                 onClick={toggleMenu}
//               >
//                 Menu
//               </button>
//               {isMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
//                   <div className="py-1">
//                     <Link
//                       to="/login"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Login
//                     </Link>
//                     <Link
//                       to="/register"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Register
//                     </Link>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;