import { FC } from "react";
import { useRouter } from "next/router";
import { IComment } from "@libs/types";

const CommentCard: FC<{
  data: IComment;
}> = ({ data }) => {
  const { id, content, clientOnly } = data;
  const wrapperClassName = clientOnly ? "border border-white" : "";
  return (
    <div className={`${wrapperClassName} card w-50 bg-dark`}>
      <p className="card-header">Comment Id : {id}</p>
      <p className="card-body" id={`commentId-${id}`}>
        {content}{" "}
      </p>
    </div>
  );
};

export default CommentCard;
