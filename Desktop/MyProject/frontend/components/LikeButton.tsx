import Image from "next/image";
import { useState } from "react";

interface LikeButtonProps {
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  return (
    <div className="flex flex-row items-center">
      <Image
        onClick={handleLike}
        className={` hover:bg-red-100  ${liked ? "bg-red-600" : ""}`}
        src="/like4.svg"
        alt="Like"
        width={25}
        height={25}
      />

      <div>{likes > 0 && <span className="ml-1">{likes}</span>}</div>
    </div>
  );
};

export default LikeButton;
