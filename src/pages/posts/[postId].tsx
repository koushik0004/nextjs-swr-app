import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import Loader from '@components/Loader';
import {IPost, IComment} from '@libs/types';

const index = () => {
  const {push, query} = useRouter();
  const [postData, setPostData] = useState<IPost>(null);
  const [comments, setComments] = useState<IComment[]>(null)
  const getPost = async () => {
    const postData = await axios.get(`/posts/${query.postId}`);
    setPostData(postData.data);
  };

  const getComments = async () => {
    const allComments = await axios.get(`/posts/${query.postId}/comments?_sort=createdAt&_order=desc`);
    setComments(allComments.data);
  };

  useEffect(() => {
    if(query?.postId) {
      getPost();
      getComments();
    }
  }, [query?.postId]);

  return (
    <div>
      <header className="mx-auto w-50">
        <button type="button" className="btn btn-outline-warning" onClick={() => push('/')}>
          Back to home
        </button>
      </header>

      {!postData && <Loader />}

      {postData && <PostCard data={postData} />}
      <CreateComment />

      <h4>Comments</h4>
      {!comments && <Loader />}
      {comments && comments.map((comment, indx) => (
        <CommentCard key={indx} data={comment}/>
      ))}
    </div>
  );
};

export default index;
