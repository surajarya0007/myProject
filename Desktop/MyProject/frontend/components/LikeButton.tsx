import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { useState, useEffect } from "react";

interface LikeButtonProps {
  photoId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ photoId }) => {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [pic, setPic] = useState("/like-blank.png");

  useEffect(() => {
    // Fetch total likes for the image ID
    const fetchTotalLikes = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const userId = decoded.email;

        // Fetch total likes for the image ID
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
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      const userId = decoded.email;

      // Make API call to like the photo
      const response = await axios.post(`http://localhost:5050/api/like/${photoId}`, { userId });
      
      if (!response.status ) {
        throw new Error(`Failed to like photo with status ${response.status}`);
      }
      
      if (liked) {
        setLikes(likes - 1);
        setPic("/like-blank.png");
      } else {
        setLikes(likes + 1);
        setPic("/like-red.jpeg");
      }
      
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking photo:", error);
    }
  };

  return (
    <div className="flex flex-row items-center">
      <Image
        onClick={handleLike}
        className={` hover:bg-red-100  ${liked ? "bg-red-600" : ""}`}
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
