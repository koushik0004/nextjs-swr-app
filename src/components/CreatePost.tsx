import { useState, FC } from "react";
import axios from "axios";
// import { mutate } from "swr";
import { IPost } from "@libs/types";
import { useSWRPagination } from "@hooks/useSWRPagination";

const CreatePost: FC<{
  updatePosts?: Function;
}> = ({ updatePosts }) => {
  const [content, setContent] = useState("");
  const {
    mutate: paginatedPostsMutate
  } = useSWRPagination<IPost>("/posts",
  {
    revalidateOnMount: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000);
    const FAKE_DATA = {
      content,
      id,
      createdAt: Date.now(),
      clientOnly: true,
    };
    paginatedPostsMutate((posts: IPost[][]) => [[FAKE_DATA], ...posts], false);
    setContent("");

    await axios({
      method: "POST",
      url: "/posts",
      data: {
        ...FAKE_DATA,
        clientOnly: false,
      },
    });
    paginatedPostsMutate();
    // updatePosts((posts: IPost[]) => [data, ...posts]);
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
