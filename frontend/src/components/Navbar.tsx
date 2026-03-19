// working navbar but double line

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Landmark, 
  Camera, 
  Cloud, 
  History, 
  Map, 
  Users,
  Menu,
  X,
  LogIn,
  LogOut,
  User
} from 'lucide-react';

function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: <Landmark size={20} />, text: 'Discover Artifacts', path: '/discover-artifacts' },
    { icon: <Camera size={20} />, text: 'AR Experience', path: '/ar-experience' },
    { icon: <Cloud size={20} />, text: 'Climate Impact', path: '/climate-impact' },
    { icon: <History size={20} />, text: 'Restoration', path: '/restoration' },
    { icon: <Map size={20} />, text: 'Cultural Mapping', path: '/cultural-mapping' },
    { icon: <Users size={20} />, text: 'Community', path: '/community' },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-md' : isHomePage ? 'bg-transparent' : 'bg-white shadow-md'}`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-1">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Landmark className="text-amber-700" size={28} />
            <span className={`font-serif text-xl ${isHomePage && scrollY <= 50 ? 'text-white' : 'text-stone-800'}`}>
              Anubhav AI
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 mx-auto">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className={`flex items-center space-x-2 transition-colors ${
                  isHomePage && scrollY <= 50 
                    ? 'text-white hover:text-amber-200' 
                    : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 pl-10">
                <span className={`flex items-center gap-2 ${
                  isHomePage && scrollY <= 50 ? 'text-white' : 'text-stone-600'
                }`}>
                  <User size={20} />
                  {user.name}
                </span>
                <button
                  onClick={logout}
                  className={`flex items-center gap-2 ${
                    isHomePage && scrollY <= 50 
                      ? 'text-white hover:text-amber-200' 
                      : 'text-stone-600 hover:text-amber-700'
                  }`}
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className={`flex items-center gap-2 ${
                  isHomePage && scrollY <= 50 
                    ? 'text-white hover:text-amber-200' 
                    : 'text-stone-600 hover:text-amber-700'
                }`}
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className={`md:hidden ${isHomePage && scrollY <= 50 ? 'text-white' : 'text-stone-600'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center space-x-2 px-3 py-2 text-stone-600 hover:bg-stone-50 hover:text-amber-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            ))}
            {user ? (
              <>
                <div className="px-3 py-2 text-stone-600">
                  <User size={20} className="inline mr-2" />
                  {user.name}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-3 py-2 text-stone-600 hover:bg-stone-50 hover:text-amber-700 transition-colors w-full"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-3 py-2 text-stone-600 hover:bg-stone-50 hover:text-amber-700 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn size={20} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;










// // original navbar working

// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { 
//   Landmark, 
//   Camera, 
//   Cloud, 
//   History, 
//   Map, 
//   Users,
//   Menu,
//   X
// } from 'lucide-react';

// function Navbar() {
//   const [scrollY, setScrollY] = useState(0);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navItems = [
//     { icon: <Landmark size={20} />, text: 'Discover Artifacts', path: '/discover-artifacts' },
//     { icon: <Camera size={20} />, text: 'AR Experience', path: '/ar-experience' },
//     { icon: <Cloud size={20} />, text: 'Climate Impact', path: '/climate-impact' },
//     { icon: <History size={20} />, text: 'Restoration', path: '/restoration' },
//     { icon: <Map size={20} />, text: 'Cultural Mapping', path: '/cultural-mapping' },
//     { icon: <Users size={20} />, text: 'Community', path: '/community' },
//   ];

//   const isHomePage = location.pathname === '/';

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-md shadow-md' : isHomePage ? 'bg-transparent' : 'bg-white shadow-md'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <Link to="/" className="flex items-center space-x-2">
//             <Landmark className="text-amber-700" size={28} />
//             <span className={`font-serif text-xl ${isHomePage && scrollY <= 50 ? 'text-white' : 'text-stone-800'}`}>
//               Cultural AI
//             </span>
//           </Link>
          
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8">
//             {navItems.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.path}
//                 className={`flex items-center space-x-2 transition-colors ${
//                   isHomePage && scrollY <= 50 
//                     ? 'text-white hover:text-amber-200' 
//                     : 'text-stone-600 hover:text-amber-700'
//                 }`}
//               >
//                 {item.icon}
//                 <span>{item.text}</span>
//               </Link>
//             ))}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className={`md:hidden ${isHomePage && scrollY <= 50 ? 'text-white' : 'text-stone-600'}`}
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white border-t border-stone-100">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.path}
//                 className="flex items-center space-x-2 px-3 py-2 text-stone-600 hover:bg-stone-50 hover:text-amber-700 transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {item.icon}
//                 <span>{item.text}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;