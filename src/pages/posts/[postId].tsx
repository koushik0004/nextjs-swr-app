import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import useSWR from "swr";
import { IPost, IComment } from "@libs/types";
import { useSWRPagination } from "@hooks/useSWRPagination";
import InfiniteScroll from "react-infinite-scroll-component";

const index = () => {
  const { push, query } = useRouter();

  const {
    paginatedItems: paginatedComments,
    error: paginatedCommentsErr,
    size,
    setSize,
    isReachedAtLast,
    isLoading: isCommentsLoading,
  } = useSWRPagination<IComment>(`/posts/${query.postId}/comments`);

  const {
    data: singlePost,
    isValidating,
    error: postError,
  } = useSWR<IPost>(query.postId && `/posts/${query.postId}`);

  return (
    <div>
      <header className="mx-auto w-50 mb-2">
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={() => push("/")}
        >
          Back to home
        </button>
      </header>

      {postError && <p className="text-center">Something went wrong</p>}
      {isValidating && !singlePost && <Loader />}

      {!isValidating && singlePost && <PostCard data={singlePost} />}
      <CreateComment />

      <h4>Comments</h4>
      {paginatedCommentsErr && (
        <p className="text-center">Something went wrong</p>
      )}
      <InfiniteScroll
        next={() => setSize(size + 1)}
        hasMore={!isReachedAtLast}
        loader={<Loader />}
        dataLength={paginatedComments?.length ?? 0}
      >
        {paginatedComments &&
          paginatedComments.map((comment, indx) => (
            <CommentCard key={indx} data={comment} />
          ))}
      </InfiniteScroll>
    </div>
  );
};

export default index;
