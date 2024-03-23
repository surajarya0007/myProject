import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Notice the change in import style
import Image from "next/image";
import { useState, useEffect } from "react";
import { getLocalStorgeToken } from "./getToken";

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

        const response = await axios.get(`http://localhost:5050/api/totalLikes/${photoId}`, { params: { userId } });
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

      const response = await axios.post(`http://localhost:5050/api/like/${photoId}`, { userId });

      if (!response.status) {
        throw new Error(`Failed to like photo with status ${response.status}`);
      }

      setLikes(liked ? likes - 1 : likes + 1);
      setPic(liked ? "/like-blank.png" : "/like-red.jpeg");
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking photo:", error);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Image
        onClick={handleLike}
        className={`hover:bg-red-100 ${liked ? "bg-red-600" : ""}`}
        src={pic}
        alt="Like"
        width={22}
        height={22}
      />
      <div>{likes > 0 && <span className="ml-1">{likes}</span>}</div>
    </div>
  );
};

export default LikeButton;
