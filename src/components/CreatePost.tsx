import { useState, FC } from "react";
import axios from 'axios';
import {IPost} from '@libs/types';

const CreatePost: FC<{
  updatePosts: Function
}> = ({updatePosts}) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {data} = await axios({
      method: 'POST',
      url: "/posts",
      data: {
        content,
        id: Math.floor(Math.random()*1000),
        createdAt: Date.now()
      }
    });
    updatePosts((posts: IPost[]) => [data, ...posts]);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50 ">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream post:)"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add Post
      </button>
    </form>
  );
};

export default CreatePost;
