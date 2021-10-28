import {useEffect, useState} from 'react';
import axios from 'axios';
import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import Loader from '@components/Loader';
import {IPost} from '@libs/types';

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>(null);
  const getPosts = async () => {
    const {data} = await axios.get('/posts?_sort=createdAt&_order=desc');
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <h4>useSWR Hook ⛳ 🍜</h4>
      <CreatePost updatePosts={setPosts} />

      <h4>Posts</h4>
      {!posts && <Loader />}
      {posts && posts.map((post, indx) => (
        <PostCard key={indx} data={post} />
      ))}
    </div>
  );
}
