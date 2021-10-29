import { FC } from "react";
import { useRouter } from "next/router";
import { IPost } from "@libs/types";

const PostCard: FC<{
  data: IPost;
}> = ({ data }) => {
  const router = useRouter();
  const { id, content, clientOnly } = data;

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  const wrapperClassName = clientOnly ? "border border-white" : "";
  return (
    <div
      className={`${wrapperClassName} card w-50 bg-dark`}
      onClick={handleClick}
    >
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">{content}</p>
    </div>
  );
};

export default PostCard;
