import {useState, useEffect} from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import Loader from '@components/Loader';
import useSWR from "swr";
import {IPost, IComment} from '@libs/types';

const index = () => {
  const {push, query} = useRouter();
  // const [postData, setPostData] = useState<IPost>(null);
  // const [comments, setComments] = useState<IComment[]>(null)
  // const getPost = async () => {
  //   const postData = await axios.get(`/posts/${query.postId}`);
  //   setPostData(postData.data);
  // };

  // const getComments = async () => {
  //   const allComments = await axios.get(`/posts/${query.postId}/comments?_sort=createdAt&_order=desc`);
  //   setComments(allComments.data);
  // };

  // useEffect(() => {
  //   if(query?.postId) {
  //     getPost();
  //     getComments();
  //   }
  // }, [query?.postId]);

  const {data: comments, error} = useSWR(query.postId && `/posts/${query.postId}/comments?_sort=createdAt&_order=desc`);
  const {data: posts, error: postError} = useSWR<IPost[]>(query.postId && `/posts?_sort=createdAt&_order=desc`);
  const [post] = posts && posts.length ? posts.filter(item => item.id === Number(query.postId)) : [];

  return (
    <div>
      <header className="mx-auto w-50">
        <button type="button" className="btn btn-outline-warning" onClick={() => push('/')}>
          Back to home
        </button>
      </header>

      {postError && <p className="text-center">Something went wrong</p>}
      {!post && <Loader />}

      {post && <PostCard data={post} />}
      <CreateComment />

      <h4>Comments</h4>
      {error && <p className="text-center">Something went wrong</p>}
      {!comments && <Loader />}
      {comments && comments.map((comment, indx) => (
        <CommentCard key={indx} data={comment}/>
      ))}
    </div>
  );
};

export default index;
