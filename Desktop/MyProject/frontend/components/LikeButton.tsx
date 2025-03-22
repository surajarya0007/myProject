import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Notice the change in import style
import Image from "next/image";
import { useState, useEffect } from "react";
import { getLocalStorgeToken } from "./getToken";
import { motion } from "framer-motion";

interface LikeButtonProps {
  photoId: string;
}

interface JwtPayload { // Defining the expected shape of the JWT payload
  email: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ photoId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pic, setPic] = useState("/like-blank.png");

  useEffect(() => {
    const fetchTotalLikes = async () => {
      try {
        const token = getLocalStorgeToken();
        if (!token) return; // Early return if token is null

        const decoded = jwtDecode<JwtPayload>(token); // Type assertion here
        const userId = decoded.email;

        const response = await axios.get(`https://api-three-murex.vercel.app/api/totalLikes/${photoId}`, { params: { userId } });
        if (!response.data.userExists) {
          setLiked(false);
        } else {
          setLiked(true);
          setPic("/like-red.jpeg");
        }

        setLikes(response.data.userSize);
      } catch (error) {
        console.error("Error fetching total likes:", error);
      }
    };

    fetchTotalLikes();
  }, [photoId]);

  const handleLike = async () => {
    try {
      const token = getLocalStorgeToken();
      if (!token) return; // Early return if token is null

      const decoded = jwtDecode<JwtPayload>(token); // Type assertion here
      const userId = decoded.email;

      const response = await axios.post(`https://api-three-murex.vercel.app/api/like/${photoId}`, { userId });

      if (!response.status) {
        throw new Error(`Failed to like photo with status ${response.status}`);
      }

      setLikes(liked ? likes - 1 : likes + 1);
      setPic(liked ? "/like-blank.png" : "/like-red.jpeg");
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking photo : - ", error);
    }
  };

  return (
    <motion.div 
      className="box flex flex-row items-center"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Image
        onClick={handleLike}
        src={pic}
        alt="Like"
        width={22}
        height={22}
      />
      <div>{likes > 0 && <span className="ml-1">{likes}</span>}</div>
    </motion.div>
  );
};

export default LikeButton;
