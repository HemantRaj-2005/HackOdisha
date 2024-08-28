import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] text-[#ffffff]">
      <div className="w-full max-w-lg p-6 bg-[#1a1a1a] rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center my-8 text-[#e6e6e6]">
          Profile
        </h1>
        <form className="flex flex-col gap-5">
          <img
            src={currentUser.profilePicture}
            alt="profile"
            className="h-28 w-28 self-center cursor-pointer rounded-full object-cover border-4 border-[#e94560]"
          />
          <input
            defaultValue={currentUser.username}
            type="text"
            id="username"
            placeholder="Username"
            className="bg-[#262626] rounded-lg p-4 text-[#e6e6e6] placeholder-[#888ea8] focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <input
            defaultValue={currentUser.email}
            type="email"
            id="email"
            placeholder="Email"
            className="bg-[#262626] rounded-lg p-4 text-[#e6e6e6] placeholder-[#888ea8] focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-[#262626] rounded-lg p-4 text-[#e6e6e6] placeholder-[#888ea8] focus:outline-none focus:ring-2 focus:ring-[#e94560]"
          />
          <button className="bg-[#e94560] text-[#ffffff] p-4 rounded-lg uppercase hover:bg-[#e94560] hover:opacity-90 disabled:opacity-70">
            Update
          </button>
        </form>
        <div className="flex justify-between mt-6">
          <span className="text-[#ff4d4d] cursor-pointer hover:underline">
            Delete Account
          </span>
          <span className="text-[#ff4d4d] cursor-pointer hover:underline">
            Sign out
          </span>
        </div>
      </div>
    </div>
  );
}
