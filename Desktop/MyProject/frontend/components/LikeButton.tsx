import Image from "next/image";
import { useState } from "react";

interface LikeButtonProps {
  initialLikes: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [pic, setPic] = useState("/like-blank.png");
const handleLike = () => {
  if (liked) {
    setLikes(likes - 1);
    setPic("/like-blank.png");
  } else {
    setLikes(likes + 1);
    setPic("/like-red.jpeg");
  }
  setLiked(!liked);
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
