import { GoogleAuthProvider, signInWithPopup, getAuth, signInWithRedirect } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/server/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
    } catch (error) {
      console.log("could not login with google", error);
    }
  };
  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="flex items-center justify-center w-full bg-[#d21306] text-white rounded-lg p-2 font-semibold uppercase shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1 duration-200 ease-in-out"
    >
      <FaGoogle className="mr-3 text-lg" />
      Continue with Google
    </button>
  );
}
