import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <div className="bg-[#0d0d0d] bg-opacity-90 backdrop-blur-md sticky top-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className="font-bold text-[#f2f2f2] text-lg md:text-xl">Auth App</h1>
        </Link>
        <ul className="flex gap-6">
          <Link to="/">
            <li className="text-[#cccccc] hover:text-[#e94560] transition-colors">Home</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                src={currentUser.profilePicture}
                alt="profile"
                className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-[#e94560] hover:border-[#ff4d4d] transition-all"
              />
            ) : (
              <li className="text-[#cccccc] hover:text-[#e94560] transition-colors">Sign In</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
}
