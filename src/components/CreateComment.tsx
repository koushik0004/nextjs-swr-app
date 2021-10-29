import { useState } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
import axios from "axios";
import { IComment } from "@libs/types";

const CreateComment = () => {
  const {
    query: { postId },
  } = useRouter();
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const FAKE_DATA = {
      content: comment,
      postId,
      id: Math.floor(Math.random() * 1000),
      createdAt: Date.now(),
      clientOnly: true,
    };
    mutate(
      `/posts/${postId}/comments?_sort=createdAt&_order=desc`,
      (comments: IComment[]) => [FAKE_DATA, ...comments],
      false
    );
    setComment("");

    await axios({
      method: "POST",
      url: `/posts/${postId}/comments`,
      data: {
        ...FAKE_DATA,
        clientOnly: false,
      },
    });
    mutate(`/posts/${postId}/comments?_sort=createdAt&_order=desc`);
  };

  console.log(postId);

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream comment:)"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add comment
      </button>
    </form>
  );
};

export default CreateComment;
