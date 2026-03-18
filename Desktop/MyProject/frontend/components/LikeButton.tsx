import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { getLocalStorgeToken } from "./getToken";
import { motion } from "framer-motion";

interface LikeButtonProps {
  photoId: string;
  dark?: boolean;
}

interface JwtPayload {
  email: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ photoId, dark = false }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchTotalLikes = async () => {
      try {
        const token = getLocalStorgeToken();
        if (!token) return;
        const decoded = jwtDecode<JwtPayload>(token);
        const userId = decoded.email;
        const response = await axios.get(
          `https://api-three-murex.vercel.app/api/totalLikes/${photoId}`,
          { params: { userId } }
        );
        setLiked(!!response.data.userExists);
        setLikes(response.data.userSize);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchTotalLikes();
  }, [photoId]);

  const handleLike = async () => {
    try {
      const token = getLocalStorgeToken();
      if (!token) return;
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.email;
      await axios.post(`https://api-three-murex.vercel.app/api/like/${photoId}`, { userId });
      setLikes(liked ? likes - 1 : likes + 1);
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking photo:", error);
    }
  };

  return (
    <motion.button
      onClick={handleLike}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.85 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`flex items-center gap-1.5 ${dark ? "text-white" : "text-gray-700"}`}
      aria-label={liked ? "Unlike" : "Like"}
    >
      {/* Heart icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="h-5 w-5 transition-colors duration-200"
        fill={liked ? "#ec4899" : "none"}
        stroke={liked ? "#ec4899" : dark ? "white" : "#9ca3af"}
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      {likes > 0 && (
        <span className={`text-xs font-semibold ${liked ? "text-pink-500" : dark ? "text-white/80" : "text-gray-500"}`}>
          {likes}
        </span>
      )}
    </motion.button>
  );
};

export default LikeButton;
