import { useSWRPagination } from "@hooks/useSWRPagination";
import CreatePost from "@components/CreatePost";
import PostCard from "@components/PostCard";
import Loader from "@components/Loader";
import { IPost } from "@libs/types";

export default function Home() {
  // const { data: posts, error } = useSWR<IPost[]>(
  //   "/posts?_sort=createdAt&_order=desc"
  // );

  const {
    paginatedItems: paginatedPosts,
    error: paginatedPostsErr,
    size,
    setSize,
    isReachedAtLast,
    isLoading: isPostsLoading,
  } = useSWRPagination<IPost>("/posts");

  return (
    <div>
      <h4>useSWR Hook ⛳ 🍜</h4>
      <CreatePost />

      <h4>Posts</h4>
      {paginatedPostsErr && <p className="text-center">Something went wrong</p>}
      {!paginatedPosts && <Loader />}
      {paginatedPosts &&
        paginatedPosts.map((post, indx) => <PostCard key={indx} data={post} />)}
      {isPostsLoading && <Loader />}
      {!isReachedAtLast && (
        <div className="mx-auto w-50">
          <button
            onClick={() => setSize(size + 1)}
            className="btn btn-outline-warning mx-auto"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
