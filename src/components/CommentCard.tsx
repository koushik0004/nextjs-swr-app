import {FC} from 'react';
import { useRouter } from "next/router";
import {IComment} from '@libs/types';

const CommentCard:FC<{
  data: IComment
}> = ({data}) => {
  const {id, content} = data;
  return (
    <div className=" card w-50 bg-dark">
      <p className="card-body">{content} </p>
    </div>
  );
};

export default CommentCard;
